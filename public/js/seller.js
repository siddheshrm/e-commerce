window.onload = () => {
  let user = JSON.parse(sessionStorage.user || null);

  if (user == null) {
    location.replace("/login");
  } else if (user.seller) {
    location.replace("dashboard");
  }
};

let loader = document.querySelector(".loader");
let applyBtn = document.querySelector(".apply-btn");

applyBtn.addEventListener("click", () => {
  let businessName = document.querySelector("#name").value;
  let address = document.querySelector("#address").value;
  let about = document.querySelector("#about").value;
  let number = document.querySelector("#number").value;

  // Seller form validations
  if (!businessName) {
    showFormError("Business name is required");
  } else if (businessName.length < 3) {
    showFormError("Business name must be at least 3 characters long");
  } else if (!address) {
    showFormError("Address is required");
  } else if (!about) {
    showFormError("Business description is required");
  } else if (about.length < 50) {
    showFormError("Business description must be at least 50 characters long");
  } else if (!number) {
    showFormError("Contact number is required");
  } else if (number.length < 10 || number.length > 10) {
    showFormError("Please enter a valid 10-digit contact number.");
  } else {
    // Send data
    loader.style.display = "block";
    sendData("/seller", {
      name: businessName,
      address: address,
      about: about,
      number: number,
      email: JSON.parse(sessionStorage.user).email,
    });
  }
});
