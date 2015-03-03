/*
* Use a relative or a full path if you prefer
* a full path will work better if you do some url rewriting
*/
var gurl = "/commentcava/commentcava.php";

/*
* Set to false to disable loading comments animation
*/
var use_animation = false;

/*
* User has to click a link to display the form
*/
var button_to_comment = true;














/*
* DO NOT CHANGE THE CODE BELOW, USE CONFIG VARIABLES ABOVE
*/

function replyto(theid)
{
  var obj = document.getElementById('replyto');
  if (theid == -1) {
    obj.value = '';
  }
  else {
    obj.value = theid;
  }
}

function toggle(theobj)
{
  var obj = document.getElementById(theobj);

  if (obj.style.display == 'none') {
    obj.style.display = 'block';
  }
  else {
    obj.style.display = 'none';
  }
}

function show(theobj)
{
  var obj = document.getElementById(theobj);
  obj.style.display = 'block';
}

function hide(theobj)
{
  var obj = document.getElementById(theobj);
  obj.style.display = 'none';
}

function reloadCaptcha()
{
  var obj = document.getElementById('captcha');
  obj.src = gurl + '?a=c&rand=' + Math.random();
}


$(function()
{

  $.ajax({

  url: gurl,
  data: {
    a: 'g',
    url: window.location.href.split('#')[0]
  },
  type: "GET",
  dataType : "json",

  success: function( json )
  {

    var comments = json

    nbtotal = comments.length

    if (comments.length == 0)
    {
      $('#comments').html('<div class="comment">No comment</div>');
    }
    else
    {
      $('#comments').html('<h4 class="title">' + comments.length + ' comment(s)</h4>');
  
      if (use_animation === true)
      {
        style= 'style="display:none"';
      }
      else
      {
        style= '';
      }
      for (var i=0; i<comments.length; i++)
      {
        $('#comments').append('<div class="comment level' + comments[i].level + '" ' + style + '>\
          <div>\
          <span class="user">'+ comments[i].author + '</span> - \
          <time class="timeago" datetime="'+ comments[i].date + '">'+ comments[i].date + '</time> - \
          <span class="reply"><a href="#form" onclick="replyto(' + comments[i].id + ');show(\'comment_form\');hide(\'addcomment\');">reply</a></span>\
          </div>\
          <div class="message">'+ comments[i].message + '</div>\
        </div>');
      }
    }

  },

  error: function( xhr, status )
  {
    $('#comments').html('<div class="comment">No comment</div>');
  },

  complete: function( xhr, status )
  {
    if (button_to_comment == true)
    {
      $('#comments').append('<div class="addcomment"><a id="addcomment" href="javascript:replyto(-1);show(\'comment_form\');hide(\'addcomment\')">Click here to leave a comment</a></div>\
      <a name="form"></a><form method="post" action="' + gurl + '?a=p" id="comment_form" class="comment_form" style="display:none">\
        <input type="hidden" value="" id="replyto" name="replyto">\
        <input type="hidden" value="' + window.location.href.split('#')[0] + '" name="url">\
        <input type="text" value="" placeholder="your nickname" size="20" name="name">\
        <textarea placeholder="Your comment?" value="" name="comment" cols="32" rows="2"></textarea>\
        <div class="comment_recaptcha">\
        <input type="text" placeholder="Copy the code" name="captcha" class="captcha">\
        <a title="Reload Image" href="javascript:reloadCaptcha()"><img id="captcha" alt="Enter code" src="' + gurl + '?a=c"></a>\
        </div>\
        <div class="comment_submit">\
        <input type="button" value="Cancel" onclick="hide(\'comment_form\');show(\'addcomment\')">\
        <input type="submit" value="Send" name="submit">\
        </div>\
      </form>');
    }
    else
    {
      $('#comments').append('<a name="form"></a><form method="post" action="' + gurl + '?a=p" id="comment_form" class="comment_form">\
        <input type="hidden" value="" id="replyto" name="replyto">\
        <input type="hidden" name="url" value="' + window.location.href.split('#')[0] + '"/>\
        <input type="text" value="" placeholder="your nickname" size="20" name="name">\
        <textarea placeholder="Your comment?" value="" name="comment" cols="32" rows="2"></textarea>\
        <div class="comment_recaptcha">\
          <input type="text" placeholder="Copy the code" name="captcha" class="captcha"><a title="Reload Image" href="javascript:reloadCaptcha()"><img id="captcha" alt="Enter code" src="' + gurl + '?a=c"></a>\
        </div>\
        <div class="comment_submit">\
          <input type="submit" value="Send" name="submit">\
        </div>\
      </form>');
    }

    if (use_animation === true)
    {
      
      $(".comment").each(function(i)
      {
        $(this).delay(200*i).fadeIn();
      });
     
    }
        
    //Use Timeago lib if used to display relative time.
    if (typeof($.timeago) == "function")
    {
      jQuery("time.timeago").timeago();
    }
    
  }

  });
});
