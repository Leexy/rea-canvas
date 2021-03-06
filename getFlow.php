<?php

/* flow table */
$tabFlux = array(
		"Politique" => array("url" => "http://www.lemonde.fr/politique/rss_full.xml", "categorie" => "Politique"),

	    "Economie" => array("url" => "http://www.france24.com/fr/economie/rss", "categorie" => "Economie"),

	    "Technologie" => array("url" => "http://feeds2.feedburner.com/LeJournalduGeek", "categorie" =>  "Technologie"),

	    "Cinema" => array("url" => "http://www.premiere.fr/var/premiere/storage/rss/cinema_actu.xml", "categorie" => "Cinema"),

	    "Sciences" => array("url" => "http://www.sciencesetavenir.fr/rss.xml", "categorie" => "Sciences"),

	    "International" => array("url" => "http://www.lemonde.fr/international/rss_full.xml", "categorie" => "International"),

	    "Sport" => array("url" => "http://www.eurosport.fr/rss.xml", "categorie" => "Sport"),

	    "People" => array("url" => "http://www.purepeople.com/rss/news_t0.xml", "categorie" => "People"),

	    "Culture" => array("url" => "http://www.france24.com/fr/culture/rss/", "categorie" => "Culture"),
);


/* show flow of chosen category */
$arrayItems = array();
if(isset($_POST['Category'])){
	$cat = $_POST['Category'];
		$rss = simplexml_load_file($tabFlux[$cat]['url']);
		if($rss)
		{
			$items = $rss->channel->item;
			foreach($items->xpath('//item[position() <= 16]') as $item) // limit the number of flow/category
			{
				$published_on = $item->pubDate;
				$pubDate = strftime("%d-%m-%Y %H:%M", strtotime($published_on));
				$arrayItems[] = array(
					'title' => (string) $item->title,
 					'pubdate' => (string) $pubDate,
 					'category' => (string) $cat,
				);
			}
			//unset($tabFlux[$cat]); // delete the flow
		}
}

echo json_encode($arrayItems);

?>