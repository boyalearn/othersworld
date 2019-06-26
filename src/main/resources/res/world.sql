/*
Navicat MySQL Data Transfer

Source Server         : localhost_3301
Source Server Version : 50640
Source Host           : localhost:3301
Source Database       : world

Target Server Type    : MYSQL
Target Server Version : 50640
File Encoding         : 65001

Date: 2019-06-26 12:30:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `w_object`
-- ----------------------------
DROP TABLE IF EXISTS `w_object`;
CREATE TABLE `w_object` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `object_name` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `object_type` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `object_x` double DEFAULT NULL,
  `object_y` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of w_object
-- ----------------------------
INSERT INTO `w_object` VALUES ('1', 'tree', '1', '0', '0');
INSERT INTO `w_object` VALUES ('2', 'tree', '1', '200', '0');
INSERT INTO `w_object` VALUES ('3', 'tree', '1', '300', '0');

-- ----------------------------
-- Table structure for `w_object_type`
-- ----------------------------
DROP TABLE IF EXISTS `w_object_type`;
CREATE TABLE `w_object_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of w_object_type
-- ----------------------------
INSERT INTO `w_object_type` VALUES ('1', 'TREE');
INSERT INTO `w_object_type` VALUES ('2', 'PLAYER');

-- ----------------------------
-- Table structure for `w_user`
-- ----------------------------
DROP TABLE IF EXISTS `w_user`;
CREATE TABLE `w_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of w_user
-- ----------------------------

-- ----------------------------
-- Table structure for `w_user_map`
-- ----------------------------
DROP TABLE IF EXISTS `w_user_map`;
CREATE TABLE `w_user_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `map_x` float(20,0) DEFAULT NULL,
  `map_y` float(32,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of w_user_map
-- ----------------------------
