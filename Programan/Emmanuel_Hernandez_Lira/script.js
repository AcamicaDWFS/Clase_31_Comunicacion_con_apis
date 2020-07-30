const checkStatusAndParse = (res) => {
  if (!res.ok) {
    throw new Error(`Status code error: ${res.status}`);
  }

  return res.json();
};

async function getWeatherInfo() {
  const ipRes = await fetch("https://api.my-ip.io/ip.json");
  const ipData = await checkStatusAndParse(ipRes);
  const ipAddress = ipData.ip;

  const cityRes = await fetch(`http://ipwhois.app/json/${ipAddress}`);
  const cityData = await checkStatusAndParse(cityRes);
  const cityName = cityData.city;

  const weatherAPIKey = "";
  const query = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherAPIKey}`;
  const weatherRes = await fetch(encodeURI(query));
  const weatherData = await checkStatusAndParse(weatherRes);
  const temperature = weatherData.main.temp;

  return { city: cityName, temp: temperature };
}

async function getMovieInfo(movieTitle) {
  const ombdAPIKey = "";
  const query = `https://www.omdbapi.com/?apikey=${ombdAPIKey}&t=${movieTitle}`;
  const ombdRes = await fetch(encodeURI(query));
  const movieData = await checkStatusAndParse(ombdRes);

  return {
    title: movieData.Title,
    year: movieData.Year,
    runtime: movieData.Runtime,
    director: movieData.Director,
    poster: movieData.Poster,
  };
}

function createCard(movieData) {
  const card = document.createElement("div");
  card.classList.add("card");

  const moviePoster = document.createElement("img");
  moviePoster.src = movieData.poster;
  moviePoster.setAttribute("alt", "Movie poster.");

  const cardInfo = document.createElement("div");

  const title = document.createElement("h2");
  title.innerText = movieData.title;

  const year = document.createElement("p");
  year.innerText = `Año: ${movieData.year}`;

  const runtime = document.createElement("p");
  runtime.innerText = `Duración: ${movieData.runtime}`;

  const director = document.createElement("p");
  director.innerText = `Director: ${movieData.director}`;

  cardInfo.append(title, year, runtime, director);

  card.append(moviePoster, cardInfo);

  main.append(card);
}

getWeatherInfo()
  .then((data) => {
    cityHtml.innerText = data.city;
    tempHtml.innerText = `${data.temp}°`;
  })
  .catch((err) => console.error(err));

getMovieInfo("Scarface")
  .then((data) => {
    createCard(data);
  })
  .catch((err) => console.error(err));

const cityHtml = document.querySelector("#city");
const tempHtml = document.querySelector("#temp");
const main = document.querySelector("main");
