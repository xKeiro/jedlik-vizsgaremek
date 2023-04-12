import { render, screen, waitFor } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockProduct = {
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

afterEach(() => {
  jest.restoreAllMocks();
});

describe("ProductCard component", () => {
  test("shows product title", async () => {
    render(<ProductCard product={mockProduct} />);
    await waitFor(() => {
      expect(screen.getByText("test title")).toBeInTheDocument();
    });
  });

  test("shows product stock", async () => {
    render(<ProductCard product={mockProduct} />);
    await waitFor(() => {
      expect(screen.getByText(/in stock/i)).toBeInTheDocument();
    });
  });

  test("shows product price", async () => {
    render(<ProductCard product={mockProduct} />);
    await waitFor(() => {
      expect(screen.getByText(/99.00/i)).toBeInTheDocument();
    });
  });
});
