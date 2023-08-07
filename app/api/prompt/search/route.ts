import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (request: Request) => {
  const { searchString } = await request.json();
  try {
    await connectToDB();
    const prompts = await Prompt.find({$text: {$search: searchString}}).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("There was an error getting data --> ", error);
    return new Response("Failed to get data", { status: 500 });
  }
};