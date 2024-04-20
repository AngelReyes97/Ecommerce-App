// Initialize cart from local storage if it exists
// Initialize the cart map from local storage if it exists, otherwise initialize an empty map
const cart = new Map(JSON.parse(localStorage.getItem('cart')) || []);
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

// Function to add a product to the cart
const addToCart = (product) => {
    const productID = product.product_id;
    const productName = product.product_name;
    const productdescription = product.description;
    const productPrice = product.price; // Extract price from the product object
    console.log(product);
    // If the product already exists in the cart, increment its quantity
    if (cart.has(productName)) {
        const currentQuantity = cart.get(productName).quantity;
        const currentid = cart.get(productName).id
        cart.set(productName, { ...product,id:currentid, quantity: currentQuantity + 1 }); // Update quantity
    } else {
        // If the product is not in the cart, add it with a quantity of 1
        cart.set(productName, { ...product, id:productID, quantity: 1, description: productdescription, price: productPrice }); // Add new product with quantity 1 and price
    }

    cartCount++; // Increment cart count

    // Animate and update cart count
    animateCartCount();
    updateCartCount();

    // Save the cart to local storage
    saveCartToStorage();
}

// Function to update the cart count in the UI
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
}

// Function to animate the cart count
function animateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.classList.add('animate__animated', 'animate__bounce');
    cartCountElement.addEventListener('animationend', function() {
        cartCountElement.classList.remove('animate__animated', 'animate__bounce');
    });
}

// Function to save the cart to local storage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify([...cart]));
    localStorage.setItem('cartCount', cartCount);
}

// Call updateCartCount() on page load to update the cart count from storage
window.addEventListener('load', updateCartCount);

const removeFromCart = (productName) => {
     // If the product exists in the cart, decrement its quantity
     if (cart.has(productName)) {
        const currentQuantity = cart.get(productName).quantity;
        // If the quantity is greater than 1, decrement it
        if (currentQuantity > 1) {
            cart.set(productName, { ...cart.get(productName), quantity: currentQuantity - 1 });
        } else {
            // If the quantity is 1, remove the product from the cart
            cart.delete(productName);
            // Remove the corresponding item from the DOM only if its quantity becomes zero
            const cartContainer = document.getElementById('checkout-box');
            const itemToRemove = cartContainer.querySelector(`[data-product="${productName}"]`);
            if (itemToRemove) {
                itemToRemove.remove();
            }
        }
        // Decrement the cart count
        cartCount--;
        // Update the cart count in the UI
        updateCartCount();
        // Update the total price and quantity in the UI
        updateTotalPriceAndQuantity(productName);
        // Save the cart to local storage
        saveCartToStorage();
    }
}

const updateTotalPriceAndQuantity = (productName) => {
    const cartContainer = document.getElementById('checkout-box');
    const itemToUpdate = cartContainer.querySelector(`[data-product="${productName}"]`);
    if (itemToUpdate) {
        const product = cart.get(productName);
        const totalPriceElement = itemToUpdate.querySelector('.total-price');
        const quantityElement = itemToUpdate.querySelector('.quantity');
        if (totalPriceElement && quantityElement) {
            const totalPrice = product.quantity * product.price;
            totalPriceElement.textContent = `Total: $${totalPrice}`;
            quantityElement.textContent = `Quantity: ${product.quantity}`;
        }
    }
}

// Function to remove a cart item from the DOM
const removeCartItemFromDOM = (productName) => {
    const cartContainer = document.getElementById('checkout-box');
    const itemToRemove = cartContainer.querySelector(`[data-product="${productName}"]`);
    if (itemToRemove) {
        itemToRemove.remove();
    }
}

