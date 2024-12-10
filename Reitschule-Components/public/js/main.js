document.getElementById('contactForm').addEventListener('submit', handleForm);

async function handleForm(e) {
    e.preventDefault();
    const noticeElement = document.querySelector('.form__notice');

    try {
        if (noticeElement.classList.contains("valid")) {
            noticeElement.classList.remove("valid");
        } else if(noticeElement.classList.contains("invalid")){
            noticeElement.classList.remove("invalid");
        } else {
            console.log(noticeElement.classList);
        };
        const response = await fetch('/api/contact-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: e.target.name.value,
                birthdate: e.target.birthdate.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                experience: e.target.experience.value,
                topic: e.target.topic.value,
                message: e.target.message.value
            })
        });
        const result = await response.json();
        if (result.success) {
            noticeElement.textContent = 'Anfrage wurde geschickt!';
            noticeElement.classList.add("valid");
            noticeElement.hidden = false;
            e.target.reset();
        } else {
            noticeElement.textContent = 'Fehler beim Senden. Bitte überprüfen Sie Ihre Eingaben.';
            noticeElement.classList.add("invalid");
            noticeElement.hidden = false;
        }
    } catch (error) {
        noticeElement.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
        noticeElement.classList.add("invalid");
        noticeElement.hidden = false;
    }
};