const mainUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById('login');
    const search = document.getElementById('search-form');
    const resultsContainer = document.getElementById('results');

    function isHidden(hid) {
        if (hid.hidden == true) {
            hid.hidden = false;
        } else {
            hid.hidden = true;
        }
    }

    function loginFormHandler(e) {
        e.preventDefault();

        clearBox('results');

        const emailInput = e.target.querySelector("#login-email").value;
        const pwInput = e.target.querySelector("#login-password").value;
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
            localStorage.setItem('jwt_token', json.jwt)
        })
    }

    function searchFormHandler(e) {
        e.preventDefault();

        clearBox('results');

        const searchInput = document.getElementById("search-input").value;
        //console.log(searchInput);
        hauntsFetch(searchInput);
    }

    function hauntsFetchAll() {
        fetch(mainUrl + "/haunts", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(json => {
            json["data"].forEach(haunt => {
                console.log(haunt)
            })
        })
    }
    
    function hauntsFetch(searchLocation) {
        const bodyData = { search: { search_input: searchLocation } }

        fetch(mainUrl + "/search", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
    }

    hauntsFetchAll();

    // search.addEventListener("submit", (e) => searchFormHandler(e))
    login.addEventListener("click", (e) => loginForm(e))
    aboutLink.addEventListener("click", (e) => aboutPage(e))
})