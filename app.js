(function () {
  const buttonSubmit = document.querySelector(".btn-primary");
  const container = document.querySelector(".cardContainer");
  const form = document.forms["toDoList"];
  const header = document.querySelector(".navbar");
  const body = document.body;

  const light = document.querySelector(".light");
  const grey = document.querySelector(".grey");
  const dark = document.querySelector(".dark");

  let lastSelectedTheme = localStorage.getItem("color") || "grey";
  setThemeColor(lastSelectedTheme);

  light.addEventListener("click", function () {
    changeTheme(light);
  });

  grey.addEventListener("click", function () {
    changeTheme(grey);
  });

  dark.addEventListener("click", function () {
    changeTheme(dark);
  });

  function changeTheme(colorTheme) {
    const isConfirm = confirm("Change theme?");

    if (isConfirm) {
      const colorById = colorTheme.id;
      setThemeColor(colorById);
    }
  }

  function setThemeColor(colorById) {
    localStorage.setItem(`color`, colorById);

    if (colorById === "black") {
      header.style.setProperty("--form-text-color", "white");
		body.style.setProperty("--bg-color", "#9EA2A9")
    } else if (colorById === "grey") {
      header.style.setProperty("--form-text-color", "white");
		body.style.setProperty("--bg-color", "#c7c7c7")
    } else if (colorById === "white") {
      header.style.setProperty("--form-text-color", "black");
		body.style.setProperty("--bg-color", "#fff");
    }

    header.style.setProperty("--form-color", colorById);
  }

  buttonSubmit.addEventListener("click", (e) => {
    const title = document.getElementById("form-header").value;
    const body = document.getElementById("form-text").value;

    e.preventDefault();

    if (!title || !body) {
      const toastLiveExample = document.getElementById("liveToast");
      const toast = new bootstrap.Toast(toastLiveExample);
      toast.show();

      return;
    }

    createFragment(title, body);

    function createFragment(title, exer) {
      const card = document.createElement("div");
      card.classList.add("card");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const header = document.createElement("h5");
      header.classList.add("card-title");
      header.textContent = title;

      const button1 = document.createElement("button");
      button1.classList.add("btn");
      button1.classList.add("btn-danger");
      button1.classList.add("btn-delete");
      button1.textContent = "Delete";

      const button2 = document.createElement("button");
      button2.classList.add("btn");
      button2.classList.add("btn-warning");
      button2.classList.add("btn-position");
      button2.classList.add("btn-through");
      button2.textContent = "Text-through";

      const text = document.createElement("p");
      text.classList.add("card-text");
      text.textContent = exer;

      cardBody.appendChild(header);
      cardBody.appendChild(text);
      cardBody.appendChild(button1);
      cardBody.appendChild(button2);
      card.appendChild(cardBody);
      container.insertAdjacentElement("afterbegin", card);

      button1.addEventListener("click", (e) => {
        const confirmDelete = confirm("Delete?");
        if (confirmDelete) {
          const card = e.target.parentNode;
          card.parentNode.remove();
        } else {
          return;
        }
      });

      button2.addEventListener("click", (e) => {
        const card = e.target.parentNode;
        card.classList.add("text-through");
      });
    }

    form.reset();
  });
})();
