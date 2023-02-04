//Navbar; create buttons for navigation to respective pages
let homepageClick = document.getElementById('homepage-click');
let findNavClick = document.getElementById('find-click');
let createNavClick = document.getElementById('create-click');
let deleteNavClick = document.getElementById('delete-click');

//create action when clicking to go back to homepage
homepageClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = "../"
});

//create action when clicking to find a snack
findNavClick.addEventListener('click', () => {
    // when clicked, navigate to specific food
    window.location.href = "./snack"
});

//create action when clicking to submit a new snack that takes user to create.html
createNavClick.addEventListener('click', async () => {
    //when clicked, navigate to create page
    window.location.href = "./create"
});

//create action when clicking to remove a snack that takes user to edit.html
deleteNavClick.addEventListener('click', async () => {
    //when clicked, navigate to create page
    window.location.href = "./edit"
});

let createButton = document.getElementById('create-button');

//create action when clicking to submit a new snack
createButton.addEventListener('click', async () => {
    let typeString = document.getElementById('type-input').value;
    let snackPrice = +document.getElementById('price-input').value;
    let snackPicture = document.getElementById('img-input').value;
    // packing all our data in an object
    // same as 
    // nameString: nameString
    const snack = {
        typeString,
        snackPrice,
        snackPicture
    };


    let response = await fetch('http://localhost:5000/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify(snack)
    });
    let submissionStatusTag = document.getElementById('submission-status');
    console.log(response.status);
    if (response.status === 200) {
        console.log(response);
        console.log("Great! Your snack is now on sale!!!");
        submissionStatusTag.textContent = "Submitted!";
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