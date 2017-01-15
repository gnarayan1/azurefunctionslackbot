
module.exports = function(context, req) {

    context.log('HTTP trigger function processed a request.');
    context.log('Body: ' + JSON.stringify(req.body));

    var parsedObj = parseRequest(req.body);
    context.log('ParsedObject: ' + JSON.stringify(parsedObj));

    context.log('PerfDoc: ' + JSON.stringify(context.bindings.perfDocument));

    res = {
        body: {
            "response_type": "in_channel",
            "text": "Invalid Token!!!"
        }
    };

    if (parsedObj.token == "YOUR_SLACK_TOKEN_GOES_HERE") {
        res = {
            body: {
                "response_type": "in_channel",
                "text": "Run at " + context.bindings.perfDocument[parsedObj.text].date + " for " + parsedObj.text + " took " + context.bindings.perfDocument[parsedObj.text].runtime + " mins"
            }
        };
    }

    context.done(null, res);
};

function parseRequest(body) {
    var inpArr = decodeURIComponent(body).split("&");
    var respObj = {};

    for (var i = 0; i < inpArr.length; i++) {
        var key = inpArr[i].split("=")[0];
        var value = inpArr[i].split("=")[1];
        respObj[key] = value;
    }
    return respObj;
}
