const vercelURL = 'https://login-sign-up-system.vercel.app/'; // Replace with your actual Vercel backend URL

const showSignup = () => {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("signup-form").classList.remove("hidden");
};

const showLogin = () => {
  document.getElementById("signup-form").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
};

// Login function
const login = async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${vercelURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.success) {
      showDashboard();
    } else {
      alert('Login failed! Please check your email or password.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again.');
  }
};

// Signup function
const signup = async () => {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const phone = document.getElementById("signup-phone").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await fetch(`${vercelURL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });

    const data = await response.json();
    if (data.success) {
      showDashboard();
    } else {
      alert('Signup failed! Email may already exist.');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    alert('An error occurred during signup. Please try again.');
  }
};

// Show Dashboard after login/signup
const showDashboard = () => {
  document.getElementById("form-container").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
};

// Logout function
const logout = () => {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("form-container").classList.remove("hidden");
};
