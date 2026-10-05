<?php

include("../config.php");

$result = $conn->query("SELECT * FROM courses ORDER BY id DESC");

$courses = [];

while($row = $result->fetch_assoc()){
    $courses[] = $row;
}

echo json_encode($courses);

?>