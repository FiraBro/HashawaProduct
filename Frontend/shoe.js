console.log("Script loaded!");
document.querySelectorAll('.add-to-cart').forEach(btn => {
    console.log("Found add-to-cart button:", btn);
});


document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.navbar ul');
  const closeBtn = document.querySelector('.close-menu');
  
  if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', function() {
          navMenu.classList.toggle('active');
      });
  }
  
  if (closeBtn && navMenu) {
      closeBtn.addEventListener('click', function() {
          navMenu.classList.remove('active');
      });
  }
  
  // Close menu when clicking on links
  document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', function() {
          if (navMenu) navMenu.classList.remove('active');
      });
  });

  // Product cards slider functionality
  document.querySelectorAll('.product-card').forEach(card => {
      const slider = card.querySelector('.image-slider');
      if (!slider) return;

      const images = slider.querySelectorAll('.product-image');
      const prevBtn = slider.querySelector('.prev');
      const nextBtn = slider.querySelector('.next');
      const colorDots = slider.querySelector('.color-dots');
      let dots = [];

      // Skip initialization if only one image exists
      if (images.length <= 1) {
          if (prevBtn) prevBtn.style.display = 'none';
          if (nextBtn) nextBtn.style.display = 'none';
          if (colorDots) colorDots.style.display = 'none';
          return;
      }

      // Create color dots if they don't exist
      if (colorDots && colorDots.children.length === 0) {
          images.forEach((img, i) => {
              const dot = document.createElement('div');
              dot.className = 'color-dot' + (i === 0 ? ' active' : '');
              dot.dataset.index = i;
              colorDots.appendChild(dot);
          });
          dots = colorDots.querySelectorAll('.color-dot');
      } else if (colorDots) {
          dots = colorDots.querySelectorAll('.color-dot');
      }

      let currentIndex = 0;
      
      function showImage(index) {
          images.forEach(img => img.style.display = 'none');
          dots.forEach(dot => dot.classList.remove('active'));
          
          images[index].style.display = 'block';
          if (dots[index]) dots[index].classList.add('active');
          currentIndex = index;
      }
      
      // Initialize first image
      showImage(0);
      
      // Button events
      if (prevBtn) {
          prevBtn.addEventListener('click', () => {
              showImage((currentIndex - 1 + images.length) % images.length);
          });
      }
      
      if (nextBtn) {
          nextBtn.addEventListener('click', () => {
              showImage((currentIndex + 1) % images.length);
          });
      }
      
      // Dot events
      dots.forEach(dot => {
          dot.addEventListener('click', () => {
              showImage(parseInt(dot.dataset.index));
          });
      });
  });
});
function showColor(color) {
  const shoeImages = {
    'red': 'shoe-red-large.jpg',
    'blue': 'shoe-blue-large.jpg',
    'black': 'shoe-black-large.jpg',
    'white': 'shoe-white-large.jpg'
  };
  
  const colorNames = {
    'red': 'Classic Red',
    'blue': 'Navy Blue',
    'black': 'Jet Black',
    'white': 'Pure White'
  };
  
  document.getElementById('main-shoe-image').src = shoeImages[color];
  document.getElementById('current-color').textContent = colorNames[color];
}
function showSignUp(e) {
  e.preventDefault();
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('signupForm').classList.remove('hidden');
}

function showLogin(e) {
  e.preventDefault();
  document.getElementById('signupForm').classList.add('hidden');
  document.getElementById('loginForm').classList.remove('hidden');
}

function showColor(color) {
  const mainImage = document.getElementById('main-shoe-image');
  const currentColor = document.getElementById('current-color');

  if (color === 'red') {
    mainImage.src = 'shoe-red-thumbnail.jpg';
    currentColor.textContent = 'Classic Red';
  } else if (color === 'blue') {
    mainImage.src = 'shoe.jpg';
    currentColor.textContent = 'Navy Blue';
  } else if (color === 'black') {
    mainImage.src = 'shoe-black-thumbnail.jpg';
    currentColor.textContent = 'Jet Black';
  } else if (color === 'white') {
    mainImage.src = 'shoe.jpg';
    currentColor.textContent = 'Pure White';
  }
}
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar ul');
const closeMenu = document.querySelector('.close-menu');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('show');
});

closeMenu.addEventListener('click', () => {
  navbar.classList.remove('show');
});


