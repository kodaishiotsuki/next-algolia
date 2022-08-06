import React, { ReactNode, useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  Configure,
  Hits,
  HitsProps,
  InstantSearch,
  Pagination,
  SearchBox,
  SearchBoxProps,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { Post } from "../types/post";
import { debounce } from "debounce";
import { SearchIcon } from "@heroicons/react/outline";
import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { User } from "../types/user";
import useSWR from "swr/immutable";

const searchClient = algoliasearch(
  "DIISLEFUBA",
  "2acfde0ff90e4f656cf588b4d8fc7477"
);

const Hit: HitsProps<Post>["hitComponent"] = ({ hit }) => {
  //SWR
  const { data:user } = useSWR<User>(
    hit.authorId && `users/${hit.authorId}`, //第一引数にデータの保管場所を定義
    async () => {
      console.log("データ取得")
      const ref = doc(db, `users/${hit.authorId}`);
      const snap = await getDoc(ref); //await→この処理をするまで次に行かない
      return snap.data() as User;
    }
  );

  return (
    <div className="rounded-md shadow p-4">
      <h2> {hit.title}</h2>
      <p className="text-slate-500">
        {format(hit.createdAt, "yyyy年MM月dd日")}
      </p>
      {/* useSWR */}
      {user && <p>{user.name}</p>}
    </div>
  );
};

const NoResultsBoundary = ({ children }: { children: ReactNode }) => {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return <p>「{results.query}」検索結果はありませんでした...</p>;
  }
  return (
    <div>
      {results.query && (
        <p className="text-sm text-slate-500 my-4">
          「{results.query}」の検索結果が{results.nbHits}件見つかりました!!
        </p>
      )}
      {children}
    </div>
  );
};

const Search = () => {
  const search: SearchBoxProps["queryHook"] = (query, hook) => {
    hook(query);
  };

  return (
    <div className="container">
      <h1>検索</h1>
      <InstantSearch indexName="posts" searchClient={searchClient}>
        <SearchBox
          queryHook={debounce(search, 500)}
          classNames={{
            submitIcon: "hidden",
            resetIcon: "hidden",
            input: "rounded-full border-slate-300 pr-10",
            root: "relative inline-block",
          }}
          submitIconComponent={() => (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 p-2">
              <SearchIcon className="w-5 h-5 text-slate-500" />
            </div>
          )}
        />
        <Configure hitsPerPage={10} />
        <NoResultsBoundary>
          <Hits<Post>
            hitComponent={Hit}
            classNames={{
              list: "space-y-4 my-6",
            }}
          />
          <Pagination
            classNames={{
              list: "flex space-x-1",
              link: "py-1 px-3 block",
              disabledItem: "opacity-40",
              selectedItem: "text-blue-500",
            }}
          />
        </NoResultsBoundary>
      </InstantSearch>
    </div>
  );
};

export default Search;
