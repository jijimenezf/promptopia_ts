
import PromptCard from "./PromptCard";
import { Post } from "./types";

type ProfileProps = {
  name: string;
  description: string;
  data: Post[];
  handleEdit: (post: Post) => void,
  handleDelete: (post: Post) => void;
}

const Profile = ({ name, description, data, handleEdit, handleDelete }: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => {handleEdit(post)}}
            handleDelete={() => {handleDelete(post)}}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;
