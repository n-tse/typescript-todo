import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById(
  "new-task-form"
) as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");

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

  addListItem(newTask);
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}
