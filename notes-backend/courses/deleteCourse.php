<?php
include("../config.php");

session_start();

if(!isset($_SESSION['role']) || $_SESSION['role'] !== "admin"){
 echo json_encode(["status"=>"error"]);
 exit;
}

$id=$_POST['id'];

$stmt=$conn->prepare("DELETE FROM courses WHERE id=?");
$stmt->bind_param("i",$id);
$stmt->execute();

echo json_encode(["status"=>"success"]);