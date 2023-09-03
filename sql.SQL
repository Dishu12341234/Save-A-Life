-- Active: 1693716310421@@127.0.0.1@3306

USE SAL;
CREATE TABLE donor
(   
    name VARCHAR(40),
    city VARCHAR(30),
    contact VARCHAR(12),
    UNID VARCHAR(32),

);

DROP TABLE donor;

SELECT * FROM donor