//Navbar; create buttons for navigation to respective pages
let createNavClick = document.getElementById('create-click');
let updateNavClick = document.getElementById('update-click');

//create action when clicking to submit a new snack that takes user to create.html
createNavClick.addEventListener('click', () => {
    //when clicked, navigate to create page
    window.location.href = "./create"
});

//create action when clicking to remove a snack that takes user to edit.html
updateNavClick.addEventListener('click', () => {
    //when clicked, navigate to create page
    window.location.href = "./edit/choose"
});

//make fetch request for all items
const getAndDisplayData = async () => {
    let response = await fetch("http://localhost:5000/get_snacks");
    let data = await response.json()
    console.log(data);
    let parentContainer = document.getElementById("container")
    //map through data and for each item add to screen
    data.forEach(item => {
        let itemContainer = document.createElement("div");
        itemContainer.innerHTML = `
        <h1>${item.snack}</h1>
        <a href="./snack" target="_blank">
        <img src=${item.image} width="200" length="200"/>
        </a>
        `

        //go to specific snack page once image is clicked
        itemContainer.addEventListener("click", () => {
            console.log("click", item._id);
            window.location.href=`./snack/?id=${item._id}`
        })
        parentContainer.appendChild(itemContainer);

        //hide snacks from homepage if none available
        if (item.quantity < 1) {
            itemContainer.style.display = "none";
        } else {
            console.log("in stock!")
        }
    });
}

getAndDisplayData();
//display data on screen