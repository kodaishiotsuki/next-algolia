// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAuth } from "firebase-admin/auth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      revalidated: boolean;
    }
  | string;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    //バリデーション
    console.log(req.headers.authorization);
    // const token = req.headers.authorization?.split(" ")?.[1] as string;
    // 'Bearer xxxxxx' => ["Bearer ", "xxxxxx"]=> "xxxxxx"
    const token = req.headers.authorization as string;
    await getAuth().verifyIdToken(token);

    //ページの再生成を行う場所
    // console.log(req.query.path);
    await res.revalidate(req.query.path as string);
    return res.json({ revalidated: true });
  } catch {
    return res.status(500).send("Error revalidating");
  }
};

export default handler;
