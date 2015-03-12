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
	<canvas id="cvs" style="border:1px solid black"></canvas>

<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript">
window.chosenCategory = <?php echo json_encode($_GET['categorie']) ?>;
</script>
<script type="text/javascript" src="js/script.js"></script>

</body>

</html>