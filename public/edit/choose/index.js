//create buttons to go back to home page
let homepageClick = document.getElementById('homepage-click');

//create action when clicking to go back to homepage
homepageClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = "../../"
});

//display current snacks in database available for editing
const getAndDisplayData = async () => {
    //make call to respective server route for retrieval of snacks in database
    let response = await fetch("http://localhost:5000/get_snacks");
    //set information sent back from database to server at above route as value of the variable "data"
    let data = await response.json()
    //access the div in HTML file with respective ID by creating variable with a value of the ID in document
    let parentContainer = document.getElementById("container")
    //map through data and for each item add to screen
    data.forEach(item => {
        //create a div to contain each item 
        let itemContainer = document.createElement("div");
        //define the div with its contents
        itemContainer.innerHTML = `
        <h1>${item.snack}</h1>
        <a href="./snack" target="_blank">
        <img src=${item.image} width="200" length="200"/>
        </a>
        `
        //add each newly contained and defined items to the parent div
        parentContainer.appendChild(itemContainer);

        //go to specific snack editing page once image is clicked
        itemContainer.addEventListener("click", () => {
            window.location.href=`../../edit/editSnack/?id=${item._id}`
        })

        //hide snacks from homepage if none available
        if (item.quantity < 1) {
            itemContainer.style.display = "none";
        } else {
            console.log("in stock!")
        }
    });
}

//call the function
getAndDisplayData();