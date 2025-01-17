document.addEventListener('DOMContentLoaded', (event) => {
    const delete_btns = document.querySelectorAll(".delete-btn");
    delete_btns.forEach(element => {
      element.addEventListener("click", () => {
        const horseId = element.getAttribute("data-id");

        // Send delete request to server
        fetch(`/delete?id=${horseId}`, {
          method: 'POST'
        })
        .then(response => {
          if (response.ok) {
            alert("Horse deleted successfully!");
          } else {  
            alert("Failed to delete horse.");
          }
        })
        .catch(error => {
          console.error("Error deleting horse: ", error);
          alert("Error deleting horse. Please try again.");
        });
      });
    });
  });


  
