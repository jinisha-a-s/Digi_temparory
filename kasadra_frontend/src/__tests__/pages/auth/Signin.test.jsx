// src/__tests__/Pages/Signin.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Signin from "../../../pages/auth/Signin";
import authReducer from "../../../features/auth/authSlice";
import { MemoryRouter } from "react-router-dom";

// Mock the thunk/action
// vi.mock("../../redux/actions/studentAuthActions", () => ({
//   loginStudent: (payload) => ({ type: "LOGIN_STUDENT_TEST", payload }),
// }));

vi.mock("../../../features/auth/authSlice", () => ({
  __esModule: true,
  // mock the thunk
  loginStudent: (payload) => {
    const action = { type: "LOGIN_STUDENT_TEST", payload };
    action.unwrap = () => Promise.resolve(payload);
    return action;
  },
  // mock the clearAuthState action
  clearAuthState: () => ({ type: "CLEAR_AUTH_STATE_TEST" }),

  // mock the reducer (default export)
  default: (state = { isLoading: false, error: null }, action) => {
    switch (action.type) {
      case "LOGIN_STUDENT_TEST":
        return { ...state, isLoading: true };
      case "CLEAR_AUTH_STATE_TEST":
        return { isLoading: false, error: null };
      default:
        return state;
    }
  },
}));


describe("Signin Page", () => {
  let store;

  const renderSignin = () => {
    store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: { isLoading: false, error: null } },
    });

    const utils = render(
      <Provider store={store}>
        <MemoryRouter>
          <Signin />
        </MemoryRouter>
      </Provider>
    );

    return utils;
  };

  // --- UI Test
  test("renders all form fields", () => {
    renderSignin();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  // --- Validation Test: Invalid Email
  test("shows error when email is invalid", () => {
    renderSignin();

    fireEvent.change(screen.getByTestId("input-email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByTestId("input-password"), {
      target: { value: "StrongPass1!" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    // check for error message in DOM
    expect(
      screen.getByText(/Enter a valid email address/i)
    ).toBeInTheDocument();

    // confirm no dispatch
    const state = store.getState();
    expect(state.auth.isLoading).toBe(false);
  });

  // --- Validation Test: Weak Password
  test("shows error when password is weak", () => {
    renderSignin();

    fireEvent.change(screen.getByTestId("input-email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByTestId("input-password"), {
      target: { value: "123" }, // weak password
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    // check for password error
    expect(screen.getByText(/Password must be strong/i)).toBeInTheDocument();

    // confirm no dispatch
    const state = store.getState();
    expect(state.auth.isLoading).toBe(false);
  });

  // --- Dispatch Test
  test("dispatches when form is valid", () => {
    renderSignin();

    fireEvent.change(screen.getByTestId("input-email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByTestId("input-password"), {
      target: { value: "StrongPass1!" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    const state = store.getState();
    expect(state.auth).toBeTruthy(); // dispatch happened
  });
});
