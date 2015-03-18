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
  <title>Flux</title>
  <link rel="stylesheet" href="css/style.css" type="text/css" />
</head>

<body id="game">
  <div class="content">
    <div class="leftDiv">
      <canvas id="cvs"></canvas>
    </div>

    <div class="rigthDiv">
      <img class="icone" id="capture" src="img/capture.png"/><br/>
      <a href="index.php"><img class="icone" id="imgHome" src="img/home.png"/></a><br/>
      <a href=""><img class="icone" id="imgRepeat" src="img/rejouer.png"/></a><br/>
      <img class="icone" id="imgSoundOff" src="img/son_off.png"/><br/>
      <span class="copyright">&copy; 2015<br/> Audrey Mothu,<br/> Agathe Grunberg</span>
    </div>
  </div>
<audio style="display:none" controls="controls">
  Votre navigateur ne supporte pas lélément <code>audio</code> element.
  <source src="sound/perso.wav" type="audio/wav">
</audio>
<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript">
window.chosenCategory = <?php echo json_encode($_GET['categorie']) ?>;
</script>
<script type="text/javascript" src="js/script.js"></script>

</body>

</html>