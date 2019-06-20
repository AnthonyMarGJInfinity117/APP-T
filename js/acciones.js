// JavaScript Document
$(document).on("ready",ini);

function ini()
{
	$("#btnver").on("click",vermacotas);     
    $("#btnagregar").on("click",agregarmascotas);
    $("#mensaje").hide();

}

function limpiarformulario(){
$("#mensaje").fadeOut("slow");	
$("#txtfoto").val("");
$("#txtnombre").val("");
$("#txtsexo").val("");
$("#txtedad").val("");
$("#txtcomportamiento").val("");
$("#txtfecha").val("");
}

function onSuccess(data, status)
{
    data = $.trim(data);
    $("#mensaje").text(data);
	
	limpiarformulario();
}
  
function onError(data, status)
{
    // handle an error
    $("#mensaje").text(data);
}

function agregarmascotas()
{
    var formData = $("#formularioagregar").serialize();
    $("#mensaje").fadeIn( "slow" );

    $.ajax({
        type: "POST",
        url: "php/agregar_mascotas.php",
        cache: false,
        data: formData,
        success: onSuccess,
        error: onError
    });

    return false;
}

function vermascotas()
{
	cc = $("#txtsexo").val();
	traerDatos();
}

function traerDatos()
{
    try
    {
        var strHtml = "";
		$.ajax({
				global: false,
				dataType: "html",
				async: false,
                type: "POST",
                url: $("#formulariobuscar").attr('action'),
                data: $("#formulariobuscar").serialize(),
            }).done(function (resultado) {
            	var datosRecibidos = JSON.parse(resultado);
				var lista = "";
                $.each( datosRecibidos, function( key, value ) {
                        lista += "<div id='masinfomracion'>";
						lista += "Imagen: " + value.imagen + "<br>";
                        lista += "Nombre: " + value.nombre + "<br>";
                        lista += "Sexo: " + value.sexo + "<br>";
                        lista += "Edad: " + value.edad + "<br>";
						lista += "Comportamiento: " + value.comportamiento + "<br>";
						lista += "Fecha de rescate: " + value.fecharescate;
                        lista += "</div>";
                        lista += "</li>";
                });
                $("#listaDatos").html(lista);
                $("#listaDatos").listview().listview('refresh');
        });
    }
    catch(ex)
    {
        alert("Error de datos: " + ex);
    }
}
