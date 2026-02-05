"use strict";

import express from 'express';

const users = [
  {
    id: 1,
    name: "Richard Hendricks",
    email: "richard@piedpiper.com",
  },
  {
    id: 2,
    name: "Bertram Gilfoyle",
    email: 'gilfoyle@piedpiper.com'
  }
];

const router = (app) => {
  const options = {
    root: 'public',
  }

  app.use(express.static('public'));

  app.get('/users', (req, res) => {
    res.send(users);
  });
}

export default router;