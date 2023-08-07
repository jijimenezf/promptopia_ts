"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { makeRequestToDataBase } from "@utils/makeRequest";
import { Post } from "./types";
type JSONResponse = Post[] | undefined;

/** logic moved to getDataFromDB
const fetchDataFromPosts = async (endpoint: string) :Promise<JSONResponse> => {
  const response = await fetch(endpoint);
  const data: JSONResponse = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(new Error(`No endpoint or data were located at ${endpoint}`));
  }
}
*/

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [post, setPost] = useState<Post[]>([]);

  const handleSearchText = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchText(e.currentTarget.value);
  }

  useEffect(() => {
    async function fetchPosts() {
      const dataFromPost = await makeRequestToDataBase<JSONResponse>(`/api/prompt/`);
      if (dataFromPost && dataFromPost.length > 0) {
        setPost(dataFromPost);
      }
    }
    
    async function fetchPostByCustomSearch() {
      const dataFromPost = await makeRequestToDataBase<JSONResponse>(`/api/prompt/search/`,
      {
        method: 'POST',
        body: JSON.stringify({
          searchString: searchText,
        })
      });
      if (dataFromPost && dataFromPost.length > 0) {
        setPost(dataFromPost);
      }
    }

    if (searchText.length > 3) {
      fetchPostByCustomSearch();
    } else {
      fetchPosts();
    }
  }, [searchText]);

  const handleSearchByTag = (tag: string) => {
    setSearchText(tag);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchText}
          required
          className="search_input peer"
        />
      </form>

      <PrompCardList
        posts={post}
        handleTagClick={handleSearchByTag}
      />
    </section>
  );
}

const PrompCardList = ({ posts, handleTagClick }: 
  { posts: Post[],
    handleTagClick: (tag: string) => void,
  }) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

export default Feed;
