import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

jest.mock("react-mui-fileuploader", () => jest.fn());

describe("App component", () => {
  test("renders Navbar component on load", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = screen.getByLabelText(/cart/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders Home component on load", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/welcome to the shop/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders Featured component on load", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/featured products/i);
    expect(linkElement).toBeInTheDocument();
  });
});
