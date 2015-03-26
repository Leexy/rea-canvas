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
  <title>News Break : <?php echo htmlspecialchars($_GET['categorie']) ?></title>

  <meta name="Content-Language" content="fr">
  <meta name="Description" content="News Break est une expérimentation digitale interactive de poésie participative. Découvre l'information en temps réel et reconstruit l'architecture du texte pour créer ta composition poétique.
  ">
  <meta name="Keywords" content="fluxs, rss, information, news, actualité, absurde, experimentation, HTML5, canvas, poesie, texte, construction, esthetique">
  <meta name="Copyright" content="Grunberg , Mothu">
  <meta name="Author" content="Agathe Grunberg , Audrey Mothu">
  <meta name="Identifier-Url" content="http://agrunberg.alwaysdata.net/">
  <meta name="Distribution" content="global">
  <meta name="Geography" content="france">

  <link rel="stylesheet" href="css/style.css" type="text/css" />
</head>

<body id="game">
  <div id="popup_instruction" class="popup_block">
    <a href="#" id="play" class="close" ><img id="imgPlay" src="img/instruction/instructions_btn_play.png"/></a>
  </div>
  <div id="popup_capture" class="popup_cap">
    <a href="#" class="close" ><img id="cvsBack" src="img/capture/retour.png"/></a>
    <a href="#" class="close" ><img id="cvsDL" src="img/capture/download.png"/></a>
  </div>
  <div class="content">
    <div class="mainDivTop"><div class="middleCircle"></div></div>
    <div class="leftDiv">
      <canvas id="cvs"></canvas>
    </div>

    <div class="rightDiv">
      <div class="rightDivTop">
        <a href="#" class="popCapture"><img class="icone" id="capture" src="img/capture.png"/></a><br/>
      </div>
      <div class="rightDivMiddle">
        <a href="index.php"><img class="icone" id="imgHome" src="img/home.png"/></a><br/>
        <img class="icone" id="imgRepeat" src="img/rejouer.png"/><br/>
        <img class="icone" id="imgSound" src="img/son_on.png"/><br/>
        <a href="#" id="showInstruction" class="popInstruction"><img class="icone" id="imgInstruction" src="img/instruction.png"/></a><br/>
      </div>
      <div class="rightDivBottom">
        <span class="copyright">&copy; 2015<br/> Audrey Mothu,<br/> Agathe Grunberg</span>
      </div>
    </div>
  </div>
<audio id="collisionSound" style="display:none" controls="controls">
  <source src="sound/perso.mp3" type="audio/mp3">
</audio>
<audio id="backgroundSound" style="display:none" controls="controls">
  <source src="sound/ambiance.mp3" type="audio/mp3">
</audio>
<audio id="clickSound" style="display:none" controls="controls">
  <source src="sound/pose.mp3" type="audio/mp3">
</audio>
<audio id="captureSound" style="display:none" controls="controls">
  <source src="sound/photo.mp3" type="audio/mp3">
</audio>
<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript">
window.chosenCategory = <?php echo json_encode($_GET['categorie']) ?>;
</script>
<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript" src="js/popUpGame.js"></script>

</body>

</html>