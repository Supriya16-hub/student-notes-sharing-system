<?php
include("../config.php");

// Admin check
if (!isset($_SESSION['role']) || $_SESSION['role'] !== "admin") {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit();
}

if (!isset($_FILES['pdf'])) {
    echo json_encode(["status" => "error", "message" => "No file uploaded"]);
    exit();
}

$course = $_POST['course'];
$year = $_POST['year'];
$subject = $_POST['subject'];
$price = $_POST['price'];   

$fileName = time() . "_" . $_FILES['pdf']['name'];

$targetDir = "../uploads/";
$targetFile = $targetDir . $fileName;

if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (move_uploaded_file($_FILES['pdf']['tmp_name'], $targetFile)) {


    $stmt = $conn->prepare("INSERT INTO notes (course, year, subject, pdf, price) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $course, $year, $subject, $fileName, $price);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "DB insert failed"]);
    }

} else {
    echo json_encode(["status" => "error", "message" => "File upload failed"]);
}
?>