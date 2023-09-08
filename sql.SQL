-- Active: 1693716310421@@127.0.0.1@3306@SAL

USE SAL;
CREATE TABLE patient
(   
    UNID VARCHAR(32),
    Blood_group varchar(20), 
    Age int,
    gender varchar(20)
); 

-- DROP TABLE patient;

SELECT * FROM patient;
SELECT * FROM donor;
SELECT * FROM profile;

DESCRIBE PROFILE;

ALTER TABLE profile ADD COLUMN email VARCHAR(100); -- Run this in the school PC

DELETE FROM `donor` ;
DELETE FROM `patient` ;
DELETE FROM `profile` ;

