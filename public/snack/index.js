console.log("js running");

//get the id of snack from the URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

//get value of snack associated with id within URL
console.log(params);
let id = params.id;
console.log(id);

// use snack's id to get data from MongoDB
const getSingleSnack = async () => {
    let response = await fetch(`http://localhost:5000/get_specific_snack/${id}`);

    let finalData = await response.json();

    console.log(finalData);

// with data from MongoDB, display snack on page
    
    let parentContainer = document.getElementById("container");
    let itemContainer = document.createElement("div");
    itemContainer.innerHTML = `
    <h1>Our <br/>${finalData.snack}</h1>
    <img src=${finalData.image} width="200" length="200"/>
    <p>Try one today!</p>
    <button id="buy-button">BUY!</button>
    <button id="delete-button">Remove snack</button>
    `

    parentContainer.appendChild(itemContainer);

// use this finalData to make some tags, etc.
};

getSingleSnack();



//create buttons to go back to home & edit pages
let homepageClick = document.getElementById('homepage-click');
let editpageClick = document.getElementById('editpage-click');
let deleteButton = document.getElementById('delete-button');
let buyButton = document.getElementById('buy-button');

//create action when clicking to go back to homepage
homepageClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = "../"
});

//create action when clicking to go back to editpage
editpageClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = "../edit"
});

//create action when buying
buyButton.addEventListener('click', () => {
    
});

//create action when deleting
deleteButton.addEventListener('click', () => {



    //return to homepage once submitted successfully,
    let redirect_Page = () => {
        if (response.status === 200) {
            let tID = setTimeout(function () {
                window.location.href = "../";
                window.clearTimeout(tID);		// clear time out.
            }, 5000);
        //else remain on create page
        } else {
            let tID = setTimeout(function () {
                window.location.href = "./create";
                window.clearTimeout(tID);		// clear time out.
            }, 5000);
        };
    };
    redirect_Page();
    
});