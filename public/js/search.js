const searchKey = decodeURI(location.pathname.split("/").pop());

if (searchKey.toLowerCase() === "login.html") {
  window.location.href = "/login.html";
} else {
  getProducts(searchKey).then((data) =>
    createProductCards(
      data.filter((product) => !product.draft),
      searchKey,
      ".search-listing"
    )
  );
}
