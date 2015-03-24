$(function () {
  var SPACE_SIZE = 5;
  var CURSOR_IMAGE_WIDTH = 56;
  var CURSOR_IMAGE_HEIGHT = 64;
  //var OBJECTS_GAP = CURSOR_IMAGE_HEIGHT - 20;
  var collisionSound = document.getElementById('collisionSound');
  var c=document.getElementById("cvs");
  var ctx=c.getContext("2d");
  c.width = document.body.clientWidth-350;//document.body.clientWidth;
  c.height = 700;//document.body.clientHeight;
  var width = $('#cvs').width(); /// width of canvas 
  var height = $('#cvs').height(); // height of canvas
  var img = new Image();   // new object Image
  img.src = 'img/start.png'; // pass to source
  var imgX = (c.width/2)-65.5; // coord x of starting img
  var imgY = (c.height/2)-66.5;
  var cursorOn = false; // boolean for checking if the game is started
  var soundOn = true;
  var draggingBag = null;
  var objects;
  var flow;
  /* coord table for flow */
  var coordSet = [
    [ 
      { x: 500, y: 30 },
      { x: 500, y: 60 },
      { x: 50, y: 100 },
      { x: 50, y: 130 },
      { x: 600, y: 170 },
      { x: 600, y: 200 },
      { x: 150, y: 230 },
      { x: 150, y: 270 },
      { x: 300, y: 310 },
      { x: 300, y: 360 },
      { x: 360, y: 420 },
      { x: 360, y: 480 },
      { x: 420, y: 620 },
      { x: 420, y: 680 },
      { x: 10, y: 520 },
      { x: 10, y: 570 },
    ],
    [
      { x: 50, y: 520 },
      { x: 50, y: 570 },
      { x: 50, y: 100 },
      { x: 50, y: 130 },
      { x: 600, y: 170 },
      { x: 600, y: 200 },
      { x: 150, y: 230 },
      { x: 150, y: 270 },
      { x: 300, y: 310 },
      { x: 300, y: 360 },
      { x: 360, y: 420 },
      { x: 360, y: 480 },
      { x: 420, y: 620 },
      { x: 420, y: 680 },
      { x: 10, y: 30 },
      { x: 10, y: 70 },
    ],
    [
      { x: 50, y: 520 },
      { x: 50, y: 570 },
      { x: 50, y: 110 },
      { x: 50, y: 140 },
      { x: 600, y: 170 },
      { x: 600, y: 200 },
      { x: 150, y: 320 },
      { x: 150, y: 360 },
      { x: 300, y: 240 },
      { x: 300, y: 280 },
      { x: 360, y: 420 },
      { x: 360, y: 480 },
      { x: 420, y: 620 },
      { x: 420, y: 680 },
      { x: 10, y: 30 },
      { x: 10, y: 70 },
    ]
  ];
  /*
  coordSet.forEach(function (coords) {
    var y = 30;
    coords.forEach(function (position) {
      position.y = y;
      y += OBJECTS_GAP;
    });
  });*/

  /* font type table */
  var fontType = ['Bold','Italic', 'normal'];
  /* font size table */
  var fontSize = "";
  var fontWord =[];
  /* font table */
  var font = ['Times', 'Palatino', 'Gill Sans', 'Andale Mono', 'Courrier', 'Helvetica Narrow' ,'Impact', 'Arial', 'Lucida console'];
  /* font color table */
  var fontColor = ['#469991', '#78ccc4', '#3f6e8a', '#5ea4cc', '#384c78', '#bf5458' ,'#ff7075'];

  /* ajax request to get flow */
  $.ajax({
    type: 'post',
    url: 'getFlow.php',
    data: {Category:chosenCategory}
  }).done(function( result ) {
    flow = result;
    init(flow);
  });

  function init(result){
    ctx.clearRect(0, 0, width, height);
    objects = JSON.parse(result);
    var randomCoord = get_random_index(coordSet.length); 
    objects.forEach(function (object,i) {
      $( ".leftDiv" ).addClass(object.category);
      var randomFont = get_random_index(font.length); // random font for 1 flow
      object.x1 = coordSet[randomCoord][i].x; //random coord
      object.y = coordSet[randomCoord][i].y;
      var objectFontType = fontType[get_random_index(fontType.length)];
      var objectFontName = font[get_random_index(font.length)];
      var randomColor = fontColor[get_random_index(fontColor.length)];// random color for 1 flow
      if(i<=Math.round(objects.length/2)-1){
        fontSize = "0.6em";
        fontWord =['1em', '1.5em', '2em'];
       }
      else if(i<=Math.round(objects.length-3) && i >=Math.round(objects.length/2)){
        fontSize = "1.2em";
        fontWord =['1.5em', '1.8em', '2.5em'];
      }
      else{
        fontSize = "1.5em";
        fontWord =['1.8em', '2em', '2.5em'];
      } 
      /* get the flow word by word */
      var words = object.title.split(' ');
      var randomIndex;
      var specialGroupIndexes = [];
      if (words.length > 3) {
        randomIndex = get_random_index(words.length - 2);
        specialGroupIndexes.push(randomIndex, randomIndex+1, randomIndex+2);
      }
      object.words = words.map(function(word, index){
        var isInSpecialGroup = specialGroupIndexes.indexOf(index) !== -1;
        var wordFontSize = isInSpecialGroup ? fontWord[get_random_index(fontWord.length)] : fontSize;
        var wordFontType = isInSpecialGroup ? fontType[get_random_index(fontType.length)] : objectFontType;
        var wordFontName = isInSpecialGroup ? font[get_random_index(font.length)] : objectFontName;
        word = {
          text: isInSpecialGroup ? word.toUpperCase() : word,
          font: objectFontType + " " + wordFontSize + " " + wordFontName,
          fontColor: randomColor,
        };
        ctx.font = word.font;
        word.width = ctx.measureText(word.text).width;

        return word;
      });
      compute_object_width(object);
    });
    draw();
    ctx.drawImage(img, imgX, imgY);
    /* put opacity on canvas before the game start */
    ctx.globalAlpha=0.2;
    ctx.fillStyle="black"; 
    ctx.fillRect(0,0,width,height);
    /* delete opacity after the game started */
    ctx.globalAlpha=1; 
  }
  //Function that draws text 
  function draw()
  {
    // clear the canvas
    ctx.fillStyle="white";
    ctx.fillRect(0, 0, width, height);
    for (var i=0; i<objects.length; i++)
    {
      //ctx.save();      
      var o = objects[i];
      var currentX = o.x1;
      for(var j=0; j<o.words.length;j++){
        var word = o.words[j];
        ctx.font= word.font;
        ctx.fillStyle = word.fontColor;
        ctx.fillText(word.text,currentX,o.y);
        currentX += word.width + SPACE_SIZE;
      }
      /*ctx.moveTo(o.x1,o.y);
      ctx.lineTo(o.x2,o.y);
      ctx.stroke();
      ctx.restore();*/
    }
  }

function get_colliding_objects(mousePos){
  var hitZone = {
    left: mousePos.x,
    right: mousePos.x + CURSOR_IMAGE_WIDTH,
    top: mousePos.y,
    bottom: mousePos.y + CURSOR_IMAGE_HEIGHT,
  };
  return objects.filter(function (object) {
    return (
      hitZone.left <= object.x2 &&
      hitZone.right >= object.x1 &&
      hitZone.top <= object.y - 5 &&
      hitZone.bottom >= object.y - 5
    );
  });
}

function extract_random_word(words) {
  return words.splice(get_random_index(words.length), 1)[0];
}

function compute_object_width(object) {
  object.width = object.words.reduce(function (sum, word) { return sum + word.width; }, 0) + SPACE_SIZE * object.words.length;
  if(object.x1 < 0){
    object.x1 = 0;
  }
  else if (object.x1 + object.width >= c.width) {
    object.x1 = c.width - object.width;
  }
  object.x2 = object.x1 + object.width;
}

function get_random_index(length) {
  return Math.floor(Math.random() * length);
}

function random_insert(element, array) {
  array.splice(get_random_index(array.length), 0, element);
}

$("#capture").on("click", function(){
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
// Disable rightclick so that we can use the right button as input on the canvas
$('#cvs').bind("contextmenu", function(e) { return false });

function onUserAction(x,y){
  var needToDraw = false;
  if(cursorOn){ // if the game is not started no collision is possible
    var collidingObjects = get_colliding_objects({ x: x, y: y });
    if (collidingObjects.length >= 2) {
      var firstWord = extract_random_word(collidingObjects[0].words);
      var secondWord = extract_random_word(collidingObjects[1].words);
      random_insert(firstWord, collidingObjects[1].words);
      random_insert(secondWord, collidingObjects[0].words);
      compute_object_width(collidingObjects[0]);
      compute_object_width(collidingObjects[1]);
      needToDraw = true;
      if(soundOn){
        collisionSound.play();
      }
    }
    
    if(draggingBag){
      draggingBag.draggedObject.x1 = x + draggingBag.delta.x;
      draggingBag.draggedObject.y = y + draggingBag.delta.y;
      compute_object_width(draggingBag.draggedObject);
      needToDraw = true;
    }
  }
  else{ // if the mouse is on the start img the cursor change and the image disappears
    if(x <= imgX+100 && x >= imgX+60){
      if(y<= imgY+101&& y >= imgY){ 
        cursorOn=true;
        $( "#cvs" ).addClass("cursor");
        needToDraw = true;
      }
    }
  }
  if(needToDraw){
    draw();
  }
}

function onMouseClick(x,y){
  var clickedObject = get_colliding_objects({ x: x, y: y })[0];
  if (clickedObject) {
    draggingBag = {
      draggedObject: clickedObject,
      delta: {
        x : clickedObject.x1 - x,
        y : clickedObject.y - y,
      }
    };
  }
}
// called every time the mouse is moved
$('#cvs').mousemove( function (e) {
  var targetOffset = $(e.target).offset();
  var x = e.offsetX === undefined ? e.clientX-targetOffset.left : e.offsetX;
  var y = e.offsetY === undefined ? e.clientY-targetOffset.top : e.offsetY;
  onUserAction(x,y);

});
//called when mouse down
$( "#cvs" ).mousedown( function (e) {
  var targetOffset = $(e.target).offset();
  var x = e.offsetX === undefined ? e.clientX-targetOffset.left : e.offsetX;
  var y = e.offsetY === undefined ? e.clientY-targetOffset.top : e.offsetY;
  if( e.which == 1 ){
    onMouseClick(x,y);
  }
});

$("#cvs").mouseup( function (e) {
  draggingBag = null;
});

// add on touchmove on tablette
$(window).bind('touchmove', function(jQueryEvent) {
  jQueryEvent.preventDefault();
  var event = window.event;
  var x= event.touches[0].pageX; 
  var y= event.touches[0].pageY;
  onUserAction(x,y);
});
$(window).bind('touchstart', function(jQueryEvent) {
  jQueryEvent.preventDefault();
  var event = window.event;
  var targetOffset = $(event.target).offset();
  var x= event.touches[0].pageX-targetOffset.left; 
  var y= event.touches[0].pageY-targetOffset.top;
  onUserAction(x,y);
});
  /* hover games icon */
  $("#imgHome").hover(
    function () { $(this).attr("src","img/home_hover.png"); },
    function () { $(this).attr("src","img/home.png"); }
  );
  $("#imgRepeat").hover(
    function () { $(this).attr("src","img/rejouer_hover.png"); },
    function () { $(this).attr("src","img/rejouer.png"); }
  );
  $("#imgSound").hover(
    function () { $(this).attr("src","img/son_on_hover.png"); },
    function () { $(this).attr("src","img/son_on.png"); }
  );
  $("#imgPause").hover(
    function () { $(this).attr("src","img/pause_hover.png"); },
    function () { $(this).attr("src","img/pause.png"); }
  );
  $("#capture").hover(
    function () { $(this).attr("src","img/capture_hover.png"); },
    function () { $(this).attr("src","img/capture.png"); }
  );
  $("#imgInstruction").hover(
    function () { $(this).attr("src","img/instruction_hover.png"); },
    function () { $(this).attr("src","img/instruction.png"); }
  );
  /* check & change sound status */
  $( "#imgSound" ).click(function() {
    if(soundOn){
      $("#imgSound").attr("src","img/son_off.png");
      $("#imgSound").hover(
        function () { $(this).attr("src","img/son_off_hover.png"); },
        function () { $(this).attr("src","img/son_off.png"); }
      );
      soundOn = false;
    }else{
      $("#imgSound").attr("src","img/son_on.png");
      $("#imgSound").hover(
        function () { $(this).attr("src","img/son_on_hover.png"); },
        function () { $(this).attr("src","img/son_on.png"); }
      );
      soundOn = true;
    } 
  });
  /* pop up instruction */
  function showPopUp() {
    //show the pop up
    $('#popup_instruction').fadeIn().css({ 'width': 610, 'height': 744});
    
    //get the margin to center the pop up
    var popMargTop = ($('#popup_instruction').height() )/2;
    var popMargLeft = ($('#popup_instruction').width() )/2;
    
    //Apply Margin to Popup
    $('#popup_instruction').css({ 
      'margin-top' : -popMargTop,
      'margin-left' : -popMargLeft
    });
    
    //background opacity
    $('#game').append('<div id="fade"></div>');
    $('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
    
    return false;
  }
  $('a.popInstruction').on('click',showPopUp);  
  
  //Close Popups and Fade Layer
  $('body').on('click', 'a.close, #fade', function() {
    $('#fade , .popup_block').fadeOut(function() {});
    return false;
  });
  if(!sessionStorage.hasSeenInstructions){
    showPopUp();
    sessionStorage.hasSeenInstructions = true;
  }

  $("#imgPlay").hover(
    function () { $(this).attr("src","img/instruction/instructions_btn_play_hover.png"); },
    function () { $(this).attr("src","img/instruction/instructions_btn_play.png"); }
  );
  $("#imgRepeat").on('click', function(){
    cursorOn=false;
    $( "#cvs" ).removeClass("cursor");
    init(flow);
  });
});