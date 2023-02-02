const inputs = document.querySelectorAll(`input[type="radio"]`);

// Set default theme
if (!document.body.classList.contains("")) {
  let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (dark == true) {
    handleDefaultTheme("dark");
  } else {
    handleDefaultTheme("default");
  }
}

inputs.forEach((input) => {
  input.addEventListener("mouseenter", () => {
    if (!input.checked) {
      inputs.forEach((input) => {
        // Handle default states
        invisible(input);
      });
      // Add visibility to hovering input
      visible(input);
    }
  });

  input.addEventListener("mouseleave", () => {
    if (!input.checked) {
      // Remove visibility from input
      invisible(input);
    }
    inputs.forEach((input) => {
      if (input.checked) {
        // Add visibility to checked input
        visible(input);
      }
    });
  });

  input.addEventListener("change", () => {
    inputs.forEach((input) => invisible(input));

    if (input.checked) {
      visible(input);
    } else {
      invisible(input);
    }
  });

  input.addEventListener("click", (e) => {
    inputs.forEach((input) => input.removeAttribute("checked"));
    e.target.setAttribute("checked", "");

    const bodyClassList = document.body.classList;
    bodyClassList.remove(bodyClassList);

    themeMode = input.dataset.theme;
    bodyClassList.add(themeMode);
    input.setAttribute("checked", "");
  });
});

function visible(element) {
  element.classList.remove("invisible");
  element.classList.add("visible");
}

function invisible(element) {
  element.classList.add("invisible");
  element.classList.remove("visible");
}

function handleDefaultTheme(themeClass) {
  document.body.classList.add(themeClass);
  inputs.forEach((input) => {
    if ((input.dataset.theme === themeClass) === true) {
      input.setAttribute("checked", "");
      input.classList.add("visible");
    }
  });
}
