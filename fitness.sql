-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: apr. 14, 2019 la 11:14 PM
-- Versiune server: 10.1.37-MariaDB
-- Versiune PHP: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `fitness`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `username` text CHARACTER SET utf32 NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `password` text NOT NULL,
  `confPassword` text NOT NULL,
  `phone` text NOT NULL,
  `email` text NOT NULL,
  `availableSessions` text NOT NULL,
  `usedSessions` text NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Eliminarea datelor din tabel `members`
--

INSERT INTO `members` (`id`, `username`, `firstName`, `lastName`, `password`, `confPassword`, `phone`, `email`, `availableSessions`, `usedSessions`, `startDate`, `endDate`) VALUES
(22, 'undefined', 'Lucian', 'Moldovan', '1234', '1234', '0716932376', '1lucianmoldovan@gmail.com', '4', '0', '2019-04-10', '2019-05-10'),
(23, 'undefined', 'Mircea', 'Frandes', '1234', '1234', '0768774820', 'frandesmyrce@gmail.com', '2', '0', '2019-03-01', '2019-03-31'),
(24, 'undefined', 'Razvan', 'Crisan', '1234', '1234', '755962057', 'crsn_razvan@yahoo.com', '0', '0', '2019-04-14', '2019-05-14'),
(25, 'undefined', 'Orsolya Eva', 'Moldovan', '1234', '1234', '755962057', 'contact@heartcycling.ro', '4', '1', '2019-04-11', '2019-05-11'),
(26, 'undefined', 'Moldovan', 'Lucian', '1234', 'undefined', '755962057', 'moldovanlucianionut@yahoo.com', '1', '1', '2019-04-14', '2019-05-14'),
(27, 'undefined', 'Luminta', 'Crisan', '1234', '1234', '0755787886', 'august_luminita@yahoo.com', '3', '0', '2019-03-27', '2019-04-26'),
(28, 'undefined', 'Nicolae', 'Matei', '1234', '1234', '0789158266', 'matei.nick@gmail.com', '4', '1', '2019-04-03', '2019-05-03'),
(29, 'undefined', 'Andrei', 'Ilie', '1234', 'undefined', '0785513389', 'ille.andrei.v@gmail.com', '3', '1', '2019-04-14', '2019-05-14'),
(30, 'undefined', 'Homer', 'Simpson', '1234', '1234', '0770086020', 'crsn_razvan2@yahoo.es', '0', '2', '2019-04-15', '2019-05-15'),
(31, 'undefined', 'Sheldon', 'Cooper', '1234', '1234', '0716603454', 'crsn_razvan3@yahoo.com', '4', '3', '2019-04-07', '2019-05-07'),
(32, 'undefined', 'Heart Cycling', 'Studio', '1234', '1234', '073094830', 'heartcyclingstudio@gmail.com', '0', '2', '2019-04-16', '2019-05-16'),
(33, 'undefined', 'Mix', 'Meister', '1234', '1234', '0787859976', 'contact@mixmeister.ro', '4', '4', '2019-04-09', '2019-05-09'),
(34, 'undefined', 'Ambrus', 'Piroska', '1234', '1234', '0780226864', 'piroska64_ambrus@yahoo.com', '5', '0', '2019-04-02', '2019-05-02'),
(35, 'undefined', 'Antal', 'Judit', '1234', '1234', '0738693065', 'antal_jd@yahoo.com', '2', '0', '2019-04-12', '2019-05-12'),
(36, 'undefined', 'Dana', 'Ardelean', '1234', '1234', '0785336557', 'ma_danna@yahoo.com', '0', '3', '2019-04-11', '2019-05-11'),
(37, 'undefined', 'Anca', 'Barar', '1234', '1234', '072605457', 'ancabarar@yahoo.com', '4', '3', '2019-04-10', '2019-05-10'),
(38, 'undefined', 'Berek', 'Aliz', '1234', '1234', '0774974949', 'berekaliz@gmail.com', '4', '1', '2019-04-03', '2019-05-03'),
(39, 'undefined', 'Berek', 'Szilard', '1234', '1234', '0748095528', 'szilardnerek@gmail.com', '2', '2', '2019-02-16', '2019-03-18'),
(40, 'undefined', 'Yla', 'Bihari', '1234', '1234', '0735518455', 'ylabihari@yahoo.com', '0', '3', '2019-04-01', '2019-05-01');

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
