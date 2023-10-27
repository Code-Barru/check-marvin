function getErrorLine(message) {
    var splited = message.split("\n");
    var got = []
    var expected = []
    var add_to;

    for (const line of splited) {
        if (line.includes("Got:")) {
            add_to = "got";
            continue;
        }
        if (line.includes("But expected:")) {
            add_to = "expected";
            continue;
        }
        if (line.includes("# Test failed")) {
            break;
        }
        if (add_to == "got")
            got.push(line);
        else if (add_to == "expected")
            expected.push(line);
    }
    if (expected.length == 0 || got.length == 0)
        return message;
    
    var diff = [];
    for (var i=0 ; i < got.length ; i++) {
        if (got[i] != expected[i]) {
            diff.push(
                {
                    got: got[i],
                    expected: expected[i]
                }
            );
        }
    }
    
    var strGot = "Got:\n";
    var strEx = "But expected:\n";
    for (const line of diff) {
        strGot += line.got + "\n";
        strEx += line.expected + "\n";
    }
    return strGot + strEx;
}

function trimFailMessage(message) {
    var splited = message.split("====================");
    var res = "====================" + splited[splited.length - 2] + "====================" + splited[splited.length - 1];
    return getErrorLine(res);
}

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
                messageHolder.failedMessage = trimFailMessage(check.externalItems[0].comment);
                break;
            }
                
        }

        return {
            title: check.instance.moduleCode + " -" + check.instance.code.split("-")[1],
            message: getMessageString(messageHolder),
        }
    }
}