<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Flux</title>
  <link rel="stylesheet" href="css/indexStyle.css" type="text/css" />
  <link rel="icon" type="img/png" href="favicon.png" />
</head>

<body class="index-page">

<div id="popup_credit" class="popup_block">
  <a href="#" id="mail"><img id="imgMail" src="img/credit/mail_icon.png"/></a>
  <a href="#" id="twitter"><img id="imgTweet" src="img/credit/tweet_icon.png"/></a>
  <a href="#" id="facebook"><img id="imgFB" src="img/credit/fb_icon.png"/></a>
  <a href="#" class="close" id="home"><img id="imgBackHome" src="img/credit/credit_btn_home.png"/></a>
</div>

<video autoplay loop poster="img/home/newsbreak.jpg" id="bgvid">
  <source src="newsbreak.mp4" type="video/mp4">
</video>

<div class="content">

<div class="head">
  <div class="download">
    <a href="https://github.com/Leexy/rea-canvas">  <div class="icondownload"></div>Github</a>
  </div>
	<div class="market">
		<div><a href="#"><img src="img/home/shop.png"></a></div>
	   
    <div><a href="#"><img src="img/home/compte.png"></a></div>
    
    <div><a href="#" id="showCredit" class="poplight"><img src="img/home/info.png"></a></div>	
 
  </div>
 </div>

<div class="colgauche">
  <!--
  <img src="img/titre.png" class="title">-->
  <div class="titre">
    <h3>News</h3><h1>Break</h1>
  </div>
  <h5>Canvas experiments</h5>
  <h3 class="sstitre">informations absurdes &amp; poésie </h3>

</div>
<!-- catégories -->
<div class="table">
  <div class="row">
    
  	<div class="categorie" id="Politique" value="Politique">
  		<div class="icone"><img src="img/home/politique.svg" class="icon"></div>
			<p>Politique</p>
    </div>
  	<div class="categorie" id="Culture" value="Culture">
		<div class="icone"><img src="img/home/culture.svg" class="icon"></div><p>Culture</p>
    </div>
    <div class="categorie boat" id="People" value="People">
		<div class="icone"><img src="img/home/people.svg" class="icon"></div><p>People</p>
    </div>
  </div>
  <div class="row">
    <div class="categorie" id="Sport" value="Sport">
		<div class="icone"><img src="img/home/sport.svg" class="icon"></div><p>Sport</p>
    </div>
    <div class="categorie" id="International" value="International">
		<div class="icone"><img src="img/home/international.svg" class="icon"></div><p>International</p>
    </div>
    <div class="categorie" id="Sciences" value="Sciences">
		<div class="icone"><img src="img/home/science.svg" class="icon"></div><p>Sciences</p>
    </div>
  </div>
  <div class="row">
    <div class="categorie" id="Cinema" value="Cinema">
		<div class="icone"><img src="img/home/cinema.svg" class="icon"></div><p>Cinema</p>
    </div>
    <div class="categorie" id="Technologie" value="Technologie">
		<div class="icone"><img src="img/home/techno.svg" class="icon"></div><p>Technologie</p>
    </div>
    <div class="categorie" id="Economie" value="Economie">
		<div class="icone"><img src="img/home/eco.svg" class="icon"></div><p>Economie</p>
    </div>
  </div>

</div>
<div class="fenetreprojet"></div>
</div>
<div class="sprite"><img src="img/home/sprite_home.gif" class="wait"></div>
<footer> 
  <a href="projet.php" class="projet">Le projet</a>|
  <a href="#"><img src="img/credit/tweet_icon.png"></a>
  <a href="#"> <img src="img/credit/fb_icon.png">Partager</a>
  <p>  &copy; 2015 - Agathe Grunberg, Audrey Mothu</p>
</footer>

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