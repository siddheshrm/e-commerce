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
      <li class="link-item"><a href="${getHomeLink()}" class="link active"><b>home</b></a></li>
      <li class="link-item"><a href="/seller.html" class="link"><b>seller</b></a></li>
      <li class="link-item"><a href="#footer" class="link"><b>about us</b></a></li>
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
          <p>already have an account?</p>
          <button class="logout-btn">login</button>
        </div>
      </div>
    </div>
  `;
};

const getHomeLink = () => {
  // Check if current page is index.html or the root directory
  return location.pathname === "/" || location.pathname === "/index.html"
    ? "#"
    : "/index.html";
};

document.addEventListener("DOMContentLoaded", function () {
  createNavbar();

  const userIcon = document.querySelector(".user .fa-user");
  const userPopupIcon = document.querySelector(".user-icon-popup");

  userIcon.addEventListener("click", () => {
    userPopupIcon.classList.toggle("active");

    const text = userPopupIcon.querySelector("p");
    const actionBtn = userPopupIcon.querySelector(".logout-btn");
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      // User is logged in
      text.innerHTML = `Hello, <b>${user.name}</b><br>Not you?`;
      actionBtn.innerHTML = "Log out";
      actionBtn.addEventListener("click", () => logout());
    }
  });

  const logout = () => {
    if (confirm("Are you sure you want to log out?")) {
      sessionStorage.removeItem("user");
      window.location.href = "login.html";
    }
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

  // Smooth scroll for specific links
  document.querySelectorAll(".link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = e.target.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
