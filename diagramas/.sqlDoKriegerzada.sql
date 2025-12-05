-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: db_ecom_krieger
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `codEntrega` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NOT NULL,
  `cep` varchar(9) NOT NULL,
  `logradouro` varchar(70) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(70) NOT NULL,
  `localidade` varchar(70) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `numero` varchar(12) NOT NULL,
  `statusEntrega` enum('EM_TRANSITO','SAIU_PARA_ENTREGA','ENTREGUE','EXTRAVIADO') NOT NULL DEFAULT 'EM_TRANSITO',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codEntrega`),
  UNIQUE KEY `idPedido` (`idPedido`),
  CONSTRAINT `entregas_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`codPedido`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
INSERT INTO `entregas` VALUES (1,1,'88220000','Rua 618','casa','tabuleiro','Itapema','SC','72','EXTRAVIADO','2025-12-04 22:58:27','2025-12-04 22:58:27');
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoques`
--

DROP TABLE IF EXISTS `estoques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoques` (
  `codEstoque` int NOT NULL AUTO_INCREMENT,
  `idProduto` int NOT NULL,
  `quantidade_minima` int DEFAULT '5',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tipo` enum('ENTRADA','SAIDA') NOT NULL,
  `qtdeMovimento` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`codEstoque`),
  UNIQUE KEY `idProduto` (`idProduto`),
  CONSTRAINT `estoques_ibfk_1` FOREIGN KEY (`idProduto`) REFERENCES `produtos` (`codProduto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoques`
--

LOCK TABLES `estoques` WRITE;
/*!40000 ALTER TABLE `estoques` DISABLE KEYS */;
INSERT INTO `estoques` VALUES (1,1,5,'2025-12-04 22:47:36','2025-12-04 22:47:36','ENTRADA',20),(2,2,5,'2025-12-04 22:47:36','2025-12-04 22:47:36','SAIDA',3),(3,10,5,'2025-12-04 22:47:36','2025-12-04 22:47:36','ENTRADA',15);
/*!40000 ALTER TABLE `estoques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itens_pedidos`
--

DROP TABLE IF EXISTS `itens_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens_pedidos` (
  `codItemPedido` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NOT NULL,
  `idProduto` int NOT NULL,
  `quantidade` int NOT NULL DEFAULT '1',
  `precoUnitario` decimal(10,2) NOT NULL,
  `valorTotalItem` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`codItemPedido`),
  UNIQUE KEY `itens_pedidos_id_pedido_id_produto` (`idPedido`,`idProduto`),
  KEY `idProduto` (`idProduto`),
  CONSTRAINT `itens_pedidos_ibfk_43` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`codPedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `itens_pedidos_ibfk_44` FOREIGN KEY (`idProduto`) REFERENCES `produtos` (`codProduto`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens_pedidos`
--

LOCK TABLES `itens_pedidos` WRITE;
/*!40000 ALTER TABLE `itens_pedidos` DISABLE KEYS */;
INSERT INTO `itens_pedidos` VALUES (1,1,1,1,1299.99,1299.99),(2,2,2,2,1299.90,2599.80),(3,4,10,3,799.99,2399.97);
/*!40000 ALTER TABLE `itens_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `codPedido` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `dataPedido` datetime NOT NULL,
  `status` enum('PENDENTE_PAGAMENTO','PAGO','ENVIADO','ENTREGUE','CANCELADO') NOT NULL DEFAULT 'PENDENTE_PAGAMENTO',
  `valorSubtotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valorFrete` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valorTotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codPedido`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`codUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,5,'2025-12-01 00:00:00','ENTREGUE',1299.99,0.00,1299.99,'2025-12-04 22:42:58','2025-12-04 22:42:58'),(2,3,'2025-12-02 00:00:00','PAGO',2599.98,34.00,2633.98,'2025-12-04 22:42:58','2025-12-04 22:42:58'),(4,4,'2025-12-03 00:00:00','ENVIADO',2299.89,29.00,2328.89,'2025-12-04 22:42:58','2025-12-04 22:42:58');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `codProduto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(300) DEFAULT NULL,
  `modelo` varchar(50) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `imagem_url` text,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `estoque` int DEFAULT '0',
  PRIMARY KEY (`codProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Adidas Adi2000','Tênis Adidas Adi2000','Adi2000',1299.90,'img/adidas-adi2000.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',20),(2,'Adidas Fórum Buckle Low x Bad Bunny','Collab Bad Bunny','Forum Buckle',1299.90,'img/adidas-badbunny.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',15),(3,'Mizuno Wave Prophecy LS','Tênis Mizuno Wave Prophecy LS','Wave Prophecy LS',1299.90,'img/mizuno-ls.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',18),(4,'Mizuno Wave Prophecy 14 S','Wave Prophecy 14 S','Wave Prophecy 14',1299.90,'img/mizuno-14s.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',18),(5,'New Balance 550 Bege Verde','New Balance 550 Bege e Verde','NB 550',1299.90,'img/nb-550.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',20),(6,'New Balance 9060 Chrome Blue Azul','New Balance 9060 Azul','NB 9060',1299.90,'img/nb-9060.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',20),(7,'Nike Dunk Low Valentine\'s Day 2024','Dunk Valentine\'s Day','Dunk Low',1299.99,'img/dunk-valentine.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',15),(8,'Nike x NOCTA Hot Step 2','Collab Nike x NOCTA','Hot Step 2',1499.90,'img/nocta-hotstep2.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',12),(9,'One Piece x Puma Suede Blackbeard','Collab One Piece Barba Negra','Puma Suede',1399.99,'img/puma-onepiece.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',10),(10,'Tiffany & Co. x Air Force 1 Low 1837','Collab Tiffany AF1','Air Force 1',799.99,'img/airforce-tiffany.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',18),(11,'Nike Air Jordan 1 Low OG SP Travis Scott Mocha','Jordan x Travis Scott','Jordan 1 Low',999.99,'img/jordan-travis.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',10),(12,'Nike Air Jordan 4 Retro White Thunder Preto','Jordan 4 White Thunder','Jordan 4',899.90,'img/jordan4-thunder.jpg',1,'2025-12-04 21:23:50','2025-12-04 21:23:50',14);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `codUsuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `identidade` varchar(20) DEFAULT NULL,
  `tipo_usuario` enum('CLIENTE','ADMIN') NOT NULL DEFAULT 'CLIENTE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codUsuario`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `cpf_2` (`cpf`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `cpf_3` (`cpf`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `cpf_4` (`cpf`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `cpf_5` (`cpf`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `cpf_6` (`cpf`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `cpf_7` (`cpf`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `cpf_8` (`cpf`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `cpf_9` (`cpf`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `cpf_10` (`cpf`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `cpf_11` (`cpf`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `cpf_12` (`cpf`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `cpf_13` (`cpf`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `cpf_14` (`cpf`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `cpf_15` (`cpf`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `cpf_16` (`cpf`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `cpf_17` (`cpf`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `cpf_18` (`cpf`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `cpf_19` (`cpf`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `cpf_20` (`cpf`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `cpf_21` (`cpf`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `cpf_22` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'Mateus','mateus@gmail.com','$2b$12$gUsJQYDWzJWbqjR0D4qZW.IqBZx4NAtjJihduJjh9lu0Sm6BsfQ7C','47992222222','08610432947',NULL,'ADMIN','2025-11-26 00:00:00','2025-11-26 00:00:00'),(3,'luam','luan@gmail.com','$2b$2b$10$y1Zx4TpKMoE4Cq4Xk2jHueYpQH1b2F9nVfKDs9AQaIsy87tyYT3nK','47992222221','246.826.250-63',NULL,'CLIENTE','2025-11-26 00:00:00','2025-11-26 00:00:00'),(4,'Teste','teste@email.com','$2b$10$oRxumce110Sl7UnicaFBgO6jvsC/MF9YVaU8lF7r50GOYHZBeVpRC','11999999999','89788169082',NULL,'CLIENTE','2025-12-04 17:16:11','2025-12-04 17:16:11'),(5,'franke','franke@gmail.com','$2b$10$6QZzC.Q61.fi7Ue72TWKb.hjOeY/41re4yFnyJee2zlrkMOTsD322','92967845654','71993726047','','CLIENTE','2025-12-04 17:23:15','2025-12-04 17:23:15'),(6,'test','test@test.com','$2b$10$VqEol4NS4Z1Zoceyip4Xi.LPHyLB9TBV49PGSB2a/JY2FOAO8d9mK','82989291146','40119185040','','CLIENTE','2025-12-04 17:57:30','2025-12-04 17:57:30'),(7,'krieger','krieger@gmail.com','$2b$10$FJx7O2luQDb0ml8Msf6xLuZdcgZBR4Mamsi1zzdtx1Mp/5YdEADn6','4928467732','199.711.340-63','','CLIENTE','2025-12-04 23:46:08','2025-12-04 23:46:08');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-04 23:02:39
