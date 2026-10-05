<?php
include("../config.php");

session_start();

if(!isset($_SESSION['role']) || $_SESSION['role'] !== "admin"){
 echo json_encode(["status"=>"error","message"=>"Unauthorized"]);
 exit;
}

$name=$_POST['name'];

$image=$_FILES['image']['name'];
$tmp=$_FILES['image']['tmp_name'];

$path="../uploads/".$image;

move_uploaded_file($tmp,$path);

$conn->query("INSERT INTO courses(name,image) VALUES('$name','$image')");

echo json_encode(["status"=>"success"]);