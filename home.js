import config from "./config.js";

const back_products = config.back+"products"
const user_id = sessionStorage.getItem("user_id") || localStorage.getItem("user_id")
const back_user_products = config.back+"users/"+user_id+"/products"

const table = document.getElementById("products")
const name = document.getElementById("name")
const price = document.getElementById("price")

document.addEventListener("readystatechange", event => {
    if (event.target.readyState === "complete") {
        if (!user_id) {
            window.location.replace(config.front+"index.html");
        }
    }
    get(back_user_products)
        .then(result=>{
            result.forEach(function (product) {
                console.log(product.name)
                let row = table.insertRow(2);
                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                cell0.innerHTML = product.name;
                cell1.innerHTML = product.price;
            })
        })
});

function add_product() {
    post(back_products, {
        "userId": user_id,
        "name": name.value,
        "price": price.value,
    })
        .then(result => {
            console.log(result);
            let row = table.insertRow(2);
            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            cell0.innerHTML = name.value;
            cell1.innerHTML = price.value;
        })
        .catch(error => console.log(error))
}



function get(url) {
    return fetch(url)
        .then(response => response.json())
}

function post(url, data) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
}

const add_product_button = document.getElementById("add_product")
add_product_button.addEventListener("click", add_product)
