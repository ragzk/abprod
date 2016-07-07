/// <reference path="../enums.ts" />
/// <reference path="../dbConfig.ts" />
/// <reference path="../rentalInterface.d.ts" />
var models = require('../schema/sequelize-models');
var dbConfig = require('../dbConfig');
var moment = require('moment');
var _ = require('lodash');
var Promise = require('q');
var statsLoggingRepo = (function () {
    function statsLoggingRepo() {
        this._dbConfig = new dbConfig.dbConfig();
        models.initialize(this._dbConfig.database, this._dbConfig.user, this._dbConfig.password, { host: this._dbConfig.host, port: this._dbConfig.port, define: { freezeTableName: true } });
        console.log('Logging object initialized');
    }
    statsLoggingRepo.prototype.save = function (obj) {
        try {
            console.log('In Logging save ip address = ' + obj.ipAddress + ' date == ' + moment(moment.utc()).toDate());
            var that = this;
            var statsLogging = models.statslogging.build({
                route: obj.route,
                propertyId: obj.propertyId,
                ipAddress: obj.ipAddress,
                dateTime: moment(moment.utc()).toDate(),
                isMobile: obj.isMobile,
                userAgent: obj.userAgent
            });
            return statsLogging.save();
        }
        catch (ex) {
            console.log("error !!!  " + ex.message);
            throw ex;
        }
    };
    return statsLoggingRepo;
})();
exports.statsLoggingRepo = statsLoggingRepo;
//# sourceMappingURL=statsLoggingRepo.js.map