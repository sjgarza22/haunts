function logout() {
    localStorage.removeItem('jwt_token');
    loadMain();
    renderNaivation();
}

function renderNaivation() {
    const navLinksContainer = document.getElementById('nav-links');

    if (localStorage.jwt_token) {
        navLinksContainer.innerHTML = `<li class="nav-item">
                                            <a href="#" class="nav-link m-2 menu-item" id="about">About</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#" class="nav-link m-2 menu-item" id="contact">Contact</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#" class="nav-link m-2 menu-item" id="sign-out">Sign Out</a>
                                        </li>`;
        document.getElementById('sign-out').addEventListener("click", () => logout());
    } else {
        navLinksContainer.innerHTML = `<li class="nav-item">
                                            <a href="#" class="nav-link m-2 menu-item" id="about">About</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#" class="nav-link m-2 menu-item" id="contact">Contact</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#" class="nav-link m-2 menu-item" id="login">Login</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#" class="nav-link m-2 menu-item" id="sign-up">Sign Up</a>
                                        </li>`;
        
        document.getElementById('login').addEventListener("click", (e) => loginForm(e))
    }
    document.getElementById('about').addEventListener("click", (e) => aboutPage(e))
}