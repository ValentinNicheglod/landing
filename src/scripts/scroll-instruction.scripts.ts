let instructions: HTMLElement | null;
let timeout: NodeJS.Timeout;

const showInstructions = () => {
  instructions?.classList.remove("invisible");
  instructions?.classList.add(
    "animate-duration-1000",
    window.innerWidth > 768 ? "animate-jump-in" : "animate-fade"
  );
};

const clearInstructions = () => {
  clearTimeout(timeout);
  instructions?.classList.remove("animate-jump-in");
  instructions?.classList.add("animate-reverse", "animate-fade");
  window.removeEventListener("scroll", clearInstructions);
};

document.addEventListener("DOMContentLoaded", () => {
    instructions = document.getElementById("instructions");
    timeout = setTimeout(showInstructions, 5000);
    window.addEventListener("scroll", clearInstructions);
});
