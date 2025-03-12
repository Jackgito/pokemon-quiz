# Who's That Pokémon?

## Overview

Who's That Pokémon is an interactive quiz game that challenges players to identify Pokémon based on their silhouettes, animations, or cries. Inspired by the iconic segment from the Pokémon animated series, this app offers a fun and engaging way for fans to test their Pokémon knowledge across different game modes.

## Features
- Classic Mode: Guess the Pokémon based on its silhouette.
- Animated Mode: Identify Pokémon from their in-game animations.
- Sound Mode: Recognize Pokémon by their cries.
- Retro Mode: A nostalgic twist with classic Pokémon sprites.
- Multiple Difficulty Levels: Adjust the challenge based on your Pokémon expertise.
- Follows best SEO, accessibility, responsivity and performance practices.
![image](https://github.com/user-attachments/assets/d9efdd37-6be1-4464-990f-c257e9ea04b2)

## Pictures

<p align="center">
  <img src="https://github.com/user-attachments/assets/f636065f-3e8b-40fd-9bf0-9df487ac79bd" width="45%" />
  <img src="https://github.com/user-attachments/assets/3c9a0c71-b090-4c7d-9521-9c542aea8f2f" width="45%" />
</p>

## Technologies
- **React**: Modern library for creating modern, responsive and stylish websites with ease [https://react.dev/](https://react.dev/)

- **Vite**: Fast modern frontend build tool for web development [https://vite.dev/](https://vite.dev/)

- **MUI**: A UI library that provides pre-styled components like buttons and modals for a consistent, clean UI experience [https://mui.com/](https://mui.com/)

- **PokeAPI**: API used for creating the questions for the application [https://pokeapi.co/](https://pokeapi.co/)

---

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Jackgito/pokemon-quiz.git
   ```

2. **Install Dependencies**:
  Navigate to the correct directory using "cd" command, then:
   - Front / backend:
     ```bash
     npm i
     ```

3. **Run the Application**:
   - Front / backend:
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
- Inspection tool can be used to cheat the Pokemon id
- Some animatated sprites provided by PokeApi are not animated (like Ferroseed)
- Restarting game has a chance to mark correct answer by green if it is the same Pokemon as in previous question
- App doesn't support new Pokemon generations automatically
- Answering all Pokemon correct shows "failed" toast.
- When song changes, error is displayed in console (does now affect app functionality)

## Credits
Fonts: 
- https://www.1001fonts.com/orbitron-font.html

Songs:
- Accumula Town (Furret Walk) https://www.youtube.com/watch?v=RVdZs8Vh0O0

- Driftveil City (original)

- Skyarrow Bridge (Zame Remaster): https://www.youtube.com/watch?v=BkuotsjIzEQ

- Unova Pokemon Center (Zame Remaster): https://www.youtube.com/watch?v=4ZMeMBrib80

- Lake Valor (Zame Remaster): https://www.youtube.com/watch?v=yyh_EbSJ9_U


## License
This project is licensed under the [MIT License](LICENSE).
