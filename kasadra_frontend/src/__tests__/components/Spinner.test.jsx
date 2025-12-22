// src/components/__tests__/Spinner.test.jsx

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Spinner from "../../components/Spinner"; // adjust path if needed

describe("Spinner Component", () => {
  it("should render the spinner", () => {
    render(<Spinner />);
    
    // Check if the spinner div exists using data-testid
    const spinnerElement = screen.getByTestId("loading-spinner");
    expect(spinnerElement).toBeInTheDocument();
    
    // Optional: check if the accessibility text exists
    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
  });
});
