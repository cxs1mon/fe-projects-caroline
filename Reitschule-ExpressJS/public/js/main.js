document.getElementById('contactForm').addEventListener('submit', async (e) => {
    
    e.preventDefault();

    const response = await fetch('/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: e.target.name.value,
            phone: e.target.phone.value
        })
    });

    const result = await response.json();
    console.log('Server response:', result);
});