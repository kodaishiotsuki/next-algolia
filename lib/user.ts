import { doc, getDoc } from "firebase/firestore";
import useSWR from "swr/immutable";
import { db } from "../firebase/client";
import { User } from "../types/user";

export const useUser = (id?: string) => {
  //SWR(ユーザーを取得)
  const { data: user } = useSWR<User>(
    id && `users/${id}`, //第一引数にデータの保管場所を定義
    async () => {
      // console.log("データ取得");
      const ref = doc(db, `users/${id}`);
      const snap = await getDoc(ref); //await→この処理をするまで次に行かない
      return snap.data() as User;
    }
  );

  return user;
};
