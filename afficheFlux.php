<?php

/* tableau de flux */
$tabFlux = array(
		"Politique" => array("url" => "http://www.lemonde.fr/politique/rss_full.xml", "categorie" => "Politique", "font" => "20px Times"),

	    "Economie" => array("url" => "http://syndication.lesechos.fr/rss/rss_politique_societe.xml", "categorie" => "Economie", "font" => "Italic 20px Palatino"),

	    "Technologie" => array("url" => "http://www.actinnovation.com/feed/", "categorie" =>  "Technologie", "font" => "20px Gill"),

	    "Cinema" => array("url" => "http://www.premiere.fr/var/premiere/storage/rss/cinema_actu.xml", "categorie" => "Cinema", "font" => "20px Andale mono"),

	    "Sciences" => array("url" => "http://www.sciencesetavenir.fr/rss.xml", "categorie" => "Sciences", "font" => "20px Courrier"),

	    "International" => array("url" => "http://www.lemonde.fr/international/rss_full.xml", "categorie" => "International", "font" => "Bold 20px Helvetica Narrow"),

	    "Sport" => array("url" => "http://www.eurosport.fr/rss.xml", "categorie" => "Sport", "font" => "20px Impact"),

	    "People" => array("url" => "http://www.purepeople.com/rss/news_t0.xml", "categorie" => "People", "font" => "20px Arial"),

	    "Culture" => array("url" => "http://www.france24.com/fr/culture/rss/", "categorie" => "Culture", "font" => "20px Parkavenue"),
);


/* affichage des flux de la categorie choisie */
$arrayItems = array();
if(isset($_POST['Category'])){
	$cat = $_POST['Category'];
		$rss = simplexml_load_file($tabFlux[$cat]['url']);
		if($rss)
		{
			$items = $rss->channel->item;
			foreach($items->xpath('//item[position() <= 4]') as $item) // on limite le nombre de flux a 4 par categorie
			{
				$published_on = $item->pubDate;
				$pubDate = strftime("%d-%m-%Y %H:%M", strtotime($published_on));
				$arrayItems[] = array(
					'title' => (string) $item->title,
 					'pubdate' => (string) $pubDate,
 					'category' => (string) $cat,
 					'font' => (string) $tabFlux[$cat]['font']
				);
			}
			unset($tabFlux[$cat]); // supprime le flux selectionne du tableau pour qu'il ne reapparaissent pas dans les flux random !
		}
}

/* affichage de flux de categories random */
shuffle($tabFlux);
foreach(array_slice($tabFlux, 0, 3, true) as $category => $flux) {
	$rss = simplexml_load_file($flux['url']);
	if($rss)
	{
		$items = $rss->channel->item;
		foreach($items->xpath('//item[position() <= 2]') as $item) // on limite le nombre de flux a 4 par categorie
		{
			$published_on = $item->pubDate;
			$pubDate = strftime("%d-%m-%Y %H:%M", strtotime($published_on));
			$arrayItems[] = array(
				'title' => (string) $item->title,
				'pubdate' => (string) $pubDate,
				'category' => (string) $flux['categorie'],
 				'font' => (string) $flux['font']
			);
		}
	}
}

echo json_encode($arrayItems);

?>