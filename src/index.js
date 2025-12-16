import { greeting, projectLogic } from "./script.js";
import "./styles.css";

console.log(greeting);

projectLogic.addProject("homework");

console.log(projectLogic.myProjects);
projectLogic.myProjects[0].addTask("math", "algebra", "24-10-2025", "high");
projectLogic.myProjects[0].addTask('english', 'essay', '30-10-2025', 'medium');
// projectLogic.myProjects[0].deleteTask(1);
console.log(projectLogic.myProjects[0].tasks);
projectLogic.myProjects[0].editTask(1, 'chinese', 'practice test', '30-11-2025', 'low', 'complete');

// console.log(myProjects[0]);
// // console.log(myProjects[0].tasks);

// myProjects[0].tasks[1].priority = 'high';
// console.log(myProjects[0].tasks);
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");
const clearProjectDisplay = () => sidebar.innerHTML = '';
const addProject = document.querySelector("#addProject");

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
            const indexLook = projects.findIndex(item => item.id == x);
            // console.log(projects[indexLook].tasks); 
            let projectTasks = projects[indexLook].tasks;
            const BtnAddTask = document.createElement("button");
            BtnAddTask.classList.add("addTaskBtn");
            BtnAddTask.textContent = "Add Task";
            main.appendChild(BtnAddTask);

            BtnAddTask.addEventListener('click', () => {
                //create task form
            })

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
                btnEditTask.textContent = 'Edit Task';

                btnEditTask.addEventListener("click", () => {
                    //edit task form
                })

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
            };


        });
        div.appendChild(showTasksButton);

    }; 
};

displayProjects();

addProject.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProjectName = document.querySelector("#projectName").value;
    projectLogic.addProject(newProjectName);
    clearProjectDisplay();
    displayProjects();
})