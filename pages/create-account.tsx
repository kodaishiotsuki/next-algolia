import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";

type User = {
  name: string;
  nickname: string;
  profile: string;
};

const CreateAccount = () => {
  //useFormに色々入っている
  const { register, handleSubmit } = useForm<User>();

  const submit = (data: User) => {
    console.log(data);
  };

  return (
    <div className="container">
      <h1>アカウント作成</h1>

      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div>
          <label className="block mb-0.5" htmlFor="name">
            名前
          </label>
          <input
            className="rounded border border-slate-300"
            {...register("name", {
              required: "必須入力です",
              maxLength: {
                value: 50,
                message: "最大50文字です",
              },
            })}
            type="text"
            name="name"
            id="name"
          />
        </div>

        <div>
          <label className="block mb-0.5" htmlFor="nickname">
            ニックネーム
          </label>
          <input
            className="rounded border border-slate-300"
            {...register("nickname", {
              required: "必須入力です",
              maxLength: {
                value: 50,
                message: "最大50文字です",
              },
            })}
            type="text"
            name="nickname"
            id="nickname"
          />
        </div>

        <div>
          <label className="block mb-0.5" htmlFor="profile">
            プロフィール
          </label>
          <textarea
            className="rounded border border-slate-300"
            {...register("profile", {
              required: "必須入力です",
              maxLength: {
                value: 255,
                message: "最大255文字です",
              },
            })}
            name="profile"
            id="profile"
          />
        </div>

        <Button>アカウント作成</Button>
      </form>
    </div>
  );
};

export default CreateAccount;
