window.addEventListener("load", (event) => {
    getProducts();
  });

  const getProducts = async () => {
        let urlParams = new URLSearchParams(window.location.search);
        let category = urlParams.get("category");
        let keyword = urlParams.get("search");
        let URL ="";
        if (category === "Allproducts") {
          URL += "http://localhost:8080/products";
        } else if(urlParams.has("category")){
          URL += `http://localhost:8080/products/${category}`;
        } else if(urlParams.has("search")){
          URL += `http://localhost:8080/search/${keyword}`;
        }
    if(URL != "")
    {
      try { 
        let response = await fetch(URL);
        if (!response.ok) {
          if(response.status === 400){
            throw new Error("No Results Found.");
          }
        }
        let products = await response.json();
        let productBox = document.getElementById("product-box");
        products.forEach((product) => {
          productBox.innerHTML += `
          <div class="col-3 card" style="padding-bottom: 60px; position: relative;">
          <img">
            <img
              src="${product.product_image}"
              alt="${product.product_name}"
              class="rounded img-fluid"
              style="padding: 50px 40px;"
            />
            
            <h3>${product.product_name}</h3>
            <h4>$${product.price.toFixed(2)}</h4>
            <p>${product.description}</p>
            <p style="color: red">Only ${product.quantity} left in stock!</p>

            <button id="add-to-cart" class="btn btn-primary" 
            style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);" 
            onclick='addToCart(${JSON.stringify(product)})'>Add to cart</button>   
          </div>
          `;
        });
      } catch (error) {
        console.error(error);
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.innerHTML = "No Results Found.";
      }
    }
};


const searchProducts = async () => {
  // Get the search keyword from the input field

  var keyword = document.getElementById("keyword-search").value.trim();
  // Redirect to HomePage.html with the search query appended
  window.location.href = "HomePage.html?search=" + encodeURIComponent(keyword);
  getProducts();
};