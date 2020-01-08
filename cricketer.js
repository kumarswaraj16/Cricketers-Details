var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kumarswaraj16:surajswaraj@cluster0-vpwr5.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
var connection = mongoose.connection;
var cricketerSchema = new mongoose.Schema({
    name: String,
    country: String,
    role: String,
    matches: Number,
    halfCentury: Number,
    century: Number,
    wicket: Number,
    catches: Number
});

var cricketerModel = mongoose.model("Cricketer", cricketerSchema);

connection.on("connected", function() {
    console.log("Connected Successfully!");
});
connection.on("disconnected", function() {
    console.log("Disconnected Successfully!!!");
});
connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = cricketerModel;