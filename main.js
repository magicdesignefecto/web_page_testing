/**
 * Magic Design Efecto — Main JavaScript
 * Handles: Lucide icons init, contact form submission
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ── Initialize Lucide Icons ──
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ── Contact Form Handler ──
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const originalContent = submitBtn.innerHTML;

        // UI: loading state
        submitBtn.innerHTML = '<span>ENVIANDO...</span> <i class="fas fa-circle-notch fa-spin"></i>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        try {
            const response = await fetch(
                'https://formsubmit.co/ajax/contacto@magicdesignefecto.com',
                { 
                    method: 'POST', 
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: new FormData(contactForm) 
                }
            );
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Error de servidor');

            Swal.fire({
                title: '¡Solicitud Segura Enviada!',
                text: 'Hemos recibido sus datos encriptados. Un consultor sénior analizará su caso.',
                icon: 'success',
                background: '#0b1121',
                color: '#ffffff',
                confirmButtonColor: '#2563eb',
                confirmButtonText: 'ENTENDIDO',
            });

            contactForm.reset();
        } catch {
            Swal.fire({
                title: 'Error de Conexión',
                text: 'Hubo un problema de red. Por favor intente de nuevo o use el botón de WhatsApp.',
                icon: 'error',
                background: '#0b1121',
                color: '#ffffff',
                confirmButtonColor: '#d33',
            });
        } finally {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
});