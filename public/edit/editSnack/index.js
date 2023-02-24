//Navbar; create buttons for navigation to respective pages
let homepageClick = document.getElementById('homepage-click');
let createNavClick = document.getElementById('create-click');
const updatingSnack = document.getElementById('updating-snack');

//get the id of snack from the URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let id = params.id;
console.log(id);


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

// const updateSnack = async () => {
//     //grab snack data from edit
//     let response = await fetch(`http://localhost:5000/edit/editSnack/`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         // get id and other data from your front end usind document.getElementById for example
//         // body: JSON.stringify(dataObject)
//     }
//     );

//     let finalData = await response.json();

//     console.log(finalData);
//     // use this finalData to m
// }

let updateButton = document.getElementById('update-button')
//create action when clicking to update snack
updateButton.addEventListener('click', async () => {
    let snack = document.getElementById('type-input').value;
    let price = +document.getElementById('price-input').value;
    let image = document.getElementById('img-input').value;
    let quantity = document.getElementById('quantity-input').value;
    const snackObject = {
    } 
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
    console.log("updating");
    let response = await fetch(`http://localhost:5000/edit/editSnack/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify(snackObject)
    })
    console.log(response)


    let submissionStatusTag = document.getElementById('submission-status');
    console.log(response.status);
    if (response.status === 200) {
        console.log(response);
        console.log("Great! Your snack has been updated!!!");
        submissionStatusTag.textContent = "Updated!";
        submissionStatusTag.style.color = "green";
    } else {
        console.log(response);
        console.log("Uh-oh! Something went wrong..");
        window.prompt("Oops! Something went wrong..try again")
        console.log;
        uploadStatusTag.textContent = "Try again";
        uploadStatusTag.style.color = "red";
    };
    //return to homepage once submitted successfully,
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