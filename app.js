const express = require("express");
const fs = require("fs");
const client = require("https");
const request = require("request");
const tf = require("@tensorflow/tfjs-node");

const app = express();

const model_url = "./jsmodel.tfjs/model.json"; //path to the model
const api_key = "Agv3yWf-P4aPelrHvZZfvISIRN2zWqCp885IYh2H_HnUpAjvzOhOXJRPiLUef4Gl"; //Bing Maps API key

app.get("/api/:lat/:lon/:zoom", async (req, res) => {
  //loading model
  console.log("loading model");
  const model = await tf.loadLayersModel(model_url);
  console.log("loaded model");

  //downloading satellite image
  const { lat, lon, zoom } = req.params;
  const imageUrl = `https://dev.virtualearth.net/REST/V1/Imagery/Map/Aerial/${lat}%2C${lon}/${zoom}?mapSize=224%2C224&format=jpeg&key=${api_key}`;
  const imagePth = "./pic.jpeg";

  await client.get(imageUrl, (res) => {
    res.pipe(fs.createWriteStream(imagePth));
  });

  //predictions on the image
  const buf = fs.readFileSync(imagePth);
  const input = tf.node.decodeJpeg(buf);
  let imageTensor;
  let pred;
  imageTensor = tf.node.decodeJpeg(buf);
  imageTensor = imageTensor.expandDims(0);
  console.log(`Success: local file to a ${imageTensor.shape} tensor`);
  res.send({
    data: await model.predict(imageTensor, { batchSize: 4 }).data(),
  });
});

app.listen(5000, () => {
  console.log("Server Listening");
});
