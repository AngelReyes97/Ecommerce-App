const url = "http://localhost:8080/login"

async function login() {
    const credentials = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(credentials),
        redirect: "follow"
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Sorry, Email or Password not recognized.');
            } else {
                throw new Error('Network response was not ok');
            }
        }
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "../Home/HomePage.html"; 
    } catch (error) {
        console.error('There was an error!', error);
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.innerHTML = error.message;
    }
}