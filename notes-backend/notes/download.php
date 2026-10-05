<?php

session_start();

include("../config.php");

$id = $_GET['id'];

$stmt = $conn->prepare("SELECT pdf FROM notes WHERE id=?");
$stmt->bind_param("i",$id);
$stmt->execute();

$result=$stmt->get_result();
$row=$result->fetch_assoc();

$file = "../uploads/".$row['pdf'];

if(file_exists($file)){

header("Content-Type: application/pdf");
header("Content-Disposition: attachment; filename=".$row['pdf']);

readfile($file);

}

?>