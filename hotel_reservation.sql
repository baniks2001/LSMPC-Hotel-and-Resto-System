-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 04:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel_reservation`
--

-- --------------------------------------------------------

--
-- Table structure for table `food_sales`
--

CREATE TABLE `food_sales` (
  `id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `sale_date` datetime DEFAULT current_timestamp(),
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_sales`
--

INSERT INTO `food_sales` (`id`, `item_name`, `quantity`, `total_amount`, `sale_date`, `created_at`, `updated_at`) VALUES
(15, 'Burger with fries', 5, 600.00, '2024-12-06 08:04:11', '2024-12-06 08:04:11', '2024-12-06 08:04:11'),
(16, 'Coke 1.5ltr', 5, 600.00, '2024-12-06 08:04:11', '2024-12-06 08:04:11', '2024-12-06 08:04:11'),
(17, 'Milktea', 5, 200.00, '2024-12-07 03:50:55', '2024-12-07 03:50:55', '2024-12-07 03:50:55'),
(18, 'Caldereta', 5, 800.00, '2024-12-07 05:50:09', '2024-12-07 05:50:09', '2024-12-07 05:50:09');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `order_type` enum('Dine In','Take Out') NOT NULL,
  `delivery_type` enum('Restaurant','Room Delivery') DEFAULT NULL,
  `room_number` varchar(50) DEFAULT NULL,
  `items` text NOT NULL,
  `payment_method` enum('GCASH','PayMaya','Cash') NOT NULL,
  `account_name` varchar(255) DEFAULT NULL,
  `reference_number` varchar(255) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `order_type`, `delivery_type`, `room_number`, `items`, `payment_method`, `account_name`, `reference_number`, `total`, `order_date`) VALUES
(34, 'Servando Tio III', 'Dine In', 'Restaurant', NULL, '[{\"name\":\"Burger with fries\",\"quantity\":5},{\"name\":\"Coke 1.5ltr\",\"quantity\":5}]', 'GCASH', 'servandotio', '213454321343421', 600.00, '2024-12-06 08:04:11'),
(36, 'Mary Rose Quigao', 'Take Out', 'Restaurant', NULL, '[{\"name\":\"Milktea\",\"quantity\":5}]', 'Cash', NULL, NULL, 200.00, '2024-12-07 03:50:55'),
(37, 'Joshua', 'Dine In', 'Restaurant', NULL, '[{\"name\":\"Caldereta\",\"quantity\":5}]', 'Cash', NULL, NULL, 800.00, '2024-12-07 05:50:09');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `address` text DEFAULT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `selected_rooms` text NOT NULL,
  `selected_hall` varchar(255) DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `account_name` varchar(255) DEFAULT NULL,
  `reference_number` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `client_name`, `contact_number`, `address`, `check_in_date`, `check_out_date`, `selected_rooms`, `selected_hall`, `total_amount`, `payment_method`, `account_name`, `reference_number`, `created_at`) VALUES
(1, 'Servando', '09876543211', 'dakit', '2024-12-08', '2024-12-09', '[\"Dormitory Type with Breakfast\"]', NULL, 599.00, 'gcash', 'servandotio', '654324623454234', '2024-12-07 05:24:58'),
(2, 'Mary Rose', '09876543211', 'Agay-ay, San Juan, Southern Leyte', '2024-12-08', '2024-12-09', '[\"Dormitory Type with Breakfast\"]', NULL, 599.00, 'maya', 'servandotio', '654324623454234', '2024-12-07 05:29:54'),
(3, 'Maegan', '09876543211', 'Agay-ay, San Juan, Southern Leyte', '2024-12-08', '2024-12-09', '[\"Dormitory Type with Breakfast\"]', NULL, 599.00, 'maya', 'servandotio', '654324623454234', '2024-12-07 05:33:46'),
(4, 'Jerold MErnilo', '09876543223', 'Tambis 2', '2024-12-17', '2024-12-18', '[\"Dormitory Type with Breakfast\"]', NULL, 599.00, 'gcash', 'jerold', '2345765433613', '2024-12-07 05:49:15'),
(5, 'Servando Tio', '0987654321', 'Dakit, SFSL', '2024-12-10', '2024-12-12', '[]', 'Function Hall B (For All Occasion) Good for 8 Hours', 20000.00, 'gcash', 'stioiii', '123456789', '2024-12-09 15:05:25'),
(6, 'Wish Tio', '098765432', 'dakit', '2025-01-08', '2025-01-10', '[\"Deluxe Triple with Breakfast\"]', NULL, 3398.00, 'gcash', 'tio', '238263283293', '2024-12-09 15:09:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `food_sales`
--
ALTER TABLE `food_sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `food_sales`
--
ALTER TABLE `food_sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
