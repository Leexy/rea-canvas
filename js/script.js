$(function () {
  var SPACE_SIZE = 5;
  var CURSOR_IMAGE_WIDTH = 56;
  var CURSOR_IMAGE_HEIGHT = 64;
  var c=document.getElementById("cvs");
  var ctx=c.getContext("2d");
  c.width = 1024;//document.body.clientWidth; //document.width is obsolete
  c.height = 700;//document.body.clientHeight; //document.height is obsolete
  var width = $('#cvs').width(); /// width of canvas 
  var height = $('#cvs').height(); // height of canvas

  var objects;
  /* tableau de coordonnee pour le positionnement des flux */
  var coordSet = [
    [ 
      { x: 10,  y: 205 },
      { x: 10,  y: 525 },
      { x: 360, y: 135 },
      { x: 360, y: 270 },
      { x: 360, y: 480 },
      { x: 360, y: 605 },
      { x: 720, y: 80  },
      { x: 720, y: 325 },
      { x: 720, y: 395 },
      { x: 720, y: 680 },
    ],
    [
      { x: 10,  y: 80 },
      { x: 10,  y: 680 },
      { x: 380, y: 175 },
      { x: 380, y: 525 },
      { x: 420, y: 132 },
      { x: 420, y: 605 },
      { x: 620, y: 50  },
      { x: 620, y: 325 },
      { x: 720, y: 405 },
      { x: 720, y: 640 },
    ]
  ];
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
    var randomCoord = Math.floor(Math.random() * coordSet.length);
    objects.forEach(function (object,i) {
      $('#game').css("background-image", "url(img/"+object.category+".png)"); 
      object.x1 = coordSet[randomCoord][i].x;//Math.floor((Math.random() * width));
      object.y = coordSet[randomCoord][i].y;//Math.floor(Math.random() * height);
      var isUpperCase = false;
      var randomColor = Math.floor(Math.random() * fontColor.length);
      object.words = object.title.split(' ').map(function(word){
        if (!isUpperCase) {
          isUpperCase = Math.random() < 0.2;
        }
        var randomFontType = Math.floor(Math.random() * fontType.length);
        var randomFontSize = Math.floor(Math.random() * fontSize.length);
        var randomFont = Math.floor(Math.random() * font.length);     
        word = {
          text: isUpperCase ? word.toUpperCase() : word,
          font: fontType[randomFontType]+" "+fontSize[randomFontSize]+" "+font[randomFont],
          fontColor: fontColor[randomColor],
        };
        ctx.font = word.font;
        word.width = ctx.measureText(word.text).width;

        return word;
      });
      object.width = object.words.reduce(function (sum, word) { return sum + word.width; }, 0) + SPACE_SIZE * object.words.length;
      if (object.x1 + object.width >= c.width) {
        object.x1 = c.width - object.width;
      }
      object.x2 = object.x1 + object.width;
    });
    draw();
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
      hitZone.top <= object.y &&
      hitZone.bottom >= object.y
    );
  });
}

// Disable rightclick so that we can use the right button as input on the canvas
$('#cvs').bind("contextmenu", function(e) { return false });

// called every time the mouse is moved, deals with dragging of the ball and throw vectors
$('#cvs').mousemove( function (e) {
  var x = e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX;
  var y = e.offsetY === undefined ? e.originalEvent.layerY : e.offsetY;
  var collidingObjects = get_colliding_objects({ x: x, y: y });
  if (collidingObjects.length >= 2) {
    console.log('I must do something!');
    draw();
  }
  return false;  
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
});
