/* async function f2() {
    let promise = Promise.resolve(1);
    let result = await promise;
}

(async () => {
    let response = await fetch('https://api.github.com/users/cyberhavok');
    console.log(response);
})();

class Animal {
    constructor(name) {
        this.name = name;
    }
    then(resolve, reject) {
        console.log(resolve);
        setTimeout(() => resolve(this.name), 1000);
    }
}

async function f3() {
    // waits for 1 second, then result becomes 2
    let result = await new Animal("Dog");
    console.log(result);
}

f3();

class Car extends Promise {
    all() {

    }
}


class Esperando {
    async esperar() {
        return await Promise.resolve(1);
    }
}

new Esperando().esperar().then(console.log);
//new Esperando().esperar().then(res => console.log(res));

async function g() {
    await Promise.reject(new Error("Whoops!"));
}

async function g2() {
    throw new Error("Whoops!");
}

async function h() {

    try {
        let response = await fetch(('http://no-such-url'));
    } catch(error) {
        console.error(error);
    }
}

h();

async function h2() {

    try {
        let response = await fetch(('http://no-such-url'));
        let user = await response.json();
    } catch (error) {
        console.error(error);
    }
} */

//Registrarse a la Api de OpenWeather para sacar la ApiKey gratuita en: https://openweathermap.org/
//y agregarla a la variable.
const apiKey = '1c67ae33adc312d33476ae4d68a09beb';

let searchInput = document.getElementById('search');
let searchBtn = document.getElementById('searchBtn');
let results = document.getElementById('results');

async function search() {
    //Fetch con async await
    console.log("Función search");
    async function newsSearch(city_name) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city_name)}&appid=${apiKey}`;
        const resp = await fetch(url);
        const info = await resp.json();
        return info;
    }
    let info = newsSearch(searchInput.value);
    info.then(response => {
        console.log(response);
        const absoluteZero = -273.15;
        let tempCelcius = response.main.temp + absoluteZero;
        results.textContent = `Clima: ${response.weather[0].main}, Temperatura:  ${tempCelcius} °C`;
    }).catch(error => {
        console.log(error);
    })
}

searchBtn.addEventListener('click', () => {
    search();
});

searchInput.addEventListener('keyup', () => {
    if (event.which === 13 || event.keyCode == 13) {
        search();
    }
});

//Mismo ejemplo de fetch simple que se hizo en clase de promesas, pero esta vez con async await
let imgCtn = document.getElementById("imgCtnAwait");

async function getDogImg() {
    let url = "https://dog.ceo/api/breeds/image/random";
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
};


let dog = getDogImg();

dog.then(data => {
    let dogImg2 = document.createElement('img');
    dogImg2.setAttribute('src', data.message);
    dogImg2.style.width = '300px';
    imgCtn.appendChild(dogImg2);
    console.log(data);
}).catch(err => {
    console.error('fetch failed', err);
});

// ejemplo de fetch con promesa de una Clase pasada
let imgCtnPromises = document.getElementById('imgCtnPromises');
console.info(imgCtnPromises);

function getDogImg(url) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            //console.log(json);
            let dogImg = document.createElement('img');
            dogImg.setAttribute('src', json.message);
            dogImg.style.width = '300px';
            imgCtnPromises.appendChild(dogImg);
        }).catch(err => {

            console.error('fetch failed', err);
        });
}

getDogImg("https://dog.ceo/api/breeds/image/random");