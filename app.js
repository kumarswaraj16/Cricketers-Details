var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cricketModel = require('./modules/cricketer');
var cricketer = cricketModel.find();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    cricketer.exec(function(err, data) {
        if (err) throw err;
        res.render("cricketer", {
            title: "Cricketer's Details:",
            records: data
        });
    });
});

app.post("/", function(req, res, next) {
    var cricketerDetails = new cricketModel({
        name: req.body.cname,
        country: req.body.ccountry,
        role: req.body.crole,
        matches: req.body.cmatches,
        halfCentury: req.body.chalfcentury,
        century: req.body.ccentury,
        wicket: req.body.cwicket,
        catches: req.body.ccatches
    });
    // res1 is taken to avoid naming clash between res and res1 as both is in app.post() method
    cricketerDetails.save(function(err, res1) {
        if (err) throw err;
        cricketer.exec(function(err, data) {
            if (err) throw err;
            res.render("cricketer", {
                title: "Cricketer's Details",
                records: data
            });
        });
    });
});

app.post("/search/", function(req, res) {
    var filtername = req.body.filtername;
    var filtercountry = req.body.filtercountry;

    if (filtername != '' && filtercountry != '') {
        var filterParameter = { $and: [{ name: filtername }, { country: filtercountry }] }
    } else if (filtername == '' && filtercountry != '') {
        var filterParameter = { $and: [{ country: filtercountry }] }
    } else if (filtername != '' && filtercountry == '') {
        var filterParameter = { $and: [{ name: filtername }] }
    } else {
        var filterParameter = {}
    }

    var cricketerFilter = cricketModel.find(filterParameter);
    cricketerFilter.exec(function(err, data) {
        if (err) throw err;
        res.render('cricketer', { title: "Cricketer's Details", records: data });
    });
});

app.get('/delete/:id', function(req, res) {
    var id = req.params.id;
    var del = cricketModel.findByIdAndDelete(id);

    del.exec(function(err) {
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/edit/:id', function(req, res) {
    var id = req.params.id;
    var edit = cricketModel.findById(id);
    edit.exec(function(err, data) {
        if (err) throw err;
        res.render('edit', { title: "Edit Cricketer's Record", records: data });
    });
});

app.post('/update/', function(req, res) {
    var id = req.body.id;
    var update = cricketModel.findByIdAndUpdate(id, {
        name: req.body.cname,
        country: req.body.ccountry,
        role: req.body.crole,
        matches: req.body.cmatches,
        halfCentury: req.body.chalfcentury,
        century: req.body.ccentury,
        wicket: req.body.cwicket,
        catches: req.body.ccatches
    });
    update.exec(function(err) {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, function() {
    console.log("Server is Connected!");
});