import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Sidebar from "../Sidebar";

describe("Sidebar", () => {
  it("renders correctly when open", () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Solutions")).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
  });

  it("renders limited content when closed", () => {
    render(<Sidebar isOpen={false} />);
    // In closed mode, text labels for Home/Solutions/Docs are hidden (screen reader text or aria-label stays)
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });
});
