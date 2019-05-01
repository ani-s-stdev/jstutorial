import config from "./config.js";

const username = document.getElementById("username")
const password = document.getElementById("password")
const remember = document.getElementById("checkbox")

document.addEventListener("readystatechange", event => {
    if (event.target.readyState === "complete") {
        if (localStorage.getItem("user_id") || sessionStorage.getItem("user_id")) {
            window.location.replace(config.front+"home.html");
        }
    }
});

function login() {
    const back = config.back+"users"

    get(back.concat("?username=", username.value))
        .then(result => {
            let x = result[0] && result[0].password === password.value
            if (x) {
                if (remember.checked) localStorage.setItem("user_id", result[0].id);
                else sessionStorage.setItem("user_id", result[0].id);
                window.location.replace(config.front+"home.html");
            }
            else if (x === undefined) {
                post(back, {
                    "username": username.value,
                    "password": password.value,
                })
                    .then(result => {
                        if (remember.checked) localStorage.setItem("user_id", result.id);
                        else sessionStorage.setItem("user_id", result.id);
                        window.location.replace(config.front+"home.html");
                    })
            }
            else alert("Password is not correct!")
        })
        .catch(error => console.log(error));
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

const login_button = document.getElementById("login");
login_button.addEventListener("click", login);
