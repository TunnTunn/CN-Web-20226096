// This event listener ensures our code runs only after the HTML page is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
    // --- Element Selections ---
    // Get references to all the HTML elements we will be working with.
    const searchInput = document.getElementById("searchInput");
    const addProductBtn = document.getElementById("addProductBtn");
    const addProductForm = document.getElementById("addProductForm");

    // --- Feature 1: Product Search/Filter ---
    // This function will handle the logic for filtering products.
    function filterProducts() {
        const productItems = document.querySelectorAll(".product-item"); // Gets ALL product items
        const searchTerm = searchInput.value.toLowerCase(); // Get the search text and make it lowercase

        // Loop through each product item
        productItems.forEach(function (item) {
            // Get the product's name (h3 tag) and make it lowercase
            const productName = item.querySelector("h3").textContent.toLowerCase();

            // Check if the product's name includes the search term
            if (productName.includes(searchTerm)) {
                item.style.display = "block"; // If it matches, show the item
            } else {
                item.style.display = "none"; // If it doesn't match, hide the item
            }
        });
    }

    // Add an event listener to the search input.
    // The 'keyup' event fires every time the user releases a key.
    searchInput.addEventListener("keyup", filterProducts);

    // --- Feature 2: Toggle (Show/Hide) the "Add Product" Form ---
    // Add an event listener to the "Add Product" button.
    addProductBtn.addEventListener("click", function () {
        // classList.toggle is a convenient way to add a class if it's not there,
        // or remove it if it is there.
        // In our case, it will add/remove the '.hidden' class.
        addProductForm.classList.toggle("hidden");
    });
});
