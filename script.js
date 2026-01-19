// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartUI();

function addToCart(name, price, btn) {
  const qtyInput = btn.previousElementSibling.querySelector("input");
  const quantity = parseInt(qtyInput.value);

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  saveCart();
  updateCartUI();
}

// Cart UI
function updateCartUI() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const cartCount = document.getElementById("cartCount");

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₦${item.price} x ${item.quantity}`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
    count += item.quantity;
  });

  totalPrice.textContent = total;
  cartCount.textContent = count;
}

// Quantity buttons
function changeQty(btn, delta) {
  const input = btn.parentElement.querySelector("input");
  let value = parseInt(input.value);
  value += delta;
  if (value < 1) value = 1;
  input.value = value;
}

// Cart modal
function toggleCart() {
  const modal = document.getElementById("cartModal");
  modal.style.display = modal.style.display === "block" ? "none" : "block";
}

// Checkout (mock)
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!");
  cart = [];
  saveCart();
  updateCartUI();
  toggleCart();
}

// LocalStorage save
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Search
function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const name = card.dataset.name;
    card.style.display = name.includes(input) ? "block" : "none";
  });
}