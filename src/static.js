const mainContainer = document.getElementById('main');

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
        console.log(json);
        json["data"].forEach(haunt => {
            const newHaunt = new Haunts(haunt['attributes']['haunt_id'],
                                        haunt['attributes']['haunt']['name'],
                                        haunt['attributes']['haunt']['description'],
                                        haunt['attributes']['city'],
                                        haunt['attributes']['state_abbrev']);
            newHaunt.createCard(resultsContainer);
        })
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
                                    </div>
                                </div>

                                <div class="container">
                                    <div class="row row-cols-1 row-cols-md-3" id="results">
                                </div>`;
    
    document.getElementById('search-form').addEventListener("submit", (e) => searchFormHandler(e))
}