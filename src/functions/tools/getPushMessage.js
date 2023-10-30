function getMessageString(messageHolder) {
    if (!messageHolder.failed)
        return "All tests passed 😎";
    var messageString = "Test failed at " + messageHolder.failedAt + "😢\n";
    messageString += messageHolder.failedMessage;
    return messageString;
}

module.exports = (client) => {
    client.getPushMessage = (check) => {
        var messageHolder = {
            failed: false,
            failedAt: null,
            failedMessage: null,
        }
        for (const skill of check.skills) {
            if (!skill.BreakdownSkillReport)
                break;
            if (skill.BreakdownSkillReport.breakdown.passed != 1) {
                messageHolder.failed = true;
                messageHolder.failedAt = skill.BreakdownSkillReport.name.split(" ")[0];                
                messageHolder.failedMessage = client.trimFailMessage(check.externalItems[0].comment);
                break;
            }
                
        }

        return {
            title: check.instance.moduleCode + " -" + check.instance.code.split("-")[1],
            message: getMessageString(messageHolder),
        }
    }
}