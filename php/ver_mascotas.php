<?php
include('conexion.php');
$sexo = $_POST["txtsexo"];

$datos=mysql_query("SELECT * FROM mascotas WHERE sexo ='$sexo'");
$arrDatos = array();
while ($rs=mysql_fetch_array($datos))
{
        $arrDatos[] = array_map('utf8_encode', $rs);
}
echo json_encode($arrDatos);
?>