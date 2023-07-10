import { v4 as uuidV4 } from 'uuid';

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("#new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");

form?.addEventListener("submit", e => {
  e.preventDefault();
  // ? is for optional chaining, since value of 'input' could possibly be null if id doesn't exist
  // basically ensures that 'input' will exist for any following lines
  if (input?.value == "" || input?.value == null) return;

  const task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
})