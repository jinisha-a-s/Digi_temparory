// src/__tests__/components/Studentnavbar.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Studentnavbar from "../../components/Studentnavbar";
import authReducer, { logout } from "../../features/auth/authSlice";

// Mock useNavigate from react-router
const mockedUsedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });

  // spy on dispatch
  vi.spyOn(store, "dispatch");

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <Studentnavbar />
        </MemoryRouter>
      </Provider>
    ),
  };
};

describe("Studentnavbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders navbar brand text", () => {
    renderWithStore({ auth: { user: null } });
    expect(screen.getByText(/Kasadra Learning Platform/i)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderWithStore({ auth: { user: null } });
    expect(screen.getByText(/Home/i)).toHaveAttribute("href", "/student/home");
    expect(screen.getByText(/Contact us/i)).toHaveAttribute(
      "href",
      "/student/contact"
    );
  });

  it("dispatches logout and navigates on Sign Out click", () => {
    const { store } = renderWithStore({ auth: { user: { name: "Shabu" } } });

    fireEvent.click(screen.getByText(/Sign Out/i));

    expect(store.dispatch).toHaveBeenCalledWith(logout());
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/student-login");
  });
});
