/*
* Use a relative or a full path if you prefer
* a full path will work better if you do some url rewriting
*/
var gurl = "http://localhost/commentcava/commentcava.php";
var button_to_comment = true;

$(function() {

	$.ajax({

	url: gurl,
	data: {
		a: 'g',
		url: document.URL.replace(window.location.hash, '')
	},
	type: "GET",
	dataType : "json",

	success: function( json ) {

		for (var i=0; i<json.length; i++) {
			if (i == 0) {
				$('#comments').html('<h4>' + json.length + ' comment(s)</h4><div class="comment" style="display:none"><div><span class="comment_user">'+ json[i].author + '</span><span class="comment_date">'+ json[i].date + '</span> - <span class="action_reply"><a href="#reply' + json[i].id + '">reply</a></span></div><div class="comment_message">'+ json[i].message + '</div></div>');
			}
			else {
				$('#comments').append('<div class="comment" style="display:none"><div><span class="comment_user">'+ json[i].author + '</span><span class="comment_date">'+ json[i].date + '</span> - <span class="action_reply"><a href="#reply' + json[i].id + '">reply</a></span></div><div class="comment_message">'+ json[i].message + '</div></div>');	
			}
		}
		if (json.length == 0) {
			$('#comments').html('<div class="comment">No comment</div>');
		}
	},

	error: function( xhr, status ) {
		$('#comments').html('<div class="comment">No comment</div>');
	},

	complete: function( xhr, status ) {
		if (button_to_comment == true) {
			$('#comments').append('<a id="comment_addcomment" class="comment_addcomment" style="display:none" href="javascript:toggle(\'comment_form\');toggle(\'comment_addcomment\')">Click here to leave a comment</a><form method="post" action="' + gurl + '?a=p" id="comment_form" class="comment_form" style="display:none"><input type="hidden" value="' + document.URL.replace(window.location.hash, '') + '" name="url"><div class="comment_inputuser">New comment from <input type="text" value="" placeholder="your nickname" size="20" name="name"></div><div class="comment_inputmessage"><textarea placeholder="Your comment?" value="" name="comment" cols="32" rows="2"></textarea></div><div class="comment_recaptcha"><input type="text" placeholder="Copy the code" name="captcha" class="captcha"><a title="Reload Image" href="javascript:reloadCaptcha()"><img id="captcha" alt="Enter code" src="' + gurl + '?a=c"></a></div><div class="comment_submit"><input type="submit" value="Send" name="submit"></div></form>');
		}
		else {
			$('#comments').append('<form method="post" action="' + gurl + '?a=p" id="comment_form" class="comment_form"><input type="hidden" name="url" value="' + document.URL.replace(window.location.hash, '') + '"/><div class="comment_inputuser">New comment from <input type="text" value="" placeholder="your nickname" size="20" name="name"></div><div class="comment_inputmessage"><textarea placeholder="Your comment?" value="" name="comment" cols="32" rows="2"></textarea></div><div class="comment_recaptcha"><input type="text" placeholder="Copy the code" name="captcha" class="captcha"><a title="Reload Image" href="javascript:reloadCaptcha()"><img id="captcha" alt="Enter code" src="' + gurl + '?a=c"></a></div><div class="comment_submit"><input type="submit" value="Send" name="submit"></div></form>');
		}
		
		$(".comment").each(function(i) {
			$(this).delay(200*i).fadeIn();
		});

		$(".comment_addcomment").each(function(i) {
			$(this).delay(1000*i).fadeIn();
		});
	}

	});
});

function toggle(theobj) {
	var obj = document.getElementById(theobj);

	if (obj.style.display == 'none') {
		obj.style.display = 'block';
	}
	else {
		obj.style.display = 'none';
	}
}

function reloadCaptcha() {
	
	var obj = document.getElementById('captcha');
	obj.src = gurl + '?a=c&rand=' + Math.random();
}
