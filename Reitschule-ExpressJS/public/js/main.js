document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const noticeElement = document.querySelector('.form__notice');
    try {
        const response = await fetch('/api/contact-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: e.target.name.value,
                phone: e.target.phone.value
            })
        });
        const result = await response.json();
        if (result.success) {
            noticeElement.textContent = 'Anfrage wurde geschickt!';
            noticeElement.hidden = false;
            e.target.reset();
        } else {
            noticeElement.textContent = 'Fehler beim Senden. Bitte überprüfen Sie Ihre Eingaben.';
            noticeElement.hidden = false;
        }
    } catch (error) {
        noticeElement.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
        noticeElement.hidden = false;
    }
});