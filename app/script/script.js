import { handleVisibility, handleDefaultTheme } from "./theme.js";
import { computation } from "./computation.js";

// Set theme based on localStorage
if (localStorage.getItem("theme")) {
  console.log(localStorage.theme);
  handleDefaultTheme(localStorage.theme);
  // Set default theme
} else if (!document.body.classList.contains("")) {
  let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (dark == true) {
    handleDefaultTheme("dark");
  } else {
    handleDefaultTheme("default");
  }
}

handleVisibility();

computation();
