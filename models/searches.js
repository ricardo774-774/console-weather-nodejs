const fs = require('fs');
const axios = require("axios");

class Searches {
    history = [];
    dbPath = './db/database.json';

    constructor() {
        // Read DB if exist
        this.readDb();
    }

    get capitalizedHistory() {
        return this.history.map(place => {
            let words = place.split(' ');
            words = words.map(p => p[0].toUpperCase() + p.substring(1));
            return words.join(' ');
        })
    }

    // Replaces sending parameters
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY || '',
            'limit': 5,
            'language': 'en'
        };
    }

    // Get the data of the place
    async city( place = '') {
       try {
         // http request
         const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
            params: this.paramsMapbox
         });
         const resp = await instance.get();

         return resp.data.features.map(place => ({
            id: place.id,
            name: place.place_name,
            lng: place.center[0],
            lat: place.center[1],
         }));

       } catch (err) {
        console.log('Error from map box request' ,err);
       }
    }

    // Get the weather of the place 
    async weatherPlace(lng, lat) {
        try {
            // http request
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}`,
            });
            const resp = await instance.get();

            // Destructuring api response
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };

        } catch (error) {
            console.log(error);
        }
    }

    addHistory( place = '' ){
        // Validation Prevent Duplicates
        if (this.history.includes( place.toLocaleLowerCase() )) {
            return;
        }


        this.history.unshift( place.toLocaleLowerCase() );

        // Save In DB
        this.saveDB();
    }

    saveDB() {
        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDb() {
        if ( !fs.existsSync(this.dbPath) ) return;
        const info = fs.readFileSync(this.dbPath, {encoding:'utf8', flag:'r'});
        const { history } = JSON.parse(info);
        this.history = history;
    }

}

module.exports = Searches;