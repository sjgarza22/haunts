class Haunts {
    constructor(id, name, description, city, state, rating=0) {
        this.id = id
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
        const cardTitle = document.createElement('DIV');
        const cardDescription = document.createElement('P');

        cardContainer.classList.add('col', 'mb-4');
        newHauntCard.classList.add("card", "text-white", "bg-dark", "h-100");
        //newHauntCard.style.width = '20rem';
        cardBody.classList.add('card-body');
        cardTitle.classList.add('card-header');
        cardDescription.classList.add('card-text');

        cardTitle.innerHTML = this.name;
        cardDescription.innerHTML = this.text_truncate(this.description, 150);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDescription);
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