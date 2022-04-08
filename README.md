# api-review

Really simple API, created to study and review some importants concepts.

The focus is in the use of ESLint, Swagger, JestJS and Docker.


## Usage
#
Clone the repository and inside of the project folder run:
```
$ yarn
```
To iniciate the server run:
```
$ yarn dev
```
To run the test use:
```
$ yarn test
```
To read the documentation, access the endpoint '/api-documentation'

## Running server on Docker
First, build the server image. Inside of the project folder, run:
```
docker build -t api-review .
```
Then, start the container: 
```
docker run -d -p 3000:3333 --name node-api api-review 
```
Now, the server will be running on Docker in port: 3000
