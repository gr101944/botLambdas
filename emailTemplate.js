var aws = require('aws-sdk');
var ses = new aws.SES();

exports.handler = (event, context, callback) => {
  const body_html = `<html>
      <head></head>
      <body>
        <b> \n\n\n\n\nThis note has been sent from Taiho HR Support \n</b>
        <p> Please do not reply \n</p>
        <p> You can track your ticket from the HR Buddy \n</p>
        <p> Just ask - status of my tickets \n</p>
        <img src="https://ds-email-test.s3.amazonaws.com/photos/logo.jpg" width = "150" height = "75" alt="Smiley face" >

      </body>
      </html>`;

    var params = {
      "Template": {
        "TemplateName": "MyTemplate5",
        "SubjectPart": "HR Support Ticket opened",
        "TextPart": "Dear {{name}},\r\n\n Please note the ticket number for tracking: {{ticketNumber}}.",
        "HtmlPart":  "<h1>Hello {{name}},</h1><p><h2>Please note the ticket number for tracking: {{ticketNumber}}. Ticket category: {{ticketArea}}</h2></p>" + "\n\n\n\n " + body_html
      }
    }

    ses.createTemplate(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
}
