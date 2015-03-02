<?php

require_once 'commentcava.class.php';

session_start();

$default_db = './commentcava.sqlite';
$db = new PDO("sqlite:".$default_db);

$commentcava = new commentcava($db);

//Get comments
if (isset($_GET['a']) && ($_GET['a'] == 'g') and isset($_GET['url'])) {

  header('Cache-Control: no-cache, must-revalidate');
  header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
  header('Content-type: application/json');
  header("HTTP/1.1 200 OK");

  try {
    $comments = $commentcava->getComments($_GET['url']);
  }
  catch (Exception $e) {
    var_dump($e);
    $comments = array();
  }
  echo json_encode($comments);
}

//Captcha
if (isset($_GET['a']) && $_GET['a'] == 'c') {
  echo $commentcava->generateCaptcha();
}

//POST a comment
if (isset($_GET['a']) && $_GET['a'] == 'p') {

  //Add the comment
  $commentcava->addComment($_POST['replyto'], $_POST['url'], $_POST['name'], $_POST['comment'], $_POST['captcha'] );

  //redirect to the url
  header('Location: '.$_POST['url']);
}
