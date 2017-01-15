module.exports = function(context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    res = {
        // status: 200, /* Defaults to 200 */
        body: "Saved!!"
    };

    var perfIn = context.bindings.perfInput;
    if (perfIn == null || perfIn == undefined) {
        perfIn = {"id":"perfid"};
    }

    if (req.body) {
        context.bindings.name = "perfDocument";
        perfIn[req.body.id]=req.body;
        context.bindings.perfDocument = perfIn;
    } else {
        res = {
            status: 400,
            body: "Please pass the request body"
        };
    }

    context.done(null, res);
};
