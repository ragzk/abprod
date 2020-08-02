"use strict";
/// <reference path="../enums.ts" />
/// <reference path="../dbConfig.ts" />
/// <reference path="../rentalInterface.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var models = require("../schema/sequelize-models");
var dbConfig = require("../dbConfig");
//import rentalDefinitions = require('rentalDefinitions');
var propertyAddressRepo = /** @class */ (function () {
    function propertyAddressRepo() {
        this._dbConfig = new dbConfig.dbConfig();
        models.initialize(this._dbConfig.database, this._dbConfig.user, this._dbConfig.password, { define: { freezeTableName: true } });
    }
    propertyAddressRepo.prototype.getPropertyAddress = function (id) {
        var findOptions = {};
        findOptions.where = { propertyId: id };
        var r = models.propertyaddress.find({ where: { propertyId: id } });
        return r;
    };
    propertyAddressRepo.prototype.savePropertyAddress = function (rentalObj) {
        try {
            return this.getPropertyAddress(rentalObj.propertyId).then(function (e) {
                var address = e;
                console.log(rentalObj.address);
                if (address) {
                    address.streetNumber = rentalObj.address.streetNumber;
                    address.street = rentalObj.address.street;
                    address.state = rentalObj.address.state;
                    address.postcode = rentalObj.address.postcode;
                    address.suburb = rentalObj.address.suburb;
                }
                else {
                    address = models.propertyaddress.build({
                        propertyId: rentalObj.propertyId,
                        streetNumber: rentalObj.address.streetNumber,
                        street: rentalObj.address.street,
                        suburb: rentalObj.address.suburb,
                        state: rentalObj.address.state,
                        postcode: rentalObj.address.postcode,
                    });
                }
                address.save();
                this._instance = address;
            });
            //return this._instance;
        }
        catch (ex) {
            throw ex;
        }
    };
    return propertyAddressRepo;
}());
exports.propertyAddressRepo = propertyAddressRepo;
//# sourceMappingURL=propertyAddressRepo.js.map