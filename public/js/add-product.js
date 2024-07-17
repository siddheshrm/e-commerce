let user = JSON.parse(sessionStorage.user || "{}");

window.onload = () => {
  if (!user || Object.keys(user).length === 0) {
    location.replace("/login");
  }
};

let editables = [...document.querySelectorAll('*[contenteditable="true"]')];

editables.forEach((element) => {
  let placeholder = element.getAttribute("data-placeholder");
  element.innerText = placeholder;
  element.addEventListener("focus", () => {
    if (element.innerText === placeholder) {
      element.innerText = "";
    }
  });
  element.addEventListener("focusout", () => {
    if (!element.innerText.length) {
      element.innerText = placeholder;
    }
  });
});

// Image upload
let uploadInput = document.querySelector("#upload-image");
let imagePath = ""; // Initializing with an empty string, no default image

uploadInput.addEventListener("change", () => {
  const file = uploadInput.files[0];
  let imageUrl;

  if (file && file.type.includes("image")) {
    // means it's an image
    fetch("/s3url")
      .then((res) => res.json())
      .then((url) => {
        fetch(url, {
          method: "PUT",
          headers: new Headers({ "Content-Type": "image/jpeg" }),
          body: file,
        }).then((res) => {
          imagePath = url.split("?")[0];

          let productImage = document.querySelector(".product-img");
          productImage.src = imagePath;
        });
      });
  }
});

// Form submission
let addProductBtn = document.querySelector(".add-product-btn");
let loader = document.querySelector(".loader");

let productName = document.querySelector(".product-title");
let shortDes = document.querySelector(".product-des");
let price = document.querySelector(".price");
let detail = document.querySelector(".des");
let tags = document.querySelector(".tags");

addProductBtn.addEventListener("click", () => {
  // Verification
  if (!imagePath) {
    showFormError("Please upload a product image");
  } else if (
    productName.innerText == productName.getAttribute("data-placeholder") ||
    productName.innerText.length < 5
  ) {
    showFormError("Product name must be at least 5 characters long");
  } else if (
    shortDes.innerText == shortDes.getAttribute("data-placeholder") ||
    shortDes.innerText.length < 20
  ) {
    showFormError("Product description must be at least 20 characters long");
  } else if (
    price.innerText == price.getAttribute("data-placeholder") ||
    isNaN(price.innerText)
  ) {
    showFormError("Please enter a valid price");
  } else if (
    detail.innerText == detail.getAttribute("data-placeholder") ||
    detail.innerText.length < 50
  ) {
    showFormError("Product details must be at least 50 characters long");
  } else if (
    tags.innerText == tags.getAttribute("data-placeholder") ||
    tags.innerText.split(",").length < 3
  ) {
    showFormError(
      "Please enter at least 3 product tags for better search results"
    );
  } else {
    // Submit form
    loader.style.display = "block";
    let data = productData();
    if (productId) {
      data.id = productId;
    }
    sendData("/add-product", data);
  }
});

const productData = () => {
  let tagsArr = tags.innerText
    .split(",")
    .map((item) => item.trim().toLowerCase());

  return {
    name: productName.innerText,
    shortDes: shortDes.innerText,
    price: price.innerText,
    detail: detail.innerText,
    tags: tagsArr,
    image: imagePath,
    email: user.email,
    draft: false,
  };
};

let draftBtn = document.querySelector(".draft-btn");

draftBtn.addEventListener("click", () => {
  if (
    !productName.innerHTML.length ||
    productName.innerHTML == productName.getAttribute("data-placeholder")
  ) {
    showFormError("Product name must be at least 5 characters long");
  } else {
    // Don't validate the form
    let data = productData();
    loader.style.display = "block";
    data.draft = true;
    if (productId) {
      data.id = productId;
    }
    sendData("/add-product", data);
  }
});

// Edit product page
const fetchProductData = () => {
  addProductBtn.innerText = "Save Product";
  fetch("/get-products", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ id: productId }),
  })
    .then((res) => res.json())
    .then((data) => {
      setFormData(data);
    })
    .catch((err) => console.log(err));
};

const setFormData = (data) => {
  productName.innerText = data.name;
  shortDes.innerText = data.shortDes;
  price.innerText = data.price;
  detail.innerText = data.detail;
  tags.innerText = data.tags;

  let productImg = document.querySelector(".product-img");
  productImg.src = imagePath = data.image;
};

let productId = null;
if (location.pathname.includes("/add-product/")) {
  productId = decodeURI(location.pathname.split("/").pop());
  fetchProductData();
}
