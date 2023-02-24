//Navbar; create buttons for navigation to respective pages
let homepageClick = document.getElementById('homepage-click');
let updateNavClick = document.getElementById('update-click');

//create action when clicking to go back to homepage from navbar
homepageClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = "../"
});

//create action when clicking to update an existing snack from navbar
updateNavClick.addEventListener('click', async () => {
    //when clicked, navigate to create page
    window.location.href = "../edit/choose"
});

//create the submit button to create new snack
let createButton = document.getElementById('create-button');

//create action when clicking to submit a new snack
createButton.addEventListener('click', async () => {
    //set input values on front-end(HTML) to respective variables
    let typeString = document.getElementById('type-input').value;
    let snackPrice = +document.getElementById('price-input').value;
    let snackPicture = document.getElementById('img-input').value;
    let snackQuantity = document.getElementById('quantity-input').value;
    // create snack object containing properties above that will define/describe
    const snack = {
        typeString,
        snackPrice,
        snackPicture,
        snackQuantity,
    };

    //make call to respective server route for submission of new data to the database
    let response = await fetch('http://localhost:5000/create', {
        //because we are creating/submitting/POSTing, the method for this fetch will be POST
        method: "POST",
        headers: {
            //define what is being passed so that it is readable
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify(snack)
    });
    //communicate if submission successful
    let submissionStatusTag = document.getElementById('submission-status');
    if (response.status === 200) {
        //Display this message in the DOM
        console.log("Submitted!");
        //Display this message to user/shopper
        submissionStatusTag.textContent = "Congratulations! Your snack is now on sale!!!";
        submissionStatusTag.style.color = "green";
    } else {
        //Reflect the failure response in the DOM
        console.log(response);
        //Prompt user/shopper to check for errors and try again
        uploadStatusTag.textContent = "Try again";
        uploadStatusTag.style.color = "red";
    };
    //return to homepage once submitted successfully,
    let redirect_Page = () => {
        if (response.status === 200) {
            let tID = setTimeout(function () {
                window.location.href = "../";
                window.clearTimeout(tID);		// clear time out.
            }, 2000);
        //else remain on create page
        } else {
            let tID = setTimeout(function () {
                window.location.href = "./create";
                window.clearTimeout(tID);		// clear time out.
            }, 2000);
        };
    };
    redirect_Page();
});