const searchKey = decodeURI(location.pathname.split("/").pop());

if (searchKey.toLowerCase() === "login.html") {
  window.location.href = "/login.html";
} else {
  getProducts(searchKey).then((data) => {
    // Check if data is an array before filtering
    if (Array.isArray(data)) {
      createProductCards(
        data.filter((product) => !product.draft),
        searchKey,
        ".search-listing"
      );
    } else {
      // Handle the case where data is not an array
      createProductCards([], searchKey, ".search-listing"); // Pass an empty array
    }
  });
}
