const searchKey = decodeURI(location.pathname.split("/").pop());

if (searchKey.toLowerCase() === "login.html") {
  // Redirect to index.html
  window.location.href = "/login.html";
} else {
  getProducts(searchKey).then((data) =>
    createProductCards(data, searchKey, ".search-listing")
  );
}
