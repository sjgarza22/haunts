class Haunts {
    constructor(id, name, description, city, state, ratingTotal=0) {
        this.id = id
        this.name = name;
        this.description = description;
        this.city = city;
        this.state = state;
        this.ratingTotal = ratingTotal;
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

        cardContainer.classList.add('col', 'mb-4');
        newHauntCard.classList.add("card", "text-white", "bg-dark", "h-100");
        cardBody.classList.add('card-body');
        cardTitle.classList.add('card-header');
        cardDescription.classList.add('card-text');
        rating.classList.add('card-text', 'text-center');
        location.classList.add('card-text');

        cardTitle.innerHTML = `<h5>${this.name}</h5>`;
        cardDescription.innerHTML = this.text_truncate(this.description, 150);
        rating.innerHTML = `Rating: ${ratingSpirit} ${ratingSpirit} ${ratingSpirit} ${ratingSpirit} ${ratingSpirit} ${this.ratingTotal}`;
        location.innerHTML = `${this.city}, ${this.state}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDescription);
        cardBody.appendChild(horizontalLine);
        cardBody.appendChild(rating);
        cardBody.appendChild(horizontalLine);
        cardBody.appendChild(location);
        newHauntCard.append(cardTitle);
        newHauntCard.append(cardBody);
        cardContainer.append(newHauntCard);
        container.append(cardContainer);
    }

    createPage(container) {
        const pageContainer = document.createElement('DIV');
        const pageTitle = document.createElement('H2');
        const pageBody = document.createElement('DIV');
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