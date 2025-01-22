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
} catch (error) {
  console.log("no form")
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
    const response = await fetch(`/api/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(horse),
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      alert("Error while adding a horse.");
      document.getElementById("form-submit").toggleAttribute("disabled");
    }
  } catch (error) {
    console.error("Error while sending a request.", error);
    alert("Error while adding a horse.");
  }
})
} catch (error) {
  console.log("no editForm")
}

try {
  const mySearchForm = document.getElementById("mySearchForm");
  mySearchForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const searchText = document.getElementById("searchText").value;

  try {
    const response = await fetch(`/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({searchText}),
    });

    if (response.ok) {
      //window.location.href = "/";
      console.log("fetch was okay")
    } else {
      alert("Error while searching");
      document.getElementById("form-submit").toggleAttribute("disabled");
    }
  } catch (error) {
    console.error("Error while searching", error);
    alert("caught error while fetching");
  }
})
} catch (error) {
  console.log("no searchForm found")
}