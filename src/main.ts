#!/usr/bin/env node

// Get the zip code from the command-line arguments
const command = process.argv[2];
const args = process.argv.slice(3);

import { getWeather } from './commands/weather';
import handleTodoCommand from './commands/todo';
import { showHelp } from './commands/help';

// Handle the command-line arguments
function handleCommand(command: string, args: string[]): void {
  if (!command) {
    console.log('I am Yuki.')
    console.log('  /\\___/\\ ');
    console.log(' /       \\');
    console.log('(   o   o )');
    console.log(' >   "   <');
    console.log('Try "yuki help" for more information.');
    return;
  }

  switch (command) {
    case 'weather':
      getWeather(args);
      break;
    case 'todo':
      handleTodoCommand(args);
      break;
    case 'help':
      showHelp();
      break;
    default:
      console.log('Unknown command:', command);
  }
};

handleCommand(command, args);