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
        alert("New horse created!");
        console.log("New horse created!");
        window.location.reload();
      } else {
        alert("Error while adding a horse.");
      }
    } catch (error) {
      console.error("Error while sending a request.", error);
      alert("Error while adding a horse.");
    }
  });
