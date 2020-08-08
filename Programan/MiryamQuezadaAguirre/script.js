//const ipApiKey = '1c67ae33adc312d33476ae4d68a09beb';
const apiKeyMovie = 'c9cf93f9';
const apiKeyCity = 'edc433ba63728d71b2099c21c308ea56'; 

let searchInputM = document.getElementById('movie');
let searchBtnMov = document.getElementById('searchMovie');



searchBtnMov.addEventListener('click', () => {
    searchMovie();
});

/*async function searchWeather(city_name) {
    //Fetch con async await
    console.log("Función search");
    async function newsSearch(city_name) {
        //let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city_name)}&appid=${apiKeyMovie}`;
		let url = "http://"+"api.openweathermap.org/data/2.5/weather?q="+city_name+"&appid="+apiKeyCity;
        const resp = await fetch(url);
        const info = await resp.json();
        return info;
    }
    //let info = newsSearch(searchInput.value);
	let info = newsSearch(city_name);
    info.then(response => {
        console.log("clima: ",response);
        const absoluteZero =s -273.15;
        let tempCelcius = response.main.temp + absoluteZero;
        //results.textContent = `Clima: ${response.weather[0].main}, Temperatura:  ${tempCelcius} °C`;
		return tempCelcius;
    }).catch(error => {
        console.log(error);
    })
}*/

async function getWeather() {
    //Fetch con async await
    //console.log("Función search");
	let nav = {"city": null, "temp":null}
    async function getIpLoc() {
		//let url = "https://www.cloudflare.com/cdn-cgi/trace" //esta url trae la ip en formato ipv6 y en text por eso se usa ipfy
        let url = "https://api.ipify.org?format=json";
        const resp = await fetch(url);
        const info = await resp.json();
		//console.info(info);
        return info;0
    }
	async function getDataCity(ip) {
		let url = "http://ipwhois.app/json/"+ip;
		console.info("url ip", url);
		const data = await fetch(url);
        const info = await data.json();
		return info;
    }
	async function searchWeather(city_name) {
        //let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city_name)}&appid=${apiKeyMovie}`;
		let url = "http://"+"api.openweathermap.org/data/2.5/weather?q="+city_name+"&appid="+apiKeyCity;
        const resp = await fetch(url);
        const info = await resp.json();
        return info;
    }
	
    let info = getIpLoc();
    info.then(response => {
        console.log(response.ip);
		let info = getDataCity(response.ip);
		return info;
    })
	.then(response => {
        console.log("data city", response.city);
		city=response.city.replace(/\s/g, '+');
		console.info("city: ",city);
		//let info = getWeather(city);
		nav.city=city;
		let weather=searchWeather(city);
		return weather;
		
    })
	.then(response => {
        console.log("data weather", response);
        let tempCelcius = response.main.temp -273.15;;
        //results.textContent = `Clima: ${response.weather[0].main}, Temperatura:  ${tempCelcius} °C`;
		//return tempCelcius;
		nav.temp=tempCelcius;
		
		paintNav(nav);
		
    })
	info.catch(error => {
        console.log(error);
    })
}

async function searchMovie() {
    //Fetch con async await
    //console.log("Función search");
	movie = document.getElementById("movie").value;
	if(movie.includes("",0)){
		movie = movie.replace(" ", "+");
	}
	console.info("pelicula: ",movie);
	let url = "http://www.omdbapi.com/?t="+movie+"&apikey="+apiKeyMovie;
	console.info("url: "+url);
    async function newsSearch(movie) {
        //let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city_name)}&appid=${apiKeyMovie}`;
        const resp = await fetch(url);
        const info = await resp.json();
		//console.info(info);
        return info;
    }
    let info = newsSearch(movie.value);
    info.then(response => {
        console.log(response);
		paintMovie(response);
    })
	info.catch(error => {
        console.log(error);
    })
}

function paintMovie(object){
	divMovie=document.getElementById("movie info");
	divMovie.innerHTML = "";
	//console.info("divMovie: ", divMovie);
	let h2 = document.createElement("h2");
	h2.innerHTML = object.Title;
	let img = document.createElement("img");
	img.src = object.Poster;

	divMovie.appendChild(img);
	divMovie.appendChild(h2);
	const arrayEntries =["Actors","Country", "Director", "Genre", "Language", "Plot"];
	
	//Object.entries(object).map(([key, value]) => {
	Object.entries(object).map(([key, value]) => {
				if (arrayEntries.includes(key))
				{
					console.log(key + ":"+ value); // ""  
					let paragraph = document.createElement("p");
					paragraph.textContent = key+": "+value;
					divMovie.appendChild(paragraph);
					
				}
	});
}

function paintNav(navObj){
	nav=document.querySelector("nav");
	let a = document.createElement("a");
	console.info(navObj);
	
	if (navObj.city.includes("+")){
			navObj.city=navObj.city.replace("+"," ");
			
		console.info("navObj.city:",navObj.city);
	}
	
	navObj.temp=navObj.temp.toFixed(2);
	console.info("navObj.temp:",navObj.temp);
	a.innerHTML = navObj.city+", temperatura: "+navObj.temp+" °C";
	nav.appendChild(a);
}
getWeather();



	