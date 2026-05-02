// ============================================
// PASSWORD TOGGLE - show/hide password
// ============================================

function togglePassword() {

    // Find the password input box using its id
    const passwordInput = document.getElementById('password');

    // Find the eye icon using its id
    const eyeIcon = document.getElementById('eyeIcon');

    // Check current type and switch it
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

    // Find the confirm password input using its id
    const confirmInput = document.getElementById('confirmPassword');

    // Find the second eye icon using its id
    const eyeIcon2 = document.getElementById('eyeIcon2');

    // Check current type and switch it
    if (confirmInput.type === 'password') {

        // Currently hidden - make it visible
        confirmInput.type = 'text';

        // Change eye icon to crossed out eye
        eyeIcon2.classList.remove('fa-eye');
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

    // Change modal title to "Edit Task"
    document.getElementById('modalTitle').innerHTML =
        '<i class="fas fa-edit me-2"></i>Edit Task';

    // Fill in the existing task data
    document.getElementById('taskTitle').value = taskTitle;
    document.getElementById('taskDescription').value = taskDescription;

    // Store the task id in hidden input
    document.getElementById('taskId').value = taskId;

    // Change action to "edit"
    document.getElementById('taskAction').value = 'edit';

    // Open the modal
    const modal = new bootstrap.Modal(document.getElementById('taskModal'));
    modal.show();
}

// ============================================
// DELETE TASK - delete a task with confirmation
// ============================================

function deleteTask(taskId) {

    // Ask user to confirm deletion
    const confirmed = confirm('Are you sure you want to delete this task?');

    // Only delete if user clicked OK
    if (confirmed) {

        // Send delete request to Flask
        fetch('/delete-task/' + taskId, {
            method: 'POST',
        })

        // When Flask responds, remove card and update stats
        .then(function(response) {
            if (response.ok) {
                // Remove task card from page instantly
                document.getElementById('task-' + taskId).remove();

                // Update stats immediately
                updateStats();
            }
        })

        // If something goes wrong, show error
        .catch(function(error) {
            console.error('Error deleting task:', error);
        });
    }
}

// ============================================
// UPDATE STATS - recalculate task counts
// ============================================

function updateStats() {

    // Count all pending task cards on page
    const pendingCards = document.querySelectorAll('.task-card:not(.completed)');
    const pendingCount = pendingCards.length;

    // Count all completed task cards on page
    const completedCards = document.querySelectorAll('.task-card.completed');
    const completedCount = completedCards.length;

    // Calculate total
    const totalCount = pendingCount + completedCount;

    // Update all three stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers[0].textContent = totalCount;
    statNumbers[1].textContent = pendingCount;
    statNumbers[2].textContent = completedCount;

    // Update section badges
    const badges = document.querySelectorAll('.section-title .badge');
    badges[0].textContent = pendingCount;
    badges[1].textContent = completedCount;
}