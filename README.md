# First project of Node MasterClass

## Description

Simple RESTful JSON API that listens on the port **8080**. The API is developed in pure NodeJS and no frameworks were used.

## Routes

### /hello

The API returns:

- HTTP code: 200
- JSON: `json{ msg: "Welcome to the Great Node.js" }`

### Every other route

Every other end point returns:

- HTTP code: 404
- JSON: `json{ msg: "Not found" }`

## How to run

- Clone the repo `https://github.com/ivivanov18/SimpleRESTful_JSON_API`
- Run `npm index.js`
- Use postman or curl to test the endpoints
