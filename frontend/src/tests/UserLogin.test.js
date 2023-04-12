import { render, screen } from "@testing-library/react";
import UserLogin from "../components/User/UserLogin";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("UserLogin component", () => {
  test("has a field for username", () => {
    render(<UserLogin />);
    const field = screen.getByLabelText(/username/i);
    expect(field).toBeInTheDocument();
  });

  test("has a field for password", () => {
    render(<UserLogin />);
    const field = screen.getByLabelText(/password/i);
    expect(field).toBeInTheDocument();
  });

  test("has a button for Login", () => {
    render(<UserLogin />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
