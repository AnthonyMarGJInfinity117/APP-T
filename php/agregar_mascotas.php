<?php
include('conexion.php');

$foto = $_FILES['txtfoto'];
move_uploaded_file($_FILES["file"]["tmp_name"],"imagenes/".$_FILES["file"]["name"]);
$nombre = $_POST['txtnombre'];
$sexo = $_POST['txtsexo'];
$edad = $_POST['txtedad'];
$comportamiento = $_POST['txtcomportamiento'];
$fecharescate = $_POST['txtfecha'];

if($inserta = mysql_query("INSERT INTO mascotas VALUES ('$foto','$nombre','$sexo','$edad','$comportamiento','$fecharescate')"))
{
	echo "La mascota se ingresó correctamente!!";
}
else
{
	echo "Error al ingresar la mascota, contacte al administrador!! ".mysql_error();
}
//echo json_encode($res);
?>