-- MariaDB dump 10.19  Distrib 10.4.21-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: Payroll Database
-- ------------------------------------------------------
-- Server version	10.4.21-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `position_data`
--

DROP TABLE IF EXISTS `position_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position_id` varchar(255) NOT NULL,
  `position_name` varchar(120) NOT NULL,
  `basic_salary` int(50) NOT NULL,
  `transport_allowance` int(50) NOT NULL,
  `meal_allowance` int(50) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `EmployeeDataId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `EmployeeDataId` (`EmployeeDataId`),
  CONSTRAINT `position_data_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `employee_data` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `position_data_ibfk_2` FOREIGN KEY (`EmployeeDataId`) REFERENCES `employee_data` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position_data`
--

LOCK TABLES `position_data` WRITE;
/*!40000 ALTER TABLE `position_data` DISABLE KEYS */;
INSERT INTO `position_data` VALUES (1,'ddfeaa41-b6d1-41e4-877a-26c0f6b32503','HRD',3000,2000,1000,1,'2023-06-06 13:47:52','2023-06-06 13:47:52',NULL),(2,'424fee23-3ef9-45a3-b28a-baa233343e86','Production Operator',2000,1000,500,1,'2023-06-06 13:49:08','2023-06-06 13:49:08',NULL);
/*!40000 ALTER TABLE `position_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance_data`
--

DROP TABLE IF EXISTS `attendance_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `month` varchar(15) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `emp_name` varchar(100) NOT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `position_name` varchar(50) DEFAULT NULL,
  `present` int(11) DEFAULT NULL,
  `sick` int(11) DEFAULT NULL,
  `absent` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance_data`
--

LOCK TABLES `attendance_data` WRITE;
/*!40000 ALTER TABLE `attendance_data` DISABLE KEYS */;
INSERT INTO `attendance_data` VALUES (1,'June','112233','Aldi','Male','HRD',9,2,1,'2023-06-06 13:47:58','2023-06-06 13:47:58');
/*!40000 ALTER TABLE `attendance_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_data`
--

DROP TABLE IF EXISTS `employee_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(255) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `emp_name` varchar(100) NOT NULL,
  `username` varchar(120) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(15) NOT NULL,
  `position` varchar(50) NOT NULL,
  `join_date` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `access_rights` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_data`
--

LOCK TABLES `employee_data` WRITE;
/*!40000 ALTER TABLE `employee_data` DISABLE KEYS */;
INSERT INTO `employee_data` VALUES (1,'e6be1994-e5c9-471b-8c23-9b2ee6787d86','112233','Aldi','aldi','$argon2id$v=19$m=65536,t=3,p=4$lr7yjbGbEUUVriOfCRonEw$bEHjCI5GeAOBFuQli/GF2zIus0mGZAq3AcD3C2mcwwc','Male','HRD','01-02-23','Permanent Employee','7f52d5fd1511704e51cbe30fdb1d8924.jpg','http://localhost:5000/images/7f52d5fd1511704e51cbe30fdb1d8924.jpg','admin','2023-06-06 13:46:29','2023-06-06 13:46:29'),(2,'98788064-fd08-4efa-af45-183db6cfb640','223344','Jane','Jane','$argon2id$v=19$m=65536,t=3,p=4$CyodSZT68auVQ42ItRyVxA$zE2CWObkUAjlF6K9ED37aVXFDVyOB9b/V8MkK/dzpKY','Male','Production Operator','01-02-23','Permanent Employee','7f52d5fd1511704e51cbe30fdb1d8924.jpg','http://localhost:5000/images/7f52d5fd1511704e51cbe30fdb1d8924.jpg','employee','2023-06-06 13:50:02','2023-06-06 13:50:02');
/*!40000 ALTER TABLE `employee_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary_deduction`
--

DROP TABLE IF EXISTS `salary_deduction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salary_deduction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deduction` varchar(120) NOT NULL,
  `deduction_amt` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary_deduction`
--

LOCK TABLES `salary_deduction` WRITE;
/*!40000 ALTER TABLE `salary_deduction` DISABLE KEYS */;
/*!40000 ALTER TABLE `salary_deduction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('KlmCLd9MzrKyzvoXSmq29pFmH7GoFk_3','2023-06-07 13:50:02','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-06-06 13:46:30','2023-06-06 13:50:02'),('VJjZpyQPuOoc-XyZJSSEbghGzEUn-yf8','2023-06-07 13:49:09','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"e6be1994-e5c9-471b-8c23-9b2ee6787d86\"}','2023-06-06 13:43:48','2023-06-06 13:49:09');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-06 20:54:49
