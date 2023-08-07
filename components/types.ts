export type Creator = {
  image: string;
  username: string;
  email: string;
  _id?: string;
}

export type Post = {
  prompt: string;
  tag: string;
  _id?: string;
  creator?: Creator;
}

export type FormProps = {
  type: "Create" | "Edit",
  post: Post,
  setPost: (post: Post) => void,
  submitting: boolean,
  handleSubmit: (event: React.SyntheticEvent) => Promise<void>,
}

