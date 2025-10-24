// This event listener ensures our code runs only after the HTML page is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
    // --- Element Selections ---
    const searchInput = document.getElementById("searchInput");
    const addProductBtn = document.getElementById("addProductBtn");
    const addProductForm = document.getElementById("addProductForm");
    const productList = document.getElementById("product-list"); // Get the product list container
    const cancelBtn = document.getElementById("cancelBtn"); // Get the new cancel button
    const errorMsg = document.getElementById("errorMsg"); // Get the error message paragraph

    // --- Feature 1: Product Search/Filter (No changes needed) ---
    // This function is already correctly written to handle new products.
    function filterProducts() {
        const productItems = document.querySelectorAll(".product-item");
        const searchTerm = searchInput.value.toLowerCase();

        productItems.forEach(function (item) {
            const productName = item.querySelector("h3").textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }
    searchInput.addEventListener("keyup", filterProducts);

    // --- Feature 2: Show/Hide the "Add Product" Form ---
    addProductBtn.addEventListener("click", function () {
        addProductForm.classList.remove("hidden"); // Use remove instead of toggle to be explicit
        errorMsg.textContent = ""; // Clear old errors when showing the form
    });

    cancelBtn.addEventListener("click", function () {
        addProductForm.classList.add("hidden"); // Hide the form when cancel is clicked
    });

    // --- NEW: Feature 3: Handle Form Submission to Add New Product ---
    addProductForm.addEventListener("submit", function (event) {
        // Step A: Prevent the default form action (which is to reload the page)
        event.preventDefault();

        // Step B: Get the values from the form inputs
        const name = document.getElementById("newName").value.trim();
        const desc = document.getElementById("newDesc").value.trim();
        const price = document.getElementById("newPrice").value.trim();

        // Step C: Validate the input
        if (name === "" || price === "" || isNaN(price) || Number(price) <= 0) {
            errorMsg.textContent = "Please enter a valid name and a price greater than 0.";
            return; // Stop the function if validation fails
        }

        // Step D: If validation is successful, clear any error messages
        errorMsg.textContent = "";

        // Step E: Create a new product element
        const newProductElement = document.createElement("article");
        newProductElement.classList.add("product-item");

        // Step F: Populate the new element with HTML from the form data
        newProductElement.innerHTML = `
            <h3>${name}</h3>
            <p>${desc}</p>
            <p class="price">Price: $${Number(price).toFixed(2)}</p>
        `;

        // Step G: Add the new product to the top of the product list
        productList.prepend(newProductElement);

        // Step H: Reset the form fields and hide the form
        addProductForm.reset(); // Clears all input fields
        addProductForm.classList.add("hidden"); // Hides the form
    });
});
