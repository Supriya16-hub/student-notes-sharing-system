<?php

header("Access-Control-Allow-Origin: http://localhost:5173");

include("../config.php");

$id=$_GET['id'];

$result=$conn->query("SELECT price FROM notes WHERE id=$id");

$row=$result->fetch_assoc();

echo json_encode($row);

?>