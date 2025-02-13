export const changeButtonState = (id: string, parentId: string) => {
  const parent = document.getElementById(parentId);
  const currentSelectedElement = parent?.querySelector(".selected");
  currentSelectedElement?.setAttribute("aria-selected", "false");
  currentSelectedElement?.classList.remove("selected");
  currentSelectedElement?.setAttribute("tabindex", "0");

  const elementToSelect = document.getElementById(id);
  elementToSelect?.classList.add("selected");
  elementToSelect?.blur();
  elementToSelect?.setAttribute("aria-selected", "true");
  elementToSelect?.setAttribute("tabindex", "-1");
};

export const translateIndicator = (id: string, selectedIndex: number) => {
  const indicator = document.getElementById(id);
  indicator?.setAttribute(
    "style",
    `transform: translateX(${selectedIndex * 100}%)`,
  );
};
