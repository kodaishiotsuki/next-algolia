import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase/client";
import { User } from "../types/user";

type ContextType = {
  //nullは空 undefinedは空かも不明
  fbUser: FirebaseUser | null | undefined;
  isLoading: boolean;
  user: User | null | undefined;
};

//初期値
const AuthContext = createContext<ContextType>({
  fbUser: undefined,
  isLoading: true,
  user: undefined,
});

//provider:配送エリア（実態はコンポーネント）
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [fbUser, setFbUser] = useState<FirebaseUser | null>();
  const [isLoading, setIsLoading] = useState(true);

  //ユーザーデータの取得
  useEffect(() => {
    //監視を解除する定数を定義
    let unsubscribe: Unsubscribe;

    //firebaseのログイン状態を監視する
    onAuthStateChanged(auth, (resultUser) => {
      //監視している人がいれば消す
      unsubscribe?.();
      setFbUser(resultUser);

      //ログイン中
      if (resultUser) {
        setIsLoading(true);
        const ref = doc(db, `users/${resultUser.uid}`);
        onSnapshot(ref, (snap) => {
          //ドキュメントのデータ取得
          setUser(snap.data() as User);
          setIsLoading(false);
        });
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        fbUser,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
