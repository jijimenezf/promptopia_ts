import { render, screen, waitFor } from "@testing-library/react";
import Home from "../app/page";
import { Post } from "../components/types";
import { mockFetch } from "../__mocks__/mock-fetch";

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

describe('Home page', () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render Home Page when app is loaded", async () => {
    window.fetch = mockFetch<Post>(MOCKED_POSTS);
    const textToFind = /discover & share/i;
    render(<Home />);

    const heading = screen.getByText(textToFind);

    expect(heading).toBeInTheDocument();
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith("/api/prompt/", undefined);
    })
    expect(window.fetch).toHaveBeenCalledTimes(1);
    
  });
  
});
