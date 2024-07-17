const searchKey = decodeURI(location.pathname.split("/").pop());

if (searchKey.toLowerCase() === "login.html") {
  window.location.reload();
} else {
  getProducts(searchKey).then((data) =>
    createProductCards(data, searchKey, ".search-listing")
  );
}
