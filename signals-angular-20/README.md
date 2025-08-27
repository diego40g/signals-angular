# SignalsAngular20

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## GenAI Development Guidelines

This project follows modern Angular practices optimized for GenAI development:

### Key Patterns
- **Standalone Components**: No NgModules, use `standalone: true`
- **Modern Control Flow**: Use `@if`, `@for`, `@switch` instead of structural directives
- **Angular Signals**: Reactive state management with `signal()`, `computed()`, `effect()`

### LLM Context
- See `public/llms.txt` for comprehensive LLM guidance
- Example component: [`ai-example.component.ts`](../src/app/pages/ai-example/ai-example.component.ts)
- Follow patterns in [`ai-guidelines.ts`](../src/app/pages/ai-example/core/ai-guidelines.ts)

### Best Practices for AI-Assisted Development
1. Always use standalone components
2. Prefer signals over traditional reactive forms
3. Use modern template syntax
4. Implement proper TypeScript typing
5. Follow Angular's style guide

## Reference
https://blog.angular.dev/announcing-angular-v20-b5c9c06cf301
https://www.youtube.com/watch?v=X3mXJ5GJybY
https://angular.dev/roadmap
https://www.youtube.com/watch?v=KaVufhifOmA&list=PLD4CDC34D7sMfVxx037MsX3_IbZ_0mFwA
https://github.com/prophet-99/angular-elementary
