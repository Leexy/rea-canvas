$(function () {
  var SPACE_SIZE = 5;
  var c=document.getElementById("cvs");
  var ctx=c.getContext("2d");
  c.width = 1024;//document.body.clientWidth; //document.width is obsolete
  c.height = 700;//document.body.clientHeight; //document.height is obsolete
  // Simulation variables
  var timestep = 0.005;
  // Absolute time at last timestep
  var t0 = 0;
  var timer = null; // setInterval return handle.
  var width = $('#cvs').width(); /// width of canvas 
  var height = $('#cvs').height(); // height of canvas
  var frame_counter = [0, 0]; // seconds, frames

  // Physical variables

  // position, velocity and acceleration vectors
  var coords = [0, 0];
  var last_coords = [0, 0];
  var velocity = [0, 0];
  var accel = [0, 0];

  // Damping due to impacts
  var bounce_factor = 0.8;

  var mass = 10;
  var gravity = 10;
  var radius = 65; // 100 = height of the image, if we draw an arc its the radius of the arc
  var diameter = radius*2;

  // Forces acting on the ball as array of:
  // [x, y, time]  if time==false, the force is always present.
  // time is a 'time to live', in seconds.
  var forces = [
    [0, gravity*mass, false],  
  ];

  // set initial position
  coords = [20, 300];  

  // User response related things
  var throw_ = false;
  // throw/kick vector
  var throw_coords = [0, 0];
  var throw_start = [0, 0];

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
    //ctx.fillStyle = "rgb(0, 0, 0)";
    // this draws the ball
    ctx.beginPath();
    //ctx.arc(coords[0], coords[1], radius, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();

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
    // draw the throw/force vector
    if (throw_)
    {
      ctx.save();
      ctx.moveTo(throw_start[0], throw_start[1]);
      ctx.lineTo(throw_coords[0], throw_coords[1]); 
      ctx.stroke();
      ctx.restore();
    }
  }

// very simple collision detection and response for rebounding off the walls
// and applying some damping according to bounce_factor
function do_collision_detection()
{
  if (coords[0] <= 0)
  {
    coords[0] = 0;
    velocity[0] *= -bounce_factor;
    velocity[1] *= bounce_factor;
  }
  
  if (coords[0] >= width-diameter)
  {
    coords[0] = width-diameter;
    velocity[0] *= -bounce_factor;
    velocity[1] *= bounce_factor;
  }
  if (coords[1] <= 0)
  {    
    coords[1] = 0;
    velocity[0] *= bounce_factor;
    velocity[1] *= -bounce_factor;
  }
  if (coords[1] > height-diameter)
  {
    coords[1] = height-diameter;  
    velocity[0] *= bounce_factor;
    velocity[1]*=-bounce_factor;
  }

  var toDelete = [];
  var ball = {
    x: coords[0],
    y: coords[1],
  };
  ball.left = ball.x;
  ball.right = ball.x + diameter;
  ball.top = ball.y;
  ball.bottom = ball.y + diameter;
  objects.forEach(function (object) {
    if (ball.right >= object.x1 && ball.left <= object.x2) {
      if (ball.top <= object.y && ball.bottom >= object.y) {
        coords[1] = (velocity[1] > 0) ? object.y-diameter : object.y;
        velocity[0] *= bounce_factor;
        velocity[1] *= -bounce_factor;
        //toDelete.push(object);
      }
    }
  });

  toDelete.forEach(function (object) {
    var objectPos = objects.indexOf(object);
    if (objectPos !== -1) {
      objects.splice(objectPos, 1);
    }
  });
}

// evaluates the forces array, removes any 'dead' forces, and
// returns the resolved force for this timestep.
function do_forces(dt)
{
  var resolved = [0,0];
  var new_forces = [];
  for (var i=0; i<forces.length; i++)
  {
    var f = forces[i];

    if (f[2] !== false)
      f[2] -= dt;

    resolved[0] += f[0];
    resolved[1] += f[1];
    if (f[2] < 0)
      continue;    
    new_forces.push(f);
  }
  forces = new_forces;
  return resolved;
}

// Main loop
function main()
{
  // calculate time elpased since last run
  var t1 = new Date().getTime();
  var dt = t1-t0;  
  dt /= 1000.0;
  if (dt < timestep)
    dt = timestep;
  
  frame_counter[0] += dt;
  frame_counter[1]++;
  
  if (frame_counter[0] > 1.0)
  {
    frame_counter[0] = 0;
    $('#fps').html(frame_counter[1] + " frames per second");
    frame_counter[1] = 0;
  }
  
  t0 = t1;
  
  resolved_force = do_forces(dt);
  move(dt, resolved_force);
  //do_collision_detection();
  last_coords[0] = coords[0];
  last_coords[1] = coords[1];

  draw();
  
}

// initiates the main loop
function go()
{

  t0 = new Date().getTime();
  timer = setInterval(main, timestep*1000);
}

function stop()
{
  clearInterval(timer);
  timer = null;
  accel = [0, 0];
  velocity = [0, 0];
}

// Disable rightclick so that we can use the right button as input on the canvas
$('#cvs').bind("contextmenu", function(e) { return false });

// called every time the mouse is moved, deals with dragging of the ball and throw vectors
$('#cvs').mousemove( function (e) {
  var x = e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX;
  var y = e.offsetY === undefined ? e.originalEvent.layerY : e.offsetY;
  if (!throw_)
    return;
  
  throw_coords = [x, y];
  
  draw();
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
