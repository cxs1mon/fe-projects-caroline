// server
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      setTimeout(function () {
        button.disabled = true;
      }, 0);
    });
  });
});

try {
  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const birthyear = document.getElementById("birthyear").value;
    const color = document.getElementById("color").value;
    const breed = document.getElementById("breed").value;
    const text = document.getElementById("text").value;

    const newHorse = { name, birthyear, color, breed, text };

    try {
      const response = await fetch("/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHorse),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Error while adding a horse.");
        document.getElementById("form-submit").toggleAttribute("disabled");
      }
    } catch (error) {
      console.error("Error while sending a request.", error);
      alert("Error while adding a horse.");
    }
  });
} catch (error) {
  console.log("no form");
}

try {
  const myEditForm = document.getElementById("myEditForm");
  myEditForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const birthyear = document.getElementById("birthyear").value;
    const color = document.getElementById("color").value;
    const breed = document.getElementById("breed").value;
    const text = document.getElementById("text").value;

    const horse = { id, name, birthyear, color, breed, text };

    try {
      const response = await fetch(`/admin/edit/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(horse),
      });

      if (response.ok) {
        window.location.href = "/admin";
      } else {
        alert("Error while adding a horse.");
        document.getElementById("form-submit").toggleAttribute("disabled");
      }
    } catch (error) {
      console.error("Error while sending a request.", error);
      alert("Error while adding a horse.");
    }
  });
} catch (error) {
  console.log("no editForm");
}

try {
  const reloadAllHorses = document.querySelector("#reset-filter");
  reloadAllHorses.addEventListener("click", () => {
    window.location.href = "/admin";
  });
} catch (error) {
  console.log("no reload button found");
}


// client

// wait till the whole DOM is loaded and parsed before adding the eventlistener
document.addEventListener("DOMContentLoaded", (event) => {
  const contact_form = document.getElementById("contactForm");
  /* if contact_form is present */
  if (contact_form) {
    contact_form.addEventListener("submit", handleForm);
    /* if contact_form is not present but the url is .../kontakt */
  } else if (window.URL == "http://localhost:8080/kontakt") {
    console.error('Element with ID "contactForm" not found.');
  }
});

async function handleForm(e) {
  e.preventDefault();
  const noticeElement = document.querySelector(".form__notice");

  try {
    if (noticeElement.classList.contains("valid")) {
      noticeElement.classList.remove("valid");
    } else if (noticeElement.classList.contains("invalid")) {
      noticeElement.classList.remove("invalid");
    } else {
      console.log(noticeElement.classList);
    }
    const response = await fetch("/api/contact-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.target.name.value,
        birthdate: e.target.birthdate.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        experience: e.target.experience.value,
        topic: e.target.topic.value,
        message: e.target.message.value,
      }),
    });
    const result = await response.json();
    if (result.success) {
      noticeElement.textContent = "Anfrage wurde geschickt!";
      noticeElement.classList.add("valid");
      noticeElement.hidden = false;
      e.target.reset();
    } else {
      noticeElement.textContent =
        "Fehler beim Senden. Bitte überprüfen Sie Ihre Eingaben.";
      noticeElement.classList.add("invalid");
      noticeElement.hidden = false;
    }
  } catch (error) {
    noticeElement.textContent =
      "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
    noticeElement.classList.add("invalid");
    noticeElement.hidden = false;
  }
}
