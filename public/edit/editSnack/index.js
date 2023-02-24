//Navbar; create buttons for navigation to respective pages
let homepageClick = document.getElementById('homepage-click');
let createNavClick = document.getElementById('create-click');

//get the id of snack from the URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let id = params.id;

//create action when clicking to go back to homepage
homepageClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = "../../"
});

//create action when clicking to submit a new snack that takes user to create.html
createNavClick.addEventListener('click', async () => {
    //when clicked, navigate to create page
    window.location.href = "../../create"
});

//create the update button to submit changes to snack
let updateButton = document.getElementById('update-button');

//create action when clicking to update snack
updateButton.addEventListener('click', async () => {
    //set input values on front-end(HTML) to respective variables
    let snack = document.getElementById('type-input').value;
    let price = +document.getElementById('price-input').value;
    let image = document.getElementById('img-input').value;
    let quantity = document.getElementById('quantity-input').value;
    // create snack object containing properties above that will define/describe
    const snackObject = {
    }//write if statements that prove true to take in new value from front-end as defined  
    if (snack){
        snackObject.snack = snack;
    }
    if (price){
        snackObject.price = price;
    }
    if (image){
        snackObject.image = image;
    }
    if (quantity){
        snackObject.quantity = quantity;
    }
    //make call to server to update existing snack with newly entered data
    let response = await fetch(`http://localhost:5000/edit/editSnack/${id}`, {
        //because we are editing/PUTting new value into already established fields of snack, method for updating will be "PUT"
        method: "PUT",
        //define what is passed so that it is readable
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify(snackObject)
    });
    //communicate that the update was successful
    let updateStatusTag = document.getElementById('update-status');
    if (response.status === 200) {
        console.log("Updated!");
        updateStatusTag.textContent = "Great! Your snack has been updated!!!";
        updateStatusTag.style.color = "green";
    } else {
        console.log(response);
        updateStatusTag.textContent = "Try again";
        updateStatusTag.style.color = "red";
    };
    //render prospective snack page with updated properties once submitted successfully,
    let redirect_Page = () => {
        if (response.status === 200) {
            let tID = setTimeout(function () {
                window.location.href = `http://localhost:5000/snack/?id=${id}`;
                window.clearTimeout(tID);		// clear time out.
            }, 2000);
        //else remain on create page
        } else {
            let tID = setTimeout(function () {
                window.location.href = `../../edit/editSnack/${id}`;
                window.clearTimeout(tID);		// clear time out.
            }, 2000);
        };
    };
    redirect_Page();
});