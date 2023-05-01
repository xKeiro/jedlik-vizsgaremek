import { render, screen, waitFor } from "@testing-library/react";
import Categories from "../components/Categories";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  const mockResponse = [
    {
      id: 1,
      title: "test title",
      description: "test description",
      imagePath: null,
    },
  ];

  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockResponse),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Categories component", () => {
  test("shows category title", async () => {
    render(<Categories />);
    await waitFor(() => {
      expect(screen.getByText("test title")).toBeInTheDocument();
    });
  });
  test("shows category description", async () => {
    render(<Categories />);
    await waitFor(() => {
      expect(screen.getByText("test description")).toBeInTheDocument();
    });
  });
});
