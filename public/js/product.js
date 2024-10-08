let ratingStarInput = [...document.querySelectorAll(".rating-star")];

ratingStarInput.map((star, index) => {
  star.addEventListener("click", () => {
    for (let i = 0; i < 5; i++) {
      if (i <= index) {
        ratingStarInput[i].classList.remove("fa-regular");
        ratingStarInput[i].classList.add("fa-solid");
      } else {
        ratingStarInput[i].classList.remove("fa-solid");
        ratingStarInput[i].classList.add("fa-regular");
      }
    }
  });
});

// Product details page
let productName = document.querySelector(".product-title");
let shortDes = document.querySelector(".product-des");
let price = document.querySelector(".price");
let detail = document.querySelector(".des");
let productImage = document.querySelector(".product-image");
let title = document.querySelector("title");

let cartBtn = document.querySelector(".cart-btn");
let buyBtn = document.querySelector(".buy-btn");

const setData = (data) => {
  productName.innerHTML = title.innerHTML = data.name;
  productImage.src = data.image;
  shortDes.innerHTML = data.shortDes;
  detail.innerHTML = data.detail;
  price.innerHTML = `₹${data.price}`;

  cartBtn.addEventListener("click", () => {
    cartBtn.innerHTML = addProductToCart(data);
  });

  buyBtn.addEventListener("click", () => {
    buyBtn.innerHTML = add_product_to_cart(data);
    buyBtn.innerHTML = location.replace("/checkout");
  });
};

const fetchProductData = () => {
  const searchKey = decodeURI(location.pathname.split("/products/").pop());
  if (searchKey.toLowerCase() === "login.html") {
    // Redirect to login.html
    window.location.href = "/login.html";
    return;
  }

  fetch("/get-products", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ id: productId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.draft) {
        alert("Product not found");
        location.replace("/404");
        return;
      }
      setData(data);
      getProducts(data.tags[0]).then((res) =>
        createProductCards(
          res.filter((product) => !product.draft),
          "Similar Products",
          ".similar-products",
          true
        )
      );
    })
    .catch(() => {
      alert("no product found");
      location.replace("/404");
    });
};

let productId = null;
if (location.pathname != "/add-product") {
  productId = decodeURI(location.pathname.split("/").pop());
  fetchProductData();
}
