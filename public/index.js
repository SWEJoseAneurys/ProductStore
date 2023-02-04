console.log("js file connected");

//Navbar; create buttons for navigation to respective pages
let findNavClick = document.getElementById('find-click');
let createNavClick = document.getElementById('create-click');
let deleteNavClick = document.getElementById('delete-click');

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

        itemContainer.addEventListener("click", () => {
            console.log("click", item._id);
            window.location.href=`./snack/?id=${item._id}`
        })
        parentContainer.appendChild(itemContainer);
    });
}

getAndDisplayData();
//display data on screen