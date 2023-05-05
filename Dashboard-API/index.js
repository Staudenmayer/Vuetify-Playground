import { createClient } from 'redis';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

app.get('/string/:key', async function (req, res) {
  let val = await client.get(req.params.key);
  if(!val)
    res.status(404);
  res.send(val);
})
app.get('/json/:key', async function (req, res) {
  let val = await client.json.get(req.params.key);
  if(!val)
    res.status(404);
  res.send(val);
})
app.get('/set/:key', async function (req, res) {
  let val = await client.sMembers(req.params.key);
  if(!val)
    res.status(404);
  res.send(val);
})

app.get('/workouts', async function (req, res) {
  let workouts = await client.sMembers("Workouts");
  if(!workouts)
    return res.status(404).send();
  for(let i = 0; i < workouts.length; i++){
    let workout = workouts[i];
    workouts[i] = {"name": workout, sequence: (await client.json.get(workout)).sequence}
  }
  res.send(workouts);
})

app.get('/workouts/:key', async function (req, res) {
  let sequence = await client.json.get(req.params.key);
  
  if(!sequence)
    return res.status(404).send();

  res.send({"name": req.params.key, sequence: sequence.sequence});
})

app.listen(3001);
