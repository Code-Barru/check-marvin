
module.exports = (client) => {
    client.getCheckUpInfo = async (check) => {
        return await client.axios.get(`https://api.epitest.eu/me/details/${check.results.testRunId}`, {
            headers: {
                "accept": "*/*",
                "accept-language": "fr-FR,fr;q=0.5",
                "authorization": "Bearer " + client.Bearer,
                "sec-ch-ua": "\"Chromium\";v=\"118\", \"Brave\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "sec-gpc": "1",
                "Referer": "https://my.epitech.eu/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error.response);
        })
    }
}