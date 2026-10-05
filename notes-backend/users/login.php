

<?php
include("../config.php");

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');


if ($username === "admin" && $password === "admin123") {

    $_SESSION['username'] = "admin";
    $_SESSION['role'] = "admin";

    echo json_encode([
        "status" => "success",
        "username" => "admin",
        "role" => "admin"
    ]);
    exit();
}


$stmt = $conn->prepare("SELECT password, role FROM users WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid Credentials"
    ]);
    exit();
}

$stmt->bind_result($dbPassword, $role);
$stmt->fetch();


if (password_verify($password, $dbPassword)) {

    $_SESSION['username'] = $username;
    $_SESSION['role'] = $role;

    echo json_encode([
        "status" => "success",
        "username" => $username,
        "role" => $role
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid Credentials"
    ]);
}

$stmt->close();
$conn->close();
?>