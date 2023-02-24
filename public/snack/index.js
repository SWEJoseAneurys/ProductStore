//create buttons to go back to home & edit pages
let homeNavClick = document.getElementById('home-click');
let updateNavClick = document.getElementById('update-click');

//create action when clicking to go back to homepage
homeNavClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = "../"
});

//create action when clicking to go back to editpage
updateNavClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = `../../edit/editSnack/?id=${id}`
});

//get the id of snack from the URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const id = params.id;

//define the container variables by their respective elements in the HTML file
const parentContainer = document.getElementById("main");
const itemContainer = document.createElement("div");
const inventoryContainer = document.getElementById("inventory");

//configure search-bar to find snack and display on screen
//define searchBar variable by its element in HTML file
let searchBar = document.getElementById("search-bar");
//define submit button of searchBar element in HTML file
let searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', async () => {
    //retrieve what is submitted in search field
    let input = searchBar.value
    //when clicked, navigate to page of snack being searched
    console.log(input);
    //make call to database through server route for data requested
    let response = await fetch(`/get_snack_by_name/${input}`);
    //convert the response to JSON so it is readable
    let finalResponse = await response.json();
    //return property of object at index 0 for the snack and its props/features
    console.log(finalResponse[0])
    //reflect search results on screen
    itemContainer.innerHTML = `
    <h1>Our <br/>${finalResponse[0].snack}</h1>
    <img src=${finalResponse[0].image} width="200" length="200"/>
    `
    //reflect quantity of specific snack available for purchase
    if (finalResponse[0].quantity > 0) {
        inventoryContainer.innerHTML = `
        <h4>Try one today! ${finalResponse[0].quantity} available!</h4>
        `
    } else {
        //reflect unavailable for purchase if out of stock
        inventoryContainer.innerHTML = `
        <h4>SOLD OUT!</h4>
        `
        //hide buttons to purchase and delete if snack is out of stock
        document.getElementById("buy-button").style.display = "none";
        document.getElementById("delete-button").style.display = "none";
    }
});

//create variable outside of block-scope that will be used in multiple functions
let finalData;

//create function to render specific snack details
const getSingleSnack = async () => {
    //make call to database at specific route to retrieve requested snack specifications
    let response = await fetch(`http://localhost:5000/get_specific_snack/${id}`);
    //convert to JSON for readability
    finalData = await response.json();
    //view returned data in DOM
    console.log(finalData);
    //now reflect snack and details on page through HTML
    itemContainer.innerHTML = `
    <h1>Our <br/>${finalData.snack}</h1>
    <img src=${finalData.image} width="200" length="200"/>
    `
    //add or attach the defined itemContainer div and its contents to parentContainer div
    parentContainer.appendChild(itemContainer);

    //reflect quantity of specific snack available for purchase
    if (finalData.quantity > 0) {
        inventoryContainer.innerHTML = `
        <h4>Try one today! ${finalData.quantity} available!</h4>
        `
    } else {
        //reflect unavailable for purchase if out of stock
        inventoryContainer.innerHTML = `
        <h4>SOLD OUT!</h4>
        `
        //hide buttons to purchase and delete if snack is out of stock
        document.getElementById("buy-button").style.display = "none";
        document.getElementById("delete-button").style.display = "none";
    }
};
//call function to action on pageload
getSingleSnack();

//define button variables by id of their elements in HTML file
let deleteButton = document.getElementById('delete-button');
let buyButton = document.getElementById('buy-button');

//create action when buying where inventory of snack decrements
buyButton.addEventListener('click', async () => {
    //define buyOne variable by the difference of current quantity of snack and 1 (each click to buy = 1 less item)
    //access the quantity property of the snack item (of type number, use "+" so it is recognized)
    let buyOne = +finalData.quantity - 1;
    //reflect in console to ensure accuracy
    console.log(buyOne);
    //if statement to prevent snack quantity to go below 0
    if (buyOne <= 0) {
        buyOne = 0
    };
    //call to route to update and reflect quantity after buying a snack
    let response = await fetch(`http://localhost:5000/buy_snack/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify({buyOne})
    });
    //refresh current screen for updated visual of snack inventory after purchase
    location.reload()
});

//create action when deleting
deleteButton.addEventListener('click', async () => {
    //make request at appropriate route to remove snack from inventory using unique identifier
    let response = await fetch(`http://localhost:5000/delete_snack/${id}`, {
        method: "DELETE",
    });

    //return to homepage once deleted successfully
    let redirect_Page = () => {
        if (response.status === 200) {
            let tID = setTimeout(function () {
                window.location.href = "../../";
                window.clearTimeout(tID);		// clear time out.
            }, 2000);
        //else remain on snack page
        } else {
            let tID = setTimeout(function () {
                window.location.href = "./get_specific_snack/:_id";
                window.clearTimeout(tID);		// clear time out.
            }, 2000);
        };
    };
    //call function
    redirect_Page();
});