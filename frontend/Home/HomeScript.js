window.addEventListener("load", (event) => {
    displayHome();
  });

  const displayHome = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    let home = urlParams.get("home");
    if(home === "cover") {
        let Home = document.getElementById("mainDisplay");

        Home.innerHTML += `
        <style>
        body {
            background-image: url("../Images/homebackground.jpg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            opacity: 0; /* Initially set opacity to 0 */
            animation: fadeIn 1s ease-in-out forwards; /* Apply fade-in animation */
        }
    
        @keyframes fadeIn {
            from {
                opacity: 0; /* Start from fully transparent */
            }
            to {
                opacity: 1; /* Fade in to fully opaque */
            }
        }
    
        .cover-container {
            text-align: center;
        }
    </style>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" id="test">
    
        <main class="px-3">
            <h1 class="fst-italic">Save big on your first order with Prime Pick!</h1>
            <p class="lead">Discover exclusive discounts and promotions when you shop with Prime Pick for the first time. Don't miss out on the chance to save even more!</p>
            <img src="../Images/offer.png"  alt="Special Offer" />
        </main>
    
    </div>`;
    }
};

const initialLoadHandler = () => {
    let home = document.getElementById("mainDisplay");
    home.innerHTML = `
    <style>
    body {
        background-image: url("../Images/homebackground.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 0; /* Initially set opacity to 0 */
        animation: fadeIn 1s ease-in-out forwards; /* Apply fade-in animation */
    }

    @keyframes fadeIn {
        from {
            opacity: 0; /* Start from fully transparent */
        }
        to {
            opacity: 1; /* Fade in to fully opaque */
        }
    }

    .cover-container {
        text-align: center;
    }
</style>
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" id="test">

    <main class="px-3">
        <h1 class="fst-italic">Save big on your first order with Prime Pick!</h1>
        <p class="lead">Discover exclusive discounts and promotions when you shop with Prime Pick for the first time. Don't miss out on the chance to save even more!</p>
        <img src="../Images/offer.png"  alt="Special Offer" />
    </main>

</div>
    `;
    
    // Set a flag in session storage to indicate that the content has been loaded
    sessionStorage.setItem('contentLoaded', true);
}

// Check if the content has been loaded before
const isContentLoaded = sessionStorage.getItem('contentLoaded');

// If not loaded before, add event listener for initial load
if (!isContentLoaded) {
    document.addEventListener('DOMContentLoaded', initialLoadHandler);
}