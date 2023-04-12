import { render, screen, waitFor } from "@testing-library/react";
import CategoryBar from "../components/CategoryBar";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  const mockResponse = {
    categories: [
      {
        id: "1",
        title: "test title",
        description: "test description",
        photo: null,
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

describe("Categories component", () => {
  test("shows category title", async () => {
    render(<CategoryBar />);
    await waitFor(() => {
      expect(screen.getByText("test title")).toBeInTheDocument();
    });
  });
});
