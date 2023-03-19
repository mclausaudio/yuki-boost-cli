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

function addTodo(args: string[]): void {
  const newItem = args[0];

  if (!newItem) {
    console.log('Please provide a todo item to add.');
    return;
  }

  const todos = readTodos();
  
  todos.push(newItem);
  writeTodos(todos);

  console.log(`Added new todo item: ${newItem}`);
}

function removeTodo(args: string[]): void {
  const indexToRemove = parseInt(args[0]);

  if (isNaN(indexToRemove)) {
    console.log('Please provide the index of the todo item to remove.');
    return;
  }

  const todos = readTodos();

  if (indexToRemove < 0 || indexToRemove >= todos.length) {
    console.log('Invalid index provided. Please provide a valid index.');
    return;
  }

  const removedItem = todos.splice(indexToRemove, 1)[0];
  writeTodos(todos);

  console.log(`Removed todo item: ${removedItem}`);
}

function listAllTodo(): void {
  const todos = readTodos();
  console.log('All todo items:');
  todos.forEach((todo, index) => {
    console.log(`${index}. ${todo}`);
  });
}

function clearAllTodos(): void {
  writeTodos([]);
  console.log('Cleared all todo items.');
}

export default function handleTodoCommand(args: string[]): void {
  const subCommand = args[0];
  const todoArgs = args.slice(1);
  console.log(subCommand, todoArgs)
  switch (subCommand) {
    case 'list':
      listAllTodo();
      break;
    case 'add':
      addTodo(todoArgs);
      break;
    case 'remove':
      removeTodo(todoArgs);
      break;
    case 'nuke':
      clearAllTodos();
      break;
    default:
      console.log('Invalid todo subcommand provided. Please provide a valid subcommand.');
      break;
  }
}
