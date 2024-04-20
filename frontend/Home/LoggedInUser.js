document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the stored user data from localStorage
    const storedUserData = localStorage.getItem("user");

    // Check if user data is available in localStorage
    if (storedUserData) {
        // Parse the JSON string back into a JavaScript object
        const userData = JSON.parse(storedUserData);
        
        // Access specific properties of the user data and display them
        document.getElementById("userDataDisplay").textContent = userData.fName;
    } else {
        // If no user data is aSvailable, display a message or handle accordingly
        document.getElementById("userDataDisplay").textContent = "No user data found.";
    }
});