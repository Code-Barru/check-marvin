module.exports =(client) => {
    client.getToken = async function() {
        return await client.axios.get("https://login.microsoftonline.com/common/oauth2/authorize?client_id=c3728513-e7f6-497b-b319-619aa86f5b50&nonce=aa153b98-0245-4803-b2fa-e62b20032524&redirect_uri=https%3A%2F%2Fmy.epitech.eu%2Findex.html&response_type=id_token&state=fragment%3Dy%252F2023",
        {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "accept-language": "fr-FR,fr;q=0.6",
                "cookie": process.env.MARVIN_COOKIE,
                "Referer": "https://my.epitech.eu/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            }
        })
        .then((res) =>  {
            const hash = res.request._redirectable._options.hash
            var hashes = hash.split('&');
            var token = hashes[0].split('=')[1];
            return token;
        })
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });
    }
}