import classNames from "classnames";
import { collection, collectionGroup, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { db } from "../firebase/client";
import { Post } from "../types/post";

const CreatePost = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Post>();

  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  //ユーザーいなければページ見せない
  if (!fbUser) {
    if (!isLoading) {
      router.push("/login");
    }
    return null;
  }

  const submit = (data: Post) => {
    const ref = doc(collection(db, "posts"));
    const post: Post = {
      id: ref.id,
      title: data.title,
      body: data.body,
      createdAt: Date.now(),
      updatedAt: null,
      authorId: fbUser?.uid,
    };
    setDoc(ref, post).then(() => {
      alert("記事を作成しました");
    });
  };
  return (
    <div>
      <h1>記事投稿</h1>

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
                value: 50,
                message: "最大50文字です",
              },
            })}
            name="body"
            id="body"
          />
          {errors.body && (
            <p className="text-red-500 mt-0.5">{errors?.body.message}</p>
          )}
        </div>
        <Button>投稿</Button>
      </form>
    </div>
  );
};

export default CreatePost;