// Function to render the cart with delete buttons
const renderCartWithDeleteButtons = () => {
    let urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("checkout")){
        const cartContainer = document.getElementById('checkout-box');
        const checkoutBox = document.getElementById("checkout-box");
        checkoutBox.innerHTML += `
        <div class="container">
  <main>
    <div class="py-2 text-center">
      <h2>Checkout</h2>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-5 col-lg-3 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Your cart</span>
          <span class="badge bg-primary rounded-pill" id="ca"> ${cartCount}</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div id="cart-box">
            </div>
            <span class="text-body-secondary" id="price-box"></span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong id="pricesum">$0</strong>
          </li>
        </ul>
      </div>
      
      <div class="col-md-5 col-lg-6">
        <h4 class="mb-3">Billing address</h4>
        <form class="needs-validation" novalidate>
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">First name</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Last name</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Email <span class="text-body-secondary">(Optional)</span></label>
              <input type="email" class="form-control" id="email" placeholder="you@example.com">
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="col-12">
              <label for="address" class="form-label">Address</label>
              <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div class="col-12">
              <label for="address2" class="form-label">Address 2 <span class="text-body-secondary">(Optional)</span></label>
              <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
            </div>

            <div class="col-md-5">
              <label for="country" class="form-label">Country</label>
              <select class="form-select" id="country" required>
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid country.
              </div>
            </div>

            <div class="col-md-4">
              <label for="state" class="form-label">State</label>
              <select class="form-select" id="state" required>
                <option value="">Choose...</option>
                <option>California</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>

            <div class="col-md-3">
              <label for="zip" class="form-label">Zip</label>
              <input type="text" class="form-control" id="zip" placeholder="" required>
              <div class="invalid-feedback">
                Zip code required.
              </div>
            </div>
          </div>

          <hr class="my-4">

          <h4 class="mb-3">Payment</h4>

          <div class="my-3">
            <div class="form-check">
              <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required>
              <label class="form-check-label" for="credit">Credit card</label>
            </div>
            <div class="form-check">
              <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required>
              <label class="form-check-label" for="debit">Debit card</label>
            </div>
            <div class="form-check">
              <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required>
              <label class="form-check-label" for="paypal">PayPal</label>
            </div>
          </div>

          <div class="row gy-3">
            <div class="col-md-6">
              <label for="cc-name" class="form-label">Name on card</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" >
              <small class="text-body-secondary">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>

            <div class="col-md-6">
              <label for="cc-number" class="form-label">Credit card number</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" >
              <div class="invalid-feedback">
                Credit card number is required
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-expiration" class="form-label">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" >
              <div class="invalid-feedback">
                Expiration date required
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-cvv" class="form-label">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" >
              <div class="invalid-feedback">
                Security code required
              </div>
            </div>
          </div>

          <hr class="my-4">

          <button class="w-100 btn btn-primary btn-lg" type="button" onclick="checkout()" id="checkoutButton">Continue to checkout</button>
        </form>
      </div>
    </div>
  </main>
</div>
        `;
        function checkFields() {
          var firstName = document.getElementById("firstName").value;
          var lastName = document.getElementById("lastName").value;
          var addresscheck = document.getElementById("address").value;
          var country = document.getElementById("country").value;
          var state = document.getElementById("state").value;
          var zipcheck = document.getElementById("zip").value;
          var ccName = document.getElementById("cc-name").value;
          var ccNumber = document.getElementById("cc-number").value;
          var ccExp = document.getElementById("cc-expiration").value;
          var ccCVV = document.getElementById("cc-cvv").value;
        
          if (firstName && lastName && addresscheck && country && state && zipcheck && ccName && ccNumber && ccExp && ccCVV) {
            document.getElementById("checkoutButton").disabled = false;
          } else {
            document.getElementById("checkoutButton").disabled = true;
          }
        }
        
        document.getElementById("firstName").addEventListener("input", checkFields);
        document.getElementById("lastName").addEventListener("input", checkFields);
        document.getElementById("address").addEventListener("input", checkFields);
        document.getElementById("country").addEventListener("change", checkFields);
        document.getElementById("state").addEventListener("change", checkFields);
        document.getElementById("zip").addEventListener("input", checkFields);
        document.getElementById("cc-name").addEventListener("input", checkFields);
        document.getElementById("cc-number").addEventListener("input", checkFields);
        document.getElementById("cc-expiration").addEventListener("input", checkFields);
        document.getElementById("cc-cvv").addEventListener("input", checkFields);
        
        // Initially check fields on page load
        checkFields();

        // Get all existing cart item elements
        const existingItems = document.querySelectorAll('.cart-item');
        // Iterate through each existing item and remove if quantity is zero
        existingItems.forEach(item => {
            const productName = item.querySelector('span').textContent;
            if (cart.get(productName) === 0) {
                item.remove(); // Remove the item from the DOM
            }
        });
        let totalSum = 0;
        const priceSum = document.getElementById("pricesum");
        // Iterate through each item in the cart
        cart.forEach((product, productName) => {
            // Check if quantity is greater than zero
            if (product.quantity > 0) {
                if(!cartContainer.querySelector(`[data-product="${productName}"]`)) {
                    const totalPrice = product.quantity * product.price;
                    totalSum += totalPrice;
                    const cartBox = document.getElementById('cart-box');
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('cart-item');
                    itemDiv.dataset.product = productName;
                    itemDiv.innerHTML = `
                    <h6 class="my-0">${productName}</h6>
                    <a href="" onclick="removeFromCart('${productName}')">Remove</a>
                    <small class="text-body-secondary">Quantity: ${product.quantity}</small>
                    <small class="text-body-secondary">Price: $${totalPrice.toFixed(2)}</small>
                    <br><br>
                    `;
                  
                    cartBox.appendChild(itemDiv);

                    priceSum.textContent = `$${totalSum.toFixed(2)}`;

                } else {
                    updateTotalPriceAndQuantity(productName);
                }

            }
        });
    }
}

// Call renderCartWithDeleteButtons() on page load to render the initial cart display with delete buttons
window.addEventListener('load', renderCartWithDeleteButtons);


const checkout = async () => {
    const storedUserData = localStorage.getItem("user");
    const address = document.getElementById("address").value;
    const state = document.getElementById("state").value;
    const zipcode = document.getElementById("zip").value;

    // Check if user data is available in localStorage
    if (storedUserData) {
        // Parse the JSON string back into a JavaScript object
        const userData = JSON.parse(storedUserData);
        
        const orderDetails = Array.from(cart.values()).map(product => ({
            user_id: userData.account_id,
            product_id: product.id,
            quantity: product.quantity,
            address: address,
            state: state,
            zip: zipcode
        }));
        
        // Send the order details to the backend server
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails)
        };
        
        fetch('http://localhost:8080/checkout', requestOptions)
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem('cart');
                    localStorage.removeItem('cartCount');
                    window.alert("Purchase complete :D");
                    setTimeout(function() {
                        window.location.href = "HomePage.html?home=cover";
                    }, 2000);


                } else {
                    // Request failed with an error status code
                    // You can handle the error here, for example, by displaying an error message
                    throw new Error('Failed to submit order. Status: ' + response.status);
                }
            })
            .catch(error => {
                // Handle error
                console.error('Error submitting order:', error.message);
            });
    }
}
