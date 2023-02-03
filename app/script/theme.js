const inputs = document.querySelectorAll(`input[type="radio"]`);

export function handleVisibility() {
  inputs.forEach((input) => {
    // Handle visibility on hovering inputs when mouse enter
    input.addEventListener("mouseenter", () => {
      if (!input.checked) {
        inputs.forEach((input) => {
          invisible(input);
        });
        visible(input);
      }
    });

    // Handle visibility when mouse leave hovering inputs
    input.addEventListener("mouseleave", () => {
      if (!input.checked) {
        invisible(input);
      }
      inputs.forEach((input) => {
        if (input.checked) {
          visible(input);
        }
      });
    });

    // Handle visibility of theme on change
    input.addEventListener("change", () => {
      inputs.forEach((input) => invisible(input));

      if (input.checked) {
        visible(input);
      } else {
        invisible(input);
      }
    });

    // Handle change of theme and checked status when input is clicked
    input.addEventListener("click", (e) => {
      inputs.forEach((input) => input.removeAttribute("checked"));
      e.target.setAttribute("checked", "");

      const bodyClassList = document.body.classList;
      bodyClassList.remove(bodyClassList);

      const themeMode = input.dataset.theme;
      bodyClassList.add(themeMode);
      input.setAttribute("checked", "");

      localStorage.setItem("theme", themeMode);
    });
  });

  function visible(element) {
    element.classList.remove("invisible");
    element.classList.add("visible");
  }
}

function invisible(element) {
  element.classList.add("invisible");
  element.classList.remove("visible");
}

export function handleDefaultTheme(themeClass) {
  document.body.classList.add(themeClass);
  inputs.forEach((input) => {
    if ((input.dataset.theme === themeClass) === true) {
      input.setAttribute("checked", "");
      input.classList.add("visible");
    }
  });
}
