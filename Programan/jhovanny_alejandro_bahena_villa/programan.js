/** Llama al endpoint 'https://www.cloudflare.com/cdn-cgi/trace' para conseguir la IP del cliente */

const getClientIp = async () => {
    const endpoint = "https://www.cloudflare.com/cdn-cgi/trace"

    try {
        const responseCloudFareApiCall = await fetch(endpoint);

        if (responseCloudFareApiCall.ok) {
            const responseString = await responseCloudFareApiCall.text();

            /** Transforma la respuesta de la API (que es texto plano) en un array y luego extre el pedazo de info necesaria*/
            const responseArray = responseString.split("\n");
            const ipResponse = responseArray[2].slice(3, -1);

            return ipResponse;

        } else {
            throw new Error("El request para obtener la dirección IP falló");
        }

    } catch (error) {
        console.error(error);
    }
};

/** */

const getClientCity = async (ipResponse) => {
    const baseURL = "http://api.ipstack.com/";
    const apiKey = "a41f78b5d4a596e068312a345f8364b9";
    const ipDirection = ipResponse;

    const endpoint = `${baseURL}${ipDirection}?access_key=${apiKey}`;

    try {
        const responseIPstackAPIcall = await fetch(endpoint);

        if (responseIPstackAPIcall.ok) {
            const responseToJSON = await responseIPstackAPIcall.json();
            const city = responseToJSON.city;

            return city;

        } else {
            throw new Error("El request para obtener la Ciudad falló");
        }

    } catch (error) {
        console.error(error);
    }
};

/** */

const getWether = async (cityResponse) => {
    const baseURL = "https://api.openweathermap.org/data/2.5/weather";
    const apiKey = "c425df4750836c3d2ad9cf53c2a00db2";
    const city = cityResponse;

    const endpoint = `${baseURL}?q=${city}&appid=${apiKey}`;

    try {
        const responseWeatherApiCall = await fetch(endpoint); 
        
        if (responseWeatherApiCall.ok) {
            const responseJSON = await responseWeatherApiCall.json();

            const tempInKelvin = responseJSON.main.temp;
            const tempInCelsius = tempInKelvin - 273.15;

            return tempInCelsius;

        } else {
            throw new Error("El request para obtener el clima falló");
        }

    } catch (error) {
        console.error(error);
    }
};

const getAll = async () => {
    const ipDirection = await getClientIp();
    const city = await getClientCity(ipDirection);
    const weather = await getWether(city);

    console.log(`Tu dirección IP es: ${ipDirection}`);
    console.log(`Te encuentras en: ${city}`);
    console.log(`La temperatura es: ${weather} C°`);
};

getAll();

