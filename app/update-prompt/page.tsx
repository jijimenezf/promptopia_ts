"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form, { Prompt as Post } from "@components/Form";
import { makeRequestToDataBase } from "@utils/makeRequest";
type JSONResponse = Post | undefined;
/*
const fetchDataFromPost = async (endpoint :string): Promise<JSONResponse> => {
  const response = await fetch(endpoint);   
  const data: JSONResponse = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(new Error(`No endpoint or data were located at ${endpoint}`));
  }
}*/
//
const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [submitting, isSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    async function fetchPost() {
      const dataFromPost = await makeRequestToDataBase<JSONResponse>(`/api/prompt/${promptId}`);
      if (dataFromPost) {
        setPost(dataFromPost);
      }
    }

    if (promptId) {
      fetchPost();
    }
  }, [promptId]);

  const updatePrompt = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    isSubmitting(true);

    if (!promptId) {
      return alert("No information was found related to a Post");
    }
    try {
      const response = await makeRequestToDataBase<Post>(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      });

      if (response._id) {  // id of the prompt that was updated
        router.push("/");
      }
    } catch (error) {
      console.error(`There was an error handling request to /api/prompt/${promptId} --->`, error);
    } finally {
      isSubmitting(false);
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt;
