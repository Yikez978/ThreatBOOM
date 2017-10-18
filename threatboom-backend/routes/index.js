var express = require('express');
var router = express.Router();
var axios = require('axios');
const csv = require('csvtojson')
var FeedUtils = require('../FeedUtils')
var HashMap = require('hashmap');

var topCountryList;
var topThreatList;
var topMalwareList;
var storedFeedData;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// Called by our Feed Component to grab data to reuse later.
router.get('/feed', function (req, res, next) {
  if(typeof storedFeedData == "undefined" || storedFeedData == null) {
    getFeedData()
    .then((response) => {
      res.status(200).send(storedFeedData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  } else {
    res.status(200).send(storedFeedData);
  }
});



router.get('/threats', function(req, res, next) {
  if(topThreatList == undefined || topThreatList == null) {
      getFeedData()
      .then(function(response) {
        res.status(200).send(topThreatList);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error);
      })
  } else {
    res.status(200).send(topThreatList);
  }
});


router.get('/malware', function(req, res, next) {
if(topMalwareList == undefined || topMalwareList == null) {
      getFeedData()
      .then(function(response) {
        res.status(200).send(topMalwareList);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error);
      })
  } else {
    res.status(200).send(topMalwareList);
  }
});



router.get('/countries', function(req, res, next) {
if(topCountryList == undefined || topCountryList == null) {
      getFeedData()
      .then(function(response) {
        res.status(200).send(topCountryList);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error);
      })
  } else {
    res.status(200).send(topCountryList);
  }
});

function getFeedData() {
    return axios({
    method: 'get',
    url: 'https://ransomwaretracker.abuse.ch/feeds/csv/'
  })
    .then(function (response) {
      if (!response.data) {
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
          })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
}


module.exports = router;
