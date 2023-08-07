import Link from "next/link";
import { ChangeEvent } from "react";
import { FormProps, Post } from "./types";

export type Prompt = Post;

const Form = ({ type, post, setPost, submitting, handleSubmit } : FormProps) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left"><span className="blue_gradient">{type}</span> Post</h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing propmts with the world, and let your imagination run wild with AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setPost({
              ...post,
              prompt: event.target.value,
            })}
            placeholder="Write your promt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">(#product, #webdevelopment, #idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPost({
              ...post,
              tag: event.target.value,
            })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 my-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            >
            { submitting ? `${type}ing...` : `${type}` }
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
