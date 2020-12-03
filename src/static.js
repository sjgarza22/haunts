const mainContainer = document.getElementById('main');
const resultsContainer = document.getElementById('results');
let resultsArray = [];

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

function isHidden(hid) {
    if (hid.hidden == true) {
        hid.hidden = false;
    } else {
        hid.hidden = true;
    }
}

function aboutPage(e) {
    e.preventDefault();

    clearBox('main');
    const outerContainer = document.createElement('DIV');
    const aboutContainer = document.createElement('DIV');
    const aboutTitle = document.createElement('DIV');
    const aboutPara = document.createElement('DIV');

    outerContainer.classList.add('container');
    aboutContainer.classList.add('row', 'justify-content-center');
    aboutTitle.classList.add('col-8', 'pt-3', 'pb-3');
    aboutPara.classList.add('col-8');
    aboutTitle.innerHTML = '<h2>ABOUT</h2>';
    aboutPara.innerHTML = '<p>Welcome to Haunts! This site was created with the intention of allowing users to search for local Paranormal sites.</p>'
    aboutContainer.append(aboutTitle);
    aboutContainer.append(aboutPara);
    outerContainer.append(aboutContainer);
    mainContainer.append(outerContainer);
}

function contactPage(e) {
    e.preventDefault();

    const contactContainer = document.createElement('DIV');
    const contactTitle = document.createElement('H2');
}

function loginFormHandler(e) {
    e.preventDefault();

    //clearBox('main');

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
        if (json.jwt){
            localStorage.setItem('jwt_token', json.jwt);
            loadMain();
            renderNaivation();
        } else {
            loadMain();
        }
    })
}

function loginForm(e) {
    e.preventDefault();

    clearBox('main');

    mainContainer.innerHTML = `<div class='col-md d-flex justify-content-center' id='form-1'>
                                    <form id='login-form'>
                                        <div class='form-group'>
                                        <h5 class="text-white">Email</h5>
                                        <input type="email" class="form-control" id="login-email" aria-describedby="emailHelp">
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div class="form-group">
                                        <h5 class="text-white">Password</h5>
                                        <input type="password" class="form-control" id="login-password">
                                        </div>
                                        <button type="submit" class="btn btn-primary" id="submit">Submit</button>
                                    </form>
                                </div>`;
    document.getElementById('login-form').addEventListener("submit", (e) => loginFormHandler(e));
}

function searchFormHandler(e) {
    e.preventDefault();

    clearBox('results');

    const searchInput = document.getElementById("search-input").value;
    //console.log(searchInput);
    hauntsFetch(searchInput);
}

function hauntsFetch(searchLocation) {
    const bodyData = { search: { 
                        search_input: searchLocation,
                        search_area: 25
                    }}

    fetch(mainUrl + "/search", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(json => {
        const resultsContainer = document.getElementById('results');
        console.log(json);
        json["data"].forEach(haunt => {
            const newHaunt = new Haunts(haunt['attributes']['haunt_id'],
                                        haunt['attributes']['haunt']['name'],
                                        haunt['attributes']['haunt']['description'],
                                        haunt['attributes']['city'],
                                        haunt['attributes']['state_abbrev']);
            newHaunt.createCard(resultsContainer);
            resultsArray.push(newHaunt);
        })
    })
}

function sort_results() {
    const resultsContainer = document.getElementById('results');
    resultsArray.sort(function(a, b) {
        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
      clearBox('results');
    resultsArray.forEach(haunt => {
        
        haunt.createCard(resultsContainer);
    })
}

function loadMain() {
    clearBox('main');

    mainContainer.innerHTML = `<div class="container" id="search">
                                    <div class="row">
                                        <div class="col-md d-flex justify-content-center py-5">
                                            <form id="search-form">
                                                <input type="text" id="search-input" name="search" placeholder="Enter City, State or ZipCode" size="50">
                                                <input type="Submit" value="Search">
                                            </form>
                                        </div>
                                        <div class="col-md">
                                            <button id="sort">Sort A-Z</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="container" id="outer-results">
                                    <div class="row row-cols-1 row-cols-md-3" id="results">
                                    </div>
                                </div>`;
    
    document.getElementById('search-form').addEventListener("submit", (e) => searchFormHandler(e))
    document.getElementById('sort').addEventListener("click", () => sort_results())
}