// Cart Manager
const CartManager = {
  init: function () {
    this.loadCart();
    this.updateCartCount();
    this.setupEventListeners();
  },

  cart: [],

  loadCart: function () {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  },

  saveCart: function () {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.updateCartCount();
  },

  addItem: function (item) {
    const existingIndex = this.cart.findIndex(
      (cartItem) => cartItem.name === item.name && cartItem.price === item.price
    );

    if (existingIndex !== -1) {
      this.cart[existingIndex].quantity += 1;
    } else {
      this.cart.push(item);
    }

    this.saveCart();
  },

  updateCartCount: function () {
    const totalItems = this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Update cart count in header
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = totalItems;
    });

    // Update cart count in cart page
    if (document.getElementById("item-count")) {
      document.getElementById("item-count").textContent = `${totalItems} ${
        totalItems === 1 ? "Item" : "Items"
      }`;
    }
  },

  setupEventListeners: function () {
    // Add to Cart buttons
    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("add-to-cart-btn") ||
        (e.target.closest(".card-content") && e.target.tagName === "BUTTON")
      ) {
        this.handleAddToCart(e.target);
      }
    });
  },

  handleAddToCart: function (button) {
    const productCard = button.closest(".product-card");
    const product = {
      name: productCard.querySelector("h2").textContent,
      price: productCard.querySelector("p").textContent,
      image: this.getProductImage(productCard),
      quantity: 1,
    };

    this.addItem(product);
    this.showAddFeedback(button);
  },

  getProductImage: function (productCard) {
    const imageSlider = productCard.querySelector(".image-slider");
    if (imageSlider.classList.contains("has-multiple")) {
      const activeDot = imageSlider.querySelector(".color-dot.active");
      const imgIndex = activeDot ? parseInt(activeDot.dataset.index) : 0;
      return imageSlider.querySelectorAll(".product-image")[imgIndex].src;
    }
    return imageSlider.querySelector(".product-image").src;
  },

  showAddFeedback: function (button) {
    const originalText = button.textContent;
    button.textContent = "Added!";
    button.style.backgroundColor = "#4CAF50";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = "";
    }, 2000);
  },

  // Cart page specific functions
  renderCartPage: function () {
    if (!document.getElementById("cart-items")) return;

    const cartItemsContainer = document.getElementById("cart-items");
    const cartSummary = document.getElementById("cart-summary");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const cartTotalElement = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";

    if (this.cart.length === 0) {
      cartSummary.style.display = "none";
      emptyCartMessage.style.display = "block";
      return;
    }

    cartSummary.style.display = "flex";
    emptyCartMessage.style.display = "none";

    let totalPrice = 0;

    this.cart.forEach((item, index) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      totalPrice += price * item.quantity;

      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                        <button class="remove-item" data-index="${index}">×</button>
                    </div>
                `;
      cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotalElement.textContent = totalPrice.toFixed(2);

    // Event listeners for quantity changes
    cartItemsContainer.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      if (index === null) return;

      if (e.target.classList.contains("plus")) {
        this.cart[index].quantity += 1;
      } else if (e.target.classList.contains("minus")) {
        if (this.cart[index].quantity > 1) {
          this.cart[index].quantity -= 1;
        } else {
          this.cart.splice(index, 1);
        }
      } else if (e.target.classList.contains("remove-item")) {
        this.cart.splice(index, 1);
      }

      this.saveCart();
      this.renderCartPage();
    });
  },
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  CartManager.init();
  CartManager.renderCartPage();

  // Checkout button
  if (document.querySelector(".checkout-btn")) {
    document.querySelector(".checkout-btn").addEventListener("click", () => {
      alert("Checkout functionality would go here!");
    });
  }
});

document
  .getElementById("checkout-button")
  .addEventListener("click", function () {
    const total = document.getElementById("cart-total").textContent;

    if (parseFloat(total) === 0) {
      alert("Your cart is empty!");
      return;
    }

    sessionStorage.setItem("checkoutTotal", total);
    window.location.href = "checkout.html";
  });
