import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockFetch } from "../../__mocks__/mock-fetch";
import UpdatePrompt from "../../app/update-prompt/page";
import { Post } from "../../components/types";

const MOCKED_POSTS: Post = {
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

describe("Update Prompt Page", () => {
  const setupTest = () => {
    return render(<UpdatePrompt />);
  }

  const alertMock = jest.spyOn(window,'alert').mockImplementation();

  it("should update prompt when a post is selected", async () => {
    const user = userEvent.setup();
    window.fetch = mockFetch<Post>(MOCKED_POSTS);
    //const promptUpdated = "Find a best way for handling mocks related to routes, fetch and MongoDB API";
    const tagUpdated = "#ReactTestingLibrary";

    const { getByRole, getByLabelText, getByTestId } = setupTest();
    //const promptInput = getByLabelText(/your ai prompt/i);
    const tagInput = getByLabelText(/tag/i);
    //await userEvent.type(promptInput, promptUpdated, { delay: 0.01 });
    await userEvent.type(tagInput, tagUpdated, { delay: 0.02 });

    const button = getByRole("button", { name: /edit/i });
    await user.click(button);

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith("/api/prompt/3891100029", {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: "A single comment to be used for handling as a reques to any AI web solution",
          tag: `#testing${tagUpdated}`,
        })
      });
    })
  });
});
