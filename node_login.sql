-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server-Version:               8.4.3 - MySQL Community Server - GPL
-- Server-Betriebssystem:        Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Exportiere Datenbank-Struktur für node_login
DROP DATABASE IF EXISTS `node_login`;
CREATE DATABASE IF NOT EXISTS `node_login` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `node_login`;

-- Exportiere Struktur von Tabelle node_login.tbl_users
DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `users_id` bigint NOT NULL AUTO_INCREMENT,
  `users_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `users_password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `users_registered` datetime DEFAULT CURRENT_TIMESTAMP,
  `users_last_login` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportiere Daten aus Tabelle node_login.tbl_users: ~0 rows (ungefähr)
DELETE FROM `tbl_users`;
INSERT INTO `tbl_users` (`users_id`, `users_name`, `users_password`, `users_registered`, `users_last_login`) VALUES
	(1, 'Max', '', '2026-02-03 21:24:03', '2026-02-03 21:24:03'),
	(2, 'jörg', 'Pa$$w0rd', '2026-02-03 22:02:48', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
