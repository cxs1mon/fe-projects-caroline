document.addEventListener("DOMContentLoaded", (event) => {
  // delete single horse
  const delete_btns = document.querySelectorAll(".delete-btn");
  delete_btns.forEach((element) => {
    element.addEventListener("click", () => {
      const horseId = element.getAttribute("data-id");

      // Send delete request to server
      fetch(`/api/delete?id=${horseId}`, {
        method: "POST",
      })
        .then((response) => {
          if (response.ok) {
            alert("Horse deleted successfully!");
          } else {
            alert("Failed to delete horse.");
          }
        })
        .catch((error) => {
          console.error("Error deleting horse: ", error);
          alert("Error deleting horse. Please try again.");
        });
    });
  });

});
document.getElementById('myForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const color = document.getElementById('color').value;
  const breed = document.getElementById('breed').value;
  
  const newHorse = { name, age, color, breed };

  try {
      const response = await fetch('/api/horses', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newHorse),
      });

      if (response.ok) {
          alert('New horse created!');
          console.log('New horse created!');
          window.location.reload();
      } else {
          alert('Error while adding a horse.');
      }
  } catch (error) {
      console.error('Error while sending a request.', error);
      alert('Error while adding a horse.');
  }
})

