const mainUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById('login');

    function loginFormHandler(e) {
        e.preventDefault();

        clearBox('main');

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
            // localStorage.getItem('jwt_token')
            localStorage.setItem('jwt_token', json.jwt);
            renderNaivation();
        })
    }

    // function hauntsFetchAll() {
    //     fetch(mainUrl + "/haunts", {
    //         method: "GET",
    //         headers: {"Content-Type": "application/json"}
    //     })
    //     .then(res => res.json())
    //     .then(json => {
    //         json["data"].forEach(haunt => {
    //             console.log(haunt)
    //             const newHaunt = new Haunts(haunt['attributes']['id'],
    //                                         haunt['attributes']['name'],
    //                                         haunt['attributes']['description'],
    //                                         haunt['attributes']['haunts_location']['city'],
    //                                         haunt['attributes']['haunts_location']['state_abbrev']);
    //             newHaunt.createCard(resultsContainer);
    //         })
    //     })
    // }
    renderNaivation();
    loadMain();
})