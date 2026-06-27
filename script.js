const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function addTask(){

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: taskText,
        dueDate: dueDateInput.value,
        completed: false
    });

    saveTasks();

    taskInput.value = "";
    dueDateInput.value = "";

    renderTasks();
}

function renderTasks(){

    taskList.innerHTML = "";

    const today =
    new Date().toISOString().split("T")[0];

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.classList.add("task");

        if(task.completed){
            li.classList.add("completed");
        }

        const isOverdue =
        task.dueDate &&
        task.dueDate < today &&
        !task.completed;

        if(isOverdue){
            li.style.borderLeft =
            "5px solid red";
        }

        li.innerHTML = `
            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})">

                <div>
                    <span>${task.text}</span>
                    <br>
                    <small>
                        📅 Due:
                        ${task.dueDate || "Not Set"}
                    </small>
                </div>

            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>
        `;

        taskList.appendChild(li);
    });

    taskCount.textContent = tasks.length;
}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}