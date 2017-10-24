var express = require('express');
var router = express.Router();
var axios = require('axios');
const csv = require('csvtojson')
var FeedUtils = require('../FeedUtils')
var HashMap = require('hashmap');
var fetch = require('node-fetch');
var topCountryList;
var topThreatList;
var topMalwareList;
var storedFeedData;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// main route, calls the feed if it's not stored, 
router.get('/feed', function (req, res, next) {
  if(typeof storedFeedData == "undefined" || storedFeedData == null) {
    axios('https://ransomwaretracker.abuse.ch/feeds/csv/')
    .then(function (response) {
      if (!response.data) {
        console.log("error no feed data");
        res.send(500).send("No data from feed");
      } else {
        let feedData = [];
        csv()
          .fromString(response.data)
          .on('csv', (csvRow) => {
            feedData.push(csvRow);
          })
          .on('done', () => {
            console.log('Done converting csv -> json');
            // Feed comes with 7 rows of headers, so we'll just use the data from 8+
            feedData.splice(0,8)
            storedFeedData = FeedUtils.toJson(feedData);
            topCountryList = FeedUtils.findTopTen(FeedUtils.COUNTRY, feedData);
            topThreatList = FeedUtils.findTopTen(FeedUtils.THREAT, feedData);
            topMalwareList = FeedUtils.findTopTen(FeedUtils.MALWARE, feedData);
            var allFeedData = {
              "feed" : storedFeedData,
              "country" : topCountryList,
              "threat" : topThreatList,
              "malware" : topMalwareList
            };
            storedFeedData = allFeedData
            res.status(200).send(allFeedData);
          })
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    })
  } else {
    res.status(200).send(storedFeedData);
  }
});


module.exports = router;
