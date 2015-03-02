<?php

require_once 'commentcava.class.php';

$default_db = './commentcava.sqlite';

if (!file_exists($default_db)) {
  //Create DB if not exists
  $db = new PDO("sqlite:".$default_db);
  $query = $db->prepare('
  CREATE TABLE "comments" (
    "post" VARCHAR NOT NULL ,
    "id" INTEGER PRIMARY KEY  NOT NULL ,
    "reply" INTEGER DEFAULT (0) ,
    "level" INTEGER DEFAULT (0) ,
    "author" VARCHAR NOT NULL ,
    "date" TIMESTAMP DEFAULT (datetime(\'now\',\'localtime\')) ,
    "message" TEXT NOT NULL )');
  $query->execute();

  echo 'Database commentcava.sqlite created';
}
else
{
  echo 'Database commentcava.sqlite already exists';
}
