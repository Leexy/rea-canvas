<?php

/* tableau de flux */
$tabFlux = array(
		"Politique" => array("url" => "http://www.lemonde.fr/politique/rss_full.xml", "categorie" => "Politique"),

	    "Economie" => array("url" => "http://syndication.lesechos.fr/rss/rss_politique_societe.xml", "categorie" => "Economie"),

	    "Technologie" => array("url" => "http://www.actinnovation.com/feed/", "categorie" =>  "Technologie"),

	    "Cinema" => array("url" => "http://www.premiere.fr/var/premiere/storage/rss/cinema_actu.xml", "categorie" => "Cinema"),

	    "Sciences" => array("url" => "http://www.sciencesetavenir.fr/rss.xml", "categorie" => "Sciences"),

	    "International" => array("url" => "http://www.lemonde.fr/international/rss_full.xml", "categorie" => "International"),

	    "Sport" => array("url" => "http://www.eurosport.fr/rss.xml", "categorie" => "Sport"),

	    "People" => array("url" => "http://www.purepeople.com/rss/news_t0.xml", "categorie" => "People"),

	    "Culture" => array("url" => "http://www.france24.com/fr/culture/rss/", "categorie" => "Culture"),
);


/* affichage des flux de la categorie choisie */
$arrayItems = array();
if(isset($_POST['Category'])){
	$cat = $_POST['Category'];
		$rss = simplexml_load_file($tabFlux[$cat]['url']);
		if($rss)
		{
			$items = $rss->channel->item;
			foreach($items->xpath('//item[position() <= 16]') as $item) // on limite le nombre de flux a 4 par categorie
			{
				$published_on = $item->pubDate;
				$pubDate = strftime("%d-%m-%Y %H:%M", strtotime($published_on));
				$arrayItems[] = array(
					'title' => (string) $item->title,
 					'pubdate' => (string) $pubDate,
 					'category' => (string) $cat,
				);
			}
			//unset($tabFlux[$cat]); // supprime le flux selectionne du tableau pour qu'il ne reapparaissent pas dans les flux random !
		}
}

/* affichage de flux de categories random 
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
}*/

echo json_encode($arrayItems);

?>