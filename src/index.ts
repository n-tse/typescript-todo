import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  // ? is for optional chaining, since value of 'input' could possibly be null if id doesn't exist
  // basically ensures that 'input' will exist for any following lines
  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  saveTasks();

  addListItem(newTask);
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  item.dataset.id = task.id;
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-task-button";

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });

  deleteButton.addEventListener("click", () => {
    deleteTask(task);
  });

  label.append(checkbox, task.title, deleteButton);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON === null) return [];
  return JSON.parse(taskJSON);
}

function deleteTask(task: Task) {
  const index = tasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks();
    const listItem = document.querySelector(`li[data-id="${task.id}"]`);
    if (listItem) {
      listItem.remove();
    }
  }
}
