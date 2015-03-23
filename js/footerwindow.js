window.onload=initElement;

  function initElement()
{
  // recupere element #projet qui doit etre cliqué
  var projet = document.getElementById("projet");
// au clic la fonction d'apparition du projet s'execute
 projet.onclick = projetup;
// recupere element #share qui doit etre cliqué
   var shareprojet = document.getElementById("share");
// au clic la fonction d'apparition du partage s'execute
 shareprojet.onclick = shareup;

};
 function projetup()
{
  //ajoute la classe
  // la fenetre projet apparait
document.getElementById("projetUp").className = " projetUp";
 // le content original disparait
 document.getElementById("content").className = " contentUp";
// au clic la fonction de disparition s'execute
var projetclose = document.getElementById("closeProjet");
// au clic sur le close la fonction d'apparition s'execute
 projetclose.onclick = close;
}
 function shareup()
{
  //ajoute la classe
  // la fenetre projet apparait
//alert('share click');
document.getElementById("shareUp").className = " shareUp";
 // le content original disparait
 document.getElementById("content").className = " contentUp";
// au clic la fonction de disparition s'execute
var projetclose = document.getElementById("buttonClose");
// au clic sur le close la fonction d'apparition s'execute
projetclose.onclick = closeshare;
}
function closeshare()
{
  //la fentre projet se ferme
document.getElementById("shareUp").className = " projetClose";
//le contenu principal réapparait
document.getElementById("content").className = "contenu";
}
function close()
{
  //alert('la fenetre se ferme');
  //la fentre projet se ferme
document.getElementById("projetUp").className = " shareClose";
//le contenu principal réapparait
document.getElementById("content").className = "contenu";
}
