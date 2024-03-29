const tasks = [];

const addNewTask = (newTaskContent) => {
    tasks.push({
        content: newTaskContent,
        done: false,
    });

    render();
};

const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
};

const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
};

const bindEvents = () => {
    const buttonsDone = document.querySelectorAll(".js-done");
    buttonsDone.forEach((button, index) => {
        button.addEventListener("click", () => {
            toggleTaskDone(index);
        });
    });

    const buttonsDelete = document.querySelectorAll(".js-delete");
    buttonsDelete.forEach((button, index) => {
        button.addEventListener("click", () => {
            removeTask(index);
        })
    })
}

const render = () => {
    let htmlString = "";
    for (const task of tasks) {
        htmlString += `
                <li class="taskList__task" ${task.done ? 'style="text-decoration: line-through;"' : ""}>
                 <button class="taskList__buttonDone js-done">✓</button>
                 <span class="taskList__text">
                ${task.content}
                </span>
                <button class="taskList__buttonRemove js-delete">🗑️</button>
            </li>
        `;
    }
    document.querySelector(".js-taskList").innerHTML = htmlString;
    bindEvents();
};

const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskContent = document.querySelector(".form__input").value.trim();
    if (newTaskContent === "") {
        return;
    }
    addNewTask(newTaskContent);
    document.querySelector(".form__input").value = "";
};

const init = () => {
    const form = document.querySelector(".form");
    form.addEventListener("submit", onFormSubmit);
    render();
    bindEvents();
};

init();
