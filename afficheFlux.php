<?php

/* tableau de flux */
$tabFlux = array(
 array(
		"category" => "Politique",
	    "url" => "http://www.lemonde.fr/politique/rss_full.xml",
	),
 array(
	    "category" => "Economie",
	    "url" => "http://syndication.lesechos.fr/rss/rss_politique_societe.xml",
	),
 array(
	    "category" => "Technologie",
	    "url" => "http://www.actinnovation.com/feed/",
	),
 array(
	    "category" => "Cinema",
	    "url" => "http://www.premiere.fr/var/premiere/storage/rss/cinema_actu.xml",
	),
 array(
	    "category" => "Sciences",
	    "url" => "http://www.sciencesetavenir.fr/rss.xml",
	),
 array(
	    "category" => "International",
	    "url" => "http://www.lemonde.fr/international/rss_full.xml",
	),
 array(
	    "category" => "Sport",
	    "url" => "http://www.eurosport.fr/rss.xml",
	),
 array(
	    "category" => "People",
	    "url" => "http://www.purepeople.com/rss/news_t0.xml",
	),
array(
	    "category" => "Culture",
	    "url" => "http://www.france24.com/fr/culture/rss/",
	)
);

/* affichage des flux de la categorie choisie */
$arrayItems = array();
foreach ($tabFlux as $key => $array){
	if(isset($array['url']) && $_POST['Category'] == $array['category'] ){
		$rss = simplexml_load_file($array['url']);
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
 					'category' => (string) $array['category']
				);
			}
			unset($tabFlux[$key]); // supprime le flux selectionne du tableau pour qu'il ne reapparaissent pas dans les flux random !
		}
	}
}
/* affichage de flux de categories random */
shuffle($tabFlux);
foreach(array_slice($tabFlux, 0, 3) as $key => $array) {
	$rss = simplexml_load_file($array['url']);
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
				'category' => (string) $array['category']
			);
		}
	}
}

echo json_encode($arrayItems);

?>