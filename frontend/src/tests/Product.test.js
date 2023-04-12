import { render, screen, waitFor } from "@testing-library/react";
import Router from "react-router";
import Product from "../components/Product";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

beforeEach(() => {
  const mockResponse = {
    category_id: "1",
    base_price: 99,
    title: "test title",
    description: "test description",
    photo: null,
    stock: 11,
    discount: 0,
    discontinued: false,
    featured: false,
    id: "1",
  };

  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockResponse),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Product component", () => {
  test("shows product title", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    render(<Product />);
    await waitFor(() => {
      expect(screen.getByText("test title")).toBeInTheDocument();
    });
  });

  test("shows product description", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    render(<Product />);
    await waitFor(() => {
      expect(screen.getByText("test description")).toBeInTheDocument();
    });
  });

  test("shows product stock", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    render(<Product />);
    await waitFor(() => {
      expect(screen.getByText(/in stock/i)).toBeInTheDocument();
    });
  });

  test("shows product price", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    render(<Product />);
    await waitFor(() => {
      expect(screen.getByText(/99.00/i)).toBeInTheDocument();
    });
  });
});