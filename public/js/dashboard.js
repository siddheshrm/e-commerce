let user = JSON.parse(sessionStorage.getItem("user") || null);

if (!user) {
  location.replace("/login");
} else if (!user.seller) {
  location.replace("/seller");
}

let greeting = document.querySelector("#seller-greeting");
greeting.innerHTML += user.name;

// loader
let loader = document.querySelector(".loader");
let noProductMessage = document.querySelector(".no-product-message");

loader.style.display = "block";

const setupProducts = () => {
  fetch("/get-products", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ email: user.email }),
  })
    .then((res) => res.json())
    .then((data) => {
      loader.style.display = "none";
      if (data === "no products" || data.length === 0) {
        noProductMessage.classList.add("active");
      } else {
        data.forEach((product) => createProduct(product, product.draft));
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      // console.error("Error fetching products:", error);
      noProductMessage.textContent =
        "An error occurred while fetching products.";
      noProductMessage.classList.add("active");
    });
};

setupProducts();
