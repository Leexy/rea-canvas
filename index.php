<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Flux</title>
  <link rel="stylesheet" href="css/style.css" type="text/css" />
</head>

<body class="index-page">

<a href="#" id="showCredit" class="poplight">Credits</a>
<div id="popup_credit" class="popup_block">
  <a href="#" id="mail"><img id="imgMail" src="img/credit/mail_icon.png"/></a>
  <a href="#" id="twitter"><img id="imgTweet" src="img/credit/tweet_icon.png"/></a>
  <a href="#" id="facebook"><img id="imgFB" src="img/credit/fb_icon.png"/></a>
  <a href="#" class="close" id="home"><img id="imgHome" src="img/credit/credit_btn_home.png"/></a>
</div>

<img class="titre" src="img/titre.png"/>
<img class="titre" src="img/soustitre.png"/>
<div class="table">
  <div class="row">
  	<div class="categorie" id="Politique" value="Politique"></div>
  	<div class="categorie" id="Culture" value="Culture"></div>
    <div class="categorie" id="People" value="People"></div>
  </div>
  <div class="row">
    <div class="categorie" id="Sport" value="Sport"></div>
    <div class="categorie" id="International" value="International"></div>
    <div class="categorie" id="Sciences" value="Sciences"></div>
  </div>
  <div class="row">
    <div class="categorie" id="Cinema" value="Cinema"></div>
    <div class="categorie" id="Technologie" value="Technologie"></div>
    <div class="categorie" id="Economie" value="Economie"></div>
  </div>
</div>
<div class="letter-img"></div>
<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript">
$("div.categorie").click(function() {
  var cat = $(this).attr('value');
  document.location = "game.php?categorie="+encodeURIComponent(cat);
  });
</script>
<script type="text/javascript" src="js/popUpScript.js"></script>

</body>

</html>