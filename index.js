const {
    time
} = require("console")
let https = require("https")
const {
    default: test
} = require("node:test")
const {
    basename
} = require("path")
const {
    stringify
} = require("querystring")


console.log("loaded")

let date = new Date()
let ticks = date.getSeconds()

let BASE_URL = "https://api.openf1.org/v1/"
let TEST = "car_data?driver_number=55&session_key=9159&speed>=315"

let live_test = "car_data?driver_number=4&session_key=latest"

let final = BASE_URL.concat(TEST)
let livefinal = BASE_URL.concat(live_test)

// fetch(livefinal)
//   .then(response => response.json())
//   .then(jsonContent => console.log(jsonContent));

var connection

function getUpdates() {

    fetch(livefinal)
        .then(response => response.json())
        .then(jsonContent => {
            // Extract unique dates from the JSON content
            const uniqueDates = [...new Set(jsonContent.map(item => item.date.substr(0, 10)))];

            // For each unique date, find the latest entry
            const filtered = uniqueDates.map(ud => {
                const dateItems = jsonContent.filter(item => item.date.substr(0, 10) === ud);
                dateItems.sort((a, b) => new Date(b.date) - new Date(a.date));
                return dateItems[0];
            });

            // Output the filtered results
            console.log(filtered);

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    // console.clear()

}

connection = setInterval(getUpdates, 1000)