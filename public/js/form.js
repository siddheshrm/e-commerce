window.onload = () => {
  if (sessionStorage.user) {
    user = JSON.parse(sessionStorage.user);
    if (user.email) {
      location.replace("/");
    }
  }
};

// Signup form
let formBtn = document.querySelector(".submit-btn");
let loader = document.querySelector(".loader");

formBtn.addEventListener("click", () => {
  let fullname = document.querySelector("#name");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let number = document.querySelector("#number");
  let tac = document.querySelector("#tc") || null;

  // Signup form validations
  if (fullname !== null) {
    if (fullname.length < 5) {
      showFormError("Name must be at least 5 characters long.");
    } else if (!email) {
      showFormError("Please enter a valid email.");
    } else if (password.length < 8) {
      showFormError("Password must be at least 8 characters long.");
    } else if (number.value.length !== 10 || !/^\d{10}$/.test(number.value)) {
      showFormError("Please enter a valid 10-digit mobile number.");
    } else if (!tac.checked) {
      showFormError("Please agree to our terms and conditions.");
    } else {
      // Send data
      loader.style.display = "block";
      sendData("/signup", {
        name: fullname.value,
        email: email.value,
        password: password.value,
        number: number.value,
        tac: tac.checked,
      });
    }
  } else {
    // Login page
    if (!email.value.length || !password.value.length) {
      showFormError("Fill all the required inputs");
    } else {
      loader.style.display = "block";
      sendData("/login", {
        email: email.value,
        password: password.value,
      });
    }
  }
});

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
