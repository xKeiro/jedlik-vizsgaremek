import { render, screen } from "@testing-library/react";
import UserRegistration from "../components/User/UserRegistration";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("UserRegistration component", () => {
  test("has a field for username", () => {
    render(<UserRegistration />);
    const field = screen.getByLabelText(/username/i);
    expect(field).toBeInTheDocument();
  });

  test("has a field for password", () => {
    render(<UserRegistration />);
    const field = screen.getByLabelText(/your password/i);
    expect(field).toBeInTheDocument();
  });

  test("has a field for confirm password", () => {
    render(<UserRegistration />);
    const field = screen.getByLabelText(/confirm password/i);
    expect(field).toBeInTheDocument();
  });

  test("has a fields for user data", () => {
    render(<UserRegistration />);
    const firstname = screen.getByLabelText(/first name/i);
    const lastname = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    const phone = screen.getByLabelText(/phone/i);
    const address = screen.getByLabelText(/address line/i);
    const city = screen.getByLabelText(/city/i);
    const region = screen.getByLabelText(/region/i);
    expect(firstname).toBeInTheDocument();
    expect(lastname).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(region).toBeInTheDocument();
  });

  test("has a button for Register", () => {
    render(<UserRegistration />);
    const button = screen.getAllByRole("button")[1];
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/register/i);
  });
});
