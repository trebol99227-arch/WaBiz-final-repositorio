document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('contact-form');
    if (formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const negocio = document.getElementById('negocio').value.trim();
            const rubro = document.getElementById('rubro').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (nombre === "") {
                alert("Error: La casilla 'Tu nombre completo' es obligatoria.");
                return;
            }
            if (nombre.length < 3) {
                alert("Error: El nombre ingresado es demasiado corto (mínimo 3 caracteres).");
                return;
            }

            if (negocio === "") {
                alert("Error: Por favor, ingresa el 'Nombre de tu negocio'.");
                return;
            }
            if (negocio.length < 2) {
                alert("Error: El nombre del negocio debe tener al menos 2 caracteres.");
                return;
            }
            if (rubro === "") {
                alert("Error: Debes especificar qué vendes en la casilla de 'Rubro'.");
                return;
            }
            if (whatsapp === "") {
                alert("Error: El 'Número de WhatsApp' no puede quedar vacío.");
                return;
            }
            if (!/^[0-9+\s]+$/.test(whatsapp)) {
                alert("Error: El número de WhatsApp solo puede contener números y el signo '+'.");
                return;
            } 
            if (whatsapp.replace(/[^0-9]/g, "").length < 9) {
                alert("Error: El número de WhatsApp debe tener al menos 9 dígitos.");
                return;
            }
            alert("Exito: Tu solicitud de revisión gratuita ha sido enviada correctamente.");
            formulario.reset();
        });
    }
});