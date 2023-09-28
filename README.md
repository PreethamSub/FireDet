# Fire Detection Backend
## Using Tensorflow.js Model API with Node.js and Express.js

This project is a Node.js/Express.js application that serves as an API for a Tensorflow.js model. It allows you to make predictions using the Tensorflow.js model via HTTP requests. This README.md file will guide you through setting up and using the API.

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the Repository:**

   ```bash
   git clone https://github.dev/PreethamSub/FireDet/
   cd FireDet
   ```

2. **Install the Dependencies:**

    ```bash
    npm install
    ```

3. **Start the server:**

    ```bash
    npm start
    ```
    The server will start running at ```http://localhost:5000```.

## API Endpoints
The following endpoints are available for making predictions:

GET /api/latitude/logitude/zoom:
Send a GET request with input data of a satellite latitude, logitude and zoom factor to fetch the satellite image from Bing Maps and get predictions from the Tensorflow.js model.

Example Request:

  ```bash
  cURL -X GET /api/13.2989/14.4989/19
  ```

Example Response:

  ```bash
  {
    "data": {
      "0": 0.395423823595047,
      "1": 0.704576206207275
    }
  }
  ```
  Where ```"0"``` represents the class ```fire``` and ```"1"``` represents the class ```no fire```

## Model Loading
Make sure to place your Tensorflow.js model files in the ```./jsmodel.tfjs``` directory.

## Environment variables and CORS headers
If you are building this app manually, ensure that the Bing Maps API key is available as a process environment variable. You can get more information about Bing Maps [here](https://www.bingmapsportal.com/Application). Add the appropriate CORS headers to the app if you are hosting frontend and backend on different servers.

## Live Demo
The API server app is currently hosted on [Railway](https://railway.app/). The web app API endpoint is live [here](https://firedet-production.up.railway.app/api/13.2989/14.4989/19).
The frontend web app is hosted on Github pages. You can view the live page [here](https://ganesh-dagadi.github.io/ecotech-frontend/)
Note: Since the application is hosted on railway's free tier, the app may not be avaiable always. In that case, wait for a few seconds and try again.
