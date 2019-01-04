-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.13 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for dbdbdeep
CREATE DATABASE IF NOT EXISTS `dbdbdeep` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dbdbdeep`;

-- Dumping structure for table dbdbdeep.user
CREATE TABLE IF NOT EXISTS `user` (
  `ID` varchar(50) NOT NULL,
  `PW` varchar(50) DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `나이` int(11) DEFAULT NULL,
  `핸드폰번호` varchar(11) DEFAULT NULL,
  `평점` float DEFAULT '0',
  `평가수` int(11) DEFAULT '0',
  `개발경력` int(11) DEFAULT '0',
  `Java` int(11) DEFAULT '0',
  `Python` int(11) DEFAULT '0',
  `Cpp` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dbdbdeep.user: ~3 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`ID`, `PW`, `Name`, `나이`, `핸드폰번호`, `평점`, `평가수`, `개발경력`, `Java`, `Python`, `Cpp`) VALUES
	('CKM', 'chankyoung', '문찬경', 28, '01074990473', 0, 0, 0, 0, 0, 0),
	('JHP', 'jaehong', '박재홍', 27, '01068797666', 333, 3, 3, 3, 4, 4),
	('JHY', 'jihoon', '유지훈', 28, '01084787259', 5333, 4, 0, 0, 0, 0),
	('root', 'root', '관리자', 28, '01011112222', 0, 0, 10, 0, 0, 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table dbdbdeep.내적포트폴리오
CREATE TABLE IF NOT EXISTS `내적포트폴리오` (
  `프리랜서ID` varchar(20) DEFAULT NULL,
  `제목` varchar(20) NOT NULL,
  `의뢰번호` int(11) NOT NULL AUTO_INCREMENT,
  `주제설명` varchar(20) NOT NULL,
  PRIMARY KEY (`제목`),
  KEY `FK_내적포트폴리오_프리랜서` (`프리랜서ID`),
  KEY `FK_내적포트폴리오_의뢰목록` (`의뢰번호`),
  CONSTRAINT `FK_내적포트폴리오_의뢰목록` FOREIGN KEY (`의뢰번호`) REFERENCES `의뢰목록` (`의뢰번호`),
  CONSTRAINT `FK_내적포트폴리오_프리랜서` FOREIGN KEY (`프리랜서ID`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Dumping data for table dbdbdeep.내적포트폴리오: ~3 rows (approximately)
/*!40000 ALTER TABLE `내적포트폴리오` DISABLE KEYS */;
INSERT INTO `내적포트폴리오` (`프리랜서ID`, `제목`, `의뢰번호`, `주제설명`) VALUES
	('JHY', '1', 16, '1'),
	('JHY', '2', 15, '2'),
	('JHY', '포폴제목', 16, '포폴내용');
/*!40000 ALTER TABLE `내적포트폴리오` ENABLE KEYS */;

-- Dumping structure for table dbdbdeep.신청목록
CREATE TABLE IF NOT EXISTS `신청목록` (
  `의뢰번호` int(11) NOT NULL AUTO_INCREMENT,
  `프리랜서ID` varchar(20) NOT NULL,
  `프리랜서수락상태` int(11) DEFAULT '0',
  `의뢰자수락상태` int(11) DEFAULT '0',
  `거부사유` varchar(50) DEFAULT '0',
  `프리랜서완료요청` int(11) DEFAULT '0',
  `개발시작날짜` date DEFAULT NULL,
  `개발완료날짜` date DEFAULT NULL,
  KEY `FK_신청목록_의뢰목록` (`의뢰번호`),
  KEY `FK_신청목록_프리랜서` (`프리랜서ID`),
  CONSTRAINT `FK_신청목록_의뢰목록` FOREIGN KEY (`의뢰번호`) REFERENCES `의뢰목록` (`의뢰번호`),
  CONSTRAINT `FK_신청목록_프리랜서` FOREIGN KEY (`프리랜서ID`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Dumping data for table dbdbdeep.신청목록: ~4 rows (approximately)
/*!40000 ALTER TABLE `신청목록` DISABLE KEYS */;
INSERT INTO `신청목록` (`의뢰번호`, `프리랜서ID`, `프리랜서수락상태`, `의뢰자수락상태`, `거부사유`, `프리랜서완료요청`, `개발시작날짜`, `개발완료날짜`) VALUES
	(15, 'JHY', 1, 1, '', 1, '2018-12-08', '2018-12-08'),
	(14, 'CKM', 0, 0, '0', 0, NULL, NULL),
	(16, 'JHY', 0, 0, '', 0, NULL, '2018-12-08'),
	(17, 'JHP', 1, 1, '', 1, '2018-12-08', '2018-12-08');
/*!40000 ALTER TABLE `신청목록` ENABLE KEYS */;

-- Dumping structure for table dbdbdeep.완료의뢰 결과물 보고서
CREATE TABLE IF NOT EXISTS `완료의뢰 결과물 보고서` (
  `프리랜서  ID` varchar(20) DEFAULT NULL,
  `의뢰번호` int(11) NOT NULL AUTO_INCREMENT,
  `개발 내용` varchar(50) DEFAULT NULL,
  `완료 일자` datetime DEFAULT NULL,
  KEY `FK_완료의뢰 결과물 보고서_의뢰목록` (`의뢰번호`),
  KEY `FK_완료의뢰 결과물 보고서_프리랜서` (`프리랜서  ID`),
  CONSTRAINT `FK_완료의뢰 결과물 보고서_의뢰목록` FOREIGN KEY (`의뢰번호`) REFERENCES `의뢰목록` (`의뢰번호`),
  CONSTRAINT `FK_완료의뢰 결과물 보고서_프리랜서` FOREIGN KEY (`프리랜서  ID`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dbdbdeep.완료의뢰 결과물 보고서: ~0 rows (approximately)
/*!40000 ALTER TABLE `완료의뢰 결과물 보고서` DISABLE KEYS */;
/*!40000 ALTER TABLE `완료의뢰 결과물 보고서` ENABLE KEYS */;

-- Dumping structure for table dbdbdeep.외적포트폴리오
CREATE TABLE IF NOT EXISTS `외적포트폴리오` (
  `프리랜서ID` varchar(20) DEFAULT NULL,
  `제목` varchar(20) NOT NULL,
  `주제설명` varchar(20) NOT NULL,
  PRIMARY KEY (`제목`),
  KEY `FK_외적포트폴리오_프리랜서` (`프리랜서ID`),
  CONSTRAINT `FK_외적포트폴리오_프리랜서` FOREIGN KEY (`프리랜서ID`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dbdbdeep.외적포트폴리오: ~5 rows (approximately)
/*!40000 ALTER TABLE `외적포트폴리오` DISABLE KEYS */;
INSERT INTO `외적포트폴리오` (`프리랜서ID`, `제목`, `주제설명`) VALUES
	('JHP', '포폴1', '프로그래밍1'),
	('JHY', '포폴2', '프로그래밍2'),
	('JHP', '포폴3', '프로그래밍3'),
	('CKM', '포폴4', '프로그래밍4'),
	('CKM', '포폴5', '프로그래밍5');
/*!40000 ALTER TABLE `외적포트폴리오` ENABLE KEYS */;

-- Dumping structure for table dbdbdeep.의뢰목록
CREATE TABLE IF NOT EXISTS `의뢰목록` (
  `의뢰번호` int(11) NOT NULL AUTO_INCREMENT,
  `의뢰자ID` varchar(20) NOT NULL,
  `금액` int(11) NOT NULL,
  `시작날짜` date NOT NULL,
  `종료날짜` date NOT NULL,
  `최소경력` int(11) NOT NULL,
  `의뢰문서` varchar(20) NOT NULL,
  `최소프리랜서수` int(11) NOT NULL,
  `최대프리랜서수` int(11) NOT NULL,
  `Java` int(11) DEFAULT '0',
  `Python` int(11) DEFAULT '0',
  `Cpp` int(11) DEFAULT '0',
  PRIMARY KEY (`의뢰번호`),
  KEY `FK_의뢰목록_의뢰자` (`의뢰자ID`),
  KEY `의뢰문서` (`의뢰문서`),
  CONSTRAINT `FK_의뢰목록_의뢰자` FOREIGN KEY (`의뢰자ID`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Dumping data for table dbdbdeep.의뢰목록: ~4 rows (approximately)
/*!40000 ALTER TABLE `의뢰목록` DISABLE KEYS */;
INSERT INTO `의뢰목록` (`의뢰번호`, `의뢰자ID`, `금액`, `시작날짜`, `종료날짜`, `최소경력`, `의뢰문서`, `최소프리랜서수`, `최대프리랜서수`, `Java`, `Python`, `Cpp`) VALUES
	(13, 'JHP', 50009, '0005-05-05', '0055-05-05', 9, '의뢰짱', 55, 5, 5, 5, 5),
	(14, 'CKM', 20000, '0001-01-01', '0001-01-01', 20, '의도도', 1, 1, 1, 1, 1),
	(15, 'JHY', 20000, '0002-02-02', '0002-02-02', 20, '2', 2, 2, 2, 2, 2),
	(16, 'JHY', 123, '0011-01-01', '0001-01-01', 1, '1', 1, 1, 1, 1, 1);
/*!40000 ALTER TABLE `의뢰목록` ENABLE KEYS */;

-- Dumping structure for table dbdbdeep.의뢰문서
CREATE TABLE IF NOT EXISTS `의뢰문서` (
  `의뢰제목` varchar(20) DEFAULT NULL,
  `요구사항` varchar(50) DEFAULT NULL,
  `내용` varchar(50) DEFAULT NULL,
  KEY `FK_의뢰문서_의뢰목록` (`의뢰제목`),
  CONSTRAINT `FK_의뢰문서_의뢰목록` FOREIGN KEY (`의뢰제목`) REFERENCES `의뢰목록` (`의뢰문서`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dbdbdeep.의뢰문서: ~4 rows (approximately)
/*!40000 ALTER TABLE `의뢰문서` DISABLE KEYS */;
INSERT INTO `의뢰문서` (`의뢰제목`, `요구사항`, `내용`) VALUES
	('의뢰짱', '의뢰이올시다', '의뢰뇌뇌'),
	('의도도', '하하', '호호'),
	('2', '2', '2'),
	('1', '1', '1');
/*!40000 ALTER TABLE `의뢰문서` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
