-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: high-street-gym
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(45) NOT NULL,
  `activity_description` varchar(255) NOT NULL,
  `activity_duration_minute` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`activity_id`),
  UNIQUE KEY `activity_id_UNIQUE` (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'Yoga','Basic yoga class',30,'2024-05-07 13:30:15','2024-05-07 13:30:15'),(2,'Pilates','Basic pilates, improve core muscles and body balance',45,'2024-05-07 13:33:16','2024-05-07 13:33:16'),(3,'Abs','builds up strength',30,'2024-05-07 13:35:07','2024-05-07 13:35:07'),(4,'HIIT','High-Intensity Interval Training, quickly burns your fat',30,'2024-05-07 13:37:43','2024-05-07 13:37:43'),(5,'Indoor Cycling','Rain or shine, for beginners',60,'2024-05-07 13:40:08','2024-05-08 06:12:30'),(6,'Boxing','for beginners',60,'2024-05-07 13:44:00','2024-05-08 06:12:30'),(7,'Zumba','Dance and exercise together',45,'2024-05-07 13:45:14','2024-05-07 13:45:14'),(8,'Walk & Climb','Walking & climbing stairs for cardio exercise',60,'2024-05-08 06:12:30','2024-05-08 06:12:30'),(9,'Rowing','great exercise & build strength',30,'2024-05-08 06:12:30','2024-05-08 06:12:30'),(10,'Indoor Climbing','Climb to the top, indoor climbing gym',50,'2024-05-08 06:12:30','2024-05-08 06:12:30');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`),
  KEY `fk_post_user_idx` (`user_id`),
  CONSTRAINT `fk_post_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (1,1,'My first post!','here will be mini blog for everyone to post!','2024-05-04 06:13:51','2024-05-05 07:27:28'),(2,1,'My second post!','HELLO WORLD!!','2024-05-04 06:15:21','2024-05-05 07:28:13'),(3,2,'First message','Hi everyone! Let\'s have a nice work out to start your day!','2024-05-04 06:17:29','2024-05-05 07:28:36'),(4,3,'DAY 1','I\'m excited about the new gym environment!','2024-05-06 07:00:54','2024-05-06 07:00:54'),(5,4,'Hello','Hi guys, nice to meet you, I\'m new to the gym!','2024-05-06 07:22:54','2024-05-06 07:22:54'),(6,4,'Hello again','Who\'s training today??','2024-05-06 07:32:09','2024-05-06 07:32:09'),(7,4,'hey','hey hey','2024-05-06 07:32:16','2024-05-08 13:33:58'),(8,4,'ho','ho ho ho','2024-05-06 07:39:14','2024-05-08 13:33:58'),(9,6,'g\'day','is everyone ready??','2024-05-06 07:43:17','2024-05-10 12:33:53'),(10,7,'Abs','is anyone joining the class tomorrow?','2024-05-07 06:30:37','2024-05-10 12:33:53'),(11,8,'Abs','yeah I think I will!','2024-05-07 06:45:14','2024-05-10 12:34:15'),(14,2,'hello world!','today is june 5','2024-06-05 13:55:37','2024-06-05 13:55:37'),(15,3,'hello','cycling!','2024-06-05 14:00:00','2024-06-05 14:00:00');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `class_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`),
  UNIQUE KEY `booking_id_UNIQUE` (`booking_id`),
  KEY `fk_booking_user_idx` (`user_id`),
  KEY `fk_booking_class_idx` (`class_id`),
  CONSTRAINT `fk_booking_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  CONSTRAINT `fk_booking_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COMMENT='			';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (2,3,48,'2024-05-15 11:19:05','2024-05-15 11:19:05'),(3,3,57,'2024-05-15 11:19:05','2024-05-15 11:19:05'),(7,3,55,'2024-05-29 11:31:42','2024-05-29 11:31:42'),(11,3,17,'2024-05-29 11:45:57','2024-05-29 11:45:57'),(12,3,29,'2024-06-03 13:40:23','2024-06-03 13:40:23'),(14,3,10,'2024-06-05 13:59:42','2024-06-05 13:59:42');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_date` date NOT NULL,
  `class_time` time NOT NULL,
  `location_id` int NOT NULL,
  `activity_id` int NOT NULL,
  `trainer_user_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`class_id`),
  UNIQUE KEY `class_id_UNIQUE` (`class_id`),
  KEY `fk_class_location_idx` (`location_id`),
  KEY `fk_class_activity_idx` (`activity_id`),
  KEY `fk_class_trainer_user_idx` (`trainer_user_id`),
  CONSTRAINT `fk_class_activity` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`activity_id`),
  CONSTRAINT `fk_class_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`),
  CONSTRAINT `fk_class_trainer` FOREIGN KEY (`trainer_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'2024-10-19','16:00:00',1,5,2,'2024-05-08 06:23:04','2024-10-12 22:26:01'),(2,'2024-10-19','17:00:00',1,5,2,'2024-05-08 10:38:31','2024-10-12 22:26:01'),(3,'2024-10-19','18:00:00',1,1,2,'2024-05-08 10:39:36','2024-10-12 22:26:01'),(4,'2024-10-19','18:30:00',1,1,2,'2024-05-08 10:39:50','2024-10-12 22:26:01'),(5,'2024-10-20','16:00:00',2,5,2,'2024-05-08 10:45:52','2024-10-12 22:26:01'),(6,'2024-10-20','17:00:00',2,5,2,'2024-05-08 10:45:52','2024-10-12 22:26:01'),(7,'2024-10-20','18:00:00',2,1,2,'2024-05-08 10:45:52','2024-10-12 22:26:01'),(8,'2024-10-20','18:30:00',2,1,2,'2024-05-08 10:45:52','2024-10-12 22:26:01'),(9,'2024-10-16','16:00:00',3,5,2,'2024-05-08 10:45:52','2024-10-12 22:26:01'),(10,'2024-10-16','17:00:00',3,5,2,'2024-05-08 10:45:52','2024-10-12 22:26:01'),(11,'2024-10-16','18:00:00',3,1,2,'2024-05-08 10:45:52','2024-10-12 22:26:01'),(12,'2024-10-16','18:30:00',3,1,2,'2024-05-08 10:45:52','2024-10-12 22:26:01'),(13,'2024-10-20','16:00:00',4,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(14,'2024-10-20','17:00:00',4,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(15,'2024-10-20','18:00:00',4,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(16,'2024-10-20','18:30:00',4,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(17,'2024-10-16','16:00:00',5,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(18,'2024-10-16','17:00:00',5,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(19,'2024-10-16','18:00:00',5,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(20,'2024-10-16','18:30:00',5,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(21,'2024-10-21','16:00:00',6,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(22,'2024-10-21','17:00:00',6,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(23,'2024-10-21','18:00:00',6,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(24,'2024-10-21','18:30:00',6,2,10,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(25,'2024-10-21','08:00:00',6,3,11,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(26,'2024-10-21','09:00:00',6,4,11,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(27,'2024-10-21','10:00:00',6,3,11,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(28,'2024-10-21','11:00:00',6,4,11,'2024-05-08 10:51:42','2024-10-12 22:26:01'),(29,'2024-10-21','08:00:00',5,7,12,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(30,'2024-10-21','09:00:00',5,8,12,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(31,'2024-10-21','10:00:00',5,7,12,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(32,'2024-10-21','11:00:00',5,8,12,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(33,'2024-10-21','08:00:00',4,6,14,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(34,'2024-10-21','09:15:00',4,9,14,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(35,'2024-10-21','10:00:00',4,6,14,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(36,'2024-10-21','11:15:00',4,9,14,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(37,'2024-10-17','08:00:00',3,10,15,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(38,'2024-10-17','09:00:00',3,10,15,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(39,'2024-10-17','10:00:00',3,10,15,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(40,'2024-10-17','11:00:00',3,10,15,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(41,'2024-10-17','08:00:00',2,10,16,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(42,'2024-10-17','09:00:00',2,10,16,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(43,'2024-10-17','10:00:00',2,10,16,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(44,'2024-10-17','11:00:00',2,10,16,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(45,'2024-10-18','08:00:00',3,10,15,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(46,'2024-10-18','09:00:00',3,10,15,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(47,'2024-10-18','10:00:00',3,10,15,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(48,'2024-10-18','11:00:00',3,10,15,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(49,'2024-10-18','08:00:00',2,10,16,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(50,'2024-10-18','09:00:00',2,10,16,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(51,'2024-10-18','10:00:00',2,10,16,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(52,'2024-10-18','11:00:00',2,10,16,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(53,'2024-10-17','08:00:00',3,1,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(54,'2024-10-17','09:00:00',3,2,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(55,'2024-10-17','10:00:00',3,4,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(56,'2024-10-17','11:00:00',3,5,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(57,'2024-10-17','08:00:00',2,1,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(58,'2024-10-17','09:00:00',2,2,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(59,'2024-10-17','10:00:00',2,4,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(60,'2024-10-17','11:00:00',2,5,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(61,'2024-10-17','08:00:00',3,1,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(62,'2024-10-17','09:00:00',3,2,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(63,'2024-10-17','10:00:00',3,4,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(64,'2024-10-17','11:00:00',3,5,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(65,'2024-10-17','08:00:00',2,1,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(66,'2024-10-17','09:00:00',2,2,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(67,'2024-10-17','10:00:00',2,4,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(68,'2024-10-17','11:00:00',2,5,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(69,'2024-10-18','16:00:00',3,5,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(70,'2024-10-18','17:00:00',3,5,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(71,'2024-10-18','18:00:00',3,1,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(72,'2024-10-18','18:30:00',3,1,2,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(73,'2024-10-18','16:00:00',4,2,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(74,'2024-10-18','17:00:00',4,2,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(75,'2024-10-18','18:00:00',4,2,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(76,'2024-10-18','18:30:00',4,2,10,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(77,'2024-10-18','16:00:00',5,2,12,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(78,'2024-10-18','17:00:00',5,2,12,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(79,'2024-10-18','18:00:00',5,2,12,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(80,'2024-10-18','18:30:00',5,2,12,'2024-05-08 11:06:34','2024-10-12 22:26:01'),(81,'2024-10-29','16:00:00',2,1,2,'2024-05-30 13:42:01','2024-10-12 22:26:01'),(82,'2024-10-29','17:00:00',2,1,2,'2024-05-30 13:44:11','2024-10-12 22:26:01'),(83,'2024-10-30','17:00:00',2,1,2,'2024-06-05 11:21:37','2024-10-12 22:26:01'),(84,'2024-10-30','18:00:00',3,5,10,'2024-06-05 11:21:37','2024-10-12 22:26:01'),(85,'2024-11-01','18:00:00',3,5,10,'2024-06-05 13:58:13','2024-10-12 22:26:01'),(86,'2024-10-31','17:00:00',2,1,2,'2024-06-05 13:58:13','2024-10-12 22:26:01');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`location_id`),
  UNIQUE KEY `location_id_UNIQUE` (`location_id`),
  KEY `fk_location_last_modified_by_idx` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'CBD','2024-03-12 11:45:37','2024-03-12 11:45:37'),(2,'South Bank','2024-03-12 11:46:42','2024-03-12 11:46:42'),(3,'Wooloongabba','2024-05-08 05:52:43','2024-05-08 05:52:43'),(4,'Kangaroo Point','2024-05-08 05:55:13','2024-05-08 05:55:13'),(5,'Tarragindi','2024-05-08 05:58:48','2024-05-08 05:58:48'),(6,'Mansfield','2024-05-08 05:59:46','2024-05-08 05:59:46');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `address` varchar(255) NOT NULL,
  `authentication_key` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_UNIQUE` (`email`),
  UNIQUE KEY `user_id_UNIQUE` (`id`),
  UNIQUE KEY `user_authentication_key_UNIQUE` (`authentication_key`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@trials.net','$2b$10$HxDWbyagYWb.AebnOUWI1OiIZG/4LaK327HVOs62Fyz4ry0OXRFTW','admin','Tim','Horton','0400-123-456','1234 ABC street, Brisbane, 4001',NULL,'2024-03-12 12:43:13','2024-06-05 13:44:51'),(2,'trainer@trials.net','$2b$10$jY6xaP0lbdUtefpPjiW0Y.82ymVYM0/CMJn4d8dXcfkBfqZ5..A2G','trainer','Fiona','Glenanne','0411-987-654','5678 DEF Avenue, Gold Coast, 4001',NULL,'2024-03-12 12:53:13','2024-06-07 12:32:57'),(3,'customer@trials.net','$2b$10$5hLZ.yETrQqFOO3kTmu9QuwcwZvbyjOAoKQUpLDf3K7GuOAEhISD.','customer','Michael','Westen','0422-654-321','987 GHI Road, Brisbane, 4001',NULL,'2024-03-12 13:43:13','2024-06-07 12:33:15'),(4,'sam.axe@test.io','$2b$10$Gm3ZecZdHuhUP/Pgre9Fe./Mx3P9CCv5v0x4b1Yr8J.CrVXx.kxqm','customer','Sam','Axe','0433-321-987','777 JKM Circle, Brisbane, 4001',NULL,'2024-03-20 12:49:01','2024-05-08 13:03:28'),(6,'jesse.porter@test.net','$2b$10$cH8TULaVhAMMz2dvIWQPc.V7WjOErISv8BQ5v.gQwctg1DPLWDF/u','customer','Jesse','Porter','0422-123-123','somewhere in Brisbane',NULL,'2024-04-30 13:04:49','2024-05-03 06:40:04'),(7,'jason.bly@test.net','$2b$10$VsZSh6jgvqJSBsh0RR3QeOfI3I.LnvVvn53f7znVoDkr9gRDPxQ0a','customer','Jason','Bly','0422-234-234','somewhere in North Brisbane',NULL,'2024-04-30 13:07:06','2024-05-03 06:40:04'),(8,'philip.cowan@test.net','$2b$10$ArkV1FtZ6yDzCyP/UVnQl.2BI3apVNu3BcUljarinMxXVaBb1Ibay','customer','Philip','Cowan','0422-345-345','somewhere in South Brisbane',NULL,'2024-04-30 13:44:31','2024-05-03 06:40:04'),(9,'tyler.brennen@test.net','$2b$10$N9.saSPfrH8pBbdXbU9G7O9LATmoziPCx6FohMtL9KyoX61DaklL6','admin','Tyler','Brennen','0400-123-456','xml street',NULL,'2024-05-02 05:55:18','2024-05-08 06:04:57'),(10,'michelle.paxson@test.net','$2b$10$5o1PxYlr/HBi5auwNTDPL.2JerVVjrlIb8PkkUIrH/9lqa.J1GM9C','trainer','Michelle','Paxon','0400-123-456','xml street',NULL,'2024-05-02 05:55:18','2024-05-08 06:04:57'),(11,'tom.strickler@test.net','$2b$10$lLd8oP3c5t/cqPmlnpXOe.LG7ZRYOQhzz1dEIL80uquIH1BpBKYBS','trainer','Tom','Strickler','0400-123-456','xml street',NULL,'2024-05-02 05:55:18','2024-05-08 06:04:57'),(12,'carla.baxter@xml.net','$2b$10$TRip6mVSaQOU460/sI6J2eVAM7kM0RqlcHFlS4agDpWVSS7iUBVcy','trainer','Carla','Baxter','0411-456-456','xml street',NULL,'2024-05-03 06:54:36','2024-05-03 07:04:43'),(13,'larry.sizemore@xml.net','$2b$10$FW/.FpfvB8i0Gvm4sYL40epTeUwm/xs6D9aqGe5t0H6YHCxpFZSYO','customer','Larry','Sizemore','0422-789-789','xml street',NULL,'2024-05-03 06:54:36','2024-05-03 07:04:43'),(14,'mason.gilroy@test.net','$2b$10$cnnwE6AO4eeEaowYXUsZPestRmPoXWcTXZuyw/J2C190vi3yrdrdy','trainer','Mason','Gilroy','0400-000-000','somewhere',NULL,'2024-05-08 06:07:47','2024-06-05 13:19:21'),(15,'simon.escher@test.net','$2b$10$ek00pY4rKCVdNjIf2niugufYCNgKQ1YxkT3AT1cLZ79YA27ZFQF0O','trainer','Simon','Escher','0400-999-888','somewhere',NULL,'2024-05-08 06:07:47','2024-06-05 13:20:01'),(16,'vaughn.anderson@test.net','$2b$10$ySTbSozJNkd9UF4BP7XUYu1FWsN8CnVlxDpsp7KmjJL/Y.zGPvXl6','trainer','Vaughn','Anderson','0400-777-666','somewhere',NULL,'2024-05-08 06:07:47','2024-06-05 13:20:53'),(20,'xml-test-trainer111@xml.net','$2b$10$IHg02SQW/H2TgbuN4KaeT.vEXf4TJMdbkMppT26r5m2K8pRpAx/t2','trainer','trainer','xml','0411-456-456','xml street',NULL,'2024-06-05 13:57:28','2024-06-05 13:57:28'),(21,'xml-test-user222@xml.net','$2b$10$Ls7w63hyrm7vGPD/tB1R5eCNHyqmmBfyPADWnNiq7n5AL40AHioPO','customer','customer','xml','0422-789-789','xml street',NULL,'2024-06-05 13:57:28','2024-06-05 13:57:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-12 23:49:16
