//create buttons to go back to home page
let homepageClick = document.getElementById('homepage-click');

//create action when clicking to go back to homepage
homepageClick.addEventListener('click', () => {
    // when clicked, navigate to homepage
    window.location.href = "../../"
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

        //go to specific snack editing page once image is clicked
        itemContainer.addEventListener("click", () => {
            console.log("click", item._id);
            window.location.href=`../../edit/editSnack/?id=${item._id}`
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