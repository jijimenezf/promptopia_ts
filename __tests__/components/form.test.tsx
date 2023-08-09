import { render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../../components/Form";

describe("<Form/> Component", () => {

  it("should display the component and handle the callbacks when user interacts with the input fields", 
    async () => {
    const spyOnSetPost = jest.fn();
    const spyhOnHandleSubmit = jest.fn();
    const promptUpdated = "Find a best way for handling mocks related to routes, fetch and MongoDB API";
    const tagUpdated = "#ReactTestingLibrary";
    const { getByRole, getByLabelText, getByTestId } = render(
      <Form
        type="Create"
        post={{
          prompt: "",
          tag: "",
        }}
        setPost={spyOnSetPost}
        submitting={false}
        handleSubmit={spyhOnHandleSubmit}
      />);

      const promptInput = getByLabelText(/your ai prompt/i);
      const tagInput = getByLabelText(/tag/i);

      await userEvent.type(promptInput, promptUpdated, { delay: 0.01 });
      expect(spyOnSetPost).toHaveBeenCalled();
      await userEvent.type(tagInput, tagUpdated, { delay: 0.02 });
      expect(spyOnSetPost).toHaveBeenCalled();

      const button = getByRole("button", { name: /create/i });
      expect(button.hasAttribute("disabled")).toEqual(false);
      userEvent.click(button);
      fireEvent.submit(getByTestId("form"));
      expect(spyhOnHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
