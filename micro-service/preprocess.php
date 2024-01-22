<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
#$url="https://superheroapi.com/api/2521867701306092/search/".$_GET['name'] ;
$baseURL = "https://superheroapi.com/api/2521867701306092/search/";
$searchTerm = rawurlencode($_GET['name']);
$url = $baseURL . $searchTerm;

function getEnd($text){
    $end = strpos($text,")");
    if($end!==false){
        return $end+1;
    }
    return strlen($text);

}

function textProcess($text,$group){
    $text = str_replace(";",",",$text);
    $text = str_replace("/",",",$text);
    $text = strtolower($text);  
    $text = str_replace(" former "," ",$text);
    $text = str_replace(" formerly "," ",$text);
    $text = process($text,$group);
    return $text;
}

function clearText($word){
    $word = trim($word);
    if (substr($word, 0, 2) === 'a ') {
        $word = substr($word, 2);
    }   
    if (substr($word, 0, 7) === 'former ') {
        $word = substr($word, 7);
    }  

    return keepAlphanumeric($word);

}

function keepAlphanumeric($str) {
    $str = strtolower($str);
    return preg_replace("/[^a-zA-Z0-9]/", "", $str);
}



function findId($name,$superName){
    $name = keepAlphanumeric($name);
    $superName = keepAlphanumeric($superName);
    return $name . $superName;
}




function process($text,$group) {
    $start = strpos($text, "(");
    if ($start !== false) {
        $end = getEnd($text);
        $rem = substr($text, $start, $end - $start);
        $res = str_replace($rem, "", $text);
        return process($res,$group);
    }

    $array = explode(",", $text);
    if($group){
        $array = array_map('clearText',$array);
    }
    return $array;
}






// Make the API call
$response = file_get_contents($url, false);

$decoded = json_decode($response);

$answer=$decoded->{"results"};
foreach($answer as $perso){
    $superName = $perso->{"name"};
    $name = $perso->{'biography'}->{'full-name'};
    $connections = $perso->{"connections"};
    $apparition = $perso->{'biography'}->{'first-appearance'};
    $groups = $connections->{"group-affiliation"};
    $appearance = $perso->{"appearance"};
    $race = $appearance->{"race"};
    $work = $perso->{"work"};
    $occupation = $work->{"occupation"};
    $color_eye = $appearance->{"eye-color"};
    $color_hair = $appearance->{"hair-color"};
    $work->{"occupation"} =  textProcess($occupation,true);
    $appearance->{"hair-color"} = textProcess($color_hair,true);
    $appearance->{"eye-color"} = textProcess($color_eye,true);
    $perso->{"id"} = findId($name,$superName);
    $connections->{"group-affiliation"} = textProcess($groups,False);
    $appearance->{"race"} = textProcess($race,true);


}

$ans = json_encode($answer);
echo $ans;