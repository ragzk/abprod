var configs = [];
var dbConfig = (function () {
    function dbConfig() {
        this.config();
    }
    //constructor(database: string, user: string, password: string) {
    //}
    dbConfig.prototype.config = function () {
        if (configs) {
            this.host = "127.4.163.130" || "127.0.0.1";
            this.database = "abtest";
            this.user = "abtestAdmin";
            this.password = "abtestAdmin";
            configs.push(dbConfig);
        }
        return configs[0];
    };
    return dbConfig;
})();
exports.dbConfig = dbConfig;
//export var dbConfigInstance = new dbConfig();
//export var instance = new dbConfig(); 
//# sourceMappingURL=dbConfig.js.map