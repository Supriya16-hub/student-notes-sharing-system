<?php
include("../config.php");

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data['username']);
$email = trim($data['email']); 
$dob = $data['dob']; 
$passwordRaw = $data['password'];



if (!preg_match("/^[A-Za-z]+$/", $username)) {
    echo json_encode([
        "status"=>"error",
        "message"=>"Username must contain only letters"
    ]);
    exit;
}



if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "status"=>"error",
        "message"=>"Invalid email address"
    ]);
    exit;
}


// PASSWORD VALIDATION
if (!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/", $passwordRaw)) {
    echo json_encode([
        "status"=>"error",
        "message"=>"Password must contain 8 characters, 1 capital, 1 small, 1 number and 1 special character"
    ]);
    exit;
}


$password = password_hash($passwordRaw, PASSWORD_DEFAULT);


$check = $conn->prepare("SELECT id FROM users WHERE username=? OR email=?");
$check->bind_param("ss",$username,$email);
$check->execute();
$check->store_result();

if($check->num_rows > 0){
    echo json_encode([
        "status"=>"error",
        "message"=>"Username or Email already exists"
    ]);
    exit;
}


$stmt = $conn->prepare("INSERT INTO users (username,email,dob,password) VALUES (?,?,?,?)");
$stmt->bind_param("ssss",$username,$email,$dob,$password);
$stmt->execute();


echo json_encode(["status"=>"success"]);
?>