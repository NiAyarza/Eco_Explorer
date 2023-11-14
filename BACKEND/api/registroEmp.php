<?php
require_once "baseDatos.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $rut = $_POST["rut"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $contraseña = $_POST["contraseña"];
    $email = $_POST["email"];
    $fecha_nacimiento = $_POST["fecha_nacimiento"];
    $comuna_id = $_POST["comuna_id"];
    
    // Validar los datos 
    // Validar datos obligatorios
    if (empty($rut) || empty($nombre) || empty($apellido) || empty($contraseña) || empty($email) || empty($fecha_nacimiento) || empty($comuna_id)) {
        die(json_encode(["message" => "Por favor, completa todos los campos."]));
    }
    // Validar mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die(json_encode("Correo electrónico no es válido."));
    }
    // Validar formato fecha nacimiento
    $fecha = DateTime::createFromFormat('Y-m-d', $fecha_nacimiento);
    $errors = DateTime::getLastErrors();
    if (!empty($errors['warning_count'])) {
        die(json_encode("Fecha de nacimiento no es válida, yyyy-mm-dd."));
    }
    // Validar Rut
    function validarRUT($rut) {
        // Eliminar puntos y guiones, y convertir a mayúsculas
        $rut = strtoupper(str_replace(array('.', '-'), '', $rut));
    
        if (preg_match('/^(\d{1,9})-([\dkK])$/', $rut, $matches)) {
            $num = $matches[1];
            $dv = $matches[2];
    
            $suma = 0;
            $multiplo = 2;
    
            for ($i = strlen($num) - 1; $i >= 0; $i--) {
                $suma += $num[$i] * $multiplo;
                $multiplo = ($multiplo % 7 == 0) ? 2 : $multiplo + 1;
            }
    
            $digito = 11 - ($suma % 11);
    
            if ($digito == 10) {
                $digito = 'K';
            }
    
            return ($digito == $dv);
        }
    
        return false;
    }

    // Validar longitud contraseña
    $longitud_minima = 8;
    if (strlen($contraseña) < $longitud_minima) {
        die(json_encode("La contraseña debe tener al menos $longitud_minima caracteres."));
    }
    
    // Hash a la contraseña
    $hashed_password = password_hash($contraseña, PASSWORD_DEFAULT);

    // Validar comuna
    $comuna_id = (int)$comuna_id; 
    $stmt = $conn->prepare("SELECT * FROM comuna WHERE comuna_id = ?");
    $stmt->bind_param("i", $comuna_id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    if ($resultado->num_rows === 0) {
        die(json_encode("Comuna ID no es válida."));
    }
    $stmt->close();

    // Preparar datos para insertar
    $stmt = $conn->prepare("INSERT INTO empleado (rut, nombre, apellido, fecha_nac, email, contraseña, comu_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssi", $rut, $nombre, $apellido, $fecha_nacimiento, $email, $hashed_password, $comuna_id);
    
    if ($stmt->execute()) {
        echo json_encode(["success" =>"Registro exitoso!"]);
    } else {
        echo(json_encode("Error: " . $stmt->error));
    }

    $stmt->close();
    $conn->close();
} else {
    echo(json_encode("Solicitud no permitida"));
}
?>
