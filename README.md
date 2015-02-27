commentcava
===========

what is commentcava?
-------------

commentçava is a comment system that can work in javascript for static websites (ie. Jekyll) or in full php without javascript. It is powered by a SQlite database and contains a captcha to avoid flood.
It should work with multiple domains (crossdomains) too, but i haven't tested it.

SQlite database
-------------
SQlite database is created automatically so you don't have to bother about it.
It contains 1 table "comments" which have the following fields: url, author, date, message
*URL is to be filled with the page URL
*Author is a free text
*Date is automatically filled with current datetime value
*Message is a free text

How to use it?
-------------
Look at the examples, they're quite easy to understand :)
Feel free to ask if you're stuck.

Styling
-------------
commentcava provides a default css, but if you don't like it, make another one :).

Why create commentcava?
-------------

I started it for a friend (Schoewilliam) back in 2011, then told me i could reuse it.
I created it so it is the simplest possible, sticks to 2 methods: 1) retrieve comments 2) post comments
For security i added a captcha on the form to post a comment.
I know some alternatives exists on the web, like jskomment, but i consider it is overkill to use it.

BONUS: what does commentcava means and how to pronounce?
-------------

the french «Comment ça va?» is the equivalent of the english «How are you?»
I found this fun when searching for a name containing "comment".

How to pronounce it?
Comment: /k?.m&atilde;/
ça     : /sa/
va     : /va/
