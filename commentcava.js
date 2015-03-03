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
        if (comments[i].website != '')
        {
          spanuser = '<a href="' + comments[i].website + '">' + comments[i].author + '</a>';
        }
        else
        {
          spanuser = comments[i].author;
        }
        $('#comments').append('<div id="comment-' + comments[i].id + '" class="comment level' + comments[i].level + '" ' + style + '>\
          <div>\
          <span class="user">'+ spanuser + '</span> - \
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
    localUser = '';
    localWebsite = '';
    if (localStorage.user) {localUser = localStorage.user}
    if (localStorage.website) {localWebsite = localStorage.website}

    if (button_to_comment == true)
    {
      $('#comments').append('<div class="addcomment"><a id="addcomment" href="#form" onclick="javascript:cancelreply();show(\'comment_form\');hide(\'addcomment\')">Click here to leave a comment</a></div>\
      <a name="form"></a><form onsubmit="saveLocalData()" method="post" action="' + gurl + '?a=p" id="comment_form" class="comment_form" style="display:none">\
        <input type="hidden" value="" id="replyto" name="replyto">\
        <input type="hidden" value="' + window.location.href.split('#')[0] + '" name="url">\
        <textarea placeholder="Message" value="" name="comment"></textarea>\
        <input type="text" id="comment_user" value="' + localUser + '" class="name" placeholder="Name (optional)" name="name">\
        <input type="text" id="comment_website" value="' + localWebsite + '" class="website" placeholder="Website (optional)" name="website">\
        <div class="groupcode">\
        <input type="text" placeholder="Copy the code" name="captcha" class="captcha">\
        <a title="Reload Image" href="javascript:reloadCaptcha()"><img class="captchaimg" id="captcha" alt="Enter code" src="' + gurl + '?a=c"></a>\
        <input type="button" value="Cancel" onclick="javascript:cancelreply();hide(\'comment_form\');show(\'addcomment\')">\
        <input type="submit" value="Send" name="submit">\
        </div>\
      </form>');
    }
    else
    {
      $('#comments').append('<a name="form"></a><form onsubmit="saveLocalData()" method="post" action="' + gurl + '?a=p" id="comment_form" class="comment_form">\
        <input type="hidden" value="" id="replyto" name="replyto">\
        <input type="hidden" name="url" value="' + window.location.href.split('#')[0] + '"/>\
        <textarea placeholder="Message" value="" name="comment"></textarea>\
        <input type="text" id="comment_user" value="' + localUser + '" class="name" placeholder="Name (optional)" name="name">\
        <input type="text" id="comment_website" value="' + localWebsite + '" class="website" placeholder="Website (optional)" name="website">\
        <div class="groupcode">\
        <input type="text" placeholder="Copy the code" name="captcha" class="captcha">\
        <a title="Reload Image" href="javascript:reloadCaptcha()"><img class="captchaimg" id="captcha" alt="Enter code" src="' + gurl + '?a=c"></a>\
        <input type="button" value="Cancel" onclick="javascript:cancelreply();">\
        <input type="submit" value="Send" name="submit">\
        </div>\
      </form>');
    }

    $('#comments').append('<span class="powered"><a href="https://github.com/fabienwang/commentcava">commentcava v2.0</a></span>');

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

function saveLocalData()
{
  localStorage.user = document.getElementById("comment_user").value;
  localStorage.website = document.getElementById("comment_website").value;
}

function cancelreply()
{
  var obj = document.getElementById('replyto');
  obj.value = '';
  jQuery(".highlighted").removeClass("highlighted");
}

function replyto(theid)
{
  var obj = document.getElementById('replyto');
  obj.value = theid;

  jQuery(".highlighted").removeClass("highlighted");

  var obj = document.getElementById('comment-' + theid);
  obj.classList.add("highlighted");
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
