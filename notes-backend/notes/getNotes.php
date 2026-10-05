<?php
include("../config.php");

$course=$_GET['course'] ?? "";
$year=$_GET['year'] ?? "";

if($course && $year){
    $stmt=$conn->prepare("SELECT * FROM notes WHERE course=? AND year=?");
    $stmt->bind_param("ss",$course,$year);
}else{
    $stmt=$conn->prepare("SELECT * FROM notes");
}

$stmt->execute();
$result=$stmt->get_result();

$data=[];
while($row=$result->fetch_assoc()){
    $data[]=$row;
}

echo json_encode($data);
?>