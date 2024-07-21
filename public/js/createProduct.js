const removeProductFromDOM = (id) => {
  const productCard = document.querySelector(`.product-card[data-id='${id}']`);
  if (productCard) {
    productCard.remove();
  }
};

const showAlert = (message) => {
  alert(message);
};

const createProduct = (data, draft) => {
  let productContainer = document.querySelector(".product-container");
  productContainer.innerHTML += `
    <div class="product-card" data-id="${data.id}">
        <button class="btn edit-btn" onclick="location.href = '/add-product/${data.id}'"><i class="fa-solid fa-pen-to-square"></i></i></button>
        <button class="btn open-btn" onclick="openProduct('${data.id}', ${draft})"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
        <button class="btn delete-btn" onclick="deleteItem('${data.id}')"><i class="fa-solid fa-trash"></i></button>
        <img src="${data.image}" class="product-img" alt="">
        <p class="product-name">${data.name}</p>
    </div>
  `;
};

const openProduct = (id, draft) => {
  if (draft) {
    showAlert(
      "This product is still in draft status and cannot be opened. Please finalize the draft first."
    );
  } else {
    location.href = `/products/${id}`;
  }
};

const deleteItem = (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    fetch("/delete-product", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "success") {
          removeProductFromDOM(id);
        } else {
          showAlert("Some error occurred");
        }
      })
      .catch((error) => {
        // console.error("Error deleting product:", error);
        showAlert("An error occurred while deleting the product.");
      });
  }
};
