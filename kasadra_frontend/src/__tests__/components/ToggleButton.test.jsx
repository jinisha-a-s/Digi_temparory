import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ToggleButton from "../../components/ToggleButton";

// Mock useNavigate to track navigation calls
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("ToggleButton component", () => {
    afterEach(() => {
        mockNavigate.mockReset();
    });

    it("renders both buttons", () => {
        render(
            <MemoryRouter initialEntries={["/student-signup"]}>
                <ToggleButton />
            </MemoryRouter>
        );

        expect(screen.getByText("Student")).toBeInTheDocument();
        expect(screen.getByText("Instructor")).toBeInTheDocument();
    });

    it("activates the Student button on /student-signup path", () => {
        render(
            <MemoryRouter initialEntries={["/student-signup"]}>
                <ToggleButton />
            </MemoryRouter>
        );
        const studentBtn = screen.getByText("Student");
        const instructorBtn = screen.getByText("Instructor");

        expect(studentBtn).toHaveClass("active");
        expect(instructorBtn).not.toHaveClass("active");
    });

    it("activates the Instructor button on /instructor-signup path", () => {
        render(
            <MemoryRouter initialEntries={["/instructor-signup"]}>
                <ToggleButton />
            </MemoryRouter>
        );
        const studentBtn = screen.getByText("Student");
        const instructorBtn = screen.getByText("Instructor");

        expect(instructorBtn).toHaveClass("active");
        expect(studentBtn).not.toHaveClass("active");
    });

    it("calls navigate with '/student-signup' when Student button is clicked", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <ToggleButton />
            </MemoryRouter>
        );
        const studentBtn = screen.getByText("Student");
        fireEvent.click(studentBtn);
        expect(mockNavigate).toHaveBeenCalledWith("/student-signup");
    });

    it("calls navigate with '/instructor-signup' when Instructor button is clicked", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <ToggleButton />
            </MemoryRouter>
        );
        const instructorBtn = screen.getByText("Instructor");
        fireEvent.click(instructorBtn);
        expect(mockNavigate).toHaveBeenCalledWith("/instructor-signup");
    });
});
