

<?php
include("../config.php");

// Admin check
if (!isset($_SESSION['role']) || $_SESSION['role'] !== "admin") {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit();
}

// Check ID
if (!isset($_POST['id'])) {
    echo json_encode(["status" => "error", "message" => "ID missing"]);
    exit();
}

$id = intval($_POST['id']);

// First get file name
$stmt = $conn->prepare("SELECT pdf FROM notes WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if (!$row) {
    echo json_encode(["status" => "error", "message" => "Note not found"]);
    exit();
}

$filePath = "uploads/" . $row['pdf'];

// Delete from DB
$stmt = $conn->prepare("DELETE FROM notes WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    // Delete file from folder
    if (file_exists($filePath)) {
        unlink($filePath);
    }

    echo json_encode(["status" => "success"]);

} else {
    echo json_encode(["status" => "error", "message" => "Delete failed"]);
}
?>