const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (scrollY >= 180) {
    navbar.classList.add("bg");
  } else {
    navbar.classList.remove("bg");
  }
});

const createNavbar = () => {
  let navbar = document.querySelector(".navbar");

  navbar.innerHTML += `
    <ul class="links-container">            
      <li class="link-item"><a href="/index.html" class="link active"><b>home</b></a></li>
      <li class="link-item"><a href="/seller.html" class="link"><b>seller</b></a></li>
      <!-- <li class="link-item"><a href="/aboutus.html" class="link"><b>about us</b></a></li> -->
    </ul>
        
    <div class="user-interactions">
      <div class="search-box">
        <input type="text" class="search" placeholder="search for brands, products and more">
        <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <div class="cart" onclick="location.href = '/cart'">
        <button class="search-btn"><i class="fa-solid fa-cart-shopping"></i></button>
        <span class="cart-item-count">00</span>
      </div>
      <div class="user">
        <button class="search-btn"><i class="fa-solid fa-user"></i></button>
        <div class="user-icon-popup">
          <p>login to your account</p>
          <a>login</a>
        </div>
      </div>
    </div>
  `;
};

document.addEventListener("DOMContentLoaded", function () {
  createNavbar();

  const userIcon = document.querySelector(".user .fa-user");
  const userPopupIcon = document.querySelector(".user-icon-popup");

  userIcon.addEventListener("click", () => {
    userPopupIcon.classList.toggle("active");

    const text = userPopupIcon.querySelector("p");
    const actionBtn = userPopupIcon.querySelector("a");
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      // User is logged in
      text.innerHTML = `Hello<br><b>${user.name}</b>`;
      actionBtn.innerHTML = "Not you? Log out";
      actionBtn.addEventListener("click", () => logout());
    } else {
      text.innerHTML = "login to your account";
      actionBtn.innerHTML = "login";
      actionBtn.addEventListener("click", () => (location.href = "/login"));
    }
  });

  const logout = () => {
    sessionStorage.removeItem("user");
    location.reload();
  };

  const searchBtn = document.querySelector(".search-btn");
  const searchBox = document.querySelector(".search");

  searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim().length > 0) {
      location.href = `/search/${encodeURIComponent(searchBox.value.trim())}`;
    }
  });

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

  updateNavCartCounter();
});
