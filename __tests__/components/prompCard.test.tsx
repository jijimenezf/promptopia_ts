import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PromptCard  from "../../components/PromptCard";
import Provider from "../../components/Provider";
import { Post } from "../../components/types";

const singlePost: Post = {
  prompt: "A single comment to be used for handling as a reques to any AI web solution",
  tag: "#testing",
  _id: "3891100029",
  creator: {
    image: "https://i.scdn.co/image/ab67616d00004851c96f7c7b077c224975b4c5ce",
    username: "Jose Jimenez",
    email: "jose.jimenez@yahoo.com.mx",
    _id: "1343602570",
  }
};

const sessionInfo = {
  expires: "1",
  user: {
    email: "jose.jimenez@yahoo.com.mx",
    name: "Jose Jimenez",
    image: "https://i.scdn.co/image/ab67616d00004851c96f7c7b077c224975b4c5ce",
    id: "1343602570"
  },
};

describe("<PromptCard /> component", () => {
  const spyOHandleTagClick= jest.fn();
  const spyOHandleEdit= jest.fn();
  const spyOHandleDelete= jest.fn();

  const setupTest = () => {
    return render(
      <Provider session={sessionInfo}>
        <PromptCard
          post={singlePost}
          handleTagClick={spyOHandleTagClick}
          handleEdit={spyOHandleEdit}
          handleDelete={spyOHandleDelete}
        />
      </Provider>
    );
  }
  
  it("should display data when a prompt exists in the DB", async () => {
    const user = userEvent.setup();
    const { getByTestId } = setupTest();

    const copyDiv = getByTestId("copy-div-button");
    expect(copyDiv).toBeInTheDocument();
    await user.click(copyDiv);
    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe("A single comment to be used for handling as a reques to any AI web solution");
  });

  it("should call the search when a tag is selected", async () => {
    const user = userEvent.setup();
    const { getAllByText } = setupTest();

    const searchTag = getAllByText(/#testing/i);
    expect(searchTag[0]).toBeInTheDocument();
    await user.click(searchTag[0]);
    expect(spyOHandleTagClick).toHaveBeenCalledTimes(1);
  });

  it("should call edit function when user selects that option", async () => {
    const user = userEvent.setup();
    const { getAllByText } = setupTest();

    const editPrompt = getAllByText(/edit/i);
    expect(editPrompt[0]).toBeInTheDocument();
    await user.click(editPrompt[0]);
    expect(spyOHandleEdit).toHaveBeenCalledTimes(1);
  });

  it("should call delete function when user selects that option", async () => {
    const user = userEvent.setup();
    const { getAllByText } = setupTest();

    const deletePrompt = getAllByText(/delete/i);
    expect(deletePrompt[0]).toBeInTheDocument();
    await user.click(deletePrompt[0]);
    expect(spyOHandleDelete).toHaveBeenCalledTimes(1);
  });
});
