import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr/immutable";
import { db } from "../../firebase/client";
import { useUser } from "../../lib/user";
import { Post } from "../../types/post";
import { User } from "../../types/user";

const PostDetailPage = () => {
  const [post, setPost] = useState<Post>();
  const router = useRouter();
  const postId = router.query.id; //idは[id]と連動
  const user = useUser(post?.authorId);

  useEffect(() => {
    if (postId) {
      const ref = doc(db, `posts/${postId}`);
      console.log("データ通信");
      getDoc(ref).then((snap) => {
        setPost(snap.data() as Post);
      });
    }
  }, [postId]);

  //postがなければ何も表示しない
  if (!post) {
    return null;
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
    </div>
  );
};

export default PostDetailPage;
