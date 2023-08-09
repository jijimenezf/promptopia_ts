import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockFetch } from "../../__mocks__/mock-fetch";
import Provider from "../../components/Provider";
import CreatePrompt from "../../app/create-prompt/page";
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
const promptUpdated = "Find a best way for handling mocks related to routes, fetch and MongoDB API";
const tagUpdated = "#ReactTestingLibrary";

describe("Create Prompt Page", () => {

  const setupTest = () => {
    return render(
      <Provider session={sessionInfo}>
        <CreatePrompt />
      </Provider>
    );
  }

  it("should render page when a new prompt would be created", async () => {
    const textToFind = /post/i;
    const { getByText } = setupTest();

    const heading = getByText(textToFind);
    expect(heading).toBeInTheDocument();
  });

  it("should create a new prompt when the data is submitted", async () => {
    window.fetch = mockFetch<Post>({prompt: promptUpdated, tag: tagUpdated, _id: "1343602570"});
    const user = userEvent.setup();
    const { getByRole, getByLabelText } = setupTest()
    const promptInput = getByLabelText(/your ai prompt/i);
    const tagInput = getByLabelText(/tag/i);

    await userEvent.type(promptInput, promptUpdated, { delay: 0.01 });
    await userEvent.type(tagInput, tagUpdated, { delay: 0.02 });
    const button = getByRole("button", { name: /create/i });
    await user.click(button);
  });
});
