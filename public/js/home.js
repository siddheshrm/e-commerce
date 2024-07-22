// Image collage
const collageImages = [...document.querySelectorAll(".collage-img")];

collageImages.map((item, i) => {
  item.addEventListener("mouseover", () => {
    collageImages.map((image, index) => {
      if (index != i) {
        image.style.filter = `blur(10px)`;
        item.style.zIndex = 2;
      }
    });
  });

  item.addEventListener("mouseleave", () => {
    collageImages.map((image, index) => {
      image.style = null;
    });
  });
});

// Get product functions
productId = null;
const getProducts = (tag) => {
  return fetch("/get-products", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ tag: tag }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const createProductCards = (data, title, ele, isProductPage = false) => {
  let container = document.querySelector(ele);
  if (isProductPage) {
    container.innerHTML = `<h1 class="section-title">Similar Products</h1>`;
  } else {
    container.innerHTML = `<h1 class="section-title">search results for "${title}"</h1>`;
  }

  if (Array.isArray(data) && data.length > 0) {
    container.innerHTML += `
      <div class="product-container">
        ${createCards(data)}
      </div>
    `;
  } else {
    container.innerHTML += `<p class="no-results">No results found</p>`;
  }
};

const createCards = (data) => {
  let cards = "";

  data.forEach((item) => {
    if (item.id != productId) {
      cards += `
            <div class="product-card">
                <img src="${item.image}" onclick="location.href = '/products/${item.id}'" class="product-img" alt="">
                <p class="product-name">${item.name}</p>
            </div>
        `;
    }
  });

  return cards;
};

// Cart function
const addProductToCart = (product) => {
  updateNavCartCounter();
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart == null) {
    cart = [];
  }

  const existingProductIndex = cart.findIndex(
    (item) => item.name === product.name
  );

  if (existingProductIndex > -1) {
    cart[existingProductIndex].item += 1; // Increment the quantity if product already exists in cart
  } else {
    product = {
      item: 1,
      name: product.name,
      price: product.price,
      shortDes: product.shortDes,
      image: product.image,
    };
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart successfully!");
  window.location.reload();
  return "added to cart";
};
