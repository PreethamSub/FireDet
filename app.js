const express = require("express");
const cors = require('cors');
const fs = require("fs");
const client = require("https");
const request = require("request");
const tf = require("@tensorflow/tfjs-node");

const app = express();
app.use(cors());

const model_url = "file://jsmodel.tfjs/model.json"; //path to the model
const api_key = "Agv3yWf-P4aPelrHvZZfvISIRN2zWqCp885IYh2H_HnUpAjvzOhOXJRPiLUef4Gl"; //Bing Maps API key

app.get("/api/:lat/:lon/:zoom", async (req, res) => {
  //loading model
  console.log("Loading model");
  const model = await tf.loadLayersModel(model_url);
  console.log("Loaded model");

  //downloading satellite image
  const { lat, lon, zoom } = req.params;
  const imageUrl = `https://dev.virtualearth.net/REST/V1/Imagery/Map/Aerial/${lat}%2C${lon}/${zoom}?mapSize=224%2C224&format=jpeg&key=${api_key}`;
  const imagePth = "./pic.jpeg";
  
  console.log("Downloading satellite image:");
  console.log(imageUrl);
  await client.get(imageUrl, (res) => {
    res.pipe(fs.createWriteStream(imagePth));
  });
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("Downloaded satellite image");

  //predictions on the image
  console.log("Reading satellite image");
  const buf = fs.readFileSync(imagePth);
  const input = tf.node.decodeJpeg(buf);
  let imageTensor = tf.node.decodeJpeg(buf);
  imageTensor = imageTensor.expandDims(0);
  console.log(`Success: converted local file to a ${imageTensor.shape} tensor`);
  res.send({
    data: await model.predict(imageTensor, { batchSize: 4 }).data(),
  });
});

app.listen(5000, () => {
  console.log("Server Listening");
});
