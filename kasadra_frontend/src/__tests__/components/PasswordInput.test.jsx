import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PasswordInput from "../../components/PasswordInput";

describe("PasswordInput component", () => {
    const defaultProps = {
        value: "mySecret",
        onChange: vi.fn(),
        placeholder: "Enter password",
        name: "password",
        onPaste: vi.fn(),
    };

    it("renders with correct initial type and props", () => {
        render(<PasswordInput {...defaultProps} />);

        const input = screen.getByPlaceholderText(defaultProps.placeholder);
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "password");
        expect(input).toHaveValue(defaultProps.value);
        expect(input).toHaveAttribute("name", defaultProps.name);
    });

    it("toggles input type between password and text when icon clicked", () => {
        render(<PasswordInput {...defaultProps} />);

        const input = screen.getByPlaceholderText(defaultProps.placeholder);
        const toggleIcon = screen.getByTestId('toggle-password');


        // Initially type should be password
        expect(input).toHaveAttribute("type", "password");

        // Click to show password (type=text)
        fireEvent.click(toggleIcon);
        expect(input).toHaveAttribute("type", "text");

        // Click again to hide password (type=password)
        fireEvent.click(toggleIcon);
        expect(input).toHaveAttribute("type", "password");
    });

    it("calls onChange handler when input value changes", () => {
        render(<PasswordInput {...defaultProps} />);

        const input = screen.getByPlaceholderText(defaultProps.placeholder);
        fireEvent.change(input, { target: { value: "newValue" } });

        expect(defaultProps.onChange).toHaveBeenCalled();
    });

    it("calls onPaste handler when paste event occurs", () => {
        render(<PasswordInput {...defaultProps} />);

        const input = screen.getByPlaceholderText(defaultProps.placeholder);
        fireEvent.paste(input);

        expect(defaultProps.onPaste).toHaveBeenCalled();
    });
});
