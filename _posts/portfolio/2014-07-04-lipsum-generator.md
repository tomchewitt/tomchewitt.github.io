---
layout: post
title: Lipsum Generator
tags: [portfolio, design, develop]
square: '/asset/img/work/lipsum/hero.jpg'
background: '/asset/img/work/lipsum/hero.jpg'
uid: 'lipsum'
---

<p class="headline">There are lots of Lipsum generators out there on the internet. Most text editors (well, Sublime at least) have built in shortcuts for them, but I still found myself getting frustrated on occasion to generate the text I wanted quickly when I was using apps that didn’t have such shortcuts. Enter the homemade, wonderfully named: Lipsum Generator.</p>

<p>Using vanilla javascript, I wanted to create a good looking, online generator that would allow bookmarking for the user's preferred and most used choice of lorem text. I do this by using html5’s pushstate API to change the query of the URL whenever the user changes the outputted text. This is then bookmark-able so the user can come back to that configuration at the click of a button. The text is preselected by default so just needs the user to copy and paste. There are 4 variables the user can manipulate:</p>

<p class="lipsum-code"><span>/?paras=1</span> <span>&amp;words=69</span> <span>&amp;tags=1</span> <span>&amp;hodor=1</span></p>

<p>The tags option will add 'p' tags wrapping each paragraph... and the hodor tag is there just for funsies.</p>

<div class="post-link">
	<a href="https://tomchewitt.github.io/lipsum-generator" target="_blank"><span>Go check it out!</span></a>
</div>


<section class="post-media">
	<ul>
		<li class="curved"><img src="/asset/img/work/lipsum/01.jpg"></li>
	</ul>				
</section>

<section class="block palette three-colors">
	<ul>
		<li class="color-1"></li>
		<li class="color-2"></li>
		<li class="color-3"></li>
	</ul>
</section>
