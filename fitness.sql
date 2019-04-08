-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2019 at 10:01 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fitness`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
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
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `username`, `firstName`, `lastName`, `password`, `confPassword`, `phone`, `email`, `availableSessions`, `usedSessions`, `startDate`, `endDate`) VALUES
(1, 'undefined', 'Lucian', 'Moldovan', '1234', 'undefined', '0751263552', 'lmoldovan@domain.com', '7', '0', '2019-04-08', '2019-05-08'),
(2, 'undefined', 'Razvan', 'Crisan', '1234', 'undefined', '0751263552', 'rcrisan@domain.com', '15', '0', '2019-04-08', '2019-05-08'),
(3, 'undefined', 'Mircea', 'Frandes', '1234', '1234', '0742332112', 'frandesmyrce@gmail.com', '10', '', '2019-04-08', '2019-05-08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
