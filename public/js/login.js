// signup
const signupForm = async (event) => {
    event.preventDefault();

    const username = $('#username-signup').value.trim();
    const email = $('#email-signup').value.trim();
    const password = $('#password-signup').value.trim();

    // if all sections are filled, 
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST', 
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            document.location.replace('/');
        } else {
          alert('Failed to sign up.'); 
        }
    }
};


// login
const loginForm = async (event) => {
    event.preventDefault();

    const email = $('#email-login').value.trim();
    const password = $('#password-login').value.trim();

    // if all sections are filled,
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    };

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed login.');
    }
};

$('.signup-form').addEventListener('submit', signupForm);
$('.login-form').addEventListener('submit', loginForm);

