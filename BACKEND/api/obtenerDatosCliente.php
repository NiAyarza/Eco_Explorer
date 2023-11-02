<?php
    require_once "baseDatos.php";
    require_once "editar.php";
    require '../vendor/autoload.php';

    function obtenerDatosClientePorId($conn, $userEmail) {
        $stmt = $conn->prepare("SELECT * FROM clientes WHERE email = ?");
        $stmt->bind_param("s", $userEmail); 
        $stmt->execute();
    
        $resultado = $stmt->get_result();
        if ($resultado->num_rows === 0) {
            // No se encontraron datos para ese userEmail
            $stmt->close();
            return null;
        }
    
        $datosCliente = $resultado->fetch_assoc();
        $stmt->close();
    
        return $datosCliente;
    }

    $token = $_SERVER['HTTP_AUTHORIZATION'] ?? null; 
    
    if (!$token) {
        echo json_encode(["success" => false, "error" => "Token no proporcionado"]);
        exit();
    }

    $datosToken = validarToken($token);
    $userEmail = $datosToken["email"];
    $datosCliente = obtenerDatosClientePorId($conn, $userEmail);

    if (!$datosCliente) {
        echo json_encode(["success" => false, "error" => "Cliente no encontrado"]);
    } else {
        echo json_encode(["success" => true, "data" => $datosCliente]);
    }
?>