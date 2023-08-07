import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (request: Request, response: Response) => {
  const { userId, prompt, tag } = await request.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    })

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
    
  } catch (error) {
    console.log("There was an error attempting to create a new prompt --> ", error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
}
