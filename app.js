require('dotenv').config()

const { 
    readInput,
    inquireMenu,
    inquirePause,
    listPlaces
} = require('./helpers/inquirer.js');
const Searches = require('./models/searches.js');

const main = async() => {

    const searches = new Searches();
    let option = '';

    do {
        console.clear();

        option = await inquireMenu();

        switch (option) {
            case 1:
                // Show Message
                const place = await readInput('City: ');

                // Search Places
                const places = await searches.city( place );

                // Select Place
                const id = await listPlaces(places);
                if(id === '0') continue;
                const salectedPlace = places.find( l => l.id === id );

                // Call Function For Save in DB
                searches.addHistory(salectedPlace.name);

                // Weather
                const weather = await searches.weatherPlace(salectedPlace.lng, salectedPlace.lat );

                // Sow Results
                console.clear();
                console.log('\nInformation about the place: \n'.blue);
                console.log('Place:', salectedPlace.name.blue);
                console.log('Lat:', salectedPlace.lat);
                console.log('Lng:', salectedPlace.lng);
                console.log('Description: ', weather.desc.blue);
                console.log('Temperature: ', weather.temp);
                console.log('Maximum: ', weather.max);
                console.log('Minimum: ', weather.min);
            break;

            case 2:
                //History
                searches.capitalizedHistory.forEach((place, index) => {
                    const idx = `${ index + 1 }.`.blue;
                    console.log( `${idx}  ${place}` );
                });
                
            break;

                //Unfinished code
            default:
                console.log(`Sorry, we are working to implement:s ${option}.`);
        }

        await inquirePause();

    } while (option !== 0);
    
}

main();