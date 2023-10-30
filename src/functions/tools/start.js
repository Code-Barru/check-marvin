const schedule = require('node-schedule');

module.exports = (client) => {
    client.start = async () => {
        schedule.scheduleJob('*/1 * * * *', async () => {
            client.Bearer = await client.getToken();
            const checkUps = await client.getCheckUps();
            const lastCheckUp = client.getLastCheckUp(checkUps);
            if (!lastCheckUp)
                return;
            const checkUpInfo = await client.getCheckUpInfo(lastCheckUp);
            const message = client.getPushMessage(checkUpInfo);    

            client.push.send(message.title, message.message, function(err, res){
                if (err)
                    console.log(err);
            });
        })
    }
}