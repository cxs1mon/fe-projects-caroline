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

document
  .getElementById("myForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const color = document.getElementById("color").value;
    const breed = document.getElementById("breed").value;

    const newHorse = { name, age, color, breed };

    try {
      const response = await fetch("/api/add", {
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
