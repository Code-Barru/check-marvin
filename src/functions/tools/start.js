const schedule = require('node-schedule');

module.exports = (client) => {
    client.start = async () => {
        client.Bearer = await client.getToken();

    
        schedule.scheduleJob('*/1 * * * *', async () => {
            const checkUps = await client.getCheckUps();
            const lastCheckUp = client.getLastCheckUp(checkUps);
            if (!lastCheckUp)
                return;
            const checkUpInfo = await client.getCheck(lastCheckUp);
            const message = client.getPushMessage(checkUpInfo);

            client.push.send(message.title, message.message, function(err, res){
                if (err)
                    console.log(err);
            });
        })
    }
}