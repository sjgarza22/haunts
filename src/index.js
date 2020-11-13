const mainUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById('login');
    const loginForm = document.getElementById("login-form");
    const container = document.getElementById('results');

    loginForm.addEventListener("submit", (e) => loginFormHandler(e))

    function isHidden(hid) {
        if (hid.hidden == true) {
            hid.hidden = false;
        } else {
            hid.hidden = true;
        }
    }

    function loginFormHandler(e) {
        e.preventDefault()
        const emailInput = e.target.getElementById("login-email").value
        const pwInput = e.target.getElementById("login-password").value
        loginFetch(emailInput, pwInput)
    }

    function loginFetch(email, password){
        const bodyData = {user: {
                email: email,
                password: password
            }
        }

        fetch(mainUrl + "/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
    }

    login.addEventListener("click", (e) => {
        e.preventDefault();
        loginButton = document.getElementById("form-1");
        isHidden(loginButton);
    })

    let hotel = new Haunts('Haunted Hotel', "This legendary Haunted Hotel has thrilled guests from all over the world.", "Boston", "MA", 5);
    let asylum = new Haunts('The Asylum', "This infamous Asylum has seen it's fair share of tragedy.", "Here", "Iowa", "3");
    let bridge = new Haunts('Wailing Bridge', 'Visitors to the Wailing Bridge swear that they have heard a crying woman at night.', 'Denton', 'TX', 4);

    hotel.createCard(container);
    asylum.createCard(container);
    bridge.createCard(container);
})