<?php
    require_once "baseDatos.php";
    
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $response = array();

        $inputData = json_decode(file_get_contents("php://input"), true);
        $email = $inputData["email"] ?? null;

        if (!$email) {
            $response = array("error" => "Se requiere email para la autenticación.");
            echo json_encode($response);
            exit();
        }

        if (isset($inputData["nombre"])) {
            $response = actualizarNombre($conn, $email, $inputData["nombre"]);
        } elseif (isset($inputData["apellido"])) {
            $response = actualizarApellido($conn, $email, $inputData["apellido"]);
        } elseif (isset($inputData["comuna"])) {
            $response = actualizarComuna($conn, $email, $inputData["comuna"]);
        } elseif (isset($inputData["contrasena"])) {
            $response = actualizarContrasena($conn, $email, $inputData["contrasena"]);
        } else {
            $response = array("error" => "Dato inválido.");
        }

        echo json_encode($response);
    }

    function obtenerRutPorEmail($conn, $email) {
        $stmt = $conn->prepare("SELECT rut FROM cliente WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            return $row['rut'];
        }
        return false;
    }

        function actualizarNombre($conn, $email, $nuevoNombre) {
            if (isset($userData["error"])) return $userData;

            $stmt = $conn->prepare("UPDATE cliente SET nombre=? WHERE email=?");
            $stmt->bind_param("ss", $nuevoNombre, $email);
            $result = $stmt->execute();
            $stmt->close();
            return $result ? array("success" => "Nombre actualizado.") : array("error" => "Error al actualizar el nombre.");
        }

        function actualizarApellido($conn, $email, $nuevoApellido) {
            if (isset($userData["error"])) return $userData;

            $stmt = $conn->prepare("UPDATE cliente SET apellido=? WHERE email=?");
            $stmt->bind_param("ss", $nuevoApellido, $email);
            $result = $stmt->execute();
            $stmt->close();
            return $result ? array("success" => "Apellido actualizado.") : array("error" => "Error al actualizar el apellido.");
        }

        function actualizarComuna($conn, $email, $nuevoComuna) {
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

            $stmt = $conn->prepare("UPDATE cliente SET comuna_id=? WHERE email=?");
            $stmt->bind_param("is", $comuna_id, $email);
            $result = $stmt->execute();
            $stmt->close();
            return $result ? array("success" => "Comuna actualizada.") : array("error" => "Error al actualizar la comuna.");
        }

        function actualizarContrasena($conn, $email, $nuevaContrasena) {
            if (isset($userData["error"])) return $userData;

            // Validar longitud contraseña
            $longitud_minima = 8;
            if (strlen($nuevaContrasena) < $longitud_minima) {
                return array("error" => "La contraseña debe tener al menos $longitud_minima caracteres.");
            }

            $hashed_password = password_hash($nuevaContrasena, PASSWORD_DEFAULT);

            // Obtener la contraseña actual del usuario
            $stmt = $conn->prepare("SELECT contraseña FROM cliente WHERE email=?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();
            $current_password = $user['contraseña'];
            $stmt->close();

            if (password_verify($nuevaContrasena, $current_password)) {
                return array("error" => "La contraseña es la misma que la actual. Elije otra.");
            }

            $stmt = $conn->prepare("UPDATE cliente SET contraseña=? WHERE email=?");
            $stmt->bind_param("ss", $hashed_password, $email);
            $result = $stmt->execute();
            $stmt->close();
            return $result ? array("success" => "Contraseña actualizada.") : array("error" => "Error al actualizar la contraseña.");
        }
    

?>