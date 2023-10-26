require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

function getLastDate(dates) {
    var lastDate = 0;
    for (var i=0; i<dates.length; i++) {
        if (dates[i] > dates[lastDate]) {
            lastDate = i;
        }
    }
    return lastDate;
}

async function getLastCheck() {
    var responses = await axios.get("https://api.epitest.eu/me/2023", {headers: {Authorization: `Bearer ${process.env.TOKEN}`}})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error )
        });
    
    const lastDate = getLastDate(responses.map((response) => {return response.date}));
    const date = new Date(responses[lastDate].date);
    date.setHours(date.getHours() + 2);
    
    const lastCheck = responses[lastDate];
    lastCheck.date = date;
    return lastCheck;
}

async function exportToFile(json) {
    fs.writeFile('file.json', JSON.stringify(json), (error) => {
        if (error) {
            throw error;
        }
    });
}

async function loop() {
    var lastCheck = await getLastCheck();
    await exportToFile(lastCheck);
}

loop();