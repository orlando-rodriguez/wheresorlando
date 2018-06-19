require('dotenv').config();
const fetch = require('node-fetch');

const KEY = process.env.GOOGLE_KEY;
const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=';

async function getDistance(lat, long, distanceArray) {
    async function hitGoogle() {
        let fetchArray = [];
        for (let i = 0; i < distanceArray.length; i++) {
            let fetchUrl = url + `${lat},${long}&destinations=${distanceArray[i][0]},${distanceArray[i][1]}&key=${KEY}`;
            await fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                data.rows[0].elements[0].distance.text ?
                fetchArray.push(data.rows[0].elements[0].distance.text) :
                fetchArray.push(null);
            }).catch(err => {
                fetchArray.push('distance unknown');
            });
        }
        return fetchArray;
    }
    const responseArray = await hitGoogle();
    return responseArray;
}

module.exports = {
    matrix(places, lat, long) {
        let distanceArray = [];
        places.forEach(place => {
            distanceArray.push([place.coordinates.latitude, place.coordinates.longitude]);
        });
        const results = getDistance(lat, long, distanceArray);
        return results;
    }
}
