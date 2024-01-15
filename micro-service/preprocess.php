<?php
$url="https://superheroapi.com/api/2521867701306092/search/".$_GET['name'] ;


function process($text){
    $start=strpos($text,"(");
    $end=strpos($text,")")+1;
    if($start){
        $rem = substr($text,$start,$end-$start);
        $res = str_replace($rem,"",$text);
        return process($res);
    }
    $array = explode(",",$text);
    return $array;
}


// Make the API call
$response = file_get_contents($url, false, $context);


$decoded = json_decode($response);

$answer=$decoded->{"results"};
foreach($answer as $perso){
    $connections = $perso->{"connections"};
    $relatives =  $connections->{"relatives"};
    $work = $perso->{"work"};
    $occupation = $work->{"occupation"};
    $groups = $connections->{"group-affiliation"};
    $connections->{"relatives"} =  process($relatives);
    $connections->{"group-affiliation"} =  process($groups);
    $work->{"occupation"} =  process($occupation);
}

$ans = json_encode($answer);
echo $ans;


