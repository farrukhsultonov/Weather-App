const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper .querySelector('.input-part'),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input");

inputField.addEventListener("keyup", e => {
    // if user pressed enter and input value is not empty
    if(e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
});

function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}}&appid=${c159e57aaf8500e24808d9b51cb3be68}`;
    fetch(api).then(response => console.log(response.json()));
}