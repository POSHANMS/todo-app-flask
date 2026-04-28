// ============================================
// PASSWORD TOGGLE - show/hide password
// ============================================

function togglePassword() {
    // Step 1 - Find the password input box using its id
    const passwordInput = document.getElementById('password');

    // Step 2 - Find the eye icon using its id
    const eyeIcon = document.getElementById('eyeIcon');

    // Step 3 - Chech current type and switch it
    if (passwordInput.type === 'password') {

        // Currently hidden - make it visible
        passwordInput.type = 'text';

        // Change eye icon to crossed out eye
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {

        // Currently visible - hide it again
        passwordInput.type = 'password';

        // Change icon back to normal eye
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}