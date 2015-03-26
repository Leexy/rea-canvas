$(function () {					   		   
	$('a.poplight').on('click', function() {
		//show the pop up
		$('#popup_credit').fadeIn().css({ 'width': 544, 'height': 744});
		
		//get the margin to center the pop up
		var popMargTop = ($('#popup_credit').height() )/2;
		var popMargLeft = ($('#popup_credit').width() )/2;
		
		//Apply Margin to Popup
		$('#popup_credit').css({ 
			'margin-top' : -popMargTop+40,
			'margin-left' : -popMargLeft
		});
		
		//background opacity
		$('body').append('<div id="fade"></div>');
		$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
		
		return false;
	});
	
	//Close Popups and Fade Layer
	$('body').on('click', 'a.close, #fade', function() {
		$('#fade , .popup_block').fadeOut(function() {});
		return false;
	});

	/* hover on pop up button */
	$("#imgMail").hover(
	    function () { $(this).attr("src","img/credit/mail_icon_hover.png"); },
	    function () { $(this).attr("src","img/credit/mail_icon.png"); }
  	);
  	$("#imgTweet").hover(
	    function () { $(this).attr("src","img/credit/tweet_icon_hover.png"); },
	    function () { $(this).attr("src","img/credit/tweet_icon.png"); }
  	);
  	$("#imgFB").hover(
	    function () { $(this).attr("src","img/credit/fb_icon_hover.png"); },
	    function () { $(this).attr("src","img/credit/fb_icon.png"); }
  	);
  	$("#imgBackHome").hover(
	    function () { $(this).attr("src","img/credit/credit_btn_home_hover.png"); },
	    function () { $(this).attr("src","img/credit/credit_btn_home.png"); }
  	);	
});