import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile  from "../../components/Profile";
import Provider from "../../components/Provider";
import { Post } from "../../components/types";

const MOCKED_POSTS: Post[] = [
  {
    prompt: "A single comment to be used for handling as a reques to any AI web solution",
    tag: "#testing",
    _id: "3891100029",
    creator: {
      image: "https://i.scdn.co/image/ab67616d00004851c96f7c7b077c224975b4c5ce",
      username: "Jose Jimenez",
      email: "jose.jimenez@yahoo.com.mx",
      _id: "1343602570",
    }
  },
  {
    prompt: "Another great idea for exploring the progresss in web technologies",
    tag: "#development",
    _id: "8761458829",
    creator: {
      image: "https://i.scdn.co/image/ab67616d00001e02015c484a7aca592df1a77828",
      username: "Jose Jimenez",
      email: "jose.jimenez@yahoo.com.mx",
      _id: "1343602570",
    }
  },
];

const sessionInfo = {
  expires: "1",
  user: {
    email: "jose.jimenez@yahoo.com.mx",
    name: "Jose Jimenez",
    image: "https://i.scdn.co/image/ab67616d00004851c96f7c7b077c224975b4c5ce",
    id: "1343602570"
  },
};

describe("<Profile/> Component", () => {

  const spyOnHandleEdit = jest.fn();
  const spyOnHandleDelete = jest.fn();

  const setupTest = () => render(
    <Provider session={sessionInfo}>
      <Profile
        name="My"
        description="Profile page"
        data={MOCKED_POSTS}
        handleEdit={spyOnHandleEdit}
        handleDelete={spyOnHandleDelete}
      />
    </Provider>
  );

  it("should display profile page when the user click on that option", () => {
    const { getByText } = setupTest();
    const textToFind = /my profile/i;
    const heading = getByText(textToFind);
    expect(heading).toBeInTheDocument();
  });

  it("should call edit function when user selects that option", async () => {
    const user = userEvent.setup();
    const { getAllByText } = setupTest();

    const editPrompt = getAllByText(/edit/i);
    await user.click(editPrompt[0]);
    expect(spyOnHandleEdit).toHaveBeenCalledTimes(1);
  });

  it("should call delete function when user selects that option", async () => {
    const user = userEvent.setup();
    const { getAllByText } = setupTest();

    const deletePrompt = getAllByText(/delete/i);
    await user.click(deletePrompt[0]);
    expect(spyOnHandleDelete).toHaveBeenCalledTimes(1);
  });
});
