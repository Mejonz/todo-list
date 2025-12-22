import { greeting, projectLogic } from "./script.js";
import "./styles.css";

console.log(greeting);

projectLogic.addProject("homework");

console.log(projectLogic.myProjects);
projectLogic.myProjects[0].addTask("math", "algebra", "2025-11-22", "high");
projectLogic.myProjects[0].addTask('english', 'essay', '2025-12-12', 'medium');
// projectLogic.myProjects[0].deleteTask(1);
console.log(projectLogic.myProjects[0].tasks);
projectLogic.myProjects[0].editTask(1, 'chinese', 'practice test', '2025-12-25', 'low', 'complete');

// console.log(myProjects[0]);
// // console.log(myProjects[0].tasks);

// myProjects[0].tasks[1].priority = 'high';
// console.log(myProjects[0].tasks);
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");
const extraFormBox = document.querySelector(".extraFormBox");
const extraButtonBox = document.querySelector(".extraButtonBox");
const editTaskFormBox = document.querySelector(".editTaskFormBox");
const header = document.querySelector("header");
const clearProjectDisplay = () => sidebar.innerHTML = '';
const clearExtraFormBox = () => extraFormBox.innerHTML = '';
const clearExtraButtonBox = () => extraButtonBox.innerHTML = '';
const clearEditTaskFormBox = () => editTaskFormBox.innerHTML = '';
const addProjectForm = document.querySelector("#addProject");


