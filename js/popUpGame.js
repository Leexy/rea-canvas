$(function () { 
	var c=document.getElementById("cvs");
  	var captureSound = document.getElementById('captureSound');
	/*** POP UP CODE ***/
	/* pop up instruction */
	function showPopUp() {
	//show the pop up
	$('#popup_instruction').fadeIn().css({ 'width': 610, 'height': 755});

	//get the margin to center the pop up
	var popMargTop = ($('#popup_instruction').height() )/2;
	var popMargLeft = ($('#popup_instruction').width() )/2;

	//Apply Margin to Popup
	$('#popup_instruction').css({ 
	  'margin-top' : -popMargTop +40,
	  'margin-left' : -popMargLeft
	});

	//background opacity
	$('#game').append('<div id="fade"></div>');
	$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();

	return false;
	}
	$('a.popInstruction').on('click',showPopUp);  

	$("#imgPlay").hover(
		function () { $(this).attr("src","img/instruction/instructions_btn_play_hover.png"); },
		function () { $(this).attr("src","img/instruction/instructions_btn_play.png"); }
	);

	/* pop up capture */
	var imgObj = new Image();
	function showPopUpCapture() {
		captureSound.play();
		//show the pop up
		$('#popup_capture').fadeIn().css({ 'width': 818, 'height': 599});

		//get the margin to center the pop up
		var popMargTop = ($('#popup_capture').height() )/2;
		var popMargLeft = ($('#popup_capture').width() )/2;

		//Apply Margin to Popup
		$('#popup_capture').css({ 
		  'margin-top' : -popMargTop,
		  'margin-left' : -popMargLeft
		});

		//background opacity
		$('#game').append('<div id="fade"></div>');
		$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();

		imgObj.src = c.toDataURL("image/png");
		imgObj.width=600;
		imgObj.height=350;
		$('#popup_capture').append(imgObj);
		imgObj.style.position = "absolute";
		imgObj.style.margin = "150px 0px 0px 110px";
		imgObj.style.borderRadius = '7px'; // standard
		imgObj.style.MozBorderRadius = '7px'; // Mozilla
		imgObj.style.WebkitBorderRadius = '7px'; // WebKit
		return false;
	} 
	$('a.popCapture').on('click',showPopUpCapture);  

	$("#cvsDL").hover(
		function () { $(this).attr("src","img/capture/download_hover.png"); },
		function () { $(this).attr("src","img/capture/download.png"); }
	);
	$("#cvsBack").hover(
		function () { $(this).attr("src","img/capture/retour_hover.png"); },
		function () { $(this).attr("src","img/capture/retour.png"); }
	);
	//Close Popups and Fade Layer
	$('body').on('click', 'a.close, #fade', function() {
		$('#fade , .popup_block').fadeOut(function() {});
		$('#fade , .popup_cap').fadeOut(function() {});
		return false;
	});
	/* check if the pop up instruction has been already see */
	if(!sessionStorage.hasSeenInstructions){
		showPopUp();
		sessionStorage.hasSeenInstructions = true;
	}
	/* download the img */
	$("#cvsDL").on("click", function(){
	  var link = document.createElement('a');
	  if (typeof link.download != "undefined") {
	    link.href = c.toDataURL("image/png").replace("image/png", "image/octet-stream");
	    link.download = "newsBreak.png";
	    document.body.appendChild(link);
	    link.click();
	    document.body.removeChild(link);
	  }else{
	    window.open(c.toDataURL(),"Capture");
	  }
	});

});