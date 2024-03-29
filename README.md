# Event Manger

Brief project description goes here.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About

Event Manager helps you plan events effortlessly. Create events, manage guests and track event by name location date and category all in one place. With Event Manager, hosting events is simple and stress-free.

## Features

- Authentication to use the app..
- Create and Update Events.
- View all the events created.
- Only logged in users are able to attend the events.
- And users are able to view the event details and the attendees.

## Getting Started

### Prerequisites

Below softwares needs to be installed.
- Node.js
- NPM
- Mongo DB

### Installation

#### 1. Backend Setup

Create an .env file with below contents

```
PORT=<YOUR PORT NUMBER>
MONGODB=<YOUR MONGO DB ENDPOINT>
JWT_SECRET=<YOUR SECRETE>
JWT_ACCESS_EXPIRATION_MINUTES=<YOUR TOKEN EXPIRATION IN MINUITES>
JWT_REFRESH_EXPIRATION_DAYS=<YOUR REFRESH TOKEN EXPIRATION IN DAYS>
```

In the project directory, you can run:
```
cd event-manager/backend/
npm install
npm start
```
Open http://localhost:<YOUR_PORT_NUMBER> to view it in your browser.

#### 2. Frontend Setup

In the project directory, you can run:
```
cd event-manager/frontend/
npm install
npm start
```

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.
 

## Built With

- JavaScript
- Nodejs
- ReactJs
- Material UI
- ExpressJs
- MongoDb
