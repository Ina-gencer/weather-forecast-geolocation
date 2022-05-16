const apiOne = {
  endpoint: "https://ipgeolocation.abstractapi.com/v1/",  //geolocation apiOne
  key:"997e21d263194463b5fc52f97a738d5b"
}

const api = {
  endpoint: "https://api.openweathermap.org/data/2.5/",
  key: "fc2f6b2e55ffae41a401f6b9c0a28c08"
}

function enter(e) {
  if(e.keyCode === 13) {
      getInfo(input.value); //вводим функцию, которая отвечает за поиск информации
  }
}

let cityInput = getApi();       
async function getApi() {            //  доступ к геолокации
const resOne = await fetch(`${apiOne.endpoint}?api_key=${apiOne.key}`);
const resultOne = await resOne.json();      //запрос на данные json
console.log(resultOne);
getInfo(resultOne.city) ;  // передаём city в результат полученный по геолокации
getShow(resultOne)
}
getApi();
function getShow(resultOne) {
   let cityInput = document.querySelector('#city');      //  доступ к местоположжнию, городу
  cityInput.textContent = `${resultOne.city}, ${resultOne.country}`;
 
}
const input = document.querySelector('#input');
input.addEventListener('keydown', enter);

async function getInfo(date) {
  const res = await fetch(`${api.endpoint}weather?q=${date}&units=metric&appID=${api.key}&lang=ru`);
  const result = await res.json();
  displayResult(result);  // вводим функцию, которая отвечает за отображение результата на экране
}




function displayResult(result) {
let city = document.querySelector('#city');
city.textContent = `${result.name}, ${result.sys.country}`;   //выводим на экран название города и страну

let temperature = document.querySelector('#temperature');
temperature.innerHTML = `🌡${Math.round(result.main.temp)}<span>°</span>`;

let feelsLike = document.querySelector('#feelsLike');
feelsLike.innerHTML = `Ощущается: ` + `${Math.round(result.main.feels_like)}<span>°</span>`;

getOurdate();


let conditions = document.querySelector("#conditions");
conditions.textContent = `⛅ ${result.weather[0].description}`;

let windSpeed = document.querySelector("#speed");
windSpeed.innerHTML = `<img src="https://cdn.glitch.me/ebb6cba1-039e-4e28-82a8-159d29e5bcdd%2F%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9%20%D0%B2%D0%B5%D1%82%D0%B5%D1%80.png?v=1639332323975" width="16px">  ${result.wind.speed.toFixed(
  1
)}<span> м/с</span>`;

let humidity = document.querySelector("#humidity");
humidity.innerHTML = `💧 ${result.main.humidity} <span> %</span>`;

let pressure = document.querySelector("#pressure");
let resPressure = `${result.main.pressure}`;
let newPressure = ((resPressure * 7.500616827041698) / 10).toFixed();
console.log(newPressure);
pressure.innerHTML = `<img src="https://cdn.glitch.me/ebb6cba1-039e-4e28-82a8-159d29e5bcdd%2Fbarometr.png?v=1639332414878" width="16px">  ${newPressure}<span>мм рт ст</span>`;

let min = document.querySelector("#min");
let max = document.querySelector("#max");
min.innerHTML =
  "Mин. t° : " + `${Math.round(result.main.temp_min)}<span>°</span>`;
max.innerHTML =
  "Maкс. t°: " + `${Math.round(result.main.temp_max)}<span>°</span>`;
}

function getOurdate() {
const now = new Date();
console.log(now);
const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
let day = days[now.getDay()];
let today = now.getDate();
const months = [
  "Январь",
  "Февраль",
  "Mарт",
  "Aпрель",
  "Maй",
  "Июнь",
  "Июль",
  "Aвгуст",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];
let month = months[now.getMonth()];
let year = now.getFullYear();
document.querySelector("#date").textContent =
  `🗓 ${day}, ` + `${today} ` + `${month} ` + `${year}`;

let hour = now.getHours();
  let minute = now.getMinutes();
  if(minute < 10) {
    minute = "0" + seconds;
}
else if(hour < 10) {
  hour = "0" + hour;
}
else {
    minute = minute;
    hour = hour;
  }
  document.querySelector('#time').innerHTML  = `${hour}:` + `${ minute}`;
}
