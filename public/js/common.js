// Update cart products counter
const updateNavCartCounter = () => {
  const cartCounter = document.querySelector(".cart-item-count");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length === 0) {
    cartCounter.textContent = "00";
  } else if (cartItems.length > 9) {
    cartCounter.textContent = "9+";
  } else {
    cartCounter.textContent =
      cartItems.length < 10 ? `0${cartItems.length}` : cartItems.length;
  }
};

const sendData = (path, data) => {
  fetch(path, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => processData(data));
};

const processData = (data) => {
  loader.style.display = null;
  if (data.alert) {
    showFormError(data.alert);
  } else if (data.email) {
    sessionStorage.user = JSON.stringify(data);
    if (location.search.includes("after_page")) {
      let pageId = location.search.split("=")[1];
      location.replace(`/products/${pageId}`);
    } else {
      location.replace("/");
    }
  } else if (data.seller) {
    let user = JSON.parse(sessionStorage.user);
    user.seller = true;
    sessionStorage.user = JSON.stringify(user);
    alert("Seller account added successfully!");
    location.replace("/dashboard");
  } else if (data.product) {
    location.replace("/dashboard");
  } else if (data == "review") {
    alert("Review submitted successfully!");
    location.reload();
  }
};

const showFormError = (err) => {
  let errorEle = document.querySelector(".error");
  errorEle.innerHTML = err;
  errorEle.classList.add("show");

  setTimeout(() => {
    errorEle.classList.remove("show");
  }, 2000);
};
