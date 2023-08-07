"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { makeRequestToDataBase } from "@utils/makeRequest";
import Form, { Prompt as Post } from "@components/Form";

const CreatePrompt = () => {
  const [submitting, isSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: '',
    tag: '',
  });
  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    isSubmitting(true);
    try {
      const result = await makeRequestToDataBase<Post>('/api/prompt/new',
      {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id ,
          tag: post.tag,
        })
      });
      /** const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id ,
          tag: post.tag,
        })
      }).then(); */

      if (result._id) {  // The Post was created
        router.push("/");
      }
    } catch (error) {
      console.error("There was an error submitting the data -->", error);
    } finally {
      isSubmitting(false);
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt;
