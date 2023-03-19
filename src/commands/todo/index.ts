// Import the required modules at the beginning of your main.ts file
import * as fs from 'fs';
import * as path from 'path';

// Path to the todos.json file
const todosFilePath = path.join(__dirname, 'todos.json');

// Read the current contents of the todos.json file
function readTodos(): string[] {
  if (!fs.existsSync(todosFilePath)) {
    return [];
  }

  const todosJSON = fs.readFileSync(todosFilePath, 'utf-8');

  return JSON.parse(todosJSON);
}

// Write the updated contents to the todos.json file
function writeTodos(todos: string[]): void {
  const todosJSON = JSON.stringify(todos, null, 2);
  fs.writeFileSync(todosFilePath, todosJSON);
}

export function addTodo(newItem: string): void {

  if (!newItem) {
    console.log('Please provide a todo item to add.');
    return;
  }

  const todos = readTodos();
  
  todos.push(newItem);
  writeTodos(todos);

  console.log(`Added new todo item: ${newItem}`);
}

export function removeTodo(index: number): void {

  if (isNaN(index)) {
    console.log('Please provide the index of the todo item to remove.');
    return;
  }

  const todos = readTodos();

  if (index < 0 || index >= todos.length) {
    console.log('Invalid index provided. Please provide a valid index.');
    return;
  }

  const removedItem = todos.splice(index, 1)[0];
  writeTodos(todos);

  console.log(`Removed todo item: ${removedItem}`);
}

export function listAllTodo(): void {
  const todos = readTodos();
  console.log('All todo items:');
  todos.forEach((todo, index) => {
    console.log(`${index}. ${todo}`);
  });
}

export function clearAllTodos(): void {
  writeTodos([]);
  console.log('Cleared all todo items.');
}
