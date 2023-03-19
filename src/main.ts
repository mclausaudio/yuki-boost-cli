#!/usr/bin/env node
import commander from 'commander';

const packageJson = require('../package.json');
import { getWeather } from './commands/weather';
import { listAllTodo, addTodo, removeTodo, clearAllTodos } from './commands/todo';

const program = new commander.Command();

program
  .version(packageJson.version)
  .description(packageJson.description)
  .name('yukiboost')
  .usage('<command> [options]');

program
  .command('weather')
  .argument('<zipCode>', 'The zip code to get the weather for')
  .option('-t, --timezone <timezone>', 'The timezone to use for the weather data', 'America/Los_Angeles')
  .description('Get the current weather for the specified zip code')
  .action(getWeather);

program
  .command('todo')
  .description('Manage your todo list')
  .addCommand(
    new commander.Command('list')
      .description('List all todo items')
      .action(() => listAllTodo())
  )
  .addCommand(
    new commander.Command('add')
      .description('Add a new todo item')
      .argument('<todoItem>', 'The todo item to add.  Must wrap in qutation marks.')
      .action((todoItem: string) => addTodo(todoItem))
  )
  .addCommand(
    new commander.Command('remove')
      .description('Remove a todo item')
      .argument('<index>', 'The index of the todo item to remove')
      .action((index: number) => removeTodo(index))
      
  )
  .addCommand(
    new commander.Command('nuke')
      .description('Clear all todo items')
      .action(() => clearAllTodos())
  )



program.parse(process.argv);


// // Handle the command-line arguments
// function handleCommand(command: string, args: string[]): void {
//   if (!command) {
//     console.log('I am Yuki.')
//     console.log('  /\\___/\\ ');
//     console.log(' /       \\');
//     console.log('(   o   o )');
//     console.log(' >   "   <');
//     console.log('Try "yuki help" for more information.');
//     return;
//   }

//     case 'todo':
//       handleTodoCommand(args);
//       break;
//     case 'help':
//       showHelp();
//       break;
//     default:
//       console.log('Unknown command:', command);
//   }
// };

// handleCommand(command, args);