function displayProjects() {
    const projects = projectLogic.myProjects;
    const clearMainDisplay = () => main.innerHTML = '';

    for (let project of projects) {
        const div = document.createElement("div");
        div.classList.add('projectCard');
        sidebar.appendChild(div);
        div.textContent = `${project.name}`;
        // console.log(project.name);
        div.id = `${project.id}`;
        let x = div.id;
        
        const newButton = document.createElement('button');
        newButton.textContent = 'Delete';
        newButton.addEventListener('click', () => {
            const removeElement = document.getElementById(x);
            removeElement.remove();
            const indexRemove = projects.findIndex(item => item.id == x);
            projects.splice(indexRemove, 1);
            clearMainDisplay();
        });
        div.append(newButton);

        const showTasksButton = document.createElement('button');
        showTasksButton.textContent = 'Show Tasks';
        showTasksButton.addEventListener('click', () => {
            clearMainDisplay();
            clearExtraFormBox();
            clearExtraButtonBox();
            
            const indexLook = projects.findIndex(item => item.id == x);
            // console.log(projects[indexLook].tasks); 
            let projectTasks = projects[indexLook].tasks;

            // Add Task Form
            function addTaskForm() {
                const addTaskFormContainer = document.createElement("div");
                addTaskFormContainer.id = "addTaskFormContainer";
                extraFormBox.appendChild(addTaskFormContainer);
                addTaskFormContainer.style.display = "none";

                const formAddTask = document.createElement("form");
                formAddTask.id = "addTaskForm";
                addTaskFormContainer.appendChild(formAddTask);
                formAddTask.innerHTML = `
                <div>
                    <label for="taskTitle">Task Title:</label>
                    <input type="text" name="taskTitle" id="taskTitle">
                </div>
                <div>
                    <label for="taskDueDate">Due Date:</label>
                    <input type="date" name="taskDueDate" id="taskDueDate">
                </div>
                <div>
                    <label for="taskPriority">Task Priority:</label>
                    <select name="taskPriority" id="taskPriority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div>
                    <label for="taskDesc">Task Description</label>
                    <textarea name="taskDesc" id="taskDesc"></textarea>
                </div>
                <button type="submit" id="AddTaskBtn">Add Task</button>
                `;

                return { addTaskFormContainer, formAddTask };
            };
            const { addTaskFormContainer, formAddTask } = addTaskForm();

            addTaskForm();

            // console.log(formAddTask);

            //show or hide add task form
            function showAddTaskForm() {
                const btnShowForm = document.createElement('button');
                btnShowForm.textContent = "Add a task";
                extraButtonBox.appendChild(btnShowForm);
                btnShowForm.addEventListener('click', () => {
                    if (addTaskFormContainer.style.display !== "block") {
                        addTaskFormContainer.style.display = "block";
                    }
                    else {
                        addTaskFormContainer.style.display = "none";
                    }
                });
                // return btnShowForm;
            };

            showAddTaskForm();
            
            function displayTasks() {
                let indexTask = 0;
                for (let task of projectTasks) {
                    const div = document.createElement("div");
                    div.classList.add('toDoCard');
                    main.appendChild(div);

                    const toDoTitle = document.createElement("h3");
                    div.appendChild(toDoTitle);
                    toDoTitle.textContent = `${task.title}`;

                    const toDoDueDate = document.createElement("p");
                    div.appendChild(toDoDueDate);
                    toDoDueDate.textContent = "Due: " + `${task.dueDate}`;

                    const toDoPriority = document.createElement("p");
                    div.appendChild(toDoPriority);
                    toDoPriority.textContent = "Priority: " + `${task.priority}`;

                    const toDoDesc = document.createElement("p");
                    div.appendChild(toDoDesc);
                    toDoDesc.textContent =`${task.description}`;

                    const btnEditTask = document.createElement("button");
                    div.appendChild(btnEditTask);
                    btnEditTask.id = indexTask;
                    let btnEditTaskID = btnEditTask.id;
                    btnEditTask.textContent = 'Edit Task';

                    btnEditTask.addEventListener("click", (e) => {
                        //edit task form
                        e.preventDefault();
                        const editTaskFormContainer = document.createElement('div');
                        editTaskFormContainer.id = "editTaskFormContainer";
                        editTaskFormBox.appendChild(editTaskFormContainer);
                        // editTaskFormContainer.style.display = "none";
                        // console.log(task.title);

                        const formEditTask = document.createElement('form');
                        formEditTask.id = "formEditTask";
                        editTaskFormContainer.appendChild(formEditTask);

                        formEditTask.innerHTML = `
                        <div>
                            <label for="editTaskTitle">Task Title:</label>
                            <input type="text" name="editTaskTitle" id="editTaskTitle">
                        </div>
                        <div>
                            <label for="editTaskDueDate">Due Date:</label>
                            <input type="date" name="editTaskDueDate" id="editTaskDueDate">
                        </div>
                        <div>
                            <label for="editTaskPriority">Task Priority:</label>
                            <select name="editTaskPriority" id="editTaskPriority">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <label for="editTaskDesc">Task Description</label>
                            <textarea name="editTaskDesc" id="editTaskDesc"></textarea>
                        </div>
                        <div>
                            <label for="editTaskComplete">Task Complete:</label>
                            <select name="editTaskComplete" id="editTaskComplete">
                                <option value="Complete">Complete</option>
                                <option value="Incomplete">Incomplete</option>
                            </select>
                        </div>
                        <button type="submit" id="btnSubmitEditTask">Submit</button>
                        `;

                        document.querySelector('#editTaskTitle').defaultValue = task.title;
                        document.querySelector('#editTaskDueDate').defaultValue = task.dueDate;
                        document.querySelector('#editTaskPriority').defaultValue = task.priority;
                        document.querySelector('#editTaskDesc').defaultValue = task.description;
                        document.querySelector('#editTaskComplete').defaultValue = task.complete;

                        

                        const btnSubmitEditTask = document.querySelector("#btnSubmitEditTask");
                        btnSubmitEditTask.addEventListener('click', (e) => {
                            e.preventDefault();
                            // let taskID = btnEditTaskID;
                            const editTaskTile = document.querySelector('#editTaskTitle').value;
                            const editTaskDueDate = document.querySelector('#editTaskDueDate').value;
                            const editTaskPriority = document.querySelector('#editTaskPriority').value;
                            const editTaskDesc = document.querySelector('#editTaskDesc').value;
                            const editTaskComplete = document.querySelector('#editTaskComplete').value;

                            projects[indexLook].editTask(btnEditTaskID, editTaskTile, editTaskDesc, editTaskDueDate, editTaskPriority, editTaskComplete);
                            // console.log(task);
                            clearMainDisplay();
                            displayTasks();
                            clearEditTaskFormBox();
                            
                        });
                    });

                    const btnTaskStatus = document.createElement("button");
                    div.appendChild(btnTaskStatus);
                    btnTaskStatus.textContent = `${task.complete}`;

                    btnTaskStatus.addEventListener('click', () => {
                        if (task.complete == 'Incomplete') {
                            task.complete = 'Complete';
                            // console.log(task.complete);
                            btnTaskStatus.textContent = `${task.complete}`;
                        }
                        else {
                            task.complete = 'Incomplete';
                            // console.log(task.complete);
                            btnTaskStatus.textContent = `${task.complete}`;
                        }
                    });

                    const btnDeleteTask = document.createElement("button");
                    div.appendChild(btnDeleteTask);
                    let btnDeleteTaskID = indexTask;
                    btnDeleteTask.textContent = "Delete Task";

                    btnDeleteTask.addEventListener('click', () => {
                        projects[indexLook].tasks.splice(btnDeleteTaskID, 1);
                        console.log(projects[indexLook].tasks);
                        clearMainDisplay();
                        displayTasks();
                    })

                    indexTask++; 
                };
            };

            displayTasks();

            const BtnAddTask = document.querySelector('#AddTaskBtn');
            BtnAddTask.addEventListener('click', (e) => {
                e.preventDefault();
                const taskTitle = document.querySelector('#taskTitle').value;
                const taskDueDate = document.querySelector('#taskDueDate').value;
                const taskPriority = document.querySelector('#taskPriority').value;
                const taskDesc = document.querySelector('#taskDesc').value;
                projects[indexLook].addTask(taskTitle, taskDesc, taskDueDate, taskPriority);
                clearMainDisplay();
                // clearExtraFormBox();
                displayTasks();
                formAddTask.reset();
                addTaskFormContainer.style.display = "none";
                // addTaskForm();
                // showAddTaskForm();
                
                
                // console.log(projects[indexLook].tasks);
                // console.log(projects[indexLook].addTask(taskTitle, taskDesc, taskDueDate, taskPriority));
            });
        });
        div.appendChild(showTasksButton);

    }; 
};

displayProjects();

addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProjectName = document.querySelector("#projectName").value;
    projectLogic.addProject(newProjectName);
    clearProjectDisplay();
    displayProjects();
    addProjectForm.reset();
});