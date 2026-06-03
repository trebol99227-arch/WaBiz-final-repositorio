document.addEventListener('DOMContentLoaded', function() {

  const burger  = document.getElementById('burger');
  const navMenu = document.getElementById('nav-menu');

  if (burger && navMenu) {
    burger.addEventListener('click', function() {
      navMenu.classList.toggle('open');
    });
  }

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const items = document.querySelectorAll('.faq-item');
  if (items.length > 0) {
    for (let j = 0; j < items.length; j++) {
      const pregunta = items[j].querySelector('.faq-pregunta');
      if (pregunta) {
        pregunta.addEventListener('click', function() {
          this.parentElement.classList.toggle('open');
        });
      }
    }
  }

  const input  = document.getElementById('inputMensaje');
  const boton  = document.getElementById('botonEnviar');
  const cuerpo = document.getElementById('cuerpoChat');

  if (input && boton && cuerpo) {
    
    const planes = {
      "001": {
        id: "001",
        nombre: "Basico",
        precio: 120,
        descripcion: "Ideal para empezar a profesionalizar tu perfil.",
        incluye: "Revision de perfil, recomendaciones de mejora, guia basica de optimizacion."
      },
      "002": {
        id: "002",
        nombre: "Profesional",
        precio: 220,
        descripcion: "Optimizacion completa para negocios activos.",
        incluye: "Optimizacion completa del perfil, configuracion de catalogo, mensajes automaticos personalizados."
      },
      "003": {
        id: "003",
        nombre: "Completo",
        precio: 350,
        descripcion: "La solucion mas completa para maximizar tus ventas.",
        incluye: "Auditoria completa, catalogo, mensajes automaticos, plantillas comerciales y seguimiento personalizado."
      }
    };


    input.addEventListener('input', function() {
      const hayTexto = input.value.trim() !== '';
      boton.disabled = !hayTexto;
    });


    boton.addEventListener('click', enviarMensaje);


    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        enviarMensaje();
      }
    });

    function enviarMensaje() {
      const texto = input.value.trim();
      if (texto === '') return;

      agregarMensaje('usuario', texto);
      input.value = '';
      boton.disabled = true;

      setTimeout(function() {
        procesarRespuesta(texto);
      }, 500);
    }

    function agregarMensaje(tipo, contenidoHTML) {
      const mensaje = document.createElement('div');
      mensaje.className = 'mensaje ' + tipo;
      mensaje.innerHTML = contenidoHTML;
      cuerpo.appendChild(mensaje);
      cuerpo.scrollTop = cuerpo.scrollHeight;
    }

    function procesarRespuesta(texto) {
      const mensaje = texto.toLowerCase();


      if (mensaje === '/planes') {
        let respuesta = '<strong>Nuestros planes disponibles:</strong><br><br>';
        for (const id in planes) {
          const p = planes[id];
          respuesta += '<strong>' + p.nombre + '</strong> (ID: ' + p.id + ') - Desde S/ ' + p.precio + '<br>';
        }
        respuesta += '<br><em>Escribe el nombre o ID de un plan para ver mas detalles.</em>';
        agregarMensaje('bot', respuesta);
        return;
      }

      let encontrado = null;
      for (const id in planes) {
        const p = planes[id];
        if (mensaje.includes(p.nombre.toLowerCase()) || mensaje.includes(p.id)) {
          encontrado = p;
          break;
        }
      }

      if (encontrado) {
        const detalle = '<strong>Plan ' + encontrado.nombre + '</strong><br>' +
          '<strong>Precio:</strong> Desde S/ ' + encontrado.precio + '<br>' +
          '<strong>Descripcion:</strong> ' + encontrado.descripcion + '<br>' +
          '<strong>Incluye:</strong> ' + encontrado.incluye;
        agregarMensaje('bot', detalle);

        let otros = '';
        for (const id in planes) {
          if (planes[id].id !== encontrado.id) {
            otros += planes[id].nombre + ' (ID: ' + planes[id].id + '), ';
          }
        }
        otros = otros.slice(0, -2);
        setTimeout(function() {
          agregarMensaje('bot', 'Tambien puedes consultar: ' + otros);
        }, 600);
        return;
      }

      agregarMensaje('bot', respuestaGenerica(mensaje));
    }

    function respuestaGenerica(mensaje) {
      if (mensaje.includes('hola') || mensaje.includes('buenas')) {
        return '¡Hola! Escribe "/planes" para ver nuestros servicios de optimización de WhatsApp.';
      } else if (mensaje.includes('precio') || mensaje.includes('costo') || mensaje.includes('cuanto')) {
        return 'Tenemos planes accesibles desde S/ 120. Escribe "/planes" para ver la lista completa.';
      } else if (mensaje.includes('gracias')) {
        return '¡Con mucho gusto! Si tienes más dudas, aquí sigo disponible.';
      } else if (mensaje.includes('contacto') || mensaje.includes('whatsapp')) {
        return 'Puedes escribir a nuestro canal comercial directo haciendo click en el enlace del menú o llamando al +51 999 999 999.';
      } else {
        return 'No alcancé a entender tu consulta. Por favor escribe "/planes" o menciona el plan por el cual te interesas (Básico, Profesional o Completo).';
      }
    }
  }
});