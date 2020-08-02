/// <reference path="../enums.ts" />
/// <reference path="../dbConfig.ts" />
/// <reference path="../rentalInterface.d.ts" />

import types = require('../schema/sequelize-types');
import models = require('../schema/sequelize-models');
import dbConfig = require('../dbConfig');
//import rentalDefinitions = require('rentalDefinitions');

export class propertyagentRepo {
    _dbConfig: dbConfig.dbConfig;
    _instance: types.propertyagentInstance;
    constructor() {
        this._dbConfig = new dbConfig.dbConfig();
        models.initialize(this._dbConfig.database, this._dbConfig.user, this._dbConfig.password, { define: { freezeTableName: true } });
    }


    getpropertyagents(id: number, mydesktopAgentId: number) {
        var findOptions = <sequelize.FindOptions>{};
        var transaction = <sequelize.Transaction>{};
        transaction.ISOLATION_LEVELS = <sequelize.TransactionIsolationLevels>{ READ_UNCOMMITTED: 'READ_UNCOMMITTED' };
        transaction.LOCK = <sequelize.TransactionLocks>{ UPDATE: 'UPDATE'}
        findOptions.where = { propertyId: id, mydesktopAgentId: mydesktopAgentId };
        findOptions.include = [{ model: models.agent, required: false }];
        var queryOptions = <sequelize.QueryOptions>{};
        queryOptions.transaction = transaction;
        var r = models.propertyagent.find(findOptions, queryOptions);
        return r;
    }


    getpropertyagentsByEmail(id: number, email: string) {
        var findOptions = <sequelize.FindOptions>{};
        var transaction = <sequelize.Transaction>{};
        transaction.ISOLATION_LEVELS = <sequelize.TransactionIsolationLevels>{ READ_UNCOMMITTED: 'READ_UNCOMMITTED' };
        transaction.LOCK = <sequelize.TransactionLocks>{ UPDATE: 'UPDATE' }
        findOptions.where = { propertyId: id, email: email };
        findOptions.include = [{ model: models.agent, required: false }];
        var queryOptions = <sequelize.QueryOptions>{};
        queryOptions.transaction = transaction;
        var r = models.propertyagent.find(findOptions, queryOptions);
        return r;
    }
    getagent(mydesktopAgentId: number) {
        var findOptions = <sequelize.FindOptions>{};
        findOptions.where = { mydesktopAgentId: mydesktopAgentId };
        var transaction = <sequelize.Transaction>{};
        transaction.ISOLATION_LEVELS = <sequelize.TransactionIsolationLevels>{ READ_UNCOMMITTED: 'READ_UNCOMMITTED' };
        transaction.LOCK = <sequelize.TransactionLocks>{ UPDATE: 'UPDATE' }
        var queryOptions = <sequelize.QueryOptions>{};
        queryOptions.transaction = transaction;
        var r = models.agent.find(findOptions, queryOptions);
        return r;
    }

    getagentByEmail(email: string) {
        var findOptions = <sequelize.FindOptions>{};
        findOptions.where = { email: email};
        var transaction = <sequelize.Transaction>{};
        transaction.ISOLATION_LEVELS = <sequelize.TransactionIsolationLevels>{ READ_UNCOMMITTED: 'READ_UNCOMMITTED' };
        transaction.LOCK = <sequelize.TransactionLocks>{ UPDATE: 'UPDATE' }
        var queryOptions = <sequelize.QueryOptions>{};
        queryOptions.transaction = transaction;
        var r = models.agent.find(findOptions, queryOptions);
        return r;
    }

    savepropertyagent(agent: IListingAgent, propertyId: number) {
        try {
            var that = this;
            if (agent.email == undefined) {
                return;
            }
            return that.getagentByEmail(agent.email).then((abAgent) => {
                console.log("*** agent***");
                console.log(abAgent);

                if (abAgent != null) {
                    
                    that.getpropertyagents(propertyId, <any>abAgent.mydesktopAgentId).then(function (e) {
                        console.log("*** agent1***");
                        var propertyAgent = e;
                        if (propertyAgent) {

                        }
                        else {
                            propertyAgent = models.propertyagent.build({
                                propertyId: <any>propertyId,
                                agentId: <any>abAgent.agentId,
                                mydesktopAgentId: <any>abAgent.mydesktopAgentId
                            });
                            return propertyAgent.save();
                        }
                    }
                    );
                }
                else {
                    console.log("*** new agent1***");
                    console.log(agent);

                    if (agent.id > 0) {
                        var randomMyDesktopAgentId = Math.floor(Math.random() * 10000);
                        console.log("*** new agent***");
                        abAgent = models.agent.build({
                            name: agent.name,
                            mobile: agent.telephone[0].text,
                            email: agent.email,
                            mydesktopAgentId: <any>randomMyDesktopAgentId
                        });
                        abAgent.save().then(function (dbAgent) {
                            var propertyAgent = models.propertyagent.build({
                                propertyId: <any>propertyId,
                                agentId: <any>dbAgent.agentId,
                                mydesktopAgentId: <any>randomMyDesktopAgentId
                            });
                            return propertyAgent.save();
                        });                    } 

                }
            });

            //return this._instance;
        }
        catch (ex) {
            throw ex;
        }

    }
    //models.locations.create();
}


