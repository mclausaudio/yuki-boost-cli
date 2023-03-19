interface Command {
  name: string;
  description: string;
  example?: string[];
}

// Record is a built-in TypeScript type that allows you to create an object type with specific keys and values.
// The syntax for Record is Record<Keys, Type>, where Keys is the type of the keys and Type is the type of the values. For example, Record<string, number> would define an object type with string keys and number values.
// In this case, we're defining an object type with string keys and Command values.
const commands: Record<string, Command> = {
  weather: {
    name: 'weather',
    description: 'Get the current weather for the specified zip code',
    example: [
      'yuki weather 94109'
    ],
  },
  todo: {
    name: 'todo',
    description: 'Manage your todo list',
    example: [
      'yuki todo add "Buy groceries"',
      'yuki todo list',
      'yuki todo complete 1',
    ]
  },
  help: {
    name: 'help',
    description: 'Show the help menu',
  },
};
  


export function showHelp(): void {
  console.log(`
Yuki CLI Help:

Usage: yuki <command> [arguments]

Available commands:
${Object.keys(commands)
      .map((name) => {
        const command = commands[name];
        const examples = command.example ? `\n\t${command.example.map((e) => `  ${e}`).join('\n\t')}` : '';
        return `  ${command.name}\t- ${command.description}${examples}`;
      })
      .join('\n')}
`);
}