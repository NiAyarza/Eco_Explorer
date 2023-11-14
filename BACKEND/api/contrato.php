<?php
require_once "baseDatos.php";
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fechaInicio = $_POST['fechaInicio'];
    $fechaFin = $_POST['fechaFin'];
    $servicio_id = $_POST['servicio_id'];
    $email = $_POST['email'];

    // Convertir las fechas a objetos DateTime
    $fechaInicioObj = new DateTime($fechaInicio);
    $fechaFinObj = new DateTime($fechaFin);

    // Verificar que la fecha de fin sea mayor que la de inicio
    if ($fechaFinObj <= $fechaInicioObj) {
        echo json_encode(["error" => "La fecha de fin debe ser posterior a la fecha de inicio"]);
        exit;
    }

    // Verificar si ya existe un contrato activo para el mismo usuario
    $consulta = $conn->prepare("SELECT * FROM contrato WHERE email = ? AND FechaFin > NOW()");
    $consulta->bind_param("s", $email);
    $consulta->execute();

    // Obtener los resultados
    $resultado = $consulta->get_result();
    if ($resultado->num_rows > 0) {
        echo json_encode(["error" => "Ya existe un contrato activo para este usuario"]);
        exit;
    }

    // Preparar e insertar el nuevo contrato
    $sql = "INSERT INTO contrato (FechaInicio, FechaFin, servicio_id, email) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$fechaInicio, $fechaFin, $servicio_id, $email]);
    echo json_encode(["success" => "Contrato guardado con éxito"]);
}
?>
