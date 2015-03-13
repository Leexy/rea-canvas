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

<body>
  <div class="topDiv"></div>

	<canvas id="cvs"></canvas>

  <div class="bottomDiv">
    <a href="index.php"><img src="img/home.png"/></a>
    <img src="img/pause.png"/>
    <img src="img/rejouer.png"/>
    <img src="img/son_off.png"/>
  </div>

<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript">
window.chosenCategory = <?php echo json_encode($_GET['categorie']) ?>;
</script>
<script type="text/javascript" src="js/script.js"></script>

</body>

</html>