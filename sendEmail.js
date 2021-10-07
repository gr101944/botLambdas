var aws = require('aws-sdk');
var ses = new aws.SES();

exports.handler = (event, context, callback) => {

    var name = event.name;
    var ticketNumber = event.ticketNumber;
    var toAddress = event.toAddress;
    var fromAddress = event.fromAddress;
    var templateName = event.templateName;
    var ticketArea = event.ticketArea;

    // var nameFirst = event.Details.ContactData.Attributes.nameFirst;
    // var balanceChecking = event.Details.ContactData.Attributes.balanceChecking;

    console.log(JSON.stringify(event));

    var params = {
      "Source": fromAddress,
      "Template": templateName,
      "Destination": {
        "ToAddresses": [ toAddress ]
      },
      "TemplateData": "{ \"name\":\""+ name+ "\" , \"ticketNumber\": \"" + ticketNumber + "\", \"ticketArea\": \""+ ticketArea + "\" }"
     };


     ses.sendTemplatedEmail(params, function (err, data) {

        if (err) {
            console.log("lamda error " + err);

            context.fail(err);
        } else {
            const response = {
                 statusCode: 200,
                 result: "success",
            };

            console.log("Success, response is " + JSON.stringify(response));
            callback(null, response);
        }
    });
};
