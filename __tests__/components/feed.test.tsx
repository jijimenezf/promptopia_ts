import { render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feed from "../../components/Feed";
import Provider from "../../components/Provider";
import { mockFetch } from "../../__mocks__/mock-fetch";
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

describe("<Feed /> component", () => {

  it("should get data and display on screen when the user loads the page",
    async () => {
    window.fetch = mockFetch<Post>(MOCKED_POSTS);

    const { getByRole, getByLabelText, getByPlaceholderText } = render(
      <Provider
        session={{
          expires: "1",
          user: { email: "a", name: "Delta", image: "c" },
        }}
      >
        <Feed />
      </Provider>
    );
    const searchInput = getByPlaceholderText(/search/i);
    
    await userEvent.type(searchInput, "#development", { delay: 0.01 });
  });
});
