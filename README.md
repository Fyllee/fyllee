# Bild

A REST API to host images

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

- [Origin of creation](#origin-of-creation)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Origin of creation

Bild was born from a problem I was encountering while creating SPAs with NextJS.
I couldn't dynamically add images to the images folder. So I had no place to store my
images. From there came the idea to create my own image storage system. Configured
according to my needs, and potentially those of other developers who were facing the
same problem as me.

## Installation

To install Bild, clone the Github repository and install the nodes modules. Then create a `.env` file.

```bash
$ git clone https://github.com/mlbonniec/bild
$ cd bild
$ npm install
$ cp .env.example .env
```

You can then fill in your personnal informations.

## API Endpoints

Endpoints with a 🔐 require a token.
The token type (user or app) will be specified righ after.
The token has to be in the header, presented like this
```
Authorization: 'Bearer your_token'
```

### Authentication

<details>
<summary>POST - /auth/register</summary>

**Description:** Create a new account

**Body:**
```json
{
  "email": "john@doe.com",
  "name": "John Doe",
  "password": "johndoe123"
}
```

**Response:**
Code 200
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
<summary>POST - /auth/login</summary>

**Description:** Login to your account, to get your token

**Body:**
```json
{
  "email": "john@doe.com",
  "password": "johndoe123"
}
```

**Response:**
Code 200
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
<summary>🔐 (user) GET - /user</summary>

**Description:** Get user data

**Body:** none

**Response:**
Code 200
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
<summary>🔐 (user) GET - /api/v1/applications/:id</summary>

**Description:** Get an application by its ID

**Body:** none

**Response:**
Code 200
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
<summary>🔐 (user) DELETE - /api/v1/applications/:id</summary>

**Description:** Remove an application by its ID

**Body:** none

**Response:**
Code 200
```json
{
  "message": "Success!"
}
```
</details>

<details>
<summary>🔐 (user) GET - /api/v1/applications</summary>

**Description:** Get all applications of the user the token belongs to

**Body:** none

**Response:**
Code 200
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
<summary>🔐 (user) DELETE - /api/v1/applications</summary>

**Description:** Remove all applications of the user the token belongs to

**Body:** none

**Response:**
Code 200
```json
{
  "message": "Success!"
}
```
</details>

<details>
<summary>🔐 (user) POST - /api/v1/applications</summary>

**Description:** Create a new application

**Body:**
```json
{
	"name": "My App",
	"website": "example.com",
	"description": "This is an application."
}
```

**Response:**
Code 200
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
<summary>🔐 (application) GET - /api/v1/images/:id</summary>

**Description:** Get an image by its ID

**Body:** none

**Response:**
Code 200
The image
</details>

<details>
<summary>🔐 (application) DELETE - /api/v1/images/:id</summary>

**Description:** Remove an image by its ID

**Body:** none

**Response:**
Code 200
```json
{
  "message": "Success!"
}
```
</details>

<details>
<summary>🔐 (application) GET - /api/v1/images</summary>

**Description:** Get all images of the application the token belongs to

**Body:** none

**Response:**
Code 200
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
<summary>🔐 (application) DELETE - /api/v1/images</summary>

**Description:** Remove all images of the application the token belongs to

**Body:** none

**Response:**
Code 200
```json
{
  "message": "Success!"
}
```
</details>

<details>
<summary>🔐 (application) POST - /api/v1/images</summary>

**Description:** Add a new image to the application the token belongs to

**Body:**
(Multipart-Form)
```yaml
image: <image>
```

**Response:**
Code 200
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

Copyright © 2020 Mathis Le Bonniec & Elliot Maisl. Licensed under the Apache-2.0 license, see [the license](./LICENSE)
