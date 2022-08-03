import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase/client";
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
  const [fbUser, setFbUser] = useState<FirebaseUser | null>();
  const [isLoading, setIsLoading] = useState(true);

  //firebaseのログイン状態を監視する
  useEffect(() => {
    onAuthStateChanged(auth, (resultUser) => {
      setFbUser(resultUser); // user && setIsLoggedIn(true)
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        fbUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
