﻿var express = require('express');
var fs = require('fs');
var _ = require('lodash')
var router = express.Router();
var statsLogging = require("../routes/statsLogging.js");

router.get('/about', function (req, res) {
    statsLogging.addLogging('about', null, req);
    if (req.xhr) {
        res.render('about', { layout: false });
    }
    else {
        res.render('about');
    }
    
});

module.exports = router;