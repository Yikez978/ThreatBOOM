import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import fetch from 'isomorphic-fetch';
const serverURL = "http://localhost:3001"
describe('fetch() feed data using Promises', () => {

  it('/feed should load feed data', async () => {
  return fetch(serverURL + '/feed')
      .then((response) => {
            expect(response).toBeDefined();
            response.json()
            .then( (res) => {
              expect(res).toBeDefined()
              expect(res.length).toBeGreaterThan(0);
            })
            .catch( (error) => {
              fail('Couldn\'t parse response into json');
            })
      })
      .catch( (error) => {
        fail('Couldn\'t connect to server');
      })

  })

  it('/malware should return top 10 malware types', async  () => {
    return fetch(serverURL + '/malware')
        .then( (res) => {
            expect(res).toBeDefined();
            res.json()
            .then( (res) => {
              expect(res).toBeDefined();
              expect(res.length).toEqual(10)
            })
            .catch( (err) => {
              fail('Couldn\'t parse response into json');
            })
        })
        .catch( (err) => {
          fail('Bad response from server');
        })
  })

    it('/threats should return top 10 threat types', async () => {
    return fetch(serverURL + '/threats')
        .then( (res) => {
            expect(res).toBeDefined();
            res.json()
            .then( (res) => {
              expect(res).toBeDefined();
              expect(res.length).toEqual(10)
            })
            .catch( (err) => {
              fail('Couldn\'t parse response into json');
            })
        })
        .catch( (err) => {
          fail('Bad response from server');
        })
  })

  it('/countries should return top 10 countries hosting ransomware', async () => {
    return fetch(serverURL + '/countries')
        .then( (res) => {
              expect(res).toBeDefined();
              expect(res.length).toEqual(10)
        })
        .catch( (err) => {
            console.log(err)
        })
  })


})
