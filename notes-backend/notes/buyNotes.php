<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include("../config.php");

$note_id = $_POST['note_id'];
$name = $_POST['name'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];
$upi = $_POST['upi'];
$method = $_POST['method'];

$stmt = $conn->prepare("INSERT INTO purchases (note_id,name,email,mobile,upi_id,payment_method) VALUES (?,?,?,?,?,?)");

$stmt->bind_param("isssss",$note_id,$name,$email,$mobile,$upi,$method);

if($stmt->execute()){
    echo json_encode(["status"=>"success"]);
}else{
    echo json_encode(["status"=>"error"]);
}

?>