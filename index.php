<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Flux</title>
  <link rel="stylesheet" href="css/style.css" type="text/css" />
</head>

<body>
<div style="display: table">
  <div style="display: table-row">
  	<div style="display: table-cell;"class="categorie" id="Politique">Politique</div>
  	<div style="display: table-cell;"class="categorie" id="Culture">Culture</div>
    <div style="display: table-cell;"class="categorie" id="People">People</div>
  </div>
  <div style="display: table-row">
    <div style="display: table-cell;"class="categorie" id="Sport">Sport</div>
    <div style="display: table-cell;"class="categorie" id="International">International</div>
    <div style="display: table-cell;"class="categorie" id="Sciences">Sciences</div><br/>
  </div>
  <div style="display: table-row">
    <div style="display: table-cell;"class="categorie" id="Cinema">Cinema</div>
    <div style="display: table-cell;"class="categorie" id="Technologie">Technologie</div>
    <div style="display: table-cell;"class="categorie" id="Economie">Economie</div><br/>
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