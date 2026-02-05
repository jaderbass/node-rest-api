"use strict";

// import packeges
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import methodOverride from 'method-override';
import router from './routes/router.js';

dotenv.config();


const port = process.env.PORT || 3000;
const app = express();

// central error logging for crashes
process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
});
process.on('unhandledRejection', (reason, p) => {
  console.error('unhandledRejection', reason);
});

// Use Helmet and explicit Content Security Policy (allow images from localhost)
// app.use(helmet());
/* app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    connectSrc: ["'self'"], 
    imgSrc: ["'self'", "data:"]
  }
})); */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'"], // ggf. + "http://localhost:3002" wenn Frontend anderer Port
        imgSrc: ["'self'", "data:"],
      },
    },
  })
);

// body-parser für die JSON-Daten
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Method-Override: expliziter Getter (loggt gefundenes _method)
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && req.body._method) {
    const method = req.body._method;
    console.log('Method-override detected in body:', method);
    delete req.body._method;
    return method;
  }
}));

// Debug-Logging für eingehende Requests (Methode, URL, Body)
app.use((req, res, next) => {
  console.log('REQ', req.method, req.url, 'body:', req.body);
  next();
});

router(app);

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log("CSP FINAL:", res.getHeader("Content-Security-Policy"));
    console.log("X-CSP-Debug:", res.getHeader("X-CSP-Debug"));
  });
  next();
});


// start the server
const server = app.listen(port, (error) => {
  if(error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
  console.log("APP:", process.cwd(), "PID:", process.pid);
});

// 404 (nach allen Routen)
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler (nach 404)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});
