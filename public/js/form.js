window.onload = () => {
  if (sessionStorage.user) {
    user = JSON.parse(sessionStorage.user);
    if (user.email) {
      location.replace("/");
    }
  }
};

// Signup and Login form validations
let formBtn = document.querySelector(".submit-btn");
let loader = document.querySelector(".loader");

formBtn.addEventListener("click", () => {
  let fullname = document.querySelector("#name");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let number = document.querySelector("#number");
  let tac = document.querySelector("#tc");

  clearFormErrors();

  // Signup form validations
  if (fullname !== null) {
    if (fullname.value.length < 5) {
      showFormError("Name must be at least 5 characters long.");
      return;
    }
    if (!validateEmail(email.value)) {
      showFormError("Please enter a valid email.");
      return;
    }
    if (number.value.length !== 10 || !/^\d{10}$/.test(number.value)) {
      showFormError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (password.value.length < 8) {
      showFormError("Password must be at least 8 characters long.");
      return;
    }
    if (!tac.checked) {
      showFormError("Please agree to our terms and conditions.");
      return;
    }
    // All validations passed, proceed with signup form submission
    loader.style.display = "block";
    sendData("/signup", {
      name: fullname.value,
      email: email.value,
      password: password.value,
      number: number.value,
      tac: tac.checked,
    });
  } else {
    // Login form validation
    if (!email.value.length) {
      showFormError("Please enter your email.");
      return;
    }
    if (!password.value.length) {
      showFormError("Please enter your password.");
      return;
    }
    // All validations passed, proceed with login form submission
    loader.style.display = "block";
    sendData("/login", {
      email: email.value,
      password: password.value,
    });
  }
});

function clearFormErrors() {
  let errorElement = document.querySelector(".error");
  if (errorElement) {
    errorElement.innerHTML = "";
    errorElement.classList.remove("show");
  }
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
}

const passwordField = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
  "text";
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);

  const iconEyeSlash = this.querySelector(".fa-eye-slash");
  const iconEye = this.querySelector(".fa-eye");

  if (type === "text") {
    iconEye.style.display = "inline";
    iconEyeSlash.style.display = "none";
  } else {
    iconEye.style.display = "none";
    iconEyeSlash.style.display = "inline";
  }
});
