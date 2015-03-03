<?php

class commentcava
{

  //commentcava.php path for generating comment form
  const post_uri   = '';

  //allow html in comments or not?
  const allow_html = false;

  //PDO variable
  protected $db;

  /*
  * Verify that we received a PDO database
  */
  public function __construct(PDO $db)
  {
    if ($db === null)
    {
      throw new InvalidArgumentException('Bad PDO instance given.');
    }
    $this->db = $db;
  }

  /*
   * Get comments for a specific page
   */
  function getComments($url)
  {
  $orderedcomments = Array();
  $orderedcomments = $this->getMultiLevelComments($orderedcomments, $url);
    return $orderedcomments;
  }

  function getMultiLevelComments($orderedcomments, $url, $reply = 0)
  {
  $query = $this->db->prepare('SELECT * FROM comments WHERE post = :post AND reply = :reply ORDER BY id, reply');
  $query->bindValue(':post', $url, PDO::PARAM_STR);
  $query->bindValue(':reply', $reply, PDO::PARAM_STR);
  $query->execute();
  $comments = $query->fetchAll(PDO::FETCH_OBJ);

  foreach ($comments as $comment) {
      array_push($orderedcomments, $comment);
    $orderedcomments = $this->getMultiLevelComments($orderedcomments, $comment->post, $comment->id);
  }
  return $orderedcomments;
  }

  function addComment($replyto, $url, $name, $website, $comment, $captcha)
  {
    //Allow anonymous comment
    if (empty($name)) $name="Anonymous";
    
    if (!empty($website)) $website= $this->addScheme($website);
    
    //Check if username or message are not empty && captcha is okay
    if (!empty($comment) && !empty($captcha) && strtoupper($captcha) == $_SESSION['captcha'])
    {

    if (empty($replyto))
    {
      $query = $this->db->prepare('INSERT INTO comments (post, reply, author, website, message)  VALUES (:post, 0, :author, :website, :message);');
    }
    else
    {
      $level = 0;
      $subquery = $this->db->prepare('SELECT level FROM comments WHERE post = :url AND id = :id');
      $subquery->bindValue(':url', $url, PDO::PARAM_STR);
      $subquery->bindValue(':id', $replyto, PDO::PARAM_STR);
      if ($subquery->execute())
      {
        $level = $subquery->fetchColumn();
        $level = $level + 1;
      }

      $query = $this->db->prepare('INSERT INTO comments (post, reply, level, author, website, message)  VALUES (:post, :reply, :level, :author, :website, :message);');
      $query->bindValue(':reply', $replyto, PDO::PARAM_STR);
      $query->bindValue(':level', $level, PDO::PARAM_STR);
    }

    $query->bindValue(':post', $url, PDO::PARAM_STR);
    $query->bindValue(':author', $name, PDO::PARAM_STR);
    $query->bindValue(':website', $website, PDO::PARAM_STR);
    if (!empty($this->allow_html)) {
      $query->bindValue(':message', $comment, PDO::PARAM_STR);
    }
    else {
      $query->bindValue(':message', htmlentities($comment, ENT_QUOTES, "UTF-8"), PDO::PARAM_STR);
    }
    return $query->execute();
  }
  return false;
  }

  function addScheme($url, $scheme = 'http://')
  {
    return parse_url($url, PHP_URL_SCHEME) === null ?
      $scheme . $url : $url;
  }

  function generateCaptcha()
  {
  //Generate random code
  $chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  $code = '';
  $lenght = 5;

  for ($i=0; $i<$lenght; $i++) {
    $code .= $chars{ mt_rand( 0, strlen($chars) - 1 ) };
  }
  //Save is in session
  $_SESSION['captcha'] = $code;

  $char1 = substr($code,0,1);
  $char2 = substr($code,1,1);
  $char3 = substr($code,2,1);
  $char4 = substr($code,3,1);
  $char5 = substr($code,4,1);

  $fonts = glob('./captcha/fonts/*.ttf');

  $img = imagecreatefrompng('./captcha/captcha.png');

  $colors = array ( imagecolorallocate($img, 217, 0, 0),
        imagecolorallocate($img,  89, 0, 255),
        imagecolorallocate($img, 0, 190, 214),
        imagecolorallocate($img, 255, 0, 234),
        imagecolorallocate($img, 0, 123, 123) );

  imagettftext($img, 17, 1, 25, 25, $colors[array_rand($colors)], $fonts[array_rand($fonts)], $char1);
  imagettftext($img, 17, 20, 47, 25, $colors[array_rand($colors)], $fonts[array_rand($fonts)], $char2);
  imagettftext($img, 17, 1, 65, 25, $colors[array_rand($colors)], $fonts[array_rand($fonts)], $char3);
  imagettftext($img, 17, 24, 100, 25, $colors[array_rand($colors)], $fonts[array_rand($fonts)], $char4);
  imagettftext($img, 17, 1, 120, 25, $colors[array_rand($colors)], $fonts[array_rand($fonts)], $char5);

  header('Content-Type: image/png');
  imagepng($img);
  imagedestroy($img);
  return $img;
  }

}
