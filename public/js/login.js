// login
const loginForm = async (event) => {
    event.preventDefault();

    const email = $('#email-login').val().trim();
    const password = $('#password-login').val().trim();

    // if all sections are filled,
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert('Failed login attempt.');
        }
    }
};


$('.login-form').on('submit', loginForm);

