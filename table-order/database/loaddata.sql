/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.0.2-MariaDB, for osx10.20 (arm64)
--
-- Host: localhost    Database: tableorder
-- ------------------------------------------------------
-- Server version	12.0.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `admins` (`id`, `store_id`, `username`, `password_hash`, `login_attempts`, `locked_until`, `created_at`) VALUES ('6c450730-d672-4275-a858-9bb4441fa361','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','admin','$2b$10$Jb0JFc3bve4BJ.YIWwd36exeMpcDpyrKcNv0Hdh6mD2WDnSMd4P0q',0,NULL,'2026-03-18 16:23:01'),
('b130c7be-75af-4983-9c2d-5052fef56d83','62ce6089-7bbb-4a35-8862-7dcab136e6b0','dddd','$2b$10$ZlwKjswRxXfaLQCkyQ23HOPNore4tz1TcnFyNwnltx7U65vBGNeYi',0,NULL,'2026-03-18 16:25:08'),
('e6c0e598-3fd0-4fae-88eb-5865214c72a9','da71aa8f-660f-46f7-88f2-069cfaa3c9e7','test','$2b$10$j74AZdVqUN/PcBtRSgzSBePGTKitDoN6zRk.oalCSA6Oub9NmsZgi',0,NULL,'2026-03-18 16:37:10');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `categories` (`id`, `store_id`, `name`, `sort_order`) VALUES ('5f7498fc-2691-4244-8c60-9fe965287394','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','메인메뉴',0),
('65a0a828-2046-4d06-b184-2c13f231a586','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','사이드',1),
('77696d64-229c-11f1-b02c-f249c4f0c709','62ce6089-7bbb-4a35-8862-7dcab136e6b0','메인메뉴',0),
('776970d4-229c-11f1-b02c-f249c4f0c709','62ce6089-7bbb-4a35-8862-7dcab136e6b0','사이드',1),
('77697138-229c-11f1-b02c-f249c4f0c709','62ce6089-7bbb-4a35-8862-7dcab136e6b0','음료',2),
('8ad85fbf-b78b-4937-aef5-0bdfedf73320','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','음료',2);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `menus` (`id`, `store_id`, `category_id`, `name`, `price`, `description`, `image_url`, `sort_order`, `created_at`) VALUES ('3d1a643d-3b67-4356-bbea-a174c36c1769','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','5f7498fc-2691-4244-8c60-9fe965287394','하겐다즈2',2000,'하겐다즈','/uploads/images/f0e2a614-5167-45a4-8ac2-eeaaa3f5f739/b7a840e4-28f2-4765-8b16-7cc411253592.jpeg',1,'2026-03-18 16:42:44'),
('d7716e79-dfcd-47fc-87f5-c6de4ea8fdb8','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','5f7498fc-2691-4244-8c60-9fe965287394','치즈돈까스',10000,'치즈돈까스','/uploads/images/f0e2a614-5167-45a4-8ac2-eeaaa3f5f739/4f8ab449-1674-49ff-9201-dca60d1b7f61.png',0,'2026-03-18 16:38:07');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `order_items` (`id`, `order_id`, `menu_id`, `menu_name`, `quantity`, `unit_price`) VALUES ('05d0818e-422d-4b3f-8e41-f4721f66a8be','cb11aa95-abc8-455d-971c-8042a9075958','d7716e79-dfcd-47fc-87f5-c6de4ea8fdb8','하겐다즈',2,5000),
('086caf80-9081-4e56-b3f0-aa743796a9b8','cc857a07-8a12-4c9d-84e2-333ce495b6e9','d7716e79-dfcd-47fc-87f5-c6de4ea8fdb8','하겐다즈',1,5000),
('1b7c3fcd-4dd9-4f5c-8ed2-960bf9afcd37','cc857a07-8a12-4c9d-84e2-333ce495b6e9','3d1a643d-3b67-4356-bbea-a174c36c1769','하겐다즈2',2,2000),
('46b3b902-4e40-40a9-95df-871a01db0daa','31911d7f-3649-4e39-8de9-02a74f2e4203','d7716e79-dfcd-47fc-87f5-c6de4ea8fdb8','하겐다즈',1,5000),
('9065fb4e-dfb7-4452-9936-7806e5d96e90','10950293-9d5d-4668-9aec-2c0d95b3caed','3d1a643d-3b67-4356-bbea-a174c36c1769','하겐다즈2',3,2000),
('a146f801-66b0-4201-8cfe-cfec9793e3ad','10950293-9d5d-4668-9aec-2c0d95b3caed','d7716e79-dfcd-47fc-87f5-c6de4ea8fdb8','치즈돈까스',1,10000),
('d1e39b2b-38e4-49dc-86e9-43f0436c3843','3f14daa9-adbc-419f-a2e4-8df04952d3c3','3d1a643d-3b67-4356-bbea-a174c36c1769','하겐다즈2',3,2000);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `orders` (`id`, `store_id`, `table_id`, `session_id`, `order_number`, `status`, `total_amount`, `created_at`) VALUES ('10950293-9d5d-4668-9aec-2c0d95b3caed','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','b8b60bbe-a431-477a-9da3-2e5fa20ebf56','f378c064-f15a-4d7e-8040-738519bc18bb',5,'pending',16000,'2026-03-18 17:11:36'),
('31911d7f-3649-4e39-8de9-02a74f2e4203','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','b8b60bbe-a431-477a-9da3-2e5fa20ebf56','f378c064-f15a-4d7e-8040-738519bc18bb',1,'completed',5000,'2026-03-18 16:39:17'),
('3f14daa9-adbc-419f-a2e4-8df04952d3c3','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','b8b60bbe-a431-477a-9da3-2e5fa20ebf56','f378c064-f15a-4d7e-8040-738519bc18bb',2,'completed',6000,'2026-03-18 16:50:53'),
('cb11aa95-abc8-455d-971c-8042a9075958','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','b8b60bbe-a431-477a-9da3-2e5fa20ebf56','f378c064-f15a-4d7e-8040-738519bc18bb',4,'preparing',10000,'2026-03-18 16:52:52'),
('cc857a07-8a12-4c9d-84e2-333ce495b6e9','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','b8b60bbe-a431-477a-9da3-2e5fa20ebf56','f378c064-f15a-4d7e-8040-738519bc18bb',3,'completed',9000,'2026-03-18 16:52:15');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `payments` (`id`, `order_id`, `status`, `updated_at`) VALUES ('443a8748-6364-468f-9304-61dd2ff5db2b','cb11aa95-abc8-455d-971c-8042a9075958','unpaid','2026-03-18 16:52:52'),
('61dd84ea-2bfd-424f-bf8d-0906f59f561f','3f14daa9-adbc-419f-a2e4-8df04952d3c3','unpaid','2026-03-18 16:50:53'),
('7e2f3069-776e-4921-947d-85d97a5ac21e','10950293-9d5d-4668-9aec-2c0d95b3caed','unpaid','2026-03-18 17:11:36'),
('c0ab14d2-3af9-425d-b02a-9770a3a0f483','cc857a07-8a12-4c9d-84e2-333ce495b6e9','unpaid','2026-03-18 16:52:15'),
('ec0ee16f-6b45-4df8-b622-1f17e062ef18','31911d7f-3649-4e39-8de9-02a74f2e4203','paid','2026-03-18 16:47:50');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `sessions` (`id`, `table_id`, `store_id`, `started_at`, `completed_at`, `is_active`) VALUES ('f378c064-f15a-4d7e-8040-738519bc18bb','b8b60bbe-a431-477a-9da3-2e5fa20ebf56','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','2026-03-18 16:39:17',NULL,1);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `stores` (`id`, `name`, `created_at`) VALUES ('62ce6089-7bbb-4a35-8862-7dcab136e6b0','dddddddd','2026-03-18 16:25:08'),
('da71aa8f-660f-46f7-88f2-069cfaa3c9e7','임시매장','2026-03-18 16:37:10'),
('f0e2a614-5167-45a4-8ac2-eeaaa3f5f739','테스트매장','2026-03-18 16:23:01');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping data for table `tables_`
--

LOCK TABLES `tables_` WRITE;
/*!40000 ALTER TABLE `tables_` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `tables_` (`id`, `store_id`, `table_number`, `password_hash`, `created_at`) VALUES ('6f342e4b-58c2-486b-aa31-11e13ba3d3cc','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739',2,'$2b$10$Op2N5DwqDpmvMgGEIaUjruJfnOPipDnHH.0jMJ8pI18tCqR/NAYKa','2026-03-18 17:07:03'),
('b8b60bbe-a431-477a-9da3-2e5fa20ebf56','f0e2a614-5167-45a4-8ac2-eeaaa3f5f739',1,'$2b$10$jKpzbEwqyWNtlB.dO5Co6.tCwdxxkSG.mGGeoBZbI/jvoNcc0sY6C','2026-03-18 16:38:56');
/*!40000 ALTER TABLE `tables_` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-03-18 17:19:47
