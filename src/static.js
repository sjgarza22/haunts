const aboutLink = document.getElementById("about");
const contactLink = document.getElementById("contact");
const resultsContainer = document.getElementById('results');

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

function aboutPage(e) {
    e.preventDefault();

    clearBox('results');

    const aboutContainer = document.createElement('DIV');
    const aboutTitle = document.createElement('H2');
    const aboutPara = document.createElement('P');

    aboutContainer.classList.add('row', 'col-md', 'd-flex', 'justify-content-center');
    aboutTitle.innerHTML = 'ABOUT';
    aboutPara.innerHTML = 'Welcome to Haunts! This site was created with the intention of allowing users to search for local Paranormal site.'
    aboutContainer.append(aboutTitle);
    aboutContainer.append(aboutPara);
    resultsContainer.append(aboutContainer);
}

function contactPage(e) {
    e.preventDefault();

    const contactContainer = document.createElement('DIV');
    const contactTitle = document.createElement('H2');
}

function loginForm(e) {
    e.preventDefault();

    clearBox('results');

    resultsContainer.innerHTML = `<div class='col-md d-flex justify-content-center' id='form-1'>
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
                                </div>`
    document.getElementById('login-form').addEventListener("submit", (e) => loginFormHandler(e))
}