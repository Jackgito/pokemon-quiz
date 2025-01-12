# Pokemon Quiz

## Overview
Simple yet fun project designed and built within two weeks for the React hackathon. It uses the PokeApi to generate Pokemon themed questions and tracks the user's highscore.

## Pictures
To be added

## Technologies
- **React**: Modern library for creating modern, responsive and stylish websites with ease [https://react.dev/](https://react.dev/)


- **Vite**: Fast modern frontend build tool for web development [https://vite.dev/](https://vite.dev/)

- **Materialize**: A UI library that provides pre-styled components like buttons and modals for a consistent, clean UI experience [https://materializecss.com/](https://materializecss.com/)

- **PokeAPI**: API used for creating the questions for the application [https://pokeapi.co/](https://pokeapi.co/)

---

## Roadmap

- Home page
- Quiz page that displays one type of question: Guess which Pokemon is shown in the silhoutte

---

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**:
   - For frontend:
     ```bash
     cd frontend
     npm i
     ```

3. **Run the Application**:
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```
---

## Directory Structure

- **frontend/**: Contains all client-side code, including:
  - **index.html** and **main.jsx**: Entry points to the application, responsible for selecting which page to display.
  - **pages/**: Contains each page of the application. Pages are rendered using `index.jsx`.
  - **components/**: Reusable components used across the application. Page-specific components are located within their respective page folders.
  - **public/**: Stores images and other static assets.
  - **hooks/**: Contains custom hooks that are similar to functions. They are mainly used for API calls.
  - **context/**: When multiple components need to access properties like game settings, context should be used so they can be easily accessed from anywhere to avoid deeply nested properties
   - **main.css/**: This file contains the global style rules across the application. Many of the components also have specific CSS rules that only affect them, and should be used if you want to make changes only to that component.

## Coding practices
- Folder's first letter should be capitalized if it is used for component. Otherwise it should be small.

- When applying colors via CSS, use the color palette found in the variables.css like this: background-color: var(--primary-color);
Feel free to add new colors or modify existing ones.

## License
This project is licensed under the [MIT License](LICENSE).
