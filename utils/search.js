//This files is used to handle the sorting when the user searches for a city.

import { createRequire } from 'module';//Allow ability to require files in ES6
const require = createRequire(import.meta.url);
const aiports = require('../data/airports.json');

export const search = (req, res) => {
let sendData = [];
  const data = req.body.input
  const airportArray = Object.values(aiports);
  let counter = 0;
  console.log('here')
  airportArray.forEach(airport => {
    if(airport.city.toLowerCase().includes(data.toLowerCase()) || airport.name.toLowerCase().includes(data.toLowerCase())) {
      sendData.push(airport);
      counter++;
    }
  })
  
  sendData.sort((a, b) => {
    if(a.iata !== '' && b.iata === '') {
      return -1;
    } else if(a.iata === '' && b.iata !== '') {
      return 1;
    } else {
      return 0;
    }
  })

  console.log(sendData.slice(0, 10))
  res.status(200).json({data: sendData.slice(0, 10)});
}