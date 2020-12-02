class Haunts {
    constructor(id, name, description, city, state, current_user_rating=0, ratingTotal=0) {
        this.id = id
        this.name = name;
        this.description = description;
        this.city = city;
        this.state = state;
        this.ratingTotal = ratingTotal;
        this.current_user_rating = current_user_rating;
    }

    createCard(container) {
        const horizontalLine = document.createElement('hr');
        const cardContainer = document.createElement('DIV');
        const newHauntCard = document.createElement('DIV');
        const cardBody = document.createElement('DIV');
        const cardTitle = document.createElement('DIV');
        const rating = document.createElement('P');
        const location = document.createElement('P');
        const cardDescription = document.createElement('P');
        const footer = document.createElement('DIV');

        cardContainer.classList.add('col', 'mb-4');
        newHauntCard.classList.add("card", "text-white", "bg-dark", "h-100");
        cardBody.classList.add('card-body');
        cardTitle.classList.add('card-header');
        cardDescription.classList.add('card-text');
        rating.classList.add('card-text', 'text-center');
        location.classList.add('card-text');
        footer.classList.add('card-footer');

        cardTitle.innerHTML = `<h5>${this.name}</h5>`;
        cardDescription.innerHTML = this.text_truncate(this.description, 150) + "<hr>";
        rating.innerHTML = `Rating: <div class="ghosts-outer"><div class="ghosts-inner rating-${this.id}"></div></div> ${this.ratingTotal}`;
        location.innerHTML = `${this.city}, ${this.state}`;
        footer.innerHTML = `<a href="#" id="read-more-${this.id}">Read More</a>`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDescription);
        cardBody.appendChild(horizontalLine);
        cardBody.appendChild(rating);
        cardBody.appendChild(horizontalLine);
        cardBody.appendChild(location);

        newHauntCard.append(cardTitle);
        newHauntCard.append(cardBody);
        newHauntCard.append(footer);

        cardContainer.append(newHauntCard);

        container.append(cardContainer);

        document.getElementById(`read-more-${this.id}`).addEventListener('click', (e) => { this.pull_up_page(e) })
        this.total_ratings(`.rating-${this.id}`);
    }

    createPage(container) {
        const outerContainer = document.createElement('DIV');
        const innerContainer = document.createElement('DIV');
        const backButton = document.createElement('DIV');
        const pageTitleContainer = document.createElement('DIV');
        const titleElement = document.createElement('H2');
        const pageBody = document.createElement('DIV');
        const ratingContainer = document.createElement('DIV');
        const ratingTotal = document.createElement('DIV');
        const userRating = document.createElement('DIV');
        const description = document.createElement('DIV');

        outerContainer.classList.add('container', 'pt-3');
        outerContainer.id = "detailed-page";
        innerContainer.classList.add('row', 'justify-content-center');
        backButton.classList.add('col-8');
        pageTitleContainer.classList.add('col-8', 'pt-3');
        pageBody.classList.add('col-8');
        ratingContainer.classList.add('row', 'user-rating');
        ratingTotal.classList.add('col-6');
        userRating.classList.add('col-6', 'text-right');
        userRating.id = "spirit-select";

        backButton.innerHTML = `<a href="#" id="back"><i class="fas fa-arrow-left"></i> Back to Results</a>`;
        titleElement.innerHTML = `${this.name}`;
        pageTitleContainer.append(titleElement);

        pageBody.appendChild(document.createElement('hr'));
        ratingTotal.innerHTML = `Rating: <div class="ghosts-outer"><div class="ghosts-inner page-rating-${this.id}"></div></div> ${this.ratingTotal}`;
        ratingContainer.appendChild(ratingTotal);
        this.leave_rating(ratingContainer, userRating);

        description.innerHTML = `<h4>About</h4><p>${this.description}</p>`;

        pageBody.appendChild(ratingContainer);
        pageBody.appendChild(document.createElement('hr'));
        pageBody.appendChild(description);

        innerContainer.appendChild(backButton);
        innerContainer.appendChild(pageTitleContainer);
        innerContainer.appendChild(pageBody);

        outerContainer.append(innerContainer);

        container.append(outerContainer);

        document.getElementById('back').addEventListener('click', (e) => { this.return_to_results(e) })
        const rate = document.getElementsByName('rate');
        console.log(rate)
        for(const ratings of rate){
            ratings.onclick = () => { this.rating_controller(this.current_user_rating) };
        }
        this.total_ratings(`.page-rating-${this.id}`);
        document.getElementById('rating-destroy').addEventListener('click', (e) => {
            e.preventDefault();
            this.clear_rating();
        })
    }

    pull_up_page(e) {
        const main = document.getElementById('main');
        e.preventDefault();

        isHidden(document.getElementById('search'));
        isHidden(document.getElementById('outer-results'));

        this.createPage(main);
    }

    return_to_results(e) {
        e.preventDefault();

        document.getElementById('detailed-page').remove();

        isHidden(document.getElementById('search'));
        isHidden(document.getElementById('outer-results'));

    }

    leave_rating(mainContainer, ratingElement) {
        if (localStorage.jwt_token) {
            ratingElement.innerHTML = `Rating: 
            <input type="radio" name="rate" id="rate-5">
            <label for="rate-5" class="fas fa-ghost"></label>
            <input type="radio" name="rate" id="rate-4">
            <label for="rate-4" class="fas fa-ghost"></label>
            <input type="radio" name="rate" id="rate-3">
            <label for="rate-3" class="fas fa-ghost"></label>
            <input type="radio" name="rate" id="rate-2">
            <label for="rate-2" class="fas fa-ghost"></label>
            <input type="radio" name="rate" id="rate-1">
            <label for="rate-1" class="fas fa-ghost"></label>
            <a href="#" id="rating-destroy">Clear</a>`;

            this.get_rating();
        } else {
            ratingElement.innerHTML = `<a href="#">Login</a> to leave a Rating`;
        }

        mainContainer.appendChild(ratingElement);
    }

    rating_controller(current_rating) {
        let new_user_rating = 0;
        if (document.getElementById('rate-5').checked) {
            new_user_rating = 5;
        } else if (document.getElementById('rate-4').checked) {
            new_user_rating = 4;
        } else if (document.getElementById('rate-3').checked) {
            new_user_rating = 3;
        } else if (document.getElementById('rate-2').checked) {
            new_user_rating = 2;
        } else {
            new_user_rating = 1;
        }

        if (current_rating == 0) {      
            this.new_rating(new_user_rating, this.id);
        } else {
            // will call patch method
            this.patch_rating(new_user_rating);
        }
    }

    new_rating(rating, id) {
        const bodyData = {rating: {
            rating: rating,
            haunt_id: id
        }}

        fetch('http://localhost:3000/ratings', {
            method: 'POST',
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.jwt_token}`
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
    }

    get_rating() {
        fetch(`http://localhost:3000/haunts/${this.id}/ratings`, {
            method: 'GET',
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.jwt_token}`
            }
        })
        .then(response => response.json())
        .then(json => {
            const rating = json['data'][0]['attributes']['rating'];
            if (rating != null && rating > 0) {
                this.current_user_rating = rating;
                document.getElementById(`rate-${rating}`).checked = true;
                document.getElementById('spirit-select').setAttribute("data-rating-id", json['data'][0]['attributes']['id']);
            }
        })
    }

    patch_rating(newRating) {
        const rating_id = document.getElementById('spirit-select').getAttribute("data-rating-id");
        const bodyData = {rating: {
            id: rating_id,
            rating: newRating,
            haunt_id: this.id
        }}

        fetch(`http://localhost:3000/ratings/${rating_id}`, {
            method: 'PATCH',
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.jwt_token}`
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            const rating = json['data']['attributes']['rating'];
            this.current_user_rating = rating;
        })
    }

    clear_rating() {
        const rating_id = document.getElementById('spirit-select').getAttribute("data-rating-id");
        const bodyData = {rating: {
            rating: rating_id,
            haunt_id: this.id
        }}

        fetch(`http://localhost:3000/ratings/${rating_id}`, {
            method: 'DELETE',
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.jwt_token}`
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.getElementById(`rate-${this.current_user_rating}`).checked = false;
            this.current_user_rating = 0;
        })
    }

    total_ratings(selectors) {
        fetch(`http://localhost:3000/haunts/${this.id}`, {
            method: 'GET',
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.jwt_token}`
            }
        })
        .then(response => response.json())
        .then(json => {
            const ratings = json['data']['attributes']['ratings'];
            let sum = 0;
            ratings.forEach(rating => {
                sum += rating.rating;
            })
            this.ratingTotal = sum / ratings.length;
            this.ghost_rating_view(selectors);
        })
    }

    ghost_rating_view(selectors) {
        const spiritTotal = 5;
        const ghostPercentage = (this.ratingTotal / spiritTotal) * 100;
        
        const ghostPercentageRounded = `${(Math.round(ghostPercentage / 10) * 10)}%`;
        console.log(ghostPercentageRounded);
        
        document.querySelector(`${selectors}`).style.width = ghostPercentageRounded;
    }

    text_truncate(str, length) {
        const ending = '...';

        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
    }
}