// Smooth scroll to top when clicking navbar elements
document.addEventListener('DOMContentLoaded', function() {
  // Get the header element
  const header = document.querySelector('header');
  
  // Add click event to the logo
  const logo = document.querySelector('.logo');
  if (logo) {
      logo.addEventListener('click', function(e) {
          e.preventDefault();
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }
  
  // Add click events to all nav links
  const navLinks = document.querySelectorAll('.navbar a');
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          // Only scroll to top if it's a hash link (#)
          if (this.getAttribute('href') === '#') {
              e.preventDefault();
              window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
              });
          }
      });
  });
});

// Show/hide scroll-to-top button
window.addEventListener('scroll', function() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
  } else {
      scrollBtn.classList.remove('visible');
  }
});

// Scroll to top when clicked
document.getElementById('scrollTopBtn').addEventListener('click', function() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

// Simple form submission handling
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Hide form and show success message
  this.style.display = 'none';
  document.getElementById('successMessage').style.display = 'block';
  
  // Reset form after showing success message (optional)
  setTimeout(() => {
      this.style.display = 'flex';
      document.getElementById('successMessage').style.display = 'none';
      this.reset();
  }, 3000);
});

// Scroll to top button functionality
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
  } else {
      scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

const form = document.getElementById('feedbackForm');
  const success = document.getElementById('successMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.style.display = 'block';
    form.reset();
  });

  document.getElementById('toggleTrackBtn').addEventListener('click', function () {
    const trackSection = document.getElementById('trackOrderSection');
    if (trackSection.style.display === 'none') {
      trackSection.style.display = 'block';
    } else {
      trackSection.style.display = 'none';
    }
  }); 
  document.getElementById('trackLink').addEventListener('click', function(event) {
    event.preventDefault();
    const section = document.getElementById('track');
    section.style.display = 'block';
    section.scrollIntoView({ behavior: 'smooth' });
  });


  // cart.js - Place this in a separate file or before </body>

// Global cart functions
const Cart = {
  init: function() {
      this.loadCart();
      this.updateCartCount();
      this.setupEventListeners();
  },
  
  cart: [],
  
  loadCart: function() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  },
  
  saveCart: function() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
  },
  
  addItem: function(item) {
      const existingIndex = this.cart.findIndex(cartItem => 
          cartItem.name === item.name && cartItem.price === item.price
      );
      
      if (existingIndex !== -1) {
          this.cart[existingIndex].quantity += 1;
      } else {
          this.cart.push(item);
      }
      
      this.saveCart();
      this.updateCartCount();
  },
  
  updateCartCount: function() {
      const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
      document.querySelectorAll('.cart-count, #cart-count').forEach(el => {
          el.textContent = totalItems;
      });
  },
  
  setupEventListeners: function() {
      // Add to Cart buttons
      document.querySelectorAll('.add-to-cart-btn, .card-content button').forEach(button => {
          button.addEventListener('click', (e) => {
              const productCard = e.target.closest('.product-card');
              const productName = productCard.querySelector('h2').textContent;
              const productPrice = productCard.querySelector('p').textContent;
              const imageSlider = productCard.querySelector('.image-slider');
              
              let productImage = '';
              if (imageSlider.classList.contains('has-multiple')) {
                  const activeDot = imageSlider.querySelector('.color-dot.active');
                  const imgIndex = activeDot ? parseInt(activeDot.dataset.index) : 0;
                  productImage = imageSlider.querySelectorAll('.product-image')[imgIndex].src;
              } else {
                  productImage = imageSlider.querySelector('.product-image').src;
              }
              
              this.addItem({
                  name: productName,
                  price: productPrice,
                  image: productImage,
                  quantity: 1
              });
              
              // Visual feedback
              const originalText = e.target.textContent;
              e.target.textContent = 'Added!';
              setTimeout(() => {
                  e.target.textContent = originalText;
              }, 2000);
          });
      });
      
      // Cart icon click handler (if you have a cart sidebar)
      const cartIcon = document.querySelector('.cart-icon, .cart-icon-container');
      if (cartIcon) {
          cartIcon.addEventListener('click', () => {
              // Your cart sidebar toggle logic here
          });
      }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu-container');
  const closeBtn = document.querySelector('.close-menu');

  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  closeBtn.addEventListener('click', function() {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 15;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 15;
    card.style.transform = `translateY(-8px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(-8px) rotateY(0) rotateX(0)';
  });
});