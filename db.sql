DROP DATABASE IF EXISTS meuDB;

CREATE DATABASE meuDB;

USE meuDB;

CREATE TABLE produtos (
  id INT NOT NULL auto_increment,
  produto VARCHAR(30) NOT NULL,
  valor FLOAT NOT NULL,
  descricao TEXT NOT NULL,
  created DATETIME DEFAULT current_timestamp,
  updated DATETIME DEFAULT current_timestamp,
  PRIMARY KEY(id)
) ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;