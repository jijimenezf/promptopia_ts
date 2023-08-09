import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockFetch } from "../../__mocks__/mock-fetch";
import Profile from "../../app/profile/page";
import Provider from "../../components/Provider";
import { Post } from "../../components/types";

const sessionInfo = {
  expires: "1",
  user: {
    email: "jose.jimenez@yahoo.com.mx",
    name: "Jose Jimenez",
    image: "https://i.scdn.co/image/ab67616d00004851c96f7c7b077c224975b4c5ce",
    id: "1343602570"
  },
};

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

describe("Profile Page", () => {
  const setupTest = () => {
    return render(
      <Provider session={sessionInfo}>
        <Profile />
      </Provider>
    );
  }

  const confirmMock = jest.spyOn(window,'confirm').mockImplementation(() => true);

  it("should renders profile page when user wants to check profile info", async () => {
    window.fetch = mockFetch<Post[]>(MOCKED_POSTS);

    const textToFind = /welcome/i;
    const { getByText } = setupTest();
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith("/api/users/1343602570/posts", undefined);
    })
    const description = getByText(textToFind);
    expect(description).toBeInTheDocument();

  });

  it("should call delete function when user selects that option", async () => {
    window.fetch = mockFetch<Post[]>(MOCKED_POSTS);
    const user = userEvent.setup();
    const { getAllByText } = setupTest();

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith("/api/users/1343602570/posts", undefined);
    })

    const deletePrompt = getAllByText(/delete/i);
    await user.click(deletePrompt[0]);
    expect(confirmMock).toHaveBeenCalled();

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith("/api/prompt/3891100029", {
        method: 'DELETE'
      });
    })
  });

  it("should call edit function when user selects that option", async () => {
    window.fetch = mockFetch<Post[]>(MOCKED_POSTS);
    const user = userEvent.setup();
    const { getAllByText } = setupTest();

    await waitFor(async () => {
      const editPrompt = getAllByText(/edit/i);
      await user.click(editPrompt[0]);
    });

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith("/api/users/1343602570/posts", undefined);
    })
    
  });

});
