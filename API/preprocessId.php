<?php
#$url="https://superheroapi.com/api/2521867701306092/search/".$_GET['name'] ;
error_reporting(E_ALL);
ini_set('display_errors', 1);
$baseURL = "https://superheroapi.com/api/2521867701306092/";
$searchTerm =$_GET['name'];
$url = $baseURL . $searchTerm;

function getEnd($text,$pos){
    $end = strpos($text,")");
    if($end!==false){
        $next =strpos($text,"(",$pos+1);
        if ($next){
            if ($next<$end) {
                $end = strpos($text,")",$end+1);
                
            }
        }
        return $end+1;
    }

    return strlen($text);

}

function textProcess($text){
    $text = str_replace(";",",",$text);
    $text = str_replace("/",",",$text);
    $text = strtolower($text);  
    $text = str_replace(" former "," ",$text);
    $text = str_replace(" formerly "," ",$text);
    $text = process($text);
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

    return $word;

}



function process($text) {
    $start = strpos($text, "(");
    if ($start !== false) {
        $end = getEnd($text,$start);
        $rem = substr($text, $start, $end - $start);
        $res = str_replace($rem, "", $text);
        return process($res);
    }

    $array = array_map('clearText',explode(",", $text));
    return $array;
}

function processRelatives($text){
    $text = str_replace(";",",",$text);
    $text = str_replace(";",",",$text);
    $text = str_replace("/",",",$text);
    $text = strtolower($text);  
    $text = str_replace(" former "," ",$text);
    $text = str_replace(" formerly "," ",$text);
    $text = process($text);
    return $text;

}

// Make the API call
$response = file_get_contents($url, false);

$decoded = json_decode($response);

$answer=[$decoded];
foreach($answer as $perso){
    $connections = $perso->{"connections"};
    $relatives =  $connections->{"relatives"};
    $appearance = $perso->{"appearance"};
    $work = $perso->{"work"};
    $occupation = $work->{"occupation"};
    $color_eye = $appearance->{"eye-color"};
    $color_hair = $appearance->{"hair-color"};
    $groups = $connections->{"group-affiliation"};
    $connections->{"relatives"} =  processRelatives($relatives);
    $connections->{"group-affiliation"} =  textProcess($groups);
    $work->{"occupation"} =  textProcess($occupation);
    $appearance->{"hair-color"} = textProcess($color_hair);
    $appearance->{"eye-color"} = textProcess($color_eye);

}

$ans = json_encode($answer);
echo $ans;


