import Login from "../Login";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, BrowserRouter, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios");

describe("Login Component", () => {
  test("renders on successful sign-up", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Login />
        </Provider>
      </BrowserRouter>,
    );
    const headerTitle = screen.getByRole("heading", { name: "LOGIN" });
    expect(headerTitle).toBeInTheDocument();
  });
  test("should render email, password input fields and login button", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Login />
        </Provider>
      </BrowserRouter>,
    );
    const emailInput = screen.getByPlaceholderText("mail@site.com");
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
    const loginBtn = screen.getByRole("button", { name: "Login" });
    expect(loginBtn).toBeInTheDocument();
  });
  test("should fire email, password input change events and login button click event", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Login />
        </Provider>
      </BrowserRouter>,
    );
    fireEvent.change(screen.getByPlaceholderText("mail@site.com"), {
      target: { value: "tony@avenger.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Tony@123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
  });
  test("should call axios.post on login button click", async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: {
        firstName: "Tony",
        lastName: "Stark",
        email: "tony@avenger.com",
      },
    });

    const LocationDisplay = () => {
      const location = useLocation();
      return <div data-testid="location-display">{location.pathname}</div>;
    };

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Provider store={appStore}>
          <Login />
          <LocationDisplay />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("location-display")).toHaveTextContent("/login");

    fireEvent.change(screen.getByPlaceholderText("mail@site.com"), {
      target: { value: "tony@avenger.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Tony@123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    await act(async () => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/login",
        { email: "tony@avenger.com", password: "Tony@123" },
        { withCredentials: true },
      );
    });
    // console.log("store state", appStore.getState());
    expect(appStore.getState().user).toEqual({
      firstName: "Tony",
      lastName: "Stark",
      email: "tony@avenger.com",
    });

    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
  });
});
