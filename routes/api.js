﻿module.exports.getUnSoldProperties = getUnSoldProperties;
module.exports.getSoldProperties = getSoldProperties;
var fs = require('fs');
var _ = require('lodash');
var unSoldProp = [];
var soldProp = [];

//function getUnSoldProperties (req, res)
//{
//    var dir = "./public/images/sliderImages/unsold";
//    fs.readdir(dir , function (err, files) {
//        files = _.uniq(files);
//        unSoldProp = [];
//        _.each(files, function (file) { unSoldProp.push(dir + "/" + file); })
//        res.json(unSoldProp);
//    })    
//}

function getUnSoldProperties(req, res) {
    var propertyReport = require("../repository/propertyRepo");
    var repo = new propertyReport.propertyRepo();
    repo.getProperties("buy", "All").then(function (data) {
        res.json(data);
    })

}




//function getSoldProperties(req, res) {
//    var dir = "./public/images/sliderImages/sold";
//    fs.readdir(dir , function (err, files) {
//        files = _.uniq(files);
//        soldProp = [];
//        _.each(files, function (file) { soldProp.push(dir + "/" + file); })
//        res.json(soldProp);
//    })
//}

function getSoldProperties(req, res) {
    var propertyReport = require("../repository/propertyRepo");
    var repo = new propertyReport.propertyRepo();
    repo.getProperties("sold", "All").then(function (data) {
        res.json(data);
    })

}
