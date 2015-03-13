<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Flux</title>
  <link rel="stylesheet" href="css/style.css" type="text/css" />
</head>

<body>
<div class="table">
  <div class="row">
  	<div class="categorie" id="Politique">Politique</div>
  	<div class="categorie" id="Culture">Culture</div>
    <div class="categorie" id="People">People</div>
  </div>
  <div class="row">
    <div class="categorie" id="Sport">Sport</div>
    <div class="categorie" id="International">International</div>
    <div class="categorie" id="Sciences">Sciences</div><br/>
  </div>
  <div class="row">
    <div class="categorie" id="Cinema">Cinema</div>
    <div class="categorie" id="Technologie">Technologie</div>
    <div class="categorie" id="Economie">Economie</div><br/>
  </div>
</div>

<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript">
$("div.categorie").click(function() {
  var cat = $(this).text();
  document.location = "game.php?categorie="+encodeURIComponent(cat);
  });
</script>

</body>

</html>