// signup
const signupForm = async (event) => {
    event.preventDefault();
    console.log('what about here?')

    const username = $('#username-signup').val().trim();
    const email = $('#email-signup').val().trim();
    const password = $('#password-signup').val().trim();

    // if all sections are filled, 
    if (username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST', 
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
        console.log(response, 'signed up')
        
        if (response.ok) {
            document.location.replace('/');
        } else {
          alert('Failed to sign up.'); 
        }
    }
};


$('.signup-form').on('submit', signupForm);
