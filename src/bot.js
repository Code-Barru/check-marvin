require("dotenv").config();
const fs = require('fs');
const axios = require('axios');
const pushover = require('node-pushover');

var push = new pushover({
    token: process.env.PO_TOKEN,
    user: process.env.PO_USER
})

const client = {
    Bearer : '',
    axios: axios,
    push: push,
};

const functionsFolders = fs.readdirSync("./src/functions");
for (const folder of functionsFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith('.js'));
    for (const file of functionFiles) 
        require(`./functions/${folder}/${file}`) (client);
}

client.start();