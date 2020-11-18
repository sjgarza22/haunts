class Haunts {
    constructor(name, description, city, state, rating=0) {
        this.name = name;
        this.description = description;
        this.city = city;
        this.state = state;
        this.rating = rating;
    }

    createCard(container) {
        const cardContainer = document.createElement('DIV');
        const newHauntCard = document.createElement('DIV');
        const cardBody = document.createElement('DIV');
        const cardTitle = document.createElement('H5');
        const cardDescription = document.createElement('P');

        cardContainer.classList.add('col-md-4', 'col-sm-6', 'cell-box');
        newHauntCard.classList.add("card", "idea-listings");
        cardBody.classList.add('card-body');
        cardTitle.classList.add('card-header');
        cardDescription.classList.add('card-text');

        cardTitle.innerHTML = this.name;
        cardDescription.innerHTML = this.description;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDescription);
        newHauntCard.append(cardBody);
        cardContainer.append(newHauntCard);
        container.append(cardContainer);
    }

    createPage(container) {
        const pageContainer = document.createElement('DIV');
        const pageTitle = document.createElement('H2');
        const pageBody = document.createElement('DIV');
    }
}