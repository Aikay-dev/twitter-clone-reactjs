import { render, screen } from "@testing-library/react";
import ProfilePage from "../ProfilePage";
import { it, expect } from "vitest";

it("should load up the profilepage correctly", () => {
  render(<ProfilePage />);
  const element = screen.queryByText(/Tweets/i);
  expect(element).toBeVisible();
});
