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

// ============================================
// CONFIRM PASSWORD TOGGLE - show/hide confirm password
// ============================================

function toggleConfirmPassword() {
    
    // Step 1 - Find the confirm password input using its id
    const confirmInput = document.getElementById('confirmPassword');
    
    // Step 2 - Find the second eye icon using its id
    const eyeIcon2 = document.getElementById('eyeIcon2');
    
    // Step 3 - Check current type and switch it
    if (confirmInput.type === 'password') {

        // Currently hidden - make it visible
        confirmInput.type = 'text';

        // Change eye icon to crossed out eye
        eyeIcon2.classList.remove('fa-eye')
        eyeIcon2.classList.add('fa-eye-slash');
    } else {

        // Currently visible - hide it again
        confirmInput.type = 'password';

        // Change icon back to normal eye
        eyeIcon2.classList.remove('fa-eye-slash');
        eyeIcon2.classList.add('fa-eye');
    }
}

// ============================================
// TOGGLE TASK - mark task complete/incomplete
// ============================================

function toggleTask(taskId) {

    // Send request to Flask to toggle this task
    fetch('/toggle-task/' + taskId, {
        method: 'POST',
    })

    // When Flask responds, reload the page
    .then(function(response) {
        if (response.ok) {
            // Reload page to show updated task status
            window.location.reload();
        }
    })

    // If something goes wrong, show error
    .catch(function(error) {
        console.error('Error toggling task:', error);
    });
}

// ============================================
// EDIT TASK - open modal with existing data
// ============================================

function editTask(taskId, taskTitle, taskDescription) {

    // Step 1 - Change modal title to "Edit Task"
    document.getElementById('modalTitle').innerHTML =
    '<i class="fas fa-edit me-2"></i>Edit Task';

    // Step 2 - Fill in the existing task data
    document.getElementById('taskTitle').value = taskTitle;
    document.getElementById('taskDescription').value = taskDescription;

    // Step 3 - Store the task id in hidden input
    document.getElementById('taskId').value = taskId;

    // Step 4 - Change action to "edit"
    document.getElementById('taskAction').value = 'edit';

    // Step 5 - Open the modal
    const modal = new bootstrap.Modal(document.getElementById('taskModal'));
    modal.show();
}