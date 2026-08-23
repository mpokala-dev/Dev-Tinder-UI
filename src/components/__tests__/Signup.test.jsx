import React from "react";
import "@testing-library/jest-dom";
import axios from "axios";
import { vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Signup from "../Signup";
import Login from "../Login";

const mockedNavigate = vi.fn();

vi.mock("axios");

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const renderSignup = () => {
  return render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>,
  );
};

describe("Signup Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("renders signup form", async () => {
    renderSignup();

    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/mail@site.com/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign up/i }),
    ).toBeInTheDocument();
  });

  test("submits signup successfully and navigates to login", async () => {
    axios.post.mockResolvedValue({
      status: 200,
    });

    renderSignup();

    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: "Thor" },
    });

    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: "Avengers" },
    });

    fireEvent.change(screen.getByPlaceholderText(/mail@site.com/i), {
      target: { value: "Thor@avengers.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "Thor@123A" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/signup"),
        {
          firstName: "Thor",
          lastName: "Avengers",
          email: "Thor@avengers.com",
          password: "Thor@123A",
        },
        {
          withCredentials: true,
        },
      );

      expect(mockedNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("shows server error message when signup fails", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: "Email already exists",
        },
      },
    });

    renderSignup();

    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: "Thor" },
    });

    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: "Avengers" },
    });

    fireEvent.change(screen.getByPlaceholderText(/mail@site.com/i), {
      target: { value: "Thor@avengers.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "Thor@123A" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(/Email already exists/i),
    ).toBeInTheDocument();

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  test("renders login link for existing users", async () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>,
    );

    const loginLink = screen.getByRole("link", {
      name: /existing user\? login here/i,
    });

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
