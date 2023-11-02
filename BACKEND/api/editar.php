<?php
    require_once "baseDatos.php";
    require '../vendor/autoload.php'; 
    use \Firebase\JWT\JWT; 
    use Firebase\JWT\Key;
    
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $response = array();

        $inputData = json_decode(file_get_contents("php://input"), true);
        $token = $_SERVER["HTTP_AUTHORIZATION"] ?? null;

        if (!$token) {
            $response = array("error" => "Se requiere autenticación.");
            echo json_encode($response);
            exit();
        }

        $token = str_replace("Bearer ", "", $token);

        if (isset($inputData["nombre"])) {
            $response = actualizarNombre($conn, $token, $inputData["nombre"]);
        } elseif (isset($inputData["apellido"])) {
            $response = actualizarApellido($conn, $token, $inputData["apellido"]);
        } elseif (isset($inputData["comuna"])) {
            $response = actualizarComuna($conn, $token, $inputData["comuna"]);
        } elseif (isset($inputData["contrasena"])) {
            $response = actualizarContrasena($conn, $token, $inputData["contrasena"]);
        } else {
            $response = array("error" => "Dato inválido.");
        }

        function validarToken($token) {
        
            $key = "EcoExplorer";
        
            try {
                $decoded = JWT::decode($token, $key, ['HS256']);
        
                if (isset($decoded->data->userId) && isset($decoded->data->email)) {
                    return [
                        "rut" => $decoded->data->userId,
                        "email" => $decoded->data->email
                    ];
                } else {
                    return ["error" => "Token inválido."];
                }
            } catch (Exception $e) {
                return ["error" => "Token inválido."];
            }
        }

        function actualizarNombre($conn, $token, $nuevoNombre) {
            $userData = validarToken($token);
            if (isset($userData["error"])) return $userData;

            $stmt = $conn->prepare("UPDATE cliente SET nombre=? WHERE rut=?");
            $stmt->bind_param("ss", $nuevoNombre, $userData['rut']);
            $result = $stmt->execute();
            $stmt->close();
            return $result ? array("success" => "Nombre actualizado.") : array("error" => "Error al actualizar el nombre.");
        }

        function actualizarApellido($conn, $token, $nuevoApellido) {
            $userData = validarToken($token);
            if (isset($userData["error"])) return $userData;

            $stmt = $conn->prepare("UPDATE cliente SET apellido=? WHERE rut=?");
            $stmt->bind_param("ss", $nuevoApellido, $userData['rut']);
            $result = $stmt->execute();
            $stmt->close();
            return $result ? array("success" => "Apellido actualizado.") : array("error" => "Error al actualizar el apellido.");
        }

        function actualizarComuna($conn, $token, $nuevoComuna) {
            $userData = validarToken($token);
            if (isset($userData["error"])) return $userData;

            // Validar comuna
            $comuna_id = (int)$nuevoComuna; 
            $stmt = $conn->prepare("SELECT * FROM comuna WHERE comuna_id = ?");
            $stmt->bind_param("i", $comuna_id);
            $stmt->execute();
            $resultado = $stmt->get_result();
            $stmt->close();

            if ($resultado->num_rows === 0) {
                return array("error" => "Comuna ID no es válida.");
            }

            $stmt = $conn->prepare("UPDATE cliente SET comuna_id=? WHERE rut=?");
            $stmt->bind_param("is", $comuna_id, $userData['rut']);
            $result = $stmt->execute();
            $stmt->close();
            return $result ? array("success" => "Comuna actualizada.") : array("error" => "Error al actualizar la comuna.");
        }

        function actualizarContrasena($conn, $token, $nuevaContrasena) {
            $userData = validarToken($token);
            if (isset($userData["error"])) return $userData;

            // Validar longitud contraseña
            $longitud_minima = 8;
            if (strlen($nuevaContrasena) < $longitud_minima) {
                return array("error" => "La contraseña debe tener al menos $longitud_minima caracteres.");
            }

            $hashed_password = password_hash($nuevaContrasena, PASSWORD_DEFAULT);

            // Obtener la contraseña actual del usuario
            $stmt = $conn->prepare("SELECT contraseña FROM cliente WHERE rut=?");
            $stmt->bind_param("s", $userData['rut']);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();
            $current_password = $user['contraseña'];
            $stmt->close();

            if (password_verify($nuevaContrasena, $current_password)) {
                return array("error" => "La contraseña es la misma que la actual. Elije otra.");
            }

            $stmt = $conn->prepare("UPDATE cliente SET contraseña=? WHERE rut=?");
            $stmt->bind_param("ss", $hashed_password, $userData['rut']);
            $result = $stmt->execute();
            $stmt->close();
            return $result ? array("success" => "Contraseña actualizada.") : array("error" => "Error al actualizar la contraseña.");
        }
    }

?>