import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

type Params = { params: { id: string }};

// GET (read)
export const GET = async (request: Request, { params }: Params) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) {
      return new Response("Prompt not found", { status: 400 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log("There was an error getting data from posts --> ", error);
    return new Response("Failed to get data", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request: Request, { params }: Params) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const result = await Prompt.findById(params.id).populate('creator');
    if (!result) {
      return new Response("Prompt not found", { status: 400 });
    }
    result.prompt = prompt;
    result.tag = tag;
    
    await result.save();
    return new Response(JSON.stringify(result), { status: 200 });

  } catch (error) {
    console.log("There was an error getting data from posts --> ", error);
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (request: Request, { params }: Params) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id).populate('creator');
    return new Response(JSON.stringify({
      result: true,
      message: "Prompt deleted successfully"
    }), { status: 200 });
    
  } catch (error) {
    console.log("There was deleting the prompt --> ", error);
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};

