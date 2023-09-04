-- Active: 1693716310421@@127.0.0.1@3306

USE SAL;
CREATE TABLE patient
(   
    UNID VARCHAR(32),
    Blood_group varchar(20), 
    Age int,
    gender varchar(20)
);

DROP TABLE patient;

SELECT * FROM patient;
SELECT * FROM profile;

SELECT * FROM patient;

show tables;
SELECT * FROM donor;
SELECT * FROM profile;

DELETE FROM `donor` ;
DELETE FROM `profile` ;