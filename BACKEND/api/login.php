<?php
require_once "baseDatos.php";
require '../vendor/autoload.php';
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password) && isset($data->tipo)) {
    
    $email = $data->email;
    $password = $data->password;
    $tipo = $data->tipo;

    $tabla = ($tipo === 'cliente') ? 'cliente' : 'empleado';
    
    $stmt = $conn->prepare("SELECT * FROM $tabla WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();
    $stmt->close();

if ($user && password_verify($password, $user['contraseña'])) {
    $key = "EcoExplorer";
    $payload = [
        'iss' => 'http://localhost:8100',
        'aud' => 'http://localhost:8100',
        'iat' => time(),
        'exp' => time() + (60*60*24),
        'data' => [
            'userId' => $user['rut'],
            'email' => $user['email']
        ]
    ];

    $jwt = JWT::encode($payload, $key, 'HS256');

    echo json_encode(['success' => true, 'message' => 'Login successful', 'token' => $jwt]);
    
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Login failed']);
    }
    
    $conn->close();
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}

$headers = apache_request_headers();
?>
