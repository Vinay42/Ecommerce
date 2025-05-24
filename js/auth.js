document.addEventListener('DOMContentLoaded', () => {
    setupAuth();
});

function setupAuth() {
    // Check auth status
    window.appFunctions.checkAuth();

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        setupPasswordStrengthMeter(registerForm);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const errorElement = document.getElementById('login-error');
    
    if (!emailInput || !passwordInput) return;
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Reset error
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    // Simple validation
    if (!email || !password) {
        if (errorElement) {
            errorElement.querySelector('span').textContent = 'Please enter both email and password.';
            errorElement.style.display = 'flex';
        }
        return;
    }
    
    try {
        // Show loading state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Signing in...';
        
        // Attempt login
        await window.appFunctions.login(email, password);
        
        // Redirect to dashboard on success
        window.location.href = 'dashboard/index.html';
    } catch (error) {
        // Show error message
        if (errorElement) {
            errorElement.querySelector('span').textContent = error.message || 'Invalid email or password.';
            errorElement.style.display = 'flex';
        }
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const firstNameInput = document.getElementById('register-firstname');
    const lastNameInput = document.getElementById('register-lastname');
    const emailInput = document.getElementById('register-email');
    const passwordInput = document.getElementById('register-password');
    const confirmInput = document.getElementById('register-confirm');
    const termsCheckbox = document.getElementById('terms-agree');
    const errorElement = document.getElementById('register-error');
    
    if (!firstNameInput || !lastNameInput || !emailInput || !passwordInput || !confirmInput || !termsCheckbox) return;
    
    const userData = {
        firstname: firstNameInput.value.trim(),
        lastname: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
        confirm: confirmInput.value
    };
    
    // Reset error
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    // Simple validation
    if (!userData.firstname || !userData.lastname || !userData.email || !userData.password || !userData.confirm) {
        if (errorElement) {
            errorElement.querySelector('span').textContent = 'All fields are required.';
            errorElement.style.display = 'flex';
        }
        return;
    }
    
    if (userData.password !== userData.confirm) {
        if (errorElement) {
            errorElement.querySelector('span').textContent = 'Passwords do not match.';
            errorElement.style.display = 'flex';
        }
        return;
    }
    
    if (!validatePassword(userData.password)) {
        if (errorElement) {
            errorElement.querySelector('span').textContent = 'Password does not meet requirements.';
            errorElement.style.display = 'flex';
        }
        return;
    }
    
    if (!termsCheckbox.checked) {
        if (errorElement) {
            errorElement.querySelector('span').textContent = 'You must agree to the Terms of Service and Privacy Policy.';
            errorElement.style.display = 'flex';
        }
        return;
    }
    
    try {
        // Show loading state
        const submitButton = registerForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Creating Account...';
        
        // Attempt registration
        await window.appFunctions.register(userData);
        
        // Redirect to dashboard on success
        window.location.href = 'dashboard/index.html';
    } catch (error) {
        // Show error message
        if (errorElement) {
            errorElement.querySelector('span').textContent = error.message || 'Registration failed. Please try again.';
            errorElement.style.display = 'flex';
        }
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

function validatePassword(password) {
    // At least 8 characters
    if (password.length < 8) return false;
    
    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) return false;
    
    // At least one lowercase letter
    if (!/[a-z]/.test(password)) return false;
    
    // At least one number
    if (!/[0-9]/.test(password)) return false;
    
    // At least one special character
    if (!/[^A-Za-z0-9]/.test(password)) return false;
    
    return true;
}

function setupPasswordStrengthMeter(form) {
    const passwordInput = form.querySelector('#register-password');
    const strengthBar = form.querySelector('.strength-bar');
    const strengthText = form.querySelector('.strength-text');
    
    if (!passwordInput || !strengthBar || !strengthText) return;
    
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let strength = 0;
        
        // Calculate password strength
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update strength meter
        strengthBar.className = 'strength-bar';
        if (strength === 0) {
            strengthBar.style.width = '0';
            strengthText.textContent = 'Password strength';
        } else if (strength <= 2) {
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Weak';
        } else if (strength <= 4) {
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Medium';
        } else {
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Strong';
        }
    });
}