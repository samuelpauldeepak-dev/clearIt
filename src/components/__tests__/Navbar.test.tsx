import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navbar from "../Navbar";
import { ThemeProvider } from "../ThemeProvider";

// Mock theme provider since we use its hook
vi.mock("../ThemeProvider", async () => {
  const actual = (await vi.importActual("../ThemeProvider")) as any;
  return {
    ...actual,
    useTheme: () => ({
      theme: "light",
      setTheme: vi.fn(),
    }),
  };
});

describe("Navbar", () => {
  it("renders the logo correctly", () => {
    render(<Navbar sidebarOpen={true} setSidebarOpen={() => {}} />);
    expect(screen.getByText("ClearIt")).toBeInTheDocument();
  });

  it("calls setSidebarOpen when menu button is clicked", () => {
    const setSidebarOpen = vi.fn();
    render(<Navbar sidebarOpen={true} setSidebarOpen={setSidebarOpen} />);

    const menuButton = screen.getByLabelText("Close sidebar");
    fireEvent.click(menuButton);
    expect(setSidebarOpen).toHaveBeenCalledWith(false);
  });
});
