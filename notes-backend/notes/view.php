<?php
include("../config.php");

$id = $_GET['id'] ?? '';
if (!$id) die("Invalid request");


$stmt = $conn->prepare("SELECT pdf FROM notes WHERE id=?");
$stmt->bind_param("i",$id);
$stmt->execute();
$stmt->bind_result($fileName);
$stmt->fetch();

$filePath = "../uploads/" . $fileName;

if (!file_exists($filePath)) {
    die("File not found");
}


header("Content-Type: application/pdf");
header("Content-Disposition: inline; filename=\"" . basename($fileName) . "\"");

readfile($filePath);
exit();
?>