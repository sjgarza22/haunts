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
        const ratingSpirit = '<i class="fas fa-ghost"></i>';
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
        rating.innerHTML = `Rating: <div class="stars-outer"><div class="stars-inner"></div></div> ${this.ratingTotal}`;
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
    }

    createPage(container) {
        const ratingSpirit = '<i class="fas fa-ghost"></i>';
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
        ratingContainer.classList.add('row');
        ratingTotal.classList.add('col-6');
        userRating.classList.add('col-6', 'text-right');

        backButton.innerHTML = `<a href="#" id="back"><i class="fas fa-arrow-left"></i> Back to Results</a>`;
        titleElement.innerHTML = `${this.name}`;
        pageTitleContainer.append(titleElement);

        pageBody.appendChild(document.createElement('hr'));
        ratingTotal.innerHTML = `Rating: ${ratingSpirit} ${ratingSpirit} ${ratingSpirit} ${ratingSpirit} ${ratingSpirit} ${this.ratingTotal}`;
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
        const ratingSpirit = '<i class="fas fa-ghost"></i>';
        if (localStorage.jwt_token) {
            ratingElement.innerHTML = `Rating: ${ratingSpirit} ${ratingSpirit} ${ratingSpirit} ${ratingSpirit} ${ratingSpirit}`;
        } else {
            ratingElement.innerHTML = `<a href="#">Login</a> to leave a Rating`;
        }

        mainContainer.appendChild(ratingElement);
    }

    new_rating() {
        const bodyData = {rating: {
            rating: this.current_user_rating,
            haunt_id: this.id
        }}

        fetch('http://localhost:3000/ratings/new', {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
            body: JSON.stringify(bodyData)
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
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