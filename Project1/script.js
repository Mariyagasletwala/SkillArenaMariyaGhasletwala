
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simulating authentication (replace with actual authentication logic)
  if (username === 'user' && password === 'password') {
    errorMessage.style.opacity = '0';
    alert('Login successful!');
    // Redirect to dashboard or perform other actions
  } else {
    errorMessage.textContent = 'Invalid username or password';
    errorMessage.style.opacity = '1';
    loginForm.classList.add('shake');
    setTimeout(() => {
      loginForm.classList.remove('shake');
    }, 820);
  }
});

// Add focus and blur effects for input fields
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  input.addEventListener('focus', function () {
    this.parentElement.style.transform = 'translateY(-3px)';
  });
  input.addEventListener('blur', function () {
    this.parentElement.style.transform = 'translateY(0)';
  });
});
