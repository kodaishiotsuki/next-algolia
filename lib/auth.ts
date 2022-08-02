import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/client"; //client.ts

//ログイン
export const login = () => {
  //google認証
  const provider = new GoogleAuthProvider();
  return (
    signInWithPopup(auth, provider)
      //promise処理
      .then((result) => {
        alert(`${result.user.displayName}さんこんにちは`);
      })
      .catch((e) => console.log(e))
  );
};

//ログアウト
export const logout = () => {
  return signOut(auth).then(() => {
    alert("サインアウト完了");
  });
};
