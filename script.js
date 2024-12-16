// Script for navigation bar
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
    console.log("clicked");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
    console.log("clicked");
  });
}

//cart

// Add to Cart functionality
document.addEventListener("DOMContentLoaded", () => {
  const cartButtons = document.querySelectorAll(".cart");

  cartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const product = button.closest(".pro");
      const image = product.querySelector("img").src;
      const name = product.querySelector("h5").textContent;
      const price = product.querySelector("h4").textContent;

      const productDetails = {
        image,
        name,
        price,
        quantity: 1,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingProduct = cart.find(
        (item) => item.name === productDetails.name
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(productDetails);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Item added to cart!");
    });
  });

  if (window.location.pathname.includes("cart.html")) {
    const cartTable = document.querySelector("tbody");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((item) => {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td><a href="#" class="remove-item"><i class="far fa-times-circle"></i></a></td>
          <td><img src="${item.image}" alt="${item.name}" /></td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td><input type="number" value="${
            item.quantity
          }" class="item-quantity" /></td>
          <td>${(
            parseFloat(item.price.replace("$", "")) * item.quantity
          ).toFixed(2)}</td>
        `;
      cartTable.appendChild(row);
    });

    cartTable.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const row = e.target.closest("tr");
        const itemName = row.children[2].textContent;

        cart = cart.filter((item) => item.name !== itemName);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Remove row from table
        row.remove();
      }
    });

    // Update Quantity
    cartTable.addEventListener("change", (e) => {
      if (e.target.classList.contains("item-quantity")) {
        const row = e.target.closest("tr");
        const itemName = row.children[2].textContent;
        const newQuantity = parseInt(e.target.value);

        // Update local storage
        const product = cart.find((item) => item.name === itemName);
        product.quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update Subtotal
        row.children[5].textContent = (
          parseFloat(product.price.replace("$", "")) * newQuantity
        ).toFixed(2);
      }
    });
  }
});
