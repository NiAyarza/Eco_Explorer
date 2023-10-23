<?php
require_once "baseDatos.php";
require '../vendor/autoload.php';  // Si estás usando composer para JWT
use \Firebase\JWT\JWT;  // Espacio de nombres para JWT

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password)) {
    
    $email = $data->email;
    $password = $data->password;
    
    $stmt = $conn->prepare("SELECT * FROM cliente WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if ($user && password_verify($password, $user['contraseña'])) {
        $key = "EcoExplorer"; 
        $token = array(
            "iss" => "http://localhost:8100",
            "aud" => "http://localhost:8100",
            "iat" => time(),
            "exp" => time() + (60*60),  // Token que expira en 1 hora
            "data" => array(
                "userId" => $user['rut'],
                "email" => $user['email']
            )
        );

        $jwt = JWT::encode($token, $key, 'HS256');
        
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
?>
