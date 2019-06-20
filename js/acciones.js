// JavaScript Document
$(document).on("ready",ini);

function ini()
{
	$("#btnver").on("click",vermacotas);     
    $("#btnagregar").on("click",agregarmascotas);
    $("#mensaje").hide();

}

function onSuccess(data, status)
{
    data = $.trim(data);
    $("#mensaje").text(data);
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
	cc = $("#txtDoc").val();
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
			     		if(value.imagen == "nofoto.jpg")
                        {
                            lista += "<li><div id='imagen'><img src='imagenes/nofoto.jpg' width='60' height='80' ></div>";
                        }
                        else
                        {
                            lista += "<li><div id='imagen'><img src='imagenes/" + value.imagen + "' width='60' ></div>";
                        }
                        lista += "<div id='masinfomracion'>";
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
