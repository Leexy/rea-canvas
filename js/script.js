$(function () {

  var c=document.getElementById("cvs");
  var ctx=c.getContext("2d");
  c.width = document.body.clientWidth; //document.width is obsolete
  c.height = "600";//document.body.clientHeight; //document.height is obsolete
  // Image of the ball
  var imageObj = new Image();
  imageObj.src = 'img/monster2.png';
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

  $.ajax({
    type: 'post',
    url: 'afficheFlux.php',
    data: {Category:chosenCategory}
  }).done(function( result ) {
    //change the flow
    ctx.clearRect(0, 0, c.width, c.height);
    objects = JSON.parse(result);
    objects.forEach(function (object) {
      var metrics = ctx.measureText(object.title);
      object.width = metrics.width;
      object.x1 = Math.floor(Math.random() * c.width);
      object.x2 = object.x1 + object.width;
      object.y = Math.floor(Math.random() * c.height);
    });
    draw();
  });

  //Function that draws the ball 
  function draw()
  {
    // clear the canvas
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    //ctx.fillStyle = "rgb(0, 0, 0)";
    // this draws the ball
    ctx.beginPath();
    //ctx.arc(coords[0], coords[1], radius, 0, Math.PI*2, true); 
    ctx.drawImage(imageObj, coords[0], coords[1]); 
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    for (var i=0; i<objects.length; i++)
    {
      ctx.save();
      var o = objects[i];
      ctx.font="20px Arial";
      ctx.fillText(o.title,o.x1,o.y);
      //ctx.moveTo(o.x1,o.y);
      //ctx.lineTo(o.x2,o.y);
      ctx.stroke();
      ctx.restore();
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

// Moves the ball for the given timestep with the overall force given as 
// resolved_force (http://en.wikipedia.org/wiki/Verlet_integration#Velocity_Verlet)
function move(dt, resolved_force)
{  
  var coords_new = [coords[0] + velocity[0]*dt + 0.5*accel[0]*dt*dt,
            coords[1] + velocity[1]*dt + 0.5*accel[1]*dt*dt
            ];
  // f = ma          
  var accel_new = [ resolved_force[0]/(mass*dt), 
    resolved_force[1]/(mass*dt)];


  coords = coords_new;
  
  velocity = [velocity[0] + 0.5* (accel[0] + accel_new[0])*dt,
    velocity[1] + 0.5* (accel[1] + accel_new[1])*dt];
  
  accel = accel_new;
    
}

function sgn(x)
{
  return x < 0 ? -1 : 1;
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
        toDelete.push(object);
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
  do_collision_detection();
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


// UI handlers follow
// responds to mouse dragging
function startdragging(e)
{
  // mouse input uses layerX in Firefox/chrome and offsetX in Opera
  var x = e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX;
  var y = e.offsetY === undefined ? e.originalEvent.layerY : e.offsetY;

  if (e.which == 3)
  {
    throw_ = true;
    throw_coords = [x, y];
    throw_start = [x, y];
  }
  
  if (throw_)
    stop();
  
  return false;
}
$('#cvs').mousedown(startdragging);
$('#cvs').click(function(e) { return false });

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

// Releases the drag event
$('#cvs').mouseup( function (e) {
  
  if (!throw_)
    return;
  
  var x = e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX;
  var y = e.offsetY === undefined ? e.originalEvent.layerY : e.offsetY;

  var scale = 10;
  var throw_vector_x = (throw_start[0]-x)*scale;
  var throw_vector_y = (throw_start[1]-y)*scale;
  forces.push( [throw_vector_x, throw_vector_y, 0.10] );
  throw_ = false;
  drag = false;

  
  go();
  
  return false;                      
});

});
