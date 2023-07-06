<div align='center'>
    <h2><b>🎂 Drone Management API 🎂</b></h2>
    <p>The Drone Management API is a TypeScript-based backend project that provides a RESTful API for managing a fleet of drones. It allows clients to register drones, load them with medication items, check loaded medication items, and monitor drone battery levels. The project utilizes Node.js, NeDB in-memory database, and Express.js framework. It includes authentication, authorization, validation, and error handling mechanisms. With a focus on data integrity and security, the API serves as a reliable and efficient solution for drone fleet management, facilitating communication between clients and the drone fleet through a well-defined REST API.</p>

</div>


## 🗒️ **INSTALLATION**

1. clone the repository

```
git clone https://github.com/liomotolani/drone-management-api
```

2. cd into cloned repository

```
cd drone-management-api
```

3. install dependencies

```
npm install
```

4. build project

```
npm run build
```
5. run the app

```
npm run start
```

<br />

## 🖨️ **USER API Endpoints**
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/v1/users/register | To register a user |
| POST | /api/v1/users/login | To login a user |

<br />


## 🖨️ **DISPATCH API Endpoints**
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/v1/drones/register | To register a new drone |
| PUT |/api/v1/drones/load?droneSerialNumber={serial number} | To load medication on a particular drone |
| GET | /api/v1/drones/battery-level/:droneSerialNumber | To retrieve battery level of a drone |
| GET | /api/v1/drones/medications/:droneSerialNumber | To retrieve details of all medications on a particular drone |
| GET | /api/v1/drones/available | To retrieve details of all available drones for loading |


## 💻 **TECHNOLOGIES**

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

<br />

---

## 📎 **LICENSE**

MIT License

Copyright © 2023 Omotolani Ligali

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br />

---

## 📌 **LINKS**

[<img alt="Github" src="https://img.shields.io/badge/liomotolani-%23181717.svg?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/liomotolani)
[<img alt="Twitter" src="https://img.shields.io/badge/omotolani-ligali%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white" />](https://twitter.com/omotolaniligali)
[<img alt="Linkedin" src="https://img.shields.io/badge/omotolani-ligali-%23E4405F.svg?style=for-the-badge&logo=Linkedin&logoColor=white" />](https://www.linkedin.com/in/omotolani-ligali/)
