<?php

require_once 'commentcava.class.php';

session_start();

$default_db = './commentcava.sqlite';
$db = new PDO("sqlite:".$default_db);

$commentcava = new commentcava($db);

//Get comments
if (isset($_GET['a']) && ($_GET['a'] == 'g') and isset($_GET['url'])) {

  $result = ['return_code' => 0, 'entries' => [] ];

  $result['entries'] = $commentcava->getComments($_GET['url']);

  /*header('Cache-Control: no-cache, must-revalidate');
  header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
  header('Content-type: application/json');
  header("HTTP/1.1 200 OK");
  */

  echo json_encode($result);
}

//Captcha
if (isset($_GET['a']) && $_GET['a'] == 'c') {
  echo $commentcava->generateCaptcha();
}

//POST a comment
if (isset($_GET['a']) && $_GET['a'] == 'p') {

  //Add the comment
  $result = $commentcava->addComment($_POST['replyto'], $_POST['url'], $_POST['name'], $_POST['website'], $_POST['comment'], $_POST['captcha'] );
  if ($result['return_code'] == 0) {
    header('Location: '.$_POST['url']);
  }
  else
  {
    header('Location: '.$_POST['url'].'#error|'.$result['msg']);
  }
}
