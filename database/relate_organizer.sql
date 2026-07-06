-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 22, 2026 at 12:52 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `relate_organizer`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_sections`
--

CREATE TABLE `about_sections` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titleHighlight` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc_1` text COLLATE utf8mb4_unicode_ci,
  `desc_2` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `about_sections`
--

INSERT INTO `about_sections` (`id`, `title`, `titleHighlight`, `desc_1`, `desc_2`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Relate', 'House', 'More than a company, Relate House is a growing ecosystem.\r\nKami hadir untuk menghubungkan orang-orang yang memiliki visi, ide-ide yang memiliki potensi, dan peluang yang mampu menciptakan perubahan. Dengan semangat kolaborasi dan inovasi, kami membangun berbagai inisiatif, bisnis, dan platform yang mendorong pertumbuhan bersama.\r\n', 'Relate House bukan hanya tentang apa yang kami bangun hari ini, tetapi tentang bagaimana kami menciptakan peluang untuk masa depan.', NULL, '2026-06-17 08:59:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `banoms`
--

CREATE TABLE `banoms` (
  `id` bigint UNSIGNED NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banoms`
--

INSERT INTO `banoms` (`id`, `icon`, `title`, `desc`, `created_at`, `updated_at`) VALUES
(1, '🎪', 'Relate Organizer', 'Menyelenggarakan berbagai acara mulai dari seminar, workshop, gathering, festival, hingga corporate event dengan perencanaan yang matang dan eksekusi yang profesional.', '2026-06-17 01:14:53', '2026-06-17 01:14:53'),
(2, '☕', 'Relate Coffee', 'Lebih dari sekadar tempat menikmati kopi, Relate Coffee hadir sebagai ruang bertemu, berkolaborasi, dan membangun koneksi bagi komunitas, kreator, profesional, dan pelaku usaha.', '2026-06-17 01:14:53', '2026-06-17 01:14:53'),
(3, '⚙️', 'Relate Production', 'Menyediakan kebutuhan produksi acara secara profesional, mulai dari panggung, lighting, sound system, LED screen, multimedia, hingga dukungan teknis untuk berbagai skala kegiatan.', '2026-06-17 01:14:53', '2026-06-17 01:14:53');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categoris`
--

CREATE TABLE `categoris` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_kategori` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categoris`
--

INSERT INTO `categoris` (`id`, `nama_kategori`, `created_at`, `updated_at`) VALUES
(1, 'Event', '2026-06-17 01:27:50', '2026-06-17 01:27:50'),
(2, 'Production', '2026-06-17 01:27:50', '2026-06-17 01:27:50'),
(3, 'Coffee Shop', '2026-06-17 01:27:50', '2026-06-17 01:27:50');

-- --------------------------------------------------------

--
-- Table structure for table `choose_us`
--

CREATE TABLE `choose_us` (
  `id` bigint UNSIGNED NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `choose_us`
--

INSERT INTO `choose_us` (`id`, `value`, `created_at`, `updated_at`) VALUES
(1, 'Trusted Partnership', '2026-06-17 01:39:29', '2026-06-17 01:39:29'),
(2, 'Strategic & Creative Solutions', '2026-06-17 01:39:29', '2026-06-17 01:39:29'),
(3, 'Detail-Oriented Execution', '2026-06-17 01:39:29', '2026-06-17 01:39:29'),
(4, 'Responsive & Flexible', '2026-06-17 01:39:29', '2026-06-17 01:39:29'),
(5, 'End-to-End Support', '2026-06-17 01:39:29', '2026-06-17 01:39:29'),
(6, 'Professional Team', '2026-06-17 01:39:29', '2026-06-17 01:39:29');

-- --------------------------------------------------------

--
-- Table structure for table `cta_sections`
--

CREATE TABLE `cta_sections` (
  `id` bigint UNSIGNED NOT NULL,
  `media` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `from_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `via_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deg_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `footers`
--

CREATE TABLE `footers` (
  `id` bigint UNSIGNED NOT NULL,
  `brandName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brandHighlight` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsappUrl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `copyright` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tagline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `footers`
--

INSERT INTO `footers` (`id`, `brandName`, `brandHighlight`, `description`, `email`, `whatsapp`, `whatsappUrl`, `address`, `copyright`, `tagline`, `created_at`, `updated_at`) VALUES
(1, 'Relate', 'House', 'Event Organizer & Creative Production yang mewujudkan ide dan konsep Anda menjadi acara yang tak terlupakan.', 'relateorganizer@gmail.com', '+62 812-4261-1972', 'https://wa.me/6281242611972', 'JL.daeng hayo No.26', 'Relate Organize. All rights reserved.', 'Creative Event Solutions', '2026-06-20 07:15:53', '2026-06-20 07:15:53');

-- --------------------------------------------------------

--
-- Table structure for table `galeries`
--

CREATE TABLE `galeries` (
  `id` bigint UNSIGNED NOT NULL,
  `project_id` bigint UNSIGNED DEFAULT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tampil` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `galeries`
--

