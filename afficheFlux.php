<?php

/* tableau de flux */
$arrayFlux = array();

/* verifie si le bouton est clique et definit $url */
if (isset($_POST['Category']) && $_POST['Category'] =="Politique"){
	$arrayFlux[] = array(
	    "category" => "Politique",
	    "url" => "http://www.lemonde.fr/politique/rss_full.xml",
	    "color"   =>"red",
	);
}
if (isset($_POST['Category']) && $_POST['Category'] == "Culture"){
	$arrayFlux[] = array(
	    "category" => "Culture",
	    "url" => "http://www.france24.com/fr/culture/rss/",
	    "color"   =>"blue",
	);
}
if (isset($_POST['Category']) && $_POST['Category'] == "People"){
	$arrayFlux[] = array(
	    "category" => "People",
	    "url" => "http://www.purepeople.com/rss/news_t0.xml",
	    "color"   =>"green",
	);
}
if (isset($_POST['Category']) && $_POST['Category'] == "Sport"){
	$arrayFlux[] = array(
	    "category" => "Sport",
	    "url" => "http://www.eurosport.fr/rss.xml",
	    "color"   =>"fuchsia",
	);
}
if (isset($_POST['Category']) && $_POST['Category'] == "International"){
	$arrayFlux[] = array(
	    "category" => "International",
	    "url" => "http://www.lemonde.fr/international/rss_full.xml",
	    "color"   =>"LightSlateGray",
	);
}
if (isset($_POST['Category']) && $_POST['Category'] == "Sciences"){
  $arrayFlux[] = array(
	    "category" => "Sciences",
	    "url" => "http://www.sciencesetavenir.fr/rss.xml",
	    "color"   =>"cyan",
	);
}
if (isset($_POST['Category']) && $_POST['Category'] == "Cinema"){
	$arrayFlux[] = array(
	    "category" => "Cinema",
	    "url" => "http://www.premiere.fr/var/premiere/storage/rss/cinema_actu.xml",
	    "color"   =>"LightSeaGreen",
	);
} 
if (isset($_POST['Category']) && $_POST['Category'] == "Technologie"){
	$arrayFlux[] = array(
	    "category" => "Technologie",
	    "url" => "http://www.actinnovation.com/feed/",
	    "color"   =>"orange",
	);
}
if (isset($_POST['Category']) && $_POST['Category'] == "Economie"){
	$arrayFlux[] = array(
	    "category" => "Economie",
	    "url" => "http://syndication.lesechos.fr/rss/rss_politique_societe.xml",
	    "color"   =>"Yellow",
	);
}

/* affichage des flux */
$arrayItems = array();
foreach ($arrayFlux as $array){
	if(isset($array['url'])){

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
		}
	}
}
echo json_encode($arrayItems);

?>