import 'dotenv/config';
import express, { application } from 'express';
const app = express();
const port = process.env.PORT || 3001;
import { duffel } from './duffel/duffel.js'

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

app.post('/api/duffel', async (req, res) => {
  try{
    const airports = await duffel.airports.listWithGenerator(10);
    for await (const airport of airports) {
      if(airport.data.city_name.includes(req.body.input))
        res.json(airport);
    }
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