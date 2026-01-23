# Contributing to ClearIt

Thank you for your interest in contributing to ClearIt! This document provides guidelines for setting up your environment and contributing to the project.

## Development Setup

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/clearit.git
    cd clearit/frontend
    ```

2.  **Install dependencies**:

    ```bash
    yarn install
    ```

3.  **Run the development server**:
    ```bash
    yarn dev
    ```
    The application will be available at `http://localhost:3000`.

## Coding Standards

- We use **TypeScript** for all source code.
- We use **Vanilla CSS** with Tailwind CSS for styling.
- Follow **Accessibility (A11y)** best practices (use semantic HTML and ARIA labels).
- Use **functional components** and React Hooks.

## Testing

Professional code requires tests. Please ensure that your changes are covered by unit or E2E tests.

- **Unit Tests**: We use [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
  ```bash
  npm run test
  ```
- **E2E Tests**: We use [Playwright](https://playwright.dev/).
  ```bash
  npm run test:e2e
  ```

## Pull Request Process

1.  Create a new branch for your feature or bugfix.
2.  Ensure existing tests pass and add new tests where applicable.
3.  Lint your code: `npm run lint`.
4.  Submit a pull request with a clear description of the changes.

## License

By contributing to ClearIt, you agree that your contributions will be licensed under the project's license.
