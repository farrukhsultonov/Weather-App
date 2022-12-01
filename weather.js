// require('dotenv').config()

const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img");

// const api_key = process.env.API_KEY;

let api;



inputField.addEventListener("keyup", e => {
    // if user pressed enter and input value is not empty
    if(e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation) { // if browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else {
        alert("Your browser doesn't support geolocation api");
    }
});

function onSuccess(position) {
    const{latitude, longitude} = position.coords; //getting lat and lon of the user devide from coords obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=c159e57aaf8500e24808d9b51cb3be68`;
    fetchData();
}

function onError(error) {
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c159e57aaf8500e24808d9b51cb3be68`;
    fetchData();
}

function fetchData() {
    infoTxt.innerHTML = "Getting weather details...";
    infoTxt.classList.add("pending");
    // getting api response and returning it with parsing into js obj and in another
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    if(info.cod == "404") {
    infoTxt.innerHTML = `${inputField.value} isn't a valid city name`;
    infoTxt.classList.replace("pending", "error");
    } else {
        // let's get required properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        // using custom icon according to the id which api returns us
        if(id == 800) {
            wIcon.src = "icons/clear.svg";
        } else if (id >= 200 && id <= 232) {
            wIcon.src = "icons/storm.svg";
        } else if (id >= 600 && id <= 622) {
            wIcon.src = "icons/snow.svg";
        } else if (id >= 701 && id <= 781) {
            wIcon.src = "icons/haze.svg";
        } else if (id >= 801 && id <=804) {
            wIcon.src = "icons/cloud.svg";
        } else if ((id >= 300 && id <=321) || (id >= 500 && id <= 531)) {
            wIcon.src = "icons/rain.svg";
        }

        // let's pass these values to a particular html element
        wrapper.querySelector(".temp .numb").innerHTML = Math.floor(temp);
        wrapper.querySelector(".weather").innerHTML = description;
        wrapper.querySelector(".location span").innerHTML = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    } 
}