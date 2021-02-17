# Bild

A REST API static content hosting platform.

Bild was born from a problem I was encountering while creating SPAs with NextJS.
I couldn't dynamically add images to the images folder. So I had no place to store
my images, and globally, all my static content. From there came the idea to create
my own static content storage system. Configured according to my needs, and potentially
those of other developers who were facing the same problem as me.

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

- [Bild](#bild)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [User](#user)
    - [Applications](#applications)
    - [Contents](#contents)
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
    "name": "John Doe"
  },
  "token": "xxxxxxxxxxxxx.xxxxxxxxxxxx.xxxxxxxxx"
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
  "userId": "eQ1AkSZ7Zm",
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
  "description": "string (or omit this field)",
  "resetToken": "true (or omit this field)"
}
```
**Response:** `200 OK`
```json
{
  "message": "Successfully Updated Application",
  "application": {
    "name": "new name (or not set if name not updated)",
    "website": "new website (or not set if website not updated)",
    "description": "new description (or not set if description not updated)",
    "token": "new token (or not set if token not updated)"
  }
}
```

ℹ️ If you set `resetToken` to `true`, the token will be regenerated.
ℹ️ Only the changed fields will be returned, with their new values.
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
    "website": "example.com",
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
    "name": "My app"
  },
  "token": "xxxxxxxxxxxxxx.xxxxxxxxxxxxxxx.xxxxxxxxxxxxxx"
}
```
</details>

### Contents

<details>
<summary><b>GET</b> Get a content by its ID</summary>

<br />

**Endpoint:** `/api/v1/contents/:id?query-parameters`\
**Body:** *none*\
**Parameters:**\
*You can use these query parameters if you're getting an image to apply some filters to it*
- `blur`: Set to an integer to apply a blur. The integer must be between 0 and 10.000.
- `contrast`: Set to a number to apply a contrast filter. The number must be between -1 and 1.
- `greyscale`: Set to `"true"` if you want to greyscale the image.
- `opacity`: Set to a number to apply a contrast filter. The number must be between 0 and 1.
- `opaque`: Set to `"true"` if you want to make the image opaque.
- `sepia`: Set to `"true"` if you want to apply a sepia filter to the image.
- `pixelate`: Set to an integer to pixelate the image. The integer must be between 0 and 10.000.
- `height`: Set to an integer to define the height of the image. You can't set an integer greater than the actual height.
- `width`: Set to an integer to define the width of the image. You can't set an integer greater than the actual width.
- `rotate`: Set to an integer to define the rotation of the image. The integer must be between -360 and 360.
- `mirror` Set to `"vertical"` to make the image vertically mirrored. Set to `"horizontal"` to make the image horizontally mirrored. Set to `"both"` to make the image vertically and horizontally mirrored.\
**Response:** `200 OK`
The content

ℹ️ There is also a shortcut for this route, which is not subject to versionning: `/contents/:id`.
ℹ️ All query parameters are optional, and only usable for images. If none are set, the raw image will be returned
ℹ️ If you set only the height *or* the width, the image will be scaled accordingly to keep its ratio.
</details>

<details>
<summary>🔐 <b>PATCH</b> Rename a content by its ID</summary>

<br />

**Endpoint:** `/api/v1/contents/:id`\
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
  "message": "Successfully Renamed Content"
}
```
</details>

<details>
<summary>🔐 <b>DELETE</b> Remove a content by its ID</summary>

<br />

**Endpoint:** `/api/v1/contents/:id`\
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Removed Content"
}
```
</details>

<details>
<summary>🔐 <b>GET</b> Get all contents of the application the token belongs to</summary>

<br />

**Endpoint:** `/api/v1/contents`\
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Retrieved Contents",
  "contents": [{
    "contentId": "rUgEEJbVuU",
    "application": "SQdbvoxH1y",
    "originalName": "mountain.jpg",
    "savedName": "rUgEEJbVuU.jpg"
  }]
}
```
</details>

<details>
<summary>🔐 <b>DELETE</b> Remove all contents of the application the token belongs to</summary>

<br />

**Endpoint:** `/api/v1/contents`\
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Removed Contents"
}
```
</details>

<details>
<summary>🔐 <b>POST</b> Add a new content to the application the token belongs to</summary>

<br />

**Endpoint:** `/api/v1/contents`\
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:**
(Multipart-Form)
```yaml
content: <image|video|audio>
```
**Response:** `200 OK`
```json
{
  "message": "Successfully Added Content",
  "content": {
    "contentId": "8yPlnPtURc",
    "application": "SQdbvoxH1y",
    "originalName": "montain.jpg",
    "savedName": "8yPlnPtURc.jpg"
  }
}
```
</details>

<details>
<summary>🔐 <b>GET</b> Information about a content by its ID</summary>

<br />

**Endpoint:** `/api/v1/contents/:id/information`\
**Header:**
```
Authorization: 'Bearer application_token'
```
**Body:** *none*\
**Response:** `200 OK`
```json
{
  "message": "Successfully Retrieved Content Information",
  "information": {
    "mimeType": "mime/type",
    "size": 100000,
    "creation": 1612909764769,
    "lastUpdate": 1612909764769,
    "application": "XwRu0ZBinu",
    "originalName": "mountain.png",
    "savedName": "QJ9JaWuGXC.png",
    "contentId": "QJ9JaWuGXC"
  }
}
```

ℹ️ The size is in bytes.
ℹ️ The timestamps are in milliseconds.
</details>


## License

Copyright © 2020 Mathis Le Bonniec & Elliot Maisl. Licensed under the Apache-2.0 license, see [the license](./LICENSE).
