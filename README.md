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

To install Bild, clone the Github repository and install the node modules. Then create a `.env` file.

```bash
$ git clone https://github.com/mlbonniec/bild
$ cd bild
$ npm install
$ cp .env.example .env
```

You can then fill in your personnal informations in the `.env` file.

## Usage

To launch Bild, you have 2 possibilities. Either in development mode, or in production mode (or you will have to launch a building script).
Server will be launched on `localhost:5050`, unless you add `PORT=your port` in the `.env` file.

**Development**
```
$ npm run dev
```

**Production**
```
$ npm run start
# or
$ npm run build
$ npm run prod
```


## API Endpoints

Endpoints with a 🔐 require a token.
The token type (user or application) will be specified in the header template.

### Authentication

<details>
<summary><b>POST</b> Create a new account</summary>

<br />

**Endpoint:** `/auth/register`\
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
  "message": "Successfully Registered",
  "user": {
    "email": "john@doe.com",
    "userId": "rUgEEJbVuU",
    "name": "John Doe",
  }
}
```
</details>

<details>
<summary><b>POST</b> Login to your account, to get your token</summary>

<br />

**Endpoint:** `/auth/login`\
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
  "message": "Successfully Logged In",
  "user": {
    "userId": "eQ1AkSZ7Zm",
    "email": "john@doe.com",
    "name": "John Doe",
    "token": "xxxxxxxxxxxxx.xxxxxxxxxxxx.xxxxxxxxx"
  },
}
```
</details>

### User

<details>
<summary>🔐 <b>GET</b> Get user data</summary>

<br />

**Endpoint:** `/user`\
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "usreId": "eQ1AkSZ7Zm",
  "email": "john@doe.com",
  "name": "John Doe"
}
```
</details>

### Applications

<details>
<summary>🔐 <b>GET</b> Get an application by its ID</summary>

<br />

**Endpoint:** `/api/v1/applications/:id`\
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Retrieved Application",
  "application": {
    "applicationId": "Qj7LG74sPX",
    "website": "exapl.com",
    "description": "This is an app.",
    "owner": "eQ1AkSZ7Zm",
    "name": "My app"
  }
}
```
</details>

<details>
<summary>🔐 <b>PATCH</b> Update an application by its ID</summary>

<br />

**Endpoint:** `/api/v1/applications/:id`\
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:**
```json
{
  "name": "string (or omit this field)",
  "website": "string (or omit this field)",
  "description": "string (or omit this field)"
}
```
**Response:** `200 OK`
```json
{
  "message": "Successfully Updated Application"
}
```
</details>

<details>
<summary>🔐 <b>DELETE</b> Remove an application by its ID</summary>

<br />

**Endpoint:** `/api/v1/applications/:id`\
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Removed Application"
}
```
</details>

<details>
<summary>🔐 <b>GET</b> Get all applications of the user the token belongs to</summary>

<br />

**Endpoint:** `/api/v1/applications`\
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Retrieved Applications",
  "applications": [{
    "applicationId": "Qj7LG74sPX",
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

<br />

**Endpoint:** `/api/v1/applications`\
**Header:**
```
Authorization: 'Bearer user_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Removed Applications"
}
```
</details>

<details>
<summary>🔐 <b>POST</b> Create a new application</summary>

<br />

**Endpoint:** `/api/v1/applications`\
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
  "message": "ASuccessfully Added Application",
  "application": {
    "applicationId": "SQdbvoxH1y",
    "website": "example.com",
    "description": "This is an application.",
    "owner": "eQ1AkSZ7Zm",
    "name": "My app",
    "token": "xxxxxxxxxxxxxx.xxxxxxxxxxxxxxx.xxxxxxxxxxxxxx"
  },
}
```
</details>

### Images

<details>
<summary><b>GET</b> Get an image by its ID</summary>

<br />

**Endpoint:** `/api/v1/images/:id`\
**Body:** *none*\
**Response:** `200 OK`
The image

ℹ️ There is also a shortcut for this route, which is not subject to versionning: `/content/:id`.
</details>

<details>
<summary>🔐 <b>PATCH</b> Rename an image by its ID</summary>

<br />

**Endpoint:** `/api/v1/images/:id`\
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:**
```json
{
  "renameTo": "string"
}
```
**Response:** `200 OK`
```json
{
  "message": "Successfully Renamed Image"
}
```
</details>

<details>
<summary>🔐 <b>DELETE</b> Remove an image by its ID</summary>

<br />

**Endpoint:** `/api/v1/images/:id`\
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Removed Image"
}
```
</details>

<details>
<summary>🔐 <b>GET</b> Get all images of the application the token belongs to</summary>

<br />

**Endpoint:** `/api/v1/images`\
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Retrieved Images",
  "images": [{
    "imageId": "rUgEEJbVuU",
    "application": "SQdbvoxH1y",
    "originalName": "mountain.jpg",
    "savedName": "rUgEEJbVuU.jpg"
  }]
}
```
</details>

<details>
<summary>🔐 <b>DELETE</b> Remove all images of the application the token belongs to</summary>

<br />

**Endpoint:** `/api/v1/images`\
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Removed Images"
}
```
</details>

<details>
<summary>🔐 <b>POST</b> Add a new image to the application the token belongs to</summary>

<br />

**Endpoint:** `/api/v1/images`\
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
  "message": "Successfully Added Image",
  "image": {
    "imageId": "8yPlnPtURc",
    "application": "SQdbvoxH1y",
    "originalName": "montain.jpg",
    "savedName": "8yPlnPtURc.jpg"
  }
}
```
</details>

<details>
<summary>🔐 <b>GET</b> Information about an image by its ID</summary>

<br />

**Endpoint:** `/api/v1/images/:id/information`\
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Retrieved Image Information",
  "information": {
    "mimeType": "mime/type",
    "size": 100000,
    "creation": 1612909764769,
    "lastUpdate": 1612909764769,
    "application": "XwRu0ZBinu",
    "originalName": "mountain.png",
    "savedName": "QJ9JaWuGXC.png",
    "imageId": "QJ9JaWuGXC"
  }
}
```

ℹ️ The size is in bytes.
ℹ️ The timestamps are in milliseconds.
</details>


## License

Copyright © 2020 Mathis Le Bonniec & Elliot Maisl. Licensed under the Apache-2.0 license, see [the license](./LICENSE).
