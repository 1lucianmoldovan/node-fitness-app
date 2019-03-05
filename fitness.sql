-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2019 at 05:02 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

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
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `username`, `firstName`, `lastName`, `password`, `confPassword`, `phone`, `email`, `availableSessions`, `startDate`, `endDate`) VALUES
(94, 'undefined', 'Razvan333', 'Crisan', '1234', '1234', '786250563', 'davanitransport@yahoo.ro', '3', '2019-03-05', '2019-04-04'),
(96, 'undefined', 'Razvan666', 'Crisan', '1234', '1234', '786250563', 'davanitransport@yahoo.ro', '4', '2019-03-05', '2019-04-04'),
(97, 'undefined', 'Razvan', 'Crisan', '1234', '1234', '786250563', 'davanitransport@yahoo.ro', '3', '2019-03-05', '2019-04-04'),
(99, 'undefined', 'Razvan', 'Crisan', '1234', '1234', '786250563', 'davanitransport@yahoo.ro', '444', '2019-03-05', '2019-04-04'),
(100, 'undefined', 'Razvan', 'Crisan', '1234', '1234', '786250563', 'davanitransport@yahoo.ro', '6', '2019-03-05', '2019-04-04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD UNIQUE KEY `startDate` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
