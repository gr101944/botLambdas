var AWS = require('aws-sdk');
var kendra = new AWS.Kendra();
var  kendraIndexId = process.env.Kendra_Index_Id;
//var kendraIndexId = "deb65db8-514b-4153-b72f-012bb5f5fdf6";

exports.handler =  (event, context, callback) => {
  var qryText = event.qryText;

var params = {
  IndexId: kendraIndexId , /* required */
  QueryText: qryText , /* required */
};

  kendra.query(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     {

        callback(null, data);
    };           // successful response
  });
}
