function addToCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Check if product already exists
    const existingIndex = cart.findIndex(item => item.name === productName);
  
    if (existingIndex !== -1) {
      // If found, increase quantity
      cart[existingIndex].quantity += 1;
    } else {
      // Else, add as new item
      cart.push({ name: productName, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart!`);
  }
  
  
  // Cart rendering for cart.html
  const productData = {
    'Fat Boy': {
      price: 29.99,
      img: 'img/products/fatboy/fatboy.jpg'
    },
    // Add more products here later
  };
  
  function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
  
    cartItemsContainer.innerHTML = '';
    let total = 0;
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalEl.innerText = '0.00';
      return;
    }
  
    cart.forEach((item, index) => {
      const product = productData[item.name];
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
  
      const itemHTML = `
        <div class="cart-item">
          <div class="cart-details">
            <img src="${product.img}" alt="${item.name}">
            <div class="cart-info">
              <strong>${item.name}</strong>
              <span>$${product.price.toFixed(2)} x ${item.quantity}</span>
            </div>
          </div>
          <div class="cart-actions">
            <p><strong>$${itemTotal.toFixed(2)}</strong></p>
            <button onclick="removeFromCart(${index})">Remove</button>
          </div>
        </div>
      `;
      cartItemsContainer.innerHTML += itemHTML;
    });
  
    cartTotalEl.innerText = total.toFixed(2);

    const checkoutBtnContainer = document.getElementById('checkout-button');

    if (cart.length > 0) {
        checkoutBtnContainer.innerHTML = `
          <a href="checkout.html">
            <button style="padding: 0.75rem 1.5rem; font-weight: bold; background-color: #111; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Proceed to Checkout
            </button>
          </a>
        `;
      } else {
        checkoutBtnContainer.innerHTML = '';
      }

  }
  
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
  
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }