"use strict";

import pool from '../data/config.js';
import express from 'express';
import path from 'path';

const router = (app) => {
  const options = {
    root: 'public',
  }

  // Das 'public'-Verzeichnis für statische Dateien bereitstellen
  app.use(express.static(path.join(process.cwd(), "public")));

  // EJS als View-Engine konfigurieren
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

  // einzelnen User ausgeben und ändern
  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    pool.query("SELECT * FROM tbl_users WHERE users_id = ?", id, (error, result) => {
      console.log(result);
      if (error) throw error;
      res.render('update-user', {
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
      // ? Flash success: Bestätigungsnachricht nach Anlage
      req.flash('success', `Benutzer ${data.users_name} wurde angelegt`);
      res.redirect('/users');
    });
  });

  // Benutzer löschen
  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    // Name ermitteln, damit wir ihn in der Nachricht verwenden können
    pool.query("SELECT users_name FROM tbl_users WHERE users_id = ?", [id], (err, rows) => {
      if (err) {
        console.error('SELECT before DELETE error:', err);
        // ? Flash error: Fehler beim Auslesen vor Löschversuch
        req.flash('error', 'Fehler beim Löschen des Benutzers');
        return res.redirect('/users');
      }
      const name = rows && rows[0] ? rows[0].users_name : id;
      pool.query("DELETE FROM tbl_users WHERE users_id = ?", [id], (error, result) => {
        if (error) {
          console.error('DELETE query error:', error);
          // ? Flash error: Löschvorgang fehlgeschlagen
          req.flash('error', 'Fehler beim Löschen des Benutzers');
          return res.redirect('/users');
        }
        // ? Flash success: Bestätigungsnachricht nach Löschung
        req.flash('success', `Benutzer ${name} wurde gelöscht`);
        // Zurück zum Benutzer-Übersichtsseite
        res.redirect('/users');
      });
    });
  });

  // Benutzer aktualisieren
  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    pool.query("UPDATE tbl_users SET users_name = ?, users_password = ? WHERE users_id = ?", [data.users_name, data.users_password, id], (error, result) => {
      if (error) throw error;
      // ? Flash success: Bestätigungsnachricht nach Aktualisierung
      req.flash('success', `Benutzer ${data.users_name} wurde aktualisiert`);
      // Zurück zum Benutzer-Übersichtsseite
      res.redirect('/users');
    });
  });
}

export default router;