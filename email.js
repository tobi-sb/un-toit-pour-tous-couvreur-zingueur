/**
 * EmailJS Centralized Configuration and Submission Handler
 * Replace the values below with your actual EmailJS credentials
 */

const EMAILJS_CONFIG = {
    PUBLIC_KEY: '92lyoxOZzhE2q_51c',
    SERVICE_ID: 'service_b9wl9z3',
    TEMPLATE_ID: 'template_fj5f5pg', // For full contact forms (Name, Email, etc.)
    SUBSCRIBE_TEMPLATE_ID: 'template_ss0tjem', // For email-only forms (Footer/CTA)
    TO_EMAIL: 'tobibelaw2@gmail.com'
};

// Initialize EmailJS
(function() {
    // Check if emailjs is loaded
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
})();

/**
 * Handle form submissions
 */
document.addEventListener('submit', function(event) {
    const form = event.target;
    
    // Check if the form is one of our target forms
    const isContactForm = form.classList.contains('contact-form') || 
                         form.classList.contains('city-contact-form') ||
                         form.classList.contains('footer-form-content') ||
                         form.classList.contains('subscribe-form');
    
    if (!isContactForm) return;

    // Prevent default submission
    event.preventDefault();

    // Intelligent Name Mapping (Ensures EmailJS gets data even if names were missing)
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (!input.name) {
            const placeholder = (input.placeholder || '').toLowerCase();
            if (input.type === 'email') input.name = 'email';
            else if (input.type === 'tel') input.name = 'phone';
            else if (placeholder.includes('nom')) input.name = 'name';
            else if (input.tagName === 'TEXTAREA') input.name = 'message';
            else if (input.id) input.name = input.id;
        }
        
        // Final normalization to ensure the template receives 'name'
        if (input.name === 'fullname' || input.name === 'footer-name') {
            input.name = 'name';
        }
    });

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'Envoi en cours...';
    submitBtn.disabled = true;

    // Dynamically add the TO_EMAIL to the form before sending
    let hiddenInput = form.querySelector('input[name="to_email"]');
    if (!hiddenInput) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'to_email';
        form.appendChild(hiddenInput);
    }
    hiddenInput.value = EMAILJS_CONFIG.TO_EMAIL;

    // Determine which template to use
    const isSubscribeOnly = form.classList.contains('footer-form-content') || 
                           form.classList.contains('subscribe-form');
    
    const targetTemplateID = isSubscribeOnly ? EMAILJS_CONFIG.SUBSCRIBE_TEMPLATE_ID : EMAILJS_CONFIG.TEMPLATE_ID;

    // Send using EmailJS (Standard sendForm call)
    emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, targetTemplateID, form)
        .then(function() {
            // Success
            showToast('Merci ! Votre message a été envoyé avec succès.', 'success');
            form.reset();
        }, function(error) {
            // Error
            showToast("Oups ! Une erreur s'est produite. Veuillez nous contacter directement.", 'error');
            console.error('EmailJS Error:', error);
        })
        .finally(function() {
            // Restore button state
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        });
});

/**
 * Toast Notification System
 */
function showToast(message, type = 'success') {
    // Check if a toast container already exists, if not, create it
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 100000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }

    // Create the toast element
    const toast = document.createElement('div');
    const colors = window.THEME_COLORS || { primary: '#FF6600', error: '#d9534f', secondary: '#0A2342', white: '#ffffff', overlay: 'rgba(0,0,0,0.2)' };
    const accentColor = type === 'success' ? colors.success : colors.error;
    
    toast.style.cssText = `
        background-color: ${colors.secondary};
        color: ${colors.white};
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px ${colors.overlay};
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border-left: 5px solid ${accentColor};
    `;

    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}" style="color: ${accentColor}; font-size: 20px;"></i>
        <span style="font-weight: 500; font-size: 15px;">${message}</span>
    `;

    container.appendChild(toast);

    // Initial Trigger for slide-in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Fade and Remove after 5 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 5000);
}
