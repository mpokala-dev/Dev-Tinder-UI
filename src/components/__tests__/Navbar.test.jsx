import { Provider } from "react-redux";
import Navbar from "../Navbar";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { MOCK_DATA } from "../mock/mock_appStore";

const component = (
  <BrowserRouter>
    <Provider store={MOCK_DATA}>
      <Navbar />
    </Provider>
  </BrowserRouter>
);
describe("Navbar Component", () => {
  test("renders without crashing", () => {
    render(component);
  });
  test("renders with header - DevTinder and welcome label", () => {
    render(component);
    const headerElement = screen.getByText(/DevTinder/);
    expect(headerElement).toBeInTheDocument();
    const welcomeText = screen.getByText(/Welcome, Tony/);
    expect(welcomeText).toBeInTheDocument();
  });
});
