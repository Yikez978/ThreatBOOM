
// Feed comes in as csv, csvtojson processes it into an array. These indexes are equivelent to the csv columns
const FIRSTSEEN = 0
const THREAT = 1
const MALWARE = 2
const HOST = 3
const URL = 4
const STATUS = 5
const REGISTRAR = 6
const IP = 7
const ASN = 8
const COUNTRY = 9
var HashMap = require('hashmap');


module.exports = {
    THREAT,
    MALWARE,
    COUNTRY,
    findTopTen: function (category, data) {
        if (category != null && category != undefined && data != null && data != undefined) {

            // count all occurances of country codes appearing
            let map = new HashMap();
            for (var i = 0; i < data.length; i++) {
                if (!isEmpty(data[i][category])) {
                    let foundData = data[i][category];
                    if(map.has(foundData)) {
                        map.set(foundData, map.get(foundData) + 1);
                    } else {
                        map.set(foundData, 1);
                    }
                }
            }
            // get top results from category
            let result = new HashMap();
            let length = 0;
            if(data.length > 10) {
                length = 10;
            } else {
                length = data.length;
            }
            for (var i = 0; i < length; i++) {
                let data = findMaxKey(map)
                if(data != "N/A")
                    result.set(data, map.get(data));
                map.remove(data);
            }

            var jsonResult = [];
            result.forEach((value,key) => {
                var data = {
                    "country" : key,
                    "count" : value
                }
                jsonResult.push(data);
            }
            );

            return jsonResult;
        }
        return new HashMap();
    }
}

function findMaxKey(data) {
    if(data != null && data != undefined) {
    let currentMax = 0;
    let maxCountry = "N/A"
    data.forEach(function(value, key) {
        if(value > currentMax) {
            currentMax = value;
            maxCountry = key;
        }
    });
    return maxCountry;
    }
}


function isEmpty(str) {
    return str == undefined || str == "" || str.length < 0
}
