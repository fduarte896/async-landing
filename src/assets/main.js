const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCnQ67VGkwqB3F1ytP3phqFQ&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById("content");
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '724cd22cebmsh3191d1d2395f37ap1675eejsn197f95307d64',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlAPI){
    const response = await fetch(urlAPI, options)/* Vamos a guardar el fetch que va a recibir la url y las opciones que vienen
    de la API que estamos usando*/
    const data = await response.json(); /* Después transformamos los datos que vienen guardados en response*/
    return data;
}

/* Ahora vamos a crear una función anónima que se invoca a sí misma. 

La estructura de una función que se invoca a si misma es la siguiente:

(function() {
     Código de la función
})();

*/

(async () => {
    try {
        const videos = await fetchData(API); /* Usamos la función fetchData para pedir los datosy de la url de la API*/
        /* Posteriormente vamos a crear un template en forma de vista (por medio de HTML) para insertarlo en el DOM, iterándolo
        por cada uno de los elementos (videos) que lleguen en la respuesta*/

        /* Acá lo que estoy haciendo es tomar cada item de los videos y les voy a aplicar el método map, que permite devolver 
        un nuevo arreglo pero con la transformacion que estoy aplicando.*/
        let vista = `
        ${videos.items.map(video => `
        <div class="group relative">
        <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
         <h3 class="text-sm text-gray-700">
          <span aria-hidden="true" class="absolute inset-0"></span>
          ${video.snippet.title}
         </h3>
       </div>
     </div>
        `)} 
        
        `;
        content.innerHTML = vista;
    } catch (error) {
        console.error(error);
    }
})();

