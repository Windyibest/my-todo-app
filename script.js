// Load tasks from localStorage (if any)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDate');
    
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value.trim();
    
    if (taskText) {
        const newTask = {
            text: taskText,
            dueDate: dueDate,
            completed: false
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        
        taskInput.value = '';
        dueDateInput.value = '';
    }
}

// Function to render the tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // Task text
        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        // Due date (optional)
        if (task.dueDate) {
            const dueDate = document.createElement('span');
            dueDate.classList.add('due-date');
            dueDate.textContent = `Due: ${task.dueDate}`;
            li.appendChild(dueDate);
        }

        // "Complete" Button
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => toggleCompleted(index);

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        // Append elements
        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        
        // Mark task as completed
        if (task.completed) {
            li.classList.add('completed');
        }
        
        taskList.appendChild(li);
    });
}

// Function to toggle the completion status of a task
function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for pressing "Enter" to add task
document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initialize the task list rendering
renderTasks();

document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
// Function to delete all tasks
function deleteAllTasks() {
    tasks = [];  // Clear the tasks array
    renderTasks();  // Re-render the task list
}
