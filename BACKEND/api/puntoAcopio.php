<?php
header('Content-Type: application/json');
require_once "baseDatos.php"; // Asegúrate de que este archivo contiene la conexión a tu base de datos

try {
    // Asegúrate de que estos nombres de columna y relaciones coincidan con tu esquema de base de datos
    $sql = "SELECT *
            FROM puntoacopio pa";

    $result = $conn->query($sql);

    $puntosAcopio = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($puntosAcopio, $row);
        }
        echo json_encode($puntosAcopio);
    } else {
        echo json_encode(["error" => "No se encontraron puntos de acopio"]);
    }

    $conn->close();
} catch(Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
