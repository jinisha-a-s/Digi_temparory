// src/__tests__/Pages/InstructorSignin.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import InstructorSignin from "../../../pages/auth/InstructorSignin";
import instructorAuthReducer from "../../../features/auth/instructorAuthSlice";
import { MemoryRouter } from "react-router-dom";

// ✅ Mock the instructor login action

vi.mock("../../../features/auth/instructorAuthSlice", () => ({
    __esModule: true,
    loginInstructor: (payload) => {
        const action = { type: "LOGIN_INSTRUCTOR_TEST", payload };
        // mimic unwrap like real asyncThunk
        action.unwrap = () => Promise.resolve(payload);
        return action;
    },
    clearInstructorRegistrationState: () => ({ type: "CLEAR_INSTRUCTOR_AUTH" }),
    default: (state = { loading: false, error: null, isAuthenticated: false }, action) =>
        state,
}));

describe("InstructorSignin Page", () => {
    let store;

    const renderInstructorSignin = () => {
        store = configureStore({
            reducer: { instructorAuth: instructorAuthReducer },
            preloadedState: { instructorAuth: { loading: false, error: null, isAuthenticated: false } },
        });

        const utils = render(
            <Provider store={store}>
                <MemoryRouter>
                    <InstructorSignin />
                </MemoryRouter>
            </Provider>
        );

        return utils;
    };

    // --- UI Test
    test("renders all form fields", () => {
        renderInstructorSignin();
        expect(screen.getByTestId("input-email")).toBeInTheDocument();
        expect(screen.getByTestId("input-password")).toBeInTheDocument();
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

    // --- Validation Test: Invalid Email
    test("shows error when email is invalid", () => {
        renderInstructorSignin();

        fireEvent.change(screen.getByTestId("input-email"), {
            target: { value: "invalid-email" },
        });
        fireEvent.change(screen.getByTestId("input-password"), {
            target: { value: "StrongPass1!" },
        });

        fireEvent.click(screen.getByTestId("submit-button"));

        expect(
            screen.getByText(/Enter a valid email address/i)
        ).toBeInTheDocument();

        const state = store.getState();
        expect(state.instructorAuth.loading).toBe(false);
    });

    // --- Validation Test: Weak Password
    test("shows error when password is weak", () => {
        renderInstructorSignin();

        fireEvent.change(screen.getByTestId("input-email"), {
            target: { value: "instructor@example.com" },
        });
        fireEvent.change(screen.getByTestId("input-password"), {
            target: { value: "123" }, // weak password
        });

        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByText(/Password must be strong/i)).toBeInTheDocument();

        const state = store.getState();
        expect(state.instructorAuth.loading).toBe(false);
    });

    // --- Dispatch Test
    test("dispatches when form is valid", () => {
        renderInstructorSignin();

        fireEvent.change(screen.getByTestId("input-email"), {
            target: { value: "johninstructor@example.com" },
        });
        fireEvent.change(screen.getByTestId("input-password"), {
            target: { value: "StrongPass1!" },
        });

        fireEvent.click(screen.getByTestId("submit-button"));

        const state = store.getState();
        expect(state.instructorAuth).toBeTruthy();
    });
});
