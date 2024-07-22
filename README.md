# Welcome to Restaurant Server

A Node.js server that delivers restaurant information (Dishes, Leaders, Users, Comments on dishes, User's favorite dishes...) to be viewed by any front-end Platform. The server uses OAuth-2 and has permissions according to the user type.

## Authentication

The server uses Passport.js for authentication, which supports various strategies including local strategy, OAuth, and OAuth 2.0.

### Basic Authentication

Basic authentication is used for testing purposes. To use basic authentication, simply pass the username and password in the authentication headers (e.g. in Postman, select Basic Auth from headers). The Base64 encoded string contains the username and password once the user is authenticated.

### Cookies and Express Sessions

A new session under a cookie is created when a user is authenticated. This allows the server to store user data and authenticate the user on subsequent requests.

### Passport.js

Passport.js is an authentication middleware that simplifies the authentication process. It supports various strategies, including local strategy, OAuth, and OAuth 2.0. Passport.js handles errors and authentication checks, making it easier to implement authentication in the application.

### Local Strategy

The local strategy is used to authenticate users using a username and password. The password is stored in hashed form. The local strategy also provides serialization and deserialization for sessions.

### JWT Authentication

The server uses JWT (JSON Web Token) authentication for secure authentication. Here's how it works:

1. The user is authenticated using the local strategy.
2. If the authentication is successful, a JWT token is generated and added to the response.
3. The user includes the JWT token in the authentication header for subsequent requests.
4. The server verifies the JWT token on each request to authenticate the user.

## Authorization

The server uses OAuth-2 for authorization, which provides permissions according to the user type.

## Endpoints

The server provides the following endpoints:

- `GET /dishes`: retrieve a list of all dishes
- `GET /dishes/:id`: retrieve a single dish by ID
- `POST /dishes`: create a new dish
- `PUT /dishes/:id`: update a single dish
- `DELETE /dishes/:id`: delete a single dish

## Security

The server uses HTTPS encryption to secure data transmission. To set up the server, follow these steps:

1. Create a private key and certificate.
2. Update the WWW and APP.js files to set up the server.

## Setup

To set up the server, follow these steps:

1. Clone the repository: `git clone https://github.com/Mustafa-khann/conFusionServer.git`
2. Install dependencies: `npm install`
3. Create a private key and certificate.
4. Update the WWW and APP.js files to set up the server.
5. Start the server: `node server.js`

## Testing

The server uses Jest for testing. To run the tests, use the command `npm test`.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please fork the repository and submit a pull request.

## Author

Mustafa Khan
