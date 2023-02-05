//Navbar; create buttons for navigation to respective pages
let homepageClick = document.getElementById('homepage-click');
let createNavClick = document.getElementById('create-click');

//create action when clicking to go back to homepage
homepageClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = "../"
});

//create action when clicking to submit a new snack that takes user to create.html
createNavClick.addEventListener('click', async () => {
    //when clicked, navigate to create page
    window.location.href = "../create"
});

const updateSnack = async () => {
    //grab snack data from edit
    let response = await fetch(`http://localhost:5000/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        // get id and other data from your front end usind document.getElementById for example
        // body: JSON.stringify(dataObject)
    }
    );

    let finalData = await response.json();

    console.log(finalData);
    // use this finalData to m
}

// updateSnack();


// display that data in HTML