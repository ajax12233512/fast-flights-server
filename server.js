import 'dotenv/config';
import express, { application } from 'express';
const app = express();
const port = process.env.PORT || 3001;
import { duffel } from './duffel/duffel.js'
import { search } from './AirportSearch/api.js';

const testDuffel = async () => {
  try{
    const airports = await duffel.airports.listWithGenerator();
    for await (const airport of airports) 
      console.log(airport)  
  } catch (err) {
    console.log(err)
  }

}

app.use(express.json());

app.post('/api/search', async (req, res) => {
  const data = await search(req.body.input);
  res.status(200).send(data);
})

app.post('/api/duffel', async (req, res) => {
  const newArray = [];
  try{
    console.log(req.body.input)
    const airports = await duffel.airports.listWithGenerator();
    // for await (const airport of airports) {
    //   if(airport.data.city_name.includes(req.body.input))
    //     newArray.push(airport.data.city_name);
    // }
    console.log(airports)
    // const response = airports.map(airport => {
    //     if(airport.city_name.includes(req.body.input))
    //       return airport;
    //   })
    
    res.json(newArray);
  } catch (err) {
    console.log(err)
  }
})

app.get('/api/test', async (req, res) => {
  res.json({
    message: 'success'
  })
})

// testDuffel()

app.listen(port, () => {
    console.log('Server running');
})