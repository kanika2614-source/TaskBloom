
import {
  type Task,
  type TaskStatus,
  addTask,
  advanceTask,
  filterByStatus
} from "./model.js";

const form = document.getElementById("task-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const message = document.getElementById("message") as HTMLParagraphElement;
const filterButtons = document.querySelectorAll<HTMLButtonElement>("[data-filter]");

let tasks: Task[] = [];
let currentFilter: TaskStatus | "all" = "all";

function renderTasks(): void {
  taskList.replaceChildren();

  const visibleTasks =
    currentFilter === "all"
      ? tasks
      : filterByStatus(tasks, currentFilter);

  if (visibleTasks.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No tasks here yet.";
    taskList.append(emptyItem);
    return;
  }

  visibleTasks.forEach(task => {
    const item = document.createElement("li");

    const info = document.createElement("div");
    info.className = "task-info";

    const taskTitle = document.createElement("strong");
    taskTitle.textContent = task.title;

    const status = document.createElement("span");
    status.className = "status";
    status.textContent = task.status;

    info.append(taskTitle, status);

    const advanceButton = document.createElement("button");
    advanceButton.type = "button";
    advanceButton.textContent =
      task.status === "done" ? "Completed" : "Advance";
    advanceButton.disabled = task.status === "done";

    advanceButton.addEventListener("click", () => {
      tasks = advanceTask(tasks, task.id);
      renderTasks();
    });

    item.append(info, advanceButton);
    taskList.append(item);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const title = titleInput.value.trim();

  if (title.length === 0) {
    message.textContent = "Please enter a task title.";
    return;
  }

  tasks = addTask(tasks, title);
  titleInput.value = "";
  message.textContent = "Task added!";
  renderTasks();
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    if (
      selectedFilter === "all" ||
      selectedFilter === "todo" ||
      selectedFilter === "in-progress" ||
      selectedFilter === "done"
    ) {
      currentFilter = selectedFilter;
      renderTasks();
    }
  });
});

renderTasks();
