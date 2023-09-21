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

GET /api/latitude/logitude/zoom: Send a GET request with input data of a satellite latitude, logitude and zoom factor to get predictions from the Tensorflow.js model.

Example Request:

  ```bash
  cURL -X GET /api/13.453/14.23/10/
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
