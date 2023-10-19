document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('registration-form');
    var usernameInput = document.getElementById('username');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirm-password');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); 
  
      if (usernameInput.value === '') {
        showError(usernameInput, 'Username is required');
      } else {
        showSuccess(usernameInput);
      }
  
      if (emailInput.value === '') {
        showError(emailInput, 'Email is required');
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Invalid email format');
      } else {
        showSuccess(emailInput);
      }
  
      if (passwordInput.value === '') {
        showError(passwordInput, 'Password is required');
      } else if (passwordInput.value.length < 8) {
        showError(passwordInput, 'Password must be at least 8 characters long');
      } else {
        showSuccess(passwordInput);
      }
  
      if (confirmPasswordInput.value === '') {
        showError(confirmPasswordInput, 'Confirm Password is required');
      } else if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, 'Passwords do not match');
      } else {
        showSuccess(confirmPasswordInput);
      }
    });
    function showError(input, message) {
      var formControl = input.parentElement;
      var errorDiv = formControl.querySelector('.error');
      formControl.className = 'input-control error';
      errorDiv.innerText = message;
    }
  
    function showSuccess(input) {
      var formControl = input.parentElement;
      formControl.className = 'input-control success';
    }
    function isValidEmail(email) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });