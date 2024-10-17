export const changeButtonState = (id: string, parentId: string) => {
  const parent = document.getElementById(parentId);
  const element = document.getElementById(id);
  parent?.querySelector(".selected")?.classList.remove("selected");
  element?.classList.add("selected");
};

export const translateIndicator = (id: string, selectedIndex: number) => {
  const indicator = document.getElementById(id);
  indicator?.setAttribute(
    "style",
    `transform: translateX(${selectedIndex * 100}%)`
  );
};
