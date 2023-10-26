const fs = require('fs');
const dotenv = require('dotenv');
const eol = require('os').EOL;

module.exports = (client) => {
    client.updateEnv = async (key, value) => {
        const env = fs.readFileSync('.env')
        const buf = Buffer.from(env)
        const currentConfig = dotenv.parse(buf)
        currentConfig[key] = value;
        const envContents = Object.entries({...currentConfig})
            .map(([key,val]) => `${key}=${val}`)
            .join(eol)
        fs.writeFileSync('.env', envContents);
    }
}