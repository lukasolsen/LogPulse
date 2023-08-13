# Logify

Logify is a versatile logging library for JavaScript and TypeScript that offers a range of powerful features and customization options. It provides a flexible and intelligent logging solution to enhance application development and debugging.

## Key Features

- **Custom Log Levels and Filters:** Define custom log levels and apply advanced filters to control the verbosity of log messages.

- **Intelligent Logging:** Intelligently capture and log relevant information while keeping the console output concise and readable.

- **Contextual Logging:** Add contextual information to log messages for better analysis and traceability.

- **Performance Optimization:** Optimize logging performance to minimize impact on application performance, even in high-traffic or resource-intensive environments.

- **Log Visualization and Analytics:** Gain insights from log data through log aggregation, filtering, and visualization capabilities.

- **Extensibility and Integration:** Easily integrate Logify into various projects and frameworks, with support for custom log targets and seamless integration with popular libraries.

## Installation

Install Logify using npm:

```bash
npm install @lukasolsen/logify
```

## Usage

Here's a basic example of how to use Logify

```typescript
import {Logify, Level} from '@lukasolsen/logify';

// Configure Logify
Logify.configure({
  level: Level.INFO,
});

// Log messages
Logify.info('Application started');
Logify.warn('Potential security vulnerability detected');
Logify.error('An error occurred', {error: new Error('Something went wrong')});
```

For detailed usage instructions and advanced features, please refer to the [documentation](https://vipels-hub.gitbook.io/logify/).

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please submit an issue on the [GitHub repository](github.com/lukasolsen/logify).

## License

Logify is licensed under the [MIT License](opensource.org/license/MIT).