INSERT INTO `galeries` (`id`, `project_id`, `label`, `tampil`, `created_at`, `updated_at`) VALUES
(8, 2, 'Fortive', 1, '2026-06-20 03:13:09', '2026-06-20 03:32:37'),
(9, 1, 'Genzealous', 1, '2026-06-20 03:29:06', '2026-06-20 03:29:06'),
(10, 3, 'Arrows Youth', 1, '2026-06-20 03:34:59', '2026-06-20 03:34:59'),
(11, 4, 'YSPA Educational Games', 1, '2026-06-20 03:37:30', '2026-06-20 03:37:30'),
(12, 5, 'PLN Hari Listrik Nasional', 1, '2026-06-20 03:38:27', '2026-06-20 03:38:27'),
(13, 7, 'Pelantikan HIPMI Institute', 1, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(14, 8, 'RAPAT KOORDINASI DAN REKONSILIASI DPD VIII HISWANA MIGAS PAPUA - MALUKU', 1, '2026-06-20 05:41:13', '2026-06-20 05:41:13');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_images`
--

CREATE TABLE `gallery_images` (
  `id` bigint UNSIGNED NOT NULL,
  `galery_id` bigint UNSIGNED NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gallery_images`
--

INSERT INTO `gallery_images` (`id`, `galery_id`, `image`, `sort_order`, `created_at`, `updated_at`) VALUES
(54, 8, 'gallery/gallery_1781953989_WqPCI.JPG', 0, '2026-06-20 03:13:09', '2026-06-20 03:13:09'),
(55, 8, 'gallery/gallery_1781953989_QuIED.JPG', 1, '2026-06-20 03:13:09', '2026-06-20 03:13:09'),
(56, 8, 'gallery/gallery_1781953989_Xf82C.JPG', 2, '2026-06-20 03:13:09', '2026-06-20 03:13:09'),
(57, 8, 'gallery/gallery_1781953989_bGt6D.JPG', 3, '2026-06-20 03:13:09', '2026-06-20 03:13:09'),
(58, 9, 'gallery/gallery_1781954946_QgRgx.jpg', 0, '2026-06-20 03:29:06', '2026-06-20 03:29:06'),
(59, 9, 'gallery/gallery_1781954946_SNEPb.jpg', 1, '2026-06-20 03:29:06', '2026-06-20 03:29:06'),
(60, 9, 'gallery/gallery_1781954946_dcywA.jpg', 2, '2026-06-20 03:29:06', '2026-06-20 03:29:06'),
(61, 9, 'gallery/gallery_1781954946_VWqkm.jpg', 3, '2026-06-20 03:29:06', '2026-06-20 03:29:06'),
(62, 9, 'gallery/gallery_1781954946_X1vNs.jpg', 4, '2026-06-20 03:29:06', '2026-06-20 03:29:06'),
(63, 9, 'gallery/gallery_1781954946_d2nDN.jpg', 5, '2026-06-20 03:29:06', '2026-06-20 03:29:06'),
(64, 10, 'gallery/gallery_1781955299_rQbJS.JPG', 0, '2026-06-20 03:34:59', '2026-06-20 03:34:59'),
(65, 10, 'gallery/gallery_1781955299_sQOSz.JPG', 1, '2026-06-20 03:34:59', '2026-06-20 03:34:59'),
(66, 10, 'gallery/gallery_1781955299_3oKeu.JPG', 2, '2026-06-20 03:34:59', '2026-06-20 03:34:59'),
(67, 10, 'gallery/gallery_1781955299_MrCmz.JPG', 3, '2026-06-20 03:34:59', '2026-06-20 03:34:59'),
(68, 10, 'gallery/gallery_1781955299_CUOT1.JPG', 4, '2026-06-20 03:34:59', '2026-06-20 03:34:59'),
(69, 11, 'gallery/gallery_1781955450_c9LGL.jpg', 0, '2026-06-20 03:37:30', '2026-06-20 03:37:30'),
(70, 11, 'gallery/gallery_1781955450_gBhuR.jpg', 1, '2026-06-20 03:37:30', '2026-06-20 03:37:30'),
(71, 11, 'gallery/gallery_1781955450_WbStc.jpg', 2, '2026-06-20 03:37:30', '2026-06-20 03:37:30'),
(72, 11, 'gallery/gallery_1781955450_stanp.jpg', 3, '2026-06-20 03:37:30', '2026-06-20 03:37:30'),
(73, 11, 'gallery/gallery_1781955450_hqItw.jpg', 4, '2026-06-20 03:37:30', '2026-06-20 03:37:30'),
(74, 11, 'gallery/gallery_1781955450_aqMvB.jpg', 5, '2026-06-20 03:37:30', '2026-06-20 03:37:30'),
(75, 11, 'gallery/gallery_1781955450_7qr2e.jpg', 6, '2026-06-20 03:37:30', '2026-06-20 03:37:30'),
(76, 11, 'gallery/gallery_1781955450_V6M3W.jpg', 7, '2026-06-20 03:37:30', '2026-06-20 03:37:30'),
(77, 11, 'gallery/gallery_1781955450_PLRb0.jpg', 8, '2026-06-20 03:37:30', '2026-06-20 03:37:30'),
(78, 11, 'gallery/gallery_1781955450_LG5Qm.jpg', 9, '2026-06-20 03:37:30', '2026-06-20 03:37:30'),
(79, 12, 'gallery/gallery_1781955507_XajfB.JPG', 0, '2026-06-20 03:38:27', '2026-06-20 03:38:27'),
(80, 12, 'gallery/gallery_1781955507_MZ1gM.jpg', 1, '2026-06-20 03:38:27', '2026-06-20 03:38:27'),
(81, 12, 'gallery/gallery_1781955507_mRA8O.jpg', 2, '2026-06-20 03:38:27', '2026-06-20 03:38:27'),
(82, 12, 'gallery/gallery_1781955507_TOuO9.jpg', 3, '2026-06-20 03:38:27', '2026-06-20 03:38:27'),
(83, 12, 'gallery/gallery_1781955507_2XWJs.jpg', 4, '2026-06-20 03:38:27', '2026-06-20 03:38:27'),
(84, 12, 'gallery/gallery_1781955507_bSwyq.jpg', 5, '2026-06-20 03:38:27', '2026-06-20 03:38:27'),
(85, 13, 'gallery/gallery_1781955864_CCMzH.JPG', 0, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(86, 13, 'gallery/gallery_1781955864_r9QJo.JPG', 1, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(87, 13, 'gallery/gallery_1781955864_MCwKR.JPG', 2, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(88, 13, 'gallery/gallery_1781955864_jk4pv.JPG', 3, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(89, 13, 'gallery/gallery_1781955864_tItOd.JPG', 4, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(90, 13, 'gallery/gallery_1781955864_YBcs0.JPG', 5, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(91, 13, 'gallery/gallery_1781955864_jT38O.JPG', 6, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(92, 13, 'gallery/gallery_1781955864_fpAQb.JPG', 7, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(93, 13, 'gallery/gallery_1781955864_G5Dg4.JPG', 8, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(94, 13, 'gallery/gallery_1781955864_hvjU1.JPG', 9, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(95, 13, 'gallery/gallery_1781955864_JmqPX.JPG', 10, '2026-06-20 03:44:24', '2026-06-20 03:44:24'),
(96, 14, 'gallery/gallery_1781962873_k85HK.png', 0, '2026-06-20 05:41:13', '2026-06-20 05:41:13'),
(97, 14, 'gallery/gallery_1781962873_IkTIx.png', 1, '2026-06-20 05:41:13', '2026-06-20 05:41:13'),
(98, 14, 'gallery/gallery_1781962873_P9YRI.png', 2, '2026-06-20 05:41:13', '2026-06-20 05:41:13'),
(99, 14, 'gallery/gallery_1781962873_MdEAq.png', 3, '2026-06-20 05:41:13', '2026-06-20 05:41:13'),
(100, 14, 'gallery/gallery_1781962873_QeaH6.png', 4, '2026-06-20 05:41:13', '2026-06-20 05:41:13');

-- --------------------------------------------------------

--
-- Table structure for table `hero_sections`
--

CREATE TABLE `hero_sections` (
  `id` bigint UNSIGNED NOT NULL,
  `badge` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titleHighlight` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `via_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deg_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `showScrollIndicator` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hero_sections`
--

INSERT INTO `hero_sections` (`id`, `badge`, `title`, `titleHighlight`, `subtitle`, `from_color`, `via_color`, `to_color`, `deg_color`, `showScrollIndicator`, `created_at`, `updated_at`) VALUES
(1, 'Find Your Tribe, Share Your vibe', 'Relate', 'House', 'Relate House adalah ekosistem kreatif yang menghubungkan manusia, ide, dan peluang melalui event, creative production, media, dan berbagai kolaborasi yang menciptakan dampak nyata.', '#fca34b', '#2d5a02', '#3b7303', '303deg', 1, '2026-06-17 08:57:31', '2026-06-22 04:36:05');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_06_02_155625_create_hero_sections_table', 1),
(5, '2026_06_02_155635_create_about_sections_table', 1),
(6, '2026_06_02_155643_create_service_sections_table', 1),
(7, '2026_06_02_155649_create_banoms_table', 1),
(8, '2026_06_02_155656_create_categoris_table', 1),
(9, '2026_06_02_155702_create_projects_table', 1),
(10, '2026_06_02_155708_create_choose_us_table', 1),
(11, '2026_06_02_155716_create_statistiks_table', 1),
(12, '2026_06_02_155721_create_partners_table', 1),
(13, '2026_06_02_155727_create_testimonis_table', 1),
(14, '2026_06_02_155732_create_galeries_table', 1),
(15, '2026_06_02_155737_create_cta_sections_table', 1),
(16, '2026_06_02_155749_create_footers_table', 1),
(17, '2026_06_02_155759_create_workflows_table', 1),
(18, '2026_06_11_183200_update_column_desc_1_2', 1),
(19, '2026_06_11_184143_update_column_desc', 1),
(20, '2026_06_11_201330_add_column_sub_kategori_in_projects_table', 1),
(21, '2026_06_15_051813_add_column_suffix_in_statistic_table', 1),
(22, '2026_06_17_000001_add_detail_fields_to_projects_table', 1),
(23, '2026_06_17_000002_add_project_id_to_testimonis_table', 1),
(24, '2026_06_17_000003_add_project_id_to_galeries_table', 1),
(25, '2026_06_17_163204_create_gallery_images_table', 1),
(26, '2026_06_20_142833_update_type_data_column_review_in_testimonis_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE `partners` (
  `id` bigint UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `partners`
--

INSERT INTO `partners` (`id`, `nama`, `logo`, `created_at`, `updated_at`) VALUES
(1, 'Genzealous', 'partner/logo_1781689628_llR8i.jpg', '2026-06-17 01:47:08', '2026-06-17 01:47:08'),
(2, 'Fortive', 'partner/logo_1781689628_Q83ws.jpg', '2026-06-17 01:47:08', '2026-06-17 01:47:08'),
(3, 'HIPMI Institute', 'partner/logo_1781689628_VIo8H.jpg', '2026-06-17 01:47:08', '2026-06-17 01:47:08'),
(4, 'PLN', 'partner/logo_1781689628_zRWUT.jpg', '2026-06-17 01:47:08', '2026-06-17 01:47:08'),
(5, 'YSPA', 'partner/logo_1781689628_Rxza4.jpg', '2026-06-17 01:47:08', '2026-06-17 01:47:08');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint UNSIGNED NOT NULL,
  `id_kategori` bigint UNSIGNED NOT NULL,
  `sub_kategori` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guest_count` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preparation_time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `challenge` text COLLATE utf8mb4_unicode_ci,
  `solution` text COLLATE utf8mb4_unicode_ci,
  `results` text COLLATE utf8mb4_unicode_ci,
  `video` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `id_kategori`, `sub_kategori`, `guest_count`, `location`, `preparation_time`, `challenge`, `solution`, `results`, `video`, `is_featured`, `title`, `desc`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 'Academic Celebration', '400 Tamu', 'SMPN 12 MAKASSAR', '3 Bulan', 'Perayaan prom night yang diselenggarakan di lingkungan sekolah dengan konsep yang meriah dan berkesan. Acara dirancang untuk menjadi momen perpisahan yang istimewa bagi para siswa melalui rangkaian hiburan, dekorasi tematik, dan suasana kebersamaan yang hangat.', 'Perayaan prom night yang diselenggarakan di lingkungan sekolah dengan konsep yang meriah dan berkesan. Acara dirancang untuk menjadi momen perpisahan yang istimewa bagi para siswa melalui rangkaian hiburan, dekorasi tematik, dan suasana kebersamaan yang hangat.', 'Keberhasilan menyulap area sekolah lapangan utama menjadi ruang pesta yang spektakuler. Penggunaan instalasi lampu neon-futuristic, red carpet entrance, dan photobooth 360° berhasil menghidupkan esensi \"Genzealous\" yang megah tapi tetap kekinian.\r\n\r\nAlur acara (rundown) berhasil dieksekusi dengan vibes yang naik terus. Mulai dari sesi prom king & queen award, pemutaran video kilas balik (retrospektif) yang emosional, hingga live DJ performance yang membuat seluruh siswa melebur dalam kegembiraan.\r\n\r\nMeskipun konsepnya meriah dan penuh energi, tim EO berhasil menjaga flow acara tetap aman, tertib, dan kondusif berkat manajemen barikade dan koordinasi yang matang dengan pihak keamanan sekolah.\r\n\r\nKonsep yang kuat berhasil menarik antusiasme hampir 100% siswa angkatan untuk hadir dengan dress code terbaik mereka, menciptakan pemandangan yang sangat estetis dan kompak.', 'portfolio/videos/video_1782130815_hiy31.mp4', 1, 'Genzealous', 'Perayaan prom night yang diselenggarakan di lingkungan sekolah dengan konsep yang meriah dan berkesan. Acara dirancang untuk menjadi momen perpisahan yang istimewa bagi para siswa melalui rangkaian hiburan, dekorasi tematik, dan suasana kebersamaan yang hangat.', 'portfolio/portfolio_1781688470_ps9Xe.jpg', '2026-06-17 01:27:51', '2026-06-22 04:20:15'),
(2, 1, 'Academic Celebration', '500 Tamu', 'Dalton Hotel', '2 Bulan', 'Prom night eksklusif yang diselenggarakan di ballroom hotel dengan konsep elegan dan berkelas. Acara menghadirkan pengalaman perayaan yang istimewa melalui tata acara yang terorganisir, dekorasi yang memukau, dan suasana yang mendukung terciptanya kenangan berharga bagi para peserta.', 'Prom night eksklusif yang diselenggarakan di ballroom hotel dengan konsep elegan dan berkelas. Acara menghadirkan pengalaman perayaan yang istimewa melalui tata acara yang terorganisir, dekorasi yang memukau, dan suasana yang mendukung terciptanya kenangan berharga bagi para peserta.', 'Perpaduan antara kemegahan arsitektur ballroom, instalasi floral arrangement yang elegan, lighting design yang hangat, serta backdrop premium berhasil menciptakan atmosfer mewah. Setiap sudut venue berfungsi sebagai latar foto yang picture-perfect dan berkelas.\r\n\r\nSeluruh rangkaian acara—mulai dari prosesi red carpet entrance, fine dining experience, penganugerahan Prom King & Queen, hingga sesi dansa dan hiburan—berjalan tepat waktu (zero-delay) dengan transisi yang sangat halus.\r\n\r\nKoordinasi intensif antara tim EO dan pihak hotel memastikan penyajian hidangan (baik set menu maupun buffet) memiliki kualitas rasa dan standar presentasi gala dinner yang tinggi, menambah kesan prestisius pada malam perayaan.\r\n\r\nDengan pengelolaan tata letak meja (table mapping) yang rapi dan crowd management yang profesional, acara berlangsung kondusif. Para peserta dapat menikmati hiburan sekaligus bercengkerama dalam suasana kebersamaan yang intim dan hangat.', NULL, 1, 'Fortive', 'Prom night eksklusif yang diselenggarakan di ballroom hotel dengan konsep elegan dan berkelas. Acara menghadirkan pengalaman perayaan yang istimewa melalui tata acara yang terorganisir, dekorasi yang memukau, dan suasana yang mendukung terciptanya kenangan berharga bagi para peserta.', 'portfolio/portfolio_1781688471_5a8Yl.JPG', '2026-06-17 01:27:51', '2026-06-22 04:20:15'),
(3, 1, 'Educational Events', '100 Tamu', 'Makassar', '2 Minggu', 'Pengelolaan sesi games edukatif yang interaktif untuk meningkatkan keterlibatan peserta sekaligus mendukung tujuan pembelajaran dalam kegiatan Arrows Youth.', 'Pengelolaan sesi games edukatif yang interaktif untuk meningkatkan keterlibatan peserta sekaligus mendukung tujuan pembelajaran dalam kegiatan Arrows Youth.', 'Sesi games berhasil memicu partisipasi aktif 100% dari peserta Arrows Youth. Atmosfer ruangan yang semula pasif berubah menjadi sangat dinamis, kompetitif secara sehat, dan penuh energi positif.\r\n\r\nKonsep edukasi yang disisipkan ke dalam mekanik permainan dapat diserap dengan mudah oleh peserta. Alih-alih merasa sedang \"belajar\" secara kaku, peserta memahami esensi materi (seperti teamwork, leadership, dan problem solving) melalui simulasi langsung.\r\n\r\nGames kelompok yang dirancang secara taktis sukses melebur batasan canggung antar-peserta. Dalam waktu singkat, terbentuk komunikasi yang solid, rasa saling percaya, dan koordinasi yang kuat di dalam masing-masing tim.\r\n\r\nDi akhir setiap permainan, tim fasilitator berhasil memandu sesi refleksi (debrief) dengan interaktif. Peserta mampu mengartikulasikan sendiri korelasi antara keseruan games yang baru mereka mainkan dengan tantangan nyata di kehidupan sehari-hari mereka sebagai youth.', NULL, 1, 'Arrows Youth', 'Pengelolaan sesi games edukatif yang interaktif untuk meningkatkan keterlibatan peserta sekaligus mendukung tujuan pembelajaran dalam kegiatan Arrows Youth.', 'portfolio/portfolio_1781688471_gTdLw.JPG', '2026-06-17 01:27:51', '2026-06-22 04:20:15'),
(4, 1, 'Educational Events', '50 Tamu', 'Makasar', '2 Minggu', 'Sesi permainan edukatif yang diselenggarakan bersama Yayasan Sahabat Peduli Anak (YSPA), menghadirkan suasana belajar yang ceria dan interaktif. Melalui berbagai aktivitas yang menarik, peserta diajak untuk belajar, berkolaborasi, dan membangun kepercayaan diri dengan cara yang menyenangkan.', 'Sesi permainan edukatif yang diselenggarakan bersama Yayasan Sahabat Peduli Anak (YSPA), menghadirkan suasana belajar yang ceria dan interaktif. Melalui berbagai aktivitas yang menarik, peserta diajak untuk belajar, berkolaborasi, dan membangun kepercayaan diri dengan cara yang menyenangkan.', 'Tim EO berhasil mengemas materi edukasi (seperti literasi dasar, numerasi kreatif, atau pengenalan karakter) ke dalam bentuk aktivitas fisik dan simulasi kelompok kecil. Hal ini membuat anak-anak antusias mengikuti seluruh sesi tanpa rasa bosan.\r\n\r\nMelalui permainan berbasis tim (team-building games), anak-anak yang awalnya pemalu atau pasif berhasil didorong untuk berkomunikasi, saling membantu, dan menyelesaikan misi permainan bersama teman-temannya.\r\n\r\nSetiap mekanik permainan dirancang untuk memberikan apresiasi langsung (positive reinforcement). Sesi seperti berbagi cerita di depan kelompok atau menyelesaikan tantangan mandiri terbukti efektif memicu anak-anak untuk berani berekspresi.\r\n\r\nPendampingan intensif dari tim fasilitator kami memastikan setiap anak mendapatkan perhatian yang inklusif, sabar, dan penuh kasih sayang, sehingga meminimalkan konflik selama permainan berlangsung.', NULL, 1, 'YSPA Educational Games', 'Sesi permainan edukatif yang diselenggarakan bersama Yayasan Sahabat Peduli Anak (YSPA), menghadirkan suasana belajar yang ceria dan interaktif. Melalui berbagai aktivitas yang menarik, peserta diajak untuk belajar, berkolaborasi, dan membangun kepercayaan diri dengan cara yang menyenangkan.', 'portfolio/portfolio_1781689030_3hOYI.jpg', '2026-06-17 01:37:10', '2026-06-22 04:20:15'),
(5, 1, 'Ceremonial Event', '200 Tamu', 'PLN Makassar', '1 Bulan', 'Mendukung pelaksanaan Hari Listrik Nasional PLN melalui pengelolaan rangkaian games interaktif serta closing ceremony. Acara ditutup dengan sesi pengumuman pemenang dan pemberian apresiasi kepada peserta, menciptakan pengalaman yang meriah, terorganisir, dan berkesan.', 'Mendukung pelaksanaan Hari Listrik Nasional PLN melalui pengelolaan rangkaian games interaktif serta closing ceremony. Acara ditutup dengan sesi pengumuman pemenang dan pemberian apresiasi kepada peserta, menciptakan pengalaman yang meriah, terorganisir, dan berkesan.', 'Pengelolaan berbagai games interaktif berbasis teknologi maupun taktis lapangan berjalan dengan sangat teratur. Mekanisme permainan berhasil memicu keterlibatan aktif seluruh unit kerja PLN, mencairkan suasana, dan memperkuat corporate value (AKHLAK) secara menyenangkan.\r\n\r\nSesi upacara penutupan (closing ceremony) dikoreografi dengan sangat rapi. Mulai dari tata panggung, permainan visual multimedia, aransemen musik pencahayaan (lighting show), hingga transisi ke acara puncak berjalan secara seamless tanpa ada kendala teknis.\r\n\r\nManajemen panggung (stage management) pada saat pengumuman pemenang lomba dan penyerahan penghargaan (awarding session) berjalan tertib dan penuh euforia. Proses distribusi hadiah dan plakat di atas panggung dikelola secara profesional sesuai dengan protokol acara korporat.\r\n\r\nDengan jumlah peserta yang masif, tim EO berhasil menjaga alur pergerakan audiens tetap teratur, baik saat berpindah dari area games ke area utama, hingga sesi foto bersama di akhir acara.', NULL, 1, 'PLN Hari Listrik Nasional', 'Mendukung pelaksanaan Hari Listrik Nasional PLN melalui pengelolaan rangkaian games interaktif serta closing ceremony. Acara ditutup dengan sesi pengumuman pemenang dan pemberian apresiasi kepada peserta, menciptakan pengalaman yang meriah, terorganisir, dan berkesan.', 'portfolio/portfolio_1781689030_REcQ0.JPG', '2026-06-17 01:37:10', '2026-06-22 04:20:15'),
(6, 1, 'Ceremonial Event', '600 Tamu', 'Makassar', '2 Minggu', 'Mengelola koordinasi dan pelaksanaan acara pernikahan pada hari H, termasuk pengaturan rundown, koordinasi vendor, pengelolaan alur acara, serta memastikan seluruh rangkaian kegiatan berlangsung lancar dan sesuai rencana.', 'Mengelola koordinasi dan pelaksanaan acara pernikahan pada hari H, termasuk pengaturan rundown, koordinasi vendor, pengelolaan alur acara, serta memastikan seluruh rangkaian kegiatan berlangsung lancar dan sesuai rencana.', 'Seluruh rangkaian prosesi—mulai dari persiapan pagi (makeup & akad/pemberkatan), prosesi masuk kirab pengantin, hingga sesi salaman dan ramah tamah—berjalan tepat waktu. Tim WO berhasil menjaga ritme acara tetap dinamis tanpa membuat pengantin merasa terburu-buru.\r\n\r\nTim EO sukses bertindak sebagai satu-satunya pintu komando (single point of contact) untuk seluruh vendor (Katering, Dekorasi, Dokumentasi, MUA, Sound & Lighting, serta Band). Koordinasi yang rapi memastikan makanan keluar tepat waktu, dekorasi siap sebelum batas waktu, dan momen krusial terdokumentasikan dengan sempurna.\r\n\r\nPengaturan alur masuk tamu, proses registrasi, antrean pondokan (stall makanan), hingga alur foto bersama di panggung dikelola secara taktis. Hal ini mencegah terjadinya penumpukan massa (bottle-neck) dan menjaga kenyamanan para tamu VIP maupun reguler.\r\n\r\nSetiap dinamika kecil di lapangan (seperti perubahan mendadak daftar foto keluarga atau penyesuaian porsi katering di jam kritis) berhasil diselesaikan oleh tim floor manager kami secara senyap tanpa mengganggu ketenangan pengantin dan keluarga.', NULL, 1, 'Wedding Event Management', 'Mengelola koordinasi dan pelaksanaan acara pernikahan pada hari H, termasuk pengaturan rundown, koordinasi vendor, pengelolaan alur acara, serta memastikan seluruh rangkaian kegiatan berlangsung lancar dan sesuai rencana.', NULL, '2026-06-17 01:37:10', '2026-06-22 04:20:15'),
(7, 1, 'Ceremonial Event', '300 Tamu', 'Max One Hotel', '1 Bulan', 'Pelaksanaan melalui koordinasi teknis, pengaturan alur acara, serta pengawasan jalannya prosesi pelantikan, sehingga seluruh rangkaian kegiatan dapat berlangsung tertib, profesional, dan berkesan bagi seluruh peserta dan tamu undangan.', 'Pelaksanaan melalui koordinasi teknis, pengaturan alur acara, serta pengawasan jalannya prosesi pelantikan, sehingga seluruh rangkaian kegiatan dapat berlangsung tertib, profesional, dan berkesan bagi seluruh peserta dan tamu undangan.', 'Rangkaian sakral pelantikan—mulai dari pembacaan surat keputusan, pengucapan sumpah jabatan, penyerahan pataka (bendera organisasi), hingga penandatanganan berita acara—berjalan secara tertib dan presisi sesuai standar protokoler organisasi nasional.\r\n\r\nPenerapan rundown dikelola dengan disiplin waktu yang ketat (zero-delay). Transisi antara sesi formal pelantikan, menyanyikan lagu kebangsaan & mars, hingga sesi sambutan para tokoh penting berjalan mengalir tanpa kendala teknis sound maupun multimedia.\r\n\r\nTim EO berhasil mengarahkan pergerakan pengurus yang akan dilantik (blocking panggung) dengan rapi, sehingga pengambilan dokumentasi visual (foto dan video) terlihat simetris, megah, dan representatif untuk kebutuhan rilis media.\r\n\r\nPengelolaan alur kehadiran (flow) tamu undangan, penempatan tempat duduk (seating arrangement) para fungsionaris dan pejabat, hingga penanganan sesi ramah tamah pasca-acara dikelola secara premium guna menjaga kenyamanan seluruh relasi bisnis yang hadir.', NULL, 1, 'Pelantikan HIPMI Institute', 'Pelaksanaan melalui koordinasi teknis, pengaturan alur acara, serta pengawasan jalannya prosesi pelantikan, sehingga seluruh rangkaian kegiatan dapat berlangsung tertib, profesional, dan berkesan bagi seluruh peserta dan tamu undangan.', 'portfolio/portfolio_1781689030_I0S0E.JPG', '2026-06-17 01:37:10', '2026-06-22 04:20:15'),
(8, 1, 'Corporate & Professional', '150 Tamu', 'Four Points By Sheraton', '1 Minggu', 'RAPAT KOORDINASI DAN REKONSILIASI DPD VIII HISWANA MIGAS PAPUA - MALUKU merupakan sebuah forum pertemuan strategis berskala regional yang diselenggarakan oleh Dewan Pimpinan Daerah (DPD) VIII Himpunan Wiraswasta Nasional Minyak dan Gas Bumi (Hiswana Migas). Acara ini mempertemukan para pengurus, anggota, pelaku usaha, serta mitra kerja di sektor energi yang berada di bawah payung wilayah kerja Maluku dan Papua.', 'RAPAT KOORDINASI DAN REKONSILIASI DPD VIII HISWANA MIGAS PAPUA - MALUKU merupakan sebuah forum pertemuan strategis berskala regional yang diselenggarakan oleh Dewan Pimpinan Daerah (DPD) VIII Himpunan Wiraswasta Nasional Minyak dan Gas Bumi (Hiswana Migas). Acara ini mempertemukan para pengurus, anggota, pelaku usaha, serta mitra kerja di sektor energi yang berada di bawah payung wilayah kerja Maluku dan Papua.', 'Seluruh rangkaian agenda—mulai dari proses registrasi peserta lintas provinsi, sesi pleno Rapat Koordinasi, hingga proses Rekonsiliasi data yang sensitif—berjalan on-schedule tanpa ada kendala teknis yang berarti.\r\n\r\nTim EO berhasil menjembatani komunikasi multi-pihak yang kompleks (DPD VIII Hiswana Migas, pengurus wilayah, hingga pihak Pertamina selaku mitra utama) sehingga esensi dan pesan utama dari forum ini tersampaikan dengan sangat baik kepada seluruh audiens.\r\n\r\nMengingat peserta datang dari berbagai wilayah kepulauan dan pedalaman di Papua dan Maluku, keberhasilan dalam mobilisasi, penyediaan fasilitas venue, serta kenyamanan akomodasi menjadi bukti treatment pelayanan premium yang berhasil kami berikan.\r\n\r\nTingkat kehadiran peserta melampaui target estimasi awal. Atmosfer forum tetap kondusif, interaktif, dan fokus pada solusi, mulai dari sesi pembukaan hingga penutupan.', NULL, 1, 'RAPAT KOORDINASI DAN REKONSILIASI DPD VIII HISWANA MIGAS PAPUA - MALUKU', 'RAPAT KOORDINASI DAN REKONSILIASI DPD VIII HISWANA MIGAS PAPUA - MALUKU merupakan sebuah forum pertemuan strategis berskala regional yang diselenggarakan oleh Dewan Pimpinan Daerah (DPD) VIII Himpunan Wiraswasta Nasional Minyak dan Gas Bumi (Hiswana Migas). Acara ini mempertemukan para pengurus, anggota, pelaku usaha, serta mitra kerja di sektor energi yang berada di bawah payung wilayah kerja Maluku dan Papua.', 'portfolio/portfolio_1781961182_xPMBH.png', '2026-06-20 04:03:56', '2026-06-22 04:20:15');

-- --------------------------------------------------------

--
-- Table structure for table `service_sections`
--

CREATE TABLE `service_sections` (
  `id` bigint UNSIGNED NOT NULL,
  `badge` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titleHighlight` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `via_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_sections`
--

INSERT INTO `service_sections` (`id`, `badge`, `title`, `titleHighlight`, `desc`, `from_color`, `via_color`, `to_color`, `deg`, `created_at`, `updated_at`) VALUES
(1, 'Our Service', 'Layanan', 'Kami', 'Kami menghadirkan layanan terintegrasi untuk membantu individu, organisasi, komunitas, dan perusahaan menciptakan pengalaman, membangun identitas, serta mengembangkan peluang baru.', '#fdfd96', '#fefec9', '#ffffff', '180', '2026-06-17 01:14:53', '2026-06-17 01:14:53');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('3vn3FeiECaVkOHy7BdNNvgkjxah5UBRCTixmRBwD', NULL, '127.0.0.1', 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', 'eyJfdG9rZW4iOiJmY1lZamIyYnZ1Q1RWRkRLaG9pN2RCNHg4TDFEQTVOUzg0emlFcHFKIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9kZXRhaWxcL3BvcnRmb2xpb1wvMiIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782132653),
('ieoYGqiCDNILMr7iizkM3CQiFZRBYoN9cyPtTCgO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI2VDN6dDRFbjB1R2taQVpFU3NPaEFwUDhLVUZSZEI3ektkWm1lWU1HIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9hZG1pbiIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782129008),
('LvdR1KAo5VsUyb4acrpsyWh5CoZEH9vj9Prz8OcV', NULL, '127.0.0.1', 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', 'eyJfdG9rZW4iOiJ4WDVaZUJIckhGQWdmZEtES090RkxkZUltM0Z4SVc4VGhtZlFKOFZMIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782132531),
('TnxLC5ZJJy9jNDLkjzXCQ0k4R9JpIZKiA3YWFf7K', NULL, '127.0.0.1', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/30.0 Chrome/143.0.0.0 Mobile Safari/537.36', 'eyJfdG9rZW4iOiJiajlOcUtLWXFabURwb2FhQWtrT2phVmpsOWhGaXJJeFpCTmpkbmJsIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782132570),
('UKQW1T81tweh23qmk42ilCvj2EPkGBKCrveFtYNh', NULL, '127.0.0.1', 'WhatsApp/2.23.20.0', 'eyJfdG9rZW4iOiJ6SlJROXpCcEdJektJNFRLWFdaOE8wQjNLRERnb0ppTENGbVloQUpZIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xhemlseS11bnZlaWxpbmctbHVtYmVyLm5ncm9rLWZyZWUuZGV2Iiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782132051);

-- --------------------------------------------------------

--
-- Table structure for table `statistiks`
--

CREATE TABLE `statistiks` (
  `id` bigint UNSIGNED NOT NULL,
  `value` int DEFAULT NULL,
  `suffix` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `statistiks`
--

INSERT INTO `statistiks` (`id`, `value`, `suffix`, `label`, `created_at`, `updated_at`) VALUES
(1, 10, '+', 'Event', '2026-06-17 01:42:27', '2026-06-17 01:42:27'),
(2, 7, '+', 'Jumlah Client', '2026-06-17 01:42:27', '2026-06-17 01:42:27'),
(3, 4, '+', 'Tahun Pengalaman', '2026-06-17 01:42:27', '2026-06-17 01:42:27'),
(4, 15, '+', 'Our Tim Relate House', '2026-06-17 01:42:27', '2026-06-17 01:42:27');

-- --------------------------------------------------------

--
-- Table structure for table `testimonis`
--

CREATE TABLE `testimonis` (
  `id` bigint UNSIGNED NOT NULL,
  `project_id` bigint UNSIGNED DEFAULT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `review` text COLLATE utf8mb4_unicode_ci,
  `jabatan` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deg_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonis`
--

INSERT INTO `testimonis` (`id`, `project_id`, `nama`, `image`, `event`, `review`, `jabatan`, `rating`, `from_color`, `to_color`, `deg_color`, `created_at`, `updated_at`) VALUES
(14, 1, 'Andi Angga', 'testimoni/logo_1781966623_0_LnsnX.jpg', 'Genzealous', 'Nggak nyesel dandan rapi dan dateng ke Genzealous. Suasana kebersamaannya dapet banget, seru-seruan bareng temen angkatan buat terakhir kalinya sebelum sibuk kuliah. Thank you buat panitia yang udah bikin malam perpisahan seindah ini di sekolah kita!', 'Ketua Angkatan', '5', NULL, NULL, NULL, '2026-06-20 06:39:41', '2026-06-20 06:43:43'),
(15, 2, 'Neisha Deapati', 'testimoni/logo_1781966623_1_zXXBj.jpg', 'Fortive', 'Malam yang benar-benar magis. Dari awal melangkah masuk ke ballroom, atmosfer elegan dan berkelas dari Fortive langsung terasa. Dekorasi lampunya memukau, layout mejanya rapi, dan suasananya megah sekali. Ini bukan sekadar acara perpisahan, tapi sebuah perayaan yang dikemas dengan standar yang sangat tinggi.', 'Ketua Angkatan', '5', NULL, NULL, NULL, '2026-06-20 06:39:41', '2026-06-20 06:43:43'),
(16, 3, 'Firman', 'testimoni/logo_1781966381_2_nZnhO.JPG', 'Arrows Youth', 'Awalnya mikir sesi games-nya bakal garing kayak outbound biasa, tapi ternyata seru banget! Games-nya gak cuma bikin ketawa, tapi bener-bener ngetes cara kita kerja sama dan nurunin ego. Pas sesi refleksi (debrief) di akhir, baru deh berasa \'oh ternyata ini maksud gamenya\'. Keren banget, dapet serunya, dapet juga pelajarannya!', 'Peserta', '5', NULL, NULL, NULL, '2026-06-20 06:39:41', '2026-06-20 06:39:41'),
(17, 4, 'Firman', 'testimoni/logo_1781967150_3_73krr.jpg', 'YSPA Educational Games', 'Bahagia banget bisa ikutan main bareng kakak-kakak hari ini! Gamenya seru-seru, gak bikin bosen, dan kita diajarin buat kompak sama temen-temen yang lain. Aku jadi lebih berani buat tampil dan cerita di depan banyak orang. Seru banget, mau lagi!', 'Peserta', '5', NULL, NULL, NULL, '2026-06-20 06:52:30', '2026-06-20 06:52:30'),
(18, 5, 'Hendra', 'testimoni/logo_1781967150_4_VnW3u.jpg', 'PLN Hari Listrik Nasional', 'Apresiasi tertinggi untuk tim manajemen acara di Hari Listrik Nasional PLN tahun ini. Seluruh rangkaian kegiatan, mulai dari pengelolaan games interaktif hingga closing ceremony, berjalan dengan sangat rapi, disiplin waktu, dan terorganisir dengan sangat baik. Pengumuman pemenang dikemas dengan tensi yang seru sehingga memberikan kesan mendalam bagi seluruh keluarga besar PLN.', 'Perwakilan Manajement', '5', NULL, NULL, NULL, '2026-06-20 06:52:30', '2026-06-20 06:52:30'),
(19, 7, 'A.R Amperawan', 'testimoni/logo_1781967736_5_wMVBq.jpg', 'Pelantikan HIPMI Institute', 'Apresiasi setinggi-tingginya kepada tim manajemen acara atas dedikasi dan profesionalismenya dalam mengawal Pelantikan Pengurus HIPMI Institute. Mulai dari koordinasi teknis pra-acara, pengaturan alur pergerakan peserta, hingga pengawasan ketat saat prosesi pelantikan berlangsung, semuanya dieksekusi dengan sangat matang. Acara berjalan begitu tertib, khidmat, dan berkelas.', 'Ketua Panitia', '5', NULL, NULL, NULL, '2026-06-20 07:02:16', '2026-06-20 07:02:16'),
(21, 8, 'Leadryk.J.Lekenila', 'testimoni/logo_1781967736_6_JjcGO.png', 'Rapat Kordinasi Dan Rekonsiliasi', 'Penyelenggaraan Rapat Koordinasi dan Rekonsiliasi DPD VIII Hiswana Migas kali ini menjadi tonggak krusial bagi penguatan sinergi pelaku usaha energi di wilayah Papua dan Maluku. Diskusi yang berjalan sangat taktis, dipadukan dengan manajemen forum yang profesional, berhasil melahirkan kesepahaman bersama demi menjaga stabilitas distribusi energi nasional di Indonesia Timur. Sebuah forum regional yang sangat krusial dan sukses besar.', 'Ketua DPD VIII HISWANA MIGAS PAPUA - MALUKU', '5', NULL, NULL, NULL, '2026-06-20 07:02:55', '2026-06-20 07:02:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workflows`
--

CREATE TABLE `workflows` (
  `id` bigint UNSIGNED NOT NULL,
  `step` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `workflows`
--

INSERT INTO `workflows` (`id`, `step`, `title`, `desc`, `icon`, `created_at`, `updated_at`) VALUES
(1, 1, 'Discovery', 'Kami memulai dengan mendengarkan tujuan, tantangan, kebutuhan, dan harapan Anda untuk menemukan solusi yang paling tepat.', NULL, '2026-06-17 01:49:25', '2026-06-17 01:49:25'),
(2, 2, 'Strategy & Planning', 'Tim kami merancang konsep, strategi, timeline, serta kebutuhan sumber daya yang sesuai dengan objektif proyek.', NULL, '2026-06-17 01:49:25', '2026-06-17 01:49:25'),
(3, 3, 'Creative Development', 'Kami mengembangkan konsep kreatif, identitas visual, pengalaman, dan berbagai elemen pendukung yang akan mewujudkan visi Anda.', NULL, '2026-06-17 01:49:25', '2026-06-17 01:49:25'),
(4, 4, 'Production & Execution', 'Seluruh proses produksi dan implementasi dilakukan secara profesional dengan koordinasi yang terstruktur dan terukur.', NULL, '2026-06-17 01:49:25', '2026-06-17 01:49:25'),
(5, 5, 'Evaluation & Growth', 'Kami melakukan evaluasi hasil, mengumpulkan insight, dan mengidentifikasi peluang untuk kolaborasi dan pengembangan berikutnya.', NULL, '2026-06-17 01:49:25', '2026-06-17 01:49:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_sections`
--
ALTER TABLE `about_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banoms`
--
ALTER TABLE `banoms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `categoris`
--
ALTER TABLE `categoris`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `choose_us`
--
ALTER TABLE `choose_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cta_sections`
--
ALTER TABLE `cta_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Indexes for table `footers`
--
ALTER TABLE `footers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `galeries`
--
ALTER TABLE `galeries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `galeries_project_id_foreign` (`project_id`);

--
-- Indexes for table `gallery_images`
--
ALTER TABLE `gallery_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gallery_images_galery_id_foreign` (`galery_id`);

--
-- Indexes for table `hero_sections`
--
ALTER TABLE `hero_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_id_kategori_foreign` (`id_kategori`);

--
-- Indexes for table `service_sections`
--
ALTER TABLE `service_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `statistiks`
--
ALTER TABLE `statistiks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonis`
--
ALTER TABLE `testimonis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `testimonis_project_id_foreign` (`project_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_name_unique` (`name`);

--
-- Indexes for table `workflows`
--
ALTER TABLE `workflows`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_sections`
--
ALTER TABLE `about_sections`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `banoms`
--
ALTER TABLE `banoms`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categoris`
--
ALTER TABLE `categoris`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `choose_us`
--
ALTER TABLE `choose_us`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cta_sections`
--
ALTER TABLE `cta_sections`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `footers`
--
ALTER TABLE `footers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `galeries`
--
ALTER TABLE `galeries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `gallery_images`
--
ALTER TABLE `gallery_images`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `hero_sections`
--
ALTER TABLE `hero_sections`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `partners`
--
ALTER TABLE `partners`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `service_sections`
--
ALTER TABLE `service_sections`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `statistiks`
--
ALTER TABLE `statistiks`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `testimonis`
--
ALTER TABLE `testimonis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workflows`
--
ALTER TABLE `workflows`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `galeries`
--
ALTER TABLE `galeries`
  ADD CONSTRAINT `galeries_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `gallery_images`
--
ALTER TABLE `gallery_images`
  ADD CONSTRAINT `gallery_images_galery_id_foreign` FOREIGN KEY (`galery_id`) REFERENCES `galeries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_id_kategori_foreign` FOREIGN KEY (`id_kategori`) REFERENCES `categoris` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `testimonis`
--
ALTER TABLE `testimonis`
  ADD CONSTRAINT `testimonis_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
