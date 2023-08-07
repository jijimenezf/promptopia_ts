import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
//import type { NextApiRequest, NextApiResponse } from 'next';
/*import { Post } from "@components/types";
type ResponseData = {
  posts: Post[],
  error?: string,
}*/

export const GET = async (request: Request, { params }: { params: { id: string }}) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("There was an error getting data from posts --> ", error);
    return new Response("Failed to get data", { status: 500 });
  }
};