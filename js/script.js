$(function () {
  var SPACE_SIZE = 5;
  var CURSOR_IMAGE_WIDTH = 56;
  var CURSOR_IMAGE_HEIGHT = 64;
  var OBJECTS_GAP = CURSOR_IMAGE_HEIGHT - 10;
  var c=document.getElementById("cvs");
  var ctx=c.getContext("2d");
  c.width = document.body.clientWidth-350;//1024;//document.body.clientWidth; //document.width is obsolete
  c.height = 700;//document.body.clientHeight; //document.height is obsolete
  var width = $('#cvs').width(); /// width of canvas 
  var height = $('#cvs').height(); // height of canvas
  var img = new Image();   // Crée un nouvel objet Image
  img.src = 'img/start.png'; // Définit le chemin vers sa source
  var imgX = (c.width/2)-65.5;
  var imgY = (c.height/2)-66.5;
  var cursorOn = false;
  var objects;
  /* tableau de coordonnee pour le positionnement des flux */
  var coordSet = [
    [ 
      { x: 10 },
      { x: 10 },
      { x: 360 },
      { x: 360 },
      { x: 360 },
      { x: 360 },
      { x: 720 },
      { x: 720 },
      { x: 720 },
      { x: 720 },
    ],
    [
      { x: 10 },
      { x: 10 },
      { x: 380 },
      { x: 380 },
      { x: 420 },
      { x: 420 },
      { x: 620 },
      { x: 620 },
      { x: 720 },
      { x: 720 },
    ]
  ];
  coordSet.forEach(function (coords) {
    var y = 80;
    coords.forEach(function (position) {
      position.y = y;
      y += OBJECTS_GAP;
    });
  });

  /* tableau de type de police */
  var fontType = ['Bold','Italic', 'normal'];
  /* tableau taille de police*/
  var fontSize = ['0.8em', '1em', '1.2em', '1.4em', '1.5em', '1.8em'];
  /* tableau de police */
  var font = ['Times', 'Palatino', 'Gill Sans', 'Andale Mono', 'Courrier', 'Helvetica Narrow' ,'Impact', 'Arial', 'Lucida console'];
  /* tableau de couleur */
  var fontColor = ['#469991', '#78ccc4', '#3f6e8a', '#5ea4cc', '#384c78', '#bf5458' ,'#ff7075'];

  /* requete ajax pour recuperer les flux*/
  $.ajax({
    type: 'post',
    url: 'afficheFlux.php',
    data: {Category:chosenCategory}
  }).done(function( result ) {
    //change the flow
    ctx.clearRect(0, 0, width, height);
    objects = JSON.parse(result);
    var randomCoord = get_random_index(coordSet.length);
    objects.forEach(function (object,i) {
      $( ".leftDiv" ).addClass(object.category);
      object.x1 = coordSet[randomCoord][i].x;
      object.y = coordSet[randomCoord][i].y;
      var isUpperCase = false;
      var randomColor = get_random_index(fontColor.length);
      object.words = object.title.split(' ').map(function(word){
        if (!isUpperCase) {
          isUpperCase = Math.random() < 0.2;
        }
        var randomFontType = get_random_index(fontType.length);
        var randomFontSize = get_random_index(fontSize.length);
        var randomFont = get_random_index(font.length);     
        word = {
          text: isUpperCase ? word.toUpperCase() : word,
          font: fontType[randomFontType]+" "+fontSize[randomFontSize]+" "+font[randomFont],
          fontColor: fontColor[randomColor],
        };
        ctx.font = word.font;
        word.width = ctx.measureText(word.text).width;

        return word;
      });
      compute_object_width(object);
    });
    draw();
    ctx.drawImage(img, imgX, imgY);
  });

  //Function that draws the ball 
  function draw()
  {
    // clear the canvas
    ctx.clearRect(0, 0, width, height);
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
  if (object.x1 + object.width >= c.width) {
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
  //$("#captureImg").attr("src",c.toDataURL());
  window.open(c.toDataURL(),"Capture");
});
// Disable rightclick so that we can use the right button as input on the canvas
$('#cvs').bind("contextmenu", function(e) { return false });

// called every time the mouse is moved
$('#cvs').mousemove( function (e) {
  var targetOffset = $(e.target).offset();
  var x = e.offsetX === undefined ? e.clientX-targetOffset.left : e.offsetX;
  var y = e.offsetY === undefined ? e.clientY-targetOffset.top : e.offsetY;
  if(cursorOn){
    var collidingObjects = get_colliding_objects({ x: x, y: y });
    if (collidingObjects.length >= 2) {
      var firstWord = extract_random_word(collidingObjects[0].words);
      var secondWord = extract_random_word(collidingObjects[1].words);
      random_insert(firstWord, collidingObjects[1].words);
      random_insert(secondWord, collidingObjects[0].words);
      compute_object_width(collidingObjects[0]);
      compute_object_width(collidingObjects[1]);
      draw();
    }
    return false;   
  }
  else{
    if(x <= imgX+100 && x >= imgX+60){
      if(y<= imgY+101&& y >= imgY){ 
        cursorOn=true;
        $( "#cvs" ).addClass("cursor");
        draw();
      }
    }
  }
});

  /* hover des icones de jeu*/
  $("#imgHome").hover(
  function () {
      $(this).attr("src","img/home_hover.png");
  },
  function () {
      $(this).attr("src","img/home.png");
  });
  $("#imgRepeat").hover(
  function () {
      $(this).attr("src","img/rejouer_hover.png");
  },
  function () {
      $(this).attr("src","img/rejouer.png");
  });
  $("#imgSoundOff").hover(
  function () {
      $(this).attr("src","img/son_off_hover.png");
  },
  function () {
      $(this).attr("src","img/son_off.png");
  });
  $("#imgPause").hover(
  function () {
      $(this).attr("src","img/pause_hover.png");
  },
  function () {
      $(this).attr("src","img/pause.png");
  });
  $("#capture").hover(
  function () {
      $(this).attr("src","img/capture_hover.png");
  },
  function () {
      $(this).attr("src","img/capture.png");
  });

});