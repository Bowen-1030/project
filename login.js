// login.js

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (data.role === 'admin') {
                window.location.href = '/admin';
            } else {
                alert('You do not have permission to access the admin panel.');
            }
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(err => {
        console.error('Login error:', err);
    });
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById('usernameError').style.display = 'none';
        document.getElementById('emailError').style.display = 'none';
        document.getElementById('passwordError').style.display = 'none';

        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('registerPassword').value;

        let isValid = true;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }

        if (password.length < 6) {
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            // Handle registration logic here, e.g., send data to server
            alert('Registration successful!');
        }
    });
}
