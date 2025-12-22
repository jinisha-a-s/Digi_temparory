// src/__tests__/Pages/Signup.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Signup from "../../../pages/auth/Signup";
import authReducer from "../../../features/auth/authSlice";
import { MemoryRouter } from "react-router-dom";

// Mock the thunk/action
// vi.mock("../../redux/actions/studentAuthActions", () => ({
//   registerStudent: (payload) => ({ type: "REGISTER_STUDENT_TEST", payload }),
// }));


vi.mock("../../../features/auth/authSlice", () => ({
  __esModule: true,
  // mock registerStudent thunk
  registerStudent: (payload) => {
    const action = { type: "REGISTER_STUDENT_TEST", payload };
    action.unwrap = () => Promise.resolve(payload); // mimic .unwrap()
    return action;
  },
  // mock clearAuthState (used in cleanup if needed)
  clearAuthState: () => ({ type: "CLEAR_AUTH_STATE_TEST" }),

  // mock reducer (default export)
  default: (state = { isLoading: false, error: null }, action) => {
    switch (action.type) {
      case "REGISTER_STUDENT_TEST":
        return { ...state, isLoading: true };
      case "CLEAR_AUTH_STATE_TEST":
        return { isLoading: false, error: null };
      default:
        return state;
    }
  },
}));


describe("Signup Page", () => {
  let store;
  const renderSignup = () => {
    store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: { isLoading: false, error: null } },
    });

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );
  };

  // --- UI Test
  test("renders all form fields", () => {
    renderSignup();
    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-phone")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("input-confirm-password")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });


  // --- Validation: Empty Fields
  test("shows error when fields are empty", () => {
    renderSignup();
    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Please fill all the fields"
    );
  });

  // --- Validation: Invalid Email
  test("shows error when email is invalid", () => {
    renderSignup();

    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("input-phone"), { target: { value: "9876543210" } });
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "invalid-email" } });
    fireEvent.change(screen.getByTestId("input-password"), { target: { value: "StrongPass1!" } });
    fireEvent.change(screen.getByTestId("input-confirm-password"), { target: { value: "StrongPass1!" } });

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Enter a valid email address"
    );
  });

  // --- Validation: Invalid Phone
  test("shows error when phone is invalid", () => {
    renderSignup();

    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("input-phone"), { target: { value: "12345" } });
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("input-password"), { target: { value: "StrongPass1!" } });
    fireEvent.change(screen.getByTestId("input-confirm-password"), { target: { value: "StrongPass1!" } });

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Enter a valid 10-digit phone number"
    );
  });

  // --- Validation: Weak Password
  test("shows error when password is weak", () => {
    renderSignup();

    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("input-phone"), { target: { value: "9876543210" } });
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("input-password"), { target: { value: "123" } });
    fireEvent.change(screen.getByTestId("input-confirm-password"), { target: { value: "123" } });

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Password must be at least 8 characters"
    );
  });

  // --- Validation: Password Mismatch
  test("shows error when passwords mismatch", () => {
    renderSignup();

    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("input-phone"), { target: { value: "9876543210" } });
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("input-password"), { target: { value: "StrongPass1!" } });
    fireEvent.change(screen.getByTestId("input-confirm-password"), { target: { value: "WrongPass1!" } });

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Passwords do not match"
    );
  });

  // --- Dispatch Test: Valid Form
  test("dispatches when form is valid", () => {
    renderSignup();

    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("input-phone"), { target: { value: "9876543210" } });
    fireEvent.change(screen.getByTestId("input-password"), { target: { value: "StrongPass1!" } });
    fireEvent.change(screen.getByTestId("input-confirm-password"), { target: { value: "StrongPass1!" } });

    fireEvent.click(screen.getByTestId("submit-button"));

    const state = store.getState();
    expect(state.auth).toBeTruthy();
  });
});
