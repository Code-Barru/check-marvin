module.exports = (client) => {
    client.getLastCheckUp = (checkUps) => {
        lastTestRunId = checkUps[checkUps.length-1].results.testRunId;
        
        if (lastTestRunId != process.env.LAST_CHECKUP) {
            client.updateEnv("LAST_CHECKUP", lastTestRunId);
            process.env.LAST_CHECKUP = lastTestRunId;
            return checkUps[checkUps.length-2];
        }
        return undefined;
    }
}