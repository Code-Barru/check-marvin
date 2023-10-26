module.exports = (client) => {
    client.getCheckUps = async function() {
        return await client.axios.get("https://api.epitest.eu/me/2023", {
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
        .then((res) => {
            return res.data;
        })
        .catch(async (err) => {
            if (err.response.status == 401) {
                client.Bearer = await client.getToken();
                return client.getCheckups();
            }
        })
    }
}