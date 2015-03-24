<?php
if(!isset($_GET['categorie'])){
  header("location:index.php");
  exit();
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>News Break : <?php echo json_encode($_GET['categorie']) ?></title>
  <link rel="stylesheet" href="css/style.css" type="text/css" />
</head>

<body id="game">
  <div id="popup_instruction" class="popup_block">
    <a href="#" id="play" class="close" ><img id="imgPlay" src="img/instruction/instructions_btn_play.png"/></a>
  </div>
  <div class="content">
    <div class="leftDiv">
      <canvas id="cvs"></canvas>
    </div>

    <div class="rigthDiv">
      <a href="#" id="showInstruction" class="popInstruction"><img class="icone" id="imgInstruction" src="img/instruction.png"/></a><br/>
      <img class="icone" id="capture" src="img/capture.png"/><br/>
      <a href="index.php"><img class="icone" id="imgHome" src="img/home.png"/></a><br/>
      <img class="icone" id="imgRepeat" src="img/rejouer.png"/><br/>
      <img class="icone" id="imgSound" src="img/son_on.png"/><br/>
      <span class="copyright">&copy; 2015<br/> Audrey Mothu,<br/> Agathe Grunberg</span>
    </div>
  </div>
<audio id="collisionSound" style="display:none" controls="controls">
  <source src="sound/perso.mp3" type="audio/mp3">
</audio>
<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript">
window.chosenCategory = <?php echo json_encode($_GET['categorie']) ?>;
</script>
<script type="text/javascript" src="js/script.js"></script>

</body>

</html>