"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { makeRequestToDataBase } from "@utils/makeRequest";
import { Post } from "@components/types";
type JSONResponse = Post[] | undefined;

/**
const fetchDataFromPosts = async (endpoint: string): Promise<JSONResponse> => {
  const response = await fetch(endpoint);
  const data: JSONResponse = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(new Error(`No endpoint or data were located at ${endpoint}`));
  }
}
*/

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  
  const handleDelete = async (prompt: Post) => {
    const isConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (isConfirmed) {
      try {
        const response = await makeRequestToDataBase<{result: boolean, message: string}>(`/api/prompt/${prompt?._id}`, {
          method: 'DELETE'
        });
  
        if (response.result) {  // result of the operation
          const filteredPost = posts.filter((p) => p._id !== prompt._id);
          setPosts(filteredPost);
          alert(response.message);
        }
      } catch (error) {
        console.error("There was an error submitting the data -->", error);
      }

    }
  };

  useEffect(() => {
    async function fetchPosts() {
      const endpoint = `/api/users/${session.user.id}/posts`;
      const dataFromPost = await makeRequestToDataBase<JSONResponse>(endpoint);
      if (dataFromPost && dataFromPost.length > 0) {
        setPosts(dataFromPost);
      }
    }

    if (session?.user && session?.user.id) {
      fetchPosts();
    }
  }, [session?.user]);

  return (
    <div>
      <Profile
        name="My"
        description="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>)
}

export default ProfilePage;
