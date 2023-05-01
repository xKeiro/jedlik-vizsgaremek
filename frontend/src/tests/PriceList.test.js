import { render, screen, waitFor } from "@testing-library/react";
import PriceList from "../components/PriceList";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  const mockResponse = {
    nextPage: 2,
    products: [
      {
        categoryId: 1,
        basePrice: 99,
        title: "test title",
        description: "test description",
        imagePath: null,
        stock: 11,
        discount: 0,
        discontinued: false,
        featured: false,
        id: 1,
      },
    ],
  };

  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockResponse),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Category component", () => {
  test("shows product title", async () => {
    render(<PriceList />);
    await waitFor(() => {
      expect(screen.getByText("test title")).toBeInTheDocument();
    });
  });

  test("shows product stock", async () => {
    render(<PriceList />);
    await waitFor(() => {
      expect(screen.getByText(/in stock/i)).toBeInTheDocument();
    });
  });

  test("shows product price", async () => {
    render(<PriceList />);
    await waitFor(() => {
      expect(screen.getByText(/99/i)).toBeInTheDocument();
    });
  });
});
