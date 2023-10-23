<?php
require_once "baseDatos.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($conn->connect_error) {
    die(json_encode(["message" => "Coneccion fallida: " . $conn->connect_error]));
}

$sql = "SELECT comuna_id, nombre FROM comuna";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $comunas = [];
    while($row = $result->fetch_assoc()) {
        array_push($comunas, $row);
    }
    echo json_encode($comunas);
} else {
    echo json_encode(["message" => "No se encontraron comunas"]);
}

$conn->close();
?>
