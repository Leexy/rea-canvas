<?php

/* tableau de flux */
$arrayFlux = array();

/* verifie si la checkbox est cochee et definit $url */
if (isset($_POST['Politique']) && $_POST['Politique']=="on"){
	$arrayFlux[] = array(
	    "id" => "Politique",
	    "url" => "http://www.lemonde.fr/politique/rss_full.xml",
	    "color"   =>"red",
	);
}
if (isset($_POST['Culture']) && $_POST['Culture']=="on"){
	$arrayFlux[] = array(
	    "id" => "Culture",
	    "url" => "http://www.france24.com/fr/culture/rss/",
	    "color"   =>"blue",
	);
}
if (isset($_POST['People']) && $_POST['People']=="on"){
	$arrayFlux[] = array(
	    "id" => "People",
	    "url" => "http://www.purepeople.com/rss/news_t0.xml",
	    "color"   =>"green",
	);
}
if (isset($_POST['Sport']) && $_POST['Sport']=="on"){
	$arrayFlux[] = array(
	    "id" => "Sport",
	    "url" => "http://www.eurosport.fr/rss.xml",
	    "color"   =>"fuchsia",
	);
}
if (isset($_POST['International']) && $_POST['International']=="on"){
	$arrayFlux[] = array(
	    "id" => "International",
	    "url" => "http://www.lemonde.fr/international/rss_full.xml",
	    "color"   =>"LightSlateGray",
	);
}
if (isset($_POST['Sciences']) && $_POST['Sciences']=="on"){
  $arrayFlux[] = array(
	    "id" => "Sciences",
	    "url" => "http://www.sciencesetavenir.fr/rss.xml",
	    "color"   =>"cyan",
	);
}
if (isset($_POST['Cinema']) && $_POST['Cinema']=="on"){
	$arrayFlux[] = array(
	    "id" => "Cinema",
	    "url" => "http://www.premiere.fr/var/premiere/storage/rss/cinema_actu.xml",
	    "color"   =>"LightSeaGreen",
	);
} 
if (isset($_POST['Technologie']) && $_POST['Technologie']=="on"){
	$arrayFlux[] = array(
	    "id" => "Technologie",
	    "url" => "http://www.actinnovation.com/feed/",
	    "color"   =>"orange",
	);
}

/* affichage des flux */
$arrayItems = array();
foreach ($arrayFlux as $array){
	if(isset($array['url'])){

		//$rss = simplexml_load_string(file_get_contents($array['url'])); 
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
 					'type' => (string) $array['id']
				);
			}
		}
	}
}
echo json_encode($arrayItems);


/* affichage des flux 
if(isset($url)){
	$rss = simplexml_load_file($url);
	if($rss)
	{
		//echo '<h1>'.$rss->channel->title.'</h1>';
		//echo '<li>'.$rss->channel->pubDate.'</li>';
		$items = $rss->channel->item;
		echo '<p style="color:'.$color.'">';
		foreach($items as $item)
		{
			$title = $item->title;
			//$link = $item->link;
			$published_on = $item->pubDate;
			//$description = $item->description;
			$pubDate = strftime("%d-%m-%Y %H:%M", strtotime($published_on));
			echo $title.' ('.$pubDate.')';
			//echo '<p>'.$description.'</p>';
		}
		echo '</p><br/>';
	}
}*/

?>