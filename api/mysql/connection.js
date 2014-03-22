var
    connectOption = { //developing environment
        host:'localhost',
        user:'root',
        password:'',
        dateStrings:true
    },
    // connectOption = { //working environment
    //     host:'localhost',
    //     user:'root',
    //     password:'holic',
    //     dateStrings:true
    // },
    mysql  = require('mysql');

var mysqlWrap = module.exports = function(callback){
    var connection = mysql.createConnection(connectOption);
    connection.connect();
    connection.query('use oyyd');
    callback(connection);
    connection.end();
};

mysqlWrap.escapeStr = function (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
            // and double/single quotes
        }
    });
};

mysqlWrap.getDateTime = function(timeStamp){
    var date = new Date();
    date.setTime(timeStamp);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
};
mysqlWrap.getCurrentDateTime = function(){
    var data = new Date();
    return mysqlWrap.getDateTime(data.getTime());
};