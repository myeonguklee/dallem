import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Home Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", {
      name: /get started by editing/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
