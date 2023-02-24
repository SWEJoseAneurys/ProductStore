const parentContainer = document.getElementById("container");
const itemContainer = document.createElement("div");
const inventoryContainer = document.getElementById("inventory");

console.log("js running");

//get the id of snack from the URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const id = params.id;
console.log(id);
let finalData;

//configure search-bar to find snack and display on screen
let searchBar = document.getElementById("search-bar");
let searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', async () => {
    let input = searchBar.value
    //when clicked, navigate to page of snack being searched
    console.log(input);
    let response = await fetch(`/get_snack_by_name/${input}`);
    let finalResponse = await response.json();
    console.log(finalResponse[0])
    itemContainer.innerHTML = `
    <h1>Our <br/>${finalResponse[0].snack}</h1>
    <img src=${finalResponse[0].image} width="200" length="200"/>
    `
    if (finalResponse[0].quantity > 0) {
        inventoryContainer.innerHTML = `
        <h4>Try one today! ${finalResponse[0].quantity} available!</h4>
        `
    } else {
        inventoryContainer.innerHTML = `
        <h4>OUT OF STOCK!</h4>
        `
        document.getElementById("buy-button").style.display = "none";
        document.getElementById("delete-button").style.display = "none";
    }
});

// use snack's id to get data from MongoDB
const getSingleSnack = async () => {
    let response = await fetch(`http://localhost:5000/get_specific_snack/${id}`);

    finalData = await response.json();

    console.log(finalData);

// with data from MongoDB, display snack on page

    itemContainer.innerHTML = `
    <h1>Our <br/>${finalData.snack}</h1>
    <img src=${finalData.image} width="200" length="200"/>
    `

    parentContainer.appendChild(itemContainer);

    if (finalData.quantity > 0) {
        inventoryContainer.innerHTML = `
        <h4>Try one today! ${finalData.quantity} available!</h4>
        `
    } else {
        inventoryContainer.innerHTML = `
        <h4>OUT OF STOCK!</h4>
        `
        document.getElementById("buy-button").style.display = "none";
        document.getElementById("delete-button").style.display = "none";
    }

};

getSingleSnack();

//create buttons to go back to home & edit pages
let homepageClick = document.getElementById('homepage-click');
let editpageClick = document.getElementById('editpage-click');
let deleteButton = document.getElementById('delete-button');
let buyButton = document.getElementById('buy-button');
// let editSnackClick = document.getElementById('');

//create action when clicking to go back to homepage
homepageClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = "../"
});

//create action when clicking to go back to editpage
editpageClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = `../../edit/editSnack/?id=${id}`
});

//create action when buying where inventory of snack decrements
buyButton.addEventListener('click', async () => {
    console.log(finalData)
    let buyOne = +finalData.quantity - 1;
    console.log(buyOne);
    if (buyOne <= 0) {
        buyOne = 0
    };
    let response = await fetch(`http://localhost:5000/buy_snack/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify({buyOne})
    });
    console.log(response);

    location.reload()
});

//create action when deleting
deleteButton.addEventListener('click', async () => {
    console.log("deleting");
    let response = await fetch(`http://localhost:5000/delete_snack/${id}`, {
        method: "DELETE",
    });
    console.log(response);

    //return to homepage once submitted successfully,
    let redirect_Page = () => {
        if (response.status === 200) {
            let tID = setTimeout(function () {
                window.location.href = "../../";
                window.clearTimeout(tID);		// clear time out.
            }, 2000);
        //else remain on create page
        } else {
            let tID = setTimeout(function () {
                window.location.href = "./get_specific_snack/:_id";
                window.clearTimeout(tID);		// clear time out.
            }, 2000);
        };
    };
    redirect_Page();
    
});