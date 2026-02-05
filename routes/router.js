"use strict";

import pool from '../data/config.js';
import express from 'express';
import path from 'path';

const router = (app) => {
  const options = {
    root: 'public',
  }

  app.use(express.static(path.join(process.cwd(), "public")));

  app.set('view engine', 'ejs');
  app.set('views', path.join('views'));

  // alle User ausgeben
  app.get('/users', (req, res) => {
    pool.query("SELECT * FROM tbl_users", (error, result) => {
      if (error) throw error;

      console.log(result);

      res.render('all-users', {
        title: 'Benutzer-Dashboard',
        heading: 'Benutzer Dashboard',
        users: result,
      });
    });
  });

  // einzelnen User ausgeben
  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    pool.query("SELECT * FROM tbl_users WHERE users_id = ?", id, (error, result) => {
      console.log(result);
      if (error) throw error;
      res.render('users-detail', {
        title: 'Benutzer-Details',
        heading: 'Benutzer-Details',
        user: result,
      });
    });
  });

  // neuen Benutzer anlegen
  app.post('/users', (req, res) => {
    const data = req.body;
    console.log(data);
    pool.query("INSERT INTO tbl_users (users_name, users_password) VALUES (?, ?)", [data.users_name, data.users_password], (error, result) => {
      if (error) throw error;
      res.redirect('/users');
    });
  });

  // Benutzer löschen
  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    pool.query("DELETE FROM tbl_users WHERE users_id = ?", [id], (error, result) => {
      if (error) {
        console.error('DELETE query error:', error);
        return res.status(500).json({ ok: false, error: error.message });
      }
      // Zurück zum Benutzer-Übersichtsseite
      res.redirect('/users');
    });
  });
}

export default router;