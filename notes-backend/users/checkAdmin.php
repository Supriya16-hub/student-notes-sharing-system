<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include("../config.php");

if(isset($_SESSION['role']) && $_SESSION['role'] === "admin"){
    echo json_encode(["status"=>"admin"]);
}else{
    echo json_encode(["status"=>"not_admin"]);
}
?>