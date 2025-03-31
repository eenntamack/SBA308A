const apiKey =  'rieB0eYfKcvuQnMQ8wFJnUZqNJhmlUPnTFvjYIhg';


function formatDate(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


const date = formatDate()

async function getNasaData(apiKey,date){
    
    try{
        const data = {};
        const nasaFetch = await fetch(`https://api.nasa.gov/planetary/apod?&date=${date}&api_key=${apiKey}`)
        const jsonData = await nasaFetch.json()
        data.title = jsonData.title
        data.explanation = jsonData.explanation
        data.hdurl = jsonData.hdurl
        return data;    
    }catch{
        console.log( "could not fetch nasa data")
    }
}



export{ getNasaData , apiKey , formatDate};