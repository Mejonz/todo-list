export const greeting = "Hello World!";


const projectLogic =  (() => {
    // Projects array
    const myProjects = [];

    // Class constructor

    class Project {
        constructor(name) {
            this.name = name;
            this.id = crypto.randomUUID();
            this.tasks = [];
        }

        addTask(title, description, dueDate, priority) {
            const complete = 'Incomplete';
            this.tasks.push({
                title,
                description,
                dueDate,
                priority,
                complete
            });
        }

        deleteTask(taskId) {
            this.tasks.splice(taskId, 1);
        }

        editTask(taskIndex, title, description, dueDate, priority, complete) {
            this.tasks[taskIndex].title = title;
            this.tasks[taskIndex].description = description;
            this.tasks[taskIndex].dueDate = dueDate;
            this.tasks[taskIndex].priority = priority;
            this.tasks[taskIndex].complete = complete;
        }
    }

    function addProject(name) {
        let newProject = new Project(name);
        myProjects.push(newProject);
    }

    return { Project, addProject, myProjects }
})();

export { projectLogic };
