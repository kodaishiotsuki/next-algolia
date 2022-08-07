import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useAuth } from "../../../context/auth";
import { adminDB } from "../../../firebase/server";
import { useUser } from "../../../lib/user";
import { Post } from "../../../types/post";

//firestoreにアクセス(サーバーサイドnode.jsを使用)
export const getStaticProps: GetStaticProps<{ post: Post }> = async (
  context
) => {
  const snap = await adminDB.doc(`posts/${context.params?.id}`).get(); //id→[id]と一致させる
  const post = snap.data() as Post;

  return {
    props: {
      post: post,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //から配列でok
    fallback: "blocking", //実装コストが減る
  };
};

const PostDetailPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const user = useUser(post?.authorId);
  const { fbUser } = useAuth();
  const isAuthor = fbUser?.uid === post.authorId;
  //postがなければ何も表示しない
  if (!post) {
    return <p>記事が存在しません...</p>;
  }

  return (
    <div className="container">
      <p>
        <Link href="/search">
          <a>Search</a>
        </Link>
      </p>
      <div className="aspect-video bg-slate-200 mb-4 rounded-md"></div>
      <h1 className="font-bold text-lg mb-2">{post.title}</h1>
      {user && (
        <div className="flex mb-4">
          <div className="w-10 h-10 mr-2 bg-slate-400 rounded-full"></div>
          <div className="flex-1">
            <p>{user.name}</p>
            <p className="text-slate-500">
              {format(post.createdAt, "yyyy-MM-dd HH:mm:ss")}
            </p>
          </div>
        </div>
      )}
      <p>{post.body}</p>
      {isAuthor && (
        <Link href={`/posts/${post.id}/edit`}>
          <a className="text-slate-500">編集</a>
        </Link>
      )}
    </div>
  );
};

export default PostDetailPage;
