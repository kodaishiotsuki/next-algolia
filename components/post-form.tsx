import classNames from "classnames";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { auth, db } from "../firebase/client";
import { Post } from "../types/post";

const PostForm = ({ isEditMode }: { isEditMode: boolean }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Post>();

  const { fbUser, isLoading } = useAuth();
  const router = useRouter();
  const editTargetId = router.query.id as string;

  //すでに投稿している記事データ取得
  useEffect(() => {
    if (editTargetId) {
      const ref = doc(db, `posts/${editTargetId}`);
      getDoc(ref).then((snap) => {
        const oldPost = snap.data() as Post;
        reset(oldPost);
      });
    }
  }, [editTargetId]);

  //ユーザーいなければページ見せない
  if (!fbUser) {
    if (!isLoading) {
      router.push("/login");
    }
    return null;
  }

  //送信ボタン
  const submit = (data: Post) => {
    const ref = isEditMode
      ? doc(db, `posts/${editTargetId}`) //更新
      : doc(collection(db, "posts")); //新規
    const post: Post = {
      id: isEditMode ? editTargetId : ref.id,
      title: data.title,
      body: data.body,
      createdAt: editTargetId ? data.createdAt : Date.now(),
      updatedAt: editTargetId ? Date.now() : null,
      authorId: fbUser.uid,
    };

    setDoc(ref, post).then(async () => {
      const path = `/posts/${post.id}`;

      const token = (await auth.currentUser?.getIdToken(true)) as string;

      fetch(`/api/revalidate?path=${path}`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
      }) //api/revalidate
        .then((res) => res.json())
        .then(() => {
          alert(`記事を${isEditMode ? "更新" : "作成"}しました`);
        })
        .catch((e) => {
          console.log(e);
          alert("ページ再生成失敗");
        });
    });
  };

  const deletePost = () => {
    const ref = doc(db, `posts/${editTargetId}`);
    return deleteDoc(ref).then(() => {
      alert("記事を削除しました");
      router.push("/");
    });
  };

  return (
    <div>
      <h1>記事{isEditMode ? "編集" : "投稿"}</h1>

      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label className="block mb-0.5" htmlFor="title">
            タイトル*
          </label>
          <input
            className={classNames(
              "rounded border",
              errors.title ? "border-red-500" : "border-slate-300"
            )}
            autoComplete="off"
            {...register("title", {
              required: "必須入力です",
              maxLength: {
                value: 50,
                message: "最大50文字です",
              },
            })}
            type="text"
            name="title"
            id="title"
          />
          {errors.title && (
            <p className="text-red-500 mt-0.5">{errors?.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-0.5" htmlFor="body">
            本文*
          </label>
          <textarea
            className={classNames(
              "rounded border",
              errors.title ? "border-red-500" : "border-slate-300"
            )}
            autoComplete="off"
            {...register("body", {
              required: "必須入力です",
              maxLength: {
                value: 255,
                message: "最大255文字です",
              },
            })}
            name="body"
            id="body"
          />
          {errors.body && (
            <p className="text-red-500 mt-0.5">{errors?.body.message}</p>
          )}
        </div>
        <Button>{isEditMode ? "更新" : "投稿"}</Button>

        {/* 明示的にtype=buttonを記述(書かないとformに飛んでしまう) */}
        <Button type="button" onClick={deletePost}>
          削除
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
