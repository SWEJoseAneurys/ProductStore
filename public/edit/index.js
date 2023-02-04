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