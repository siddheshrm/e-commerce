window.onload = () => {
  if (sessionStorage.user) {
    user = JSON.parse(sessionStorage.user);
    if (user.email) {
      location.replace("/");
    }
  }
};

//form
let formBtn = document.querySelector(".submit-btn");
let loader = document.querySelector(".loader");

formBtn.addEventListener("click", () => {
  let fullname = document.querySelector("#name") || null;
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let number = document.querySelector("#number") || null;
  let tac = document.querySelector("#tc") || null;

  // Signup form validations
  if (fullname !== null) {
    if (fullname.length < 5) {
      showFormError("Name must be at least 5 characters long.");
    } else if (!email) {
      showFormError("Please enter a valid email.");
    } else if (password.length < 8) {
      showFormError("Password must be at least 8 characters long.");
    } else if (Number(number) || number.value.length < 10 || number.value.length > 10) {
      showFormError("Please enter a valid 10-digit mobile number.");
    } else if (!tac.checked) {
      showFormError("Please agree to our terms and conditions.");
      // return;
    } else {
      //submit form
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
    //login page
    if (!email.value.length || !password.value.length) {
      showFormError("Fill all the required inputs.");
    } else {
      loader.style.display = "block";
      sendData("/login", {
        email: email.value,
        password: password.value,
      });
    }
  }
});
