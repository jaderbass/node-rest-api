"use strict";

import pool from '../data/config.js';
import express from 'express';
import path from 'path';

const router = (app) => {
  const options = {
    root: 'public',
  }

  app.use(express.static('public'));

  app.set('view engine', 'ejs');
  app.set('views', path.join('views'));

  app.get('/users', (req, res) => {
    pool.query("SELECT * FROM tbl_users", (error, result) => {
      if(error) throw error;

      console.log(result);

      res.render('all-users', {
        title: 'Benutzer-Dashboard',
        heading: 'Benutzer Dashboard',
        users: result,
      });
    });
  });
}

export default router;