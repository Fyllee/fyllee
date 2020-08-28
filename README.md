# Bild

A REST API image hosting platform.

Bild was born from a problem I was encountering while creating SPAs with NextJS.
I couldn't dynamically add images to the images folder. So I had no place to store my
images. From there came the idea to create my own image storage system. Configured
according to my needs, and potentially those of other developers who were facing the
same problem as me.

<a href="./LICENSE" alt="Contributors">
    <img src="https://img.shields.io/badge/License-Apache-green" />
</a>
<a href="https://github.com/mlbonniec/bild/commit/master" alt="Commits">
    <img src="https://img.shields.io/github/commit-activity/m/mlbonniec/bild" />
</a>
<a href="https://github.com/mlbonniec/bild/commit/master" alt="Last commit">
    <img src="https://img.shields.io/github/last-commit/mlbonniec/bild/master" />
</a>
<a href="https://github.com/mlbonniec/bild/graphs/contributors" alt="Contributors">
    <img src="https://img.shields.io/github/contributors/mlbonniec/bild" />
</a>
<a href="https://github.com/mlbonniec/bild/issues" alt="Issues">
    <img src="https://img.shields.io/github/issues-raw/mlbonniec/bild" />
</a>
<a href="https://github.com/mlbonniec/bild" alt="Github stars">
    <img src="https://img.shields.io/github/stars/mlbonniec/bild?style=social" />
</a>

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

To install Bild, clone the Github repository and install the nodes modules. Then create a `.env` file.

```bash
$ git clone https://github.com/mlbonniec/bild
$ cd bild
$ npm install
$ cp .env.example .env
```

You can then fill in your personnal informations.

## Usage
To launch Bild, you have 2 possibilities. Either in development mode, or in production mode (or you will have to launch a building script).
Server will be launched on `localhost:5050`. Unless you add `PORT=your port` in the `.env` file.

**Development**
```
$ npm run dev
```

**Production**
```
$ npm run build
$ npm run prod
```

## API Endpoints

Endpoints with a 🔐 require a token.
The token type (user or app) will be specified righ after.
The token has to be in the header, presented like this
```
Authorization: 'Bearer your_token'
```

### Authentication

<details>
<summary><b>POST</b> Create a new account</summary>

<br>

**Endpoint:** `/auth/register`
**Body:**
```json
{
  "email": "john@doe.com",
  "name": "John Doe",
  "password": "johndoe123"
}
```
**Response:** `200 OK`
```json
{
  "user": {
    "email": "john@doe.com",
    "id": "rUgEEJbVuU",
    "name": "John Doe",
  }
}
```
</details>

<details>
<summary><b>POST</b> Login to your account, to get your token</summary>

<br>

**Endpoint:** `/auth/login`
**Body:**
```json
{
  "email": "john@doe.com",
  "password": "johndoe123"
}
```
**Response:** `200 OK`
```json
{
  "message": "You are now logged in.",
  "user": {
    "id": "eQ1AkSZ7Zm",
    "email": "john@doe.com",
    "name": "John Doe"
  },
  "token": "xxxxxxxxxxxxx.xxxxxxxxxxxx.xxxxxxxxx"
}
```
</details>

### User

<details>
<summary>🔐 <b>GET</b> Get user data</summary>

<br>

**Endpoint:** `/user`
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:** *none*
**Response:** `200 OK`
```json
{
  "id": "eQ1AkSZ7Zm",
  "email": "john@doe.com",
  "name": "John Doe"
}
```
</details>

### Applications

<details>
<summary>🔐 <b>GET</b> Get an application by its ID</summary>

<br>

**Endpoint:** `/api/v1/applications/:id`
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:** *none*
**Response:** `200 OK`
```json
{
  "application": {
    "id": "Qj7LG74sPX",
    "website": "exapl.com",
    "description": "This is an app.",
    "owner": "eQ1AkSZ7Zm",
    "name": "My app"
  }
}
```
</details>

<details>
<summary>🔐 <b>DELETE</b> Remove an application by its ID</summary>

<br>

**Endpoint:** `/api/v1/applications/:id`
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:** *none*
**Response:** `200 OK`
```json
{
  "message": "Success!"
}
```
</details>

<details>
<summary>🔐 <b>GET</b> Get all applications of the user the token belongs to</summary>

<br>

**Endpoint:** `/api/v1/applications`
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:** *none*
**Response:** `200 OK`
```json
{
  "applications": [{
    "id": "Qj7LG74sPX",
    "website": "exapl.com",
    "description": "This is an app.",
    "owner": "eQ1AkSZ7Zm",
    "name": "My app"
  }]
}
```
</details>

<details>
<summary>🔐 <b>DELETE</b> Remove all applications of the user the token belongs to</summary>

<br>

**Endpoint:** `/api/v1/applications`
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:** *none*
**Response:** `200 OK`
```json
{
  "message": "Success!"
}
```
</details>

<details>
<summary>🔐 <b>POST</b> Create a new application</summary>

<br>

**Endpoint:** `/api/v1/applications`
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:**
```json
{
	"name": "My App",
	"website": "example.com",
	"description": "This is an application."
}
```
**Response:** `200 OK`
```json
{
  "message": "Application created.",
  "application": {
    "id": "SQdbvoxH1y",
    "website": "example.com",
    "description": "This is an application.",
    "owner": "eQ1AkSZ7Zm",
    "name": "My app"
  },
  "token": "xxxxxxxxxxxxxx.xxxxxxxxxxxxxxx.xxxxxxxxxxxxxx"
}
```
</details>

### Images

<details>
<summary><b>GET</b> Get an image by its ID</summary>

<br>

**Endpoint:** `/api/v1/images/:id`
**Body:** *none*
**Response:** `200 OK`
The image
</details>

<details>
<summary>🔐 <b>DELETE</b> Remove an image by its ID</summary>

<br>

**Endpoint:** `/api/v1/images/:id`
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:** *none*
**Response:** `200 OK`
```json
{
  "message": "Success!"
}
```
</details>

<details>
<summary>🔐 <b>GET</b> Get all images of the application the token belongs to</summary>

<br>

**Endpoint:** `/api/v1/images`
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:** *none*
**Response:** `200 OK`
```json
{
  "images": [{
    "id": "rUgEEJbVuU",
    "application": "SQdbvoxH1y",
    "originalName": "mountain.jpg",
    "savedName": "rUgEEJbVuU.jpg"
  }]
}
```
</details>

<details>
<summary>🔐 <b>DELETE</b> Remove all images of the application the token belongs to</summary>

<br>

**Endpoint:** `/api/v1/images`
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:** *none*
**Response:** `200 OK`
```json
{
  "message": "Success!"
}
```
</details>

<details>
<summary>🔐 <b>POST</b> Add a new image to the application the token belongs to</summary>

<br>

**Endpoint:** `/api/v1/images`
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:**
(Multipart-Form)
```yaml
image: <image>
```
**Response:** `200 OK`
```json
{
  "message": "Success!",
  "image": {
    "id": "8yPlnPtURc",
    "application": "SQdbvoxH1y",
    "originalName": "montain.jpg",
    "savedName": "8yPlnPtURc.jpg"
  }
}
```
</details>


## License

Copyright © 2020 Mathis Le Bonniec & Elliot Maisl. Licensed under the Apache-2.0 license, see [the license](./LICENSE).
