<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="../../commentcava.css">
    <title>Example 2</title>
</head>
<body>
    <section>Hello. This is an example of generated html page (from PHP) #2.<br/>
    <a href="../index.html">Back to examples list?</a>
    <p>this page is just html generated from php.</p>
    <p>Here we don't need javascript at all</p>
    <p>we just place load the comments in php into the div where we want the comments (usually at the bottom):</p>
    <pre><code>&lt;div id="comments"&gt;&lt;?php //see php code in your editor; ?&gt;&lt;/div&gt;</code></pre>
    </section>
    <div id="comments">
      <?php
      	require '../../commentcava.class.php';
      	$ccv = new commentcava('../../commentcava.sqlite');

      	$comments = $ccv->getComments($_SERVER['SCRIPT_NAME']);

        if (!$comments)
        {
          //Show NO comments
          echo '<div class="comment">No comment</div>';
        }
        else
        {
          //Show comments
          foreach ($comments as $key => $comment) {
            echo '<div class="comment" style=""><div><span class="comment_user">'.$comment->author.'</span><span class="comment_date">'.$comment->date.'</span></div><div class="comment_message">'.$comment->message.'</div></div>';
          }
        }
        
        //Show form to add a comment
      	echo $ccv->generateForm($_SERVER['SCRIPT_NAME'], '../../commentcava.php');
      ?>
    </div>
</body>
</html>