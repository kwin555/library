# Book Library Manager

This project is a full-stack application to manage a library of books. The frontend is built with React and uses Context and useReducer for state management, while the backend is built with Node.js. This application allows users to view, add, edit, and delete books from the library.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- View all books in the library in a card-style layout.
- Add a new book to the library.
- Edit details of an existing book.
- Delete a book with a confirmation prompt.
- State management using Context API and useReducer.
- Simple routing with React Router.

## Technologies Used
- Frontend:
  - React
  - React Router
  - Context API
  - useReducer
- Backend:
  - Node.js
  - Express (to be implemented)
- State Management:
  - Context API
  - useReducer

## Installation
### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Clone the repository
```bash
git clone <repository_url>
cd book-library-manager
```

### Install dependencies
```bash
yarn
```

## Usage
### Start the frontend development server
```bash
yarn dev
```

### Start the backend server (to be implemented)
```bash
npm run start:server
```

### Open the application
Navigate to `http://localhost:3000` in your browser to view the application.

## Project Structure
```
/src
|-- /components
|   |-- BookCard.jsx
|   |-- BookForm.jsx
|   |-- BookList.jsx
|-- /contexts
|   |-- BookContext.jsx
|-- /pages
|   |-- AddBook.jsx
|   |-- EditBook.jsx
|   |-- Home.jsx
|-- App.jsx
|-- index.jsx
```

- **components**: Contains reusable components like `BookCard`, `BookForm`, and `BookList`.
- **contexts**: Contains the `BookContext` which uses Context API and useReducer for state management.
- **pages**: Contains the main pages of the application such as `Home`, `AddBook`, and `EditBook`.
- **App.jsx**: The main application component where routing is defined.
- **index.jsx**: The entry point of the React application.

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes (`git commit -m 'Add some awesome feature'`).
4. Push to the branch (`git push origin feature/awesome-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
