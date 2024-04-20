const url ="http://localhost:8080/register";

async function registerUser() {
    const verifyPassword = document.getElementById("password-repeat").value;

    const accountData = {
        fName: document.getElementById("fName").value,
        lName: document.getElementById("lName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    

    if(accountData.password !== verifyPassword){
        window.alert("Passwords do not match.");
        return;
    }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(accountData),
            redirect: "follow"
        }

        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error('Email already exists!');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = "../Login/loginPage.html"; 
        } catch (error) {
            console.error('There was an error!', error);
            const errorMessageElement = document.getElementById("error-message");
            errorMessageElement.innerHTML = error.message;
        }
}