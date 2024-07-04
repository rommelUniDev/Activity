import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "../components/Header";

describe("Header component", () => {
  const logo = "/fb.png";
  const menuItems = [
    { title: "Item1" },
    {
      title: "Parent",
      subMenu: {
        title: "Parent",
        items: ["Submenu1", "Submenu2"],
      },
    },
    { title: "Item3" },
  ];
  const onClick = vi.fn();

  beforeEach(() => {
    render(<Header logo={logo} menuItems={menuItems} onClick={onClick} />);
  });

  it("displays the logo with the correct alt text and src", () => {
    const logoImage = screen.getByRole("img", { name: /Logo/i });
    expect(logoImage).toBeInstanceOf(HTMLImageElement);
    expect(logoImage.getAttribute("src")).toContain("/fb.png");
  });

  it("displays the menu items", () => {
    menuItems.forEach((item) => {
      const menuItem = screen.getByText(item.title);
      expect(menuItem).toBeDefined();
    });
  });

  it("accepts a submenu and displays it on click", () => {
    const parentItem = screen.getByText("Parent");
    expect(parentItem).toBeDefined();

    fireEvent.click(parentItem);

    menuItems[1].subMenu?.items.forEach((subItem) => {
      const submenuItem = screen.getByText(subItem);
      expect(submenuItem).toBeDefined();
    });
  });

  it("executes the onClick function when the parent is clicked", () => {
    const button = screen.getByText("Button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
