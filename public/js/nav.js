const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (scrollY >= 80) {
    navbar.classList.add("bg");
  } else {
    navbar.classList.remove("bg");
  }
});

const createNavbar = () => {
  let navbar = document.querySelector(".navbar");

  navbar.innerHTML += `
    <ul class="links-container">            
      <li class="link-item"><a href="${getHomeLink()}" class="link active"><b>Home</b></a></li>
      <li class="link-item"><a href="/seller.html" class="link"><b>Seller</b></a></li>
      <li class="link-item"><a href="#footer" class="link"><b>About us</b></a></li>
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
          <button class="login-btn">login</button>
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
    const actionBtn = userPopupIcon.querySelector(".login-btn");
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      // User is logged in
      text.innerHTML = `Hello, <b>${user.name}</b>.<br>Not you?`;
      actionBtn.innerHTML = "Logout";
      actionBtn.removeEventListener("click", handleLoginClick);
      actionBtn.addEventListener("click", logout);
    } else {
      actionBtn.innerHTML = "Login";
      actionBtn.addEventListener("click", handleLoginClick);
    }
  });

  const handleLoginClick = () => {
    window.location.href = "login.html";
  };

  const logout = () => {
    if (confirm("Are you sure you want to log out?")) {
      sessionStorage.removeItem("user");
      window.location.reload();
    }
  };

  // Search box
  const searchBtn = document.querySelector(".search-btn");
  const searchBox = document.querySelector(".search");

  searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim().length > 0) {
      location.href = `/search/${encodeURIComponent(searchBox.value.trim())}`;
    }
  });

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
