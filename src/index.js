const mainUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById('login');

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