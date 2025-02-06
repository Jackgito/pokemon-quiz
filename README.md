# Pokemon Quiz

## Overview
Simple yet fun project designed and built within two weeks for the React hackathon. It uses the PokeApi to generate Pokémon themed questions and tracks the user's highscore.

## Pictures



Old app:
![image](https://github.com/user-attachments/assets/71d6dae5-97fc-48d8-8fd8-b62a47b44ccc)

![image](https://github.com/user-attachments/assets/d3f1cae7-3401-4534-82eb-9e802a9259d2)


## Technologies
- **React**: Modern library for creating modern, responsive and stylish websites with ease [https://react.dev/](https://react.dev/)

- **Vite**: Fast modern frontend build tool for web development [https://vite.dev/](https://vite.dev/)

- **MUI**: A UI library that provides pre-styled components like buttons and modals for a consistent, clean UI experience [https://mui.com/](https://mui.com/)

- **PokeAPI**: API used for creating the questions for the application [https://pokeapi.co/](https://pokeapi.co/)

---

## Roadmap

- Finish user creation / login logic
- Add leaderboards section
- Score multipliers depending on the settings

---

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Jackgito/pokemon-quiz.git
   ```

2. **Install Dependencies**:
   - For frontend:
     ```bash
     cd pokemon-quiz
     npm i
     ```

3. **Run the Application**:
   - Frontend:
     ```bash
     npm run dev
     ```
---

## Directory Structure
  - **index.html** and **main.jsx**: Entry points to the application, responsible for selecting which page to display.
  - **pages/**: Contains each page of the application. Pages are rendered using `index.jsx`.
  - **components/**: Reusable components used across the application. Page-specific components are located within their respective page folders.
  - **public/**: Stores images and other static assets.
  - **hooks/**: Contains custom hooks that are similar to functions. They are mainly used for API calls.
  - **context/**: When multiple components need to access properties like game settings, context should be used so they can be easily accessed from anywhere to avoid deeply nested properties
   - **main.css/**: This file contains the global style rules across the application. Many of the components also have specific CSS rules that only affect them, and should be used if you want to make changes only to that component.

## Coding practices
- Folder's first letter should be capitalized if it is used for component. Otherwise it should be small.
- Please use MUI themes when applying colors

## Known issues
- Easy mode doesn't look good on mobile
- Inspection tool can be used to cheat the Pokemon id
- Some animatated sprites provided by PokeApi are not animated (like Ferroseed)

## Credits
Fonts: 
- https://www.1001fonts.com/orbitron-font.html


## License
This project is licensed under the [MIT License](LICENSE).
