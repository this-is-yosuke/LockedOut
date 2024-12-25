# Locked Out

## Description
Welcome to Locked Out, the ultimate solo virtual escape room experience! In this thrilling challenge, you are tasked with unlocking a 4-digit code, letter combination, or word lock to escape—within 30 minutes. You'll solve puzzles, uncover clues, and crack the code on your own.

## Features
- Create your own escape room
- Stuck? Have a random riddle generated for you
- Solve other people's escape rooms and compete for the fastest completion time
- Track the success rate of people that have attempted to solve your escape room
- JWT authentication of user accounts


## Technologies
- React: Our team used React to build the frontend of the virtual escape room. With React’s component-based architecture, we were able to efficiently create reusable UI elements such as timers, answer input fields, and riddle display components. This allowed us to focus on developing interactive features for the solo player, such as dynamically presenting puzzles and tracking progress. React’s powerful state management also enabled real-time updates, such as showing the countdown timer and tracking which riddles were solved.

- Tailwind: We leveraged Tailwind CSS for styling the entire application. Its utility-first approach allowed us to rapidly design the layout with pre-built classes, creating a clean, modern, and responsive design across devices. Tailwind made it easy for our team to ensure the game interface looked polished without the need for complex custom CSS, helping us achieve consistent styling while keeping our codebase maintainable and easy to update.

- Typescript: Our team adopted TypeScript to enhance both the frontend and backend development. By using TypeScript, we ensured better code quality and reliability with static typing, reducing the risk of runtime errors. This made our React components more robust and improved our ability to work with the backend APIs and database operations. It also helped maintain clear and organized code, making it easier for all team members to collaborate and understand each other’s work.

- Node.Js:Node.js served as the backbone for our backend. Our team used it to handle the application’s server-side logic, manage API endpoints, and process user requests.  

- Postgres SQL: We chose PostgreSQL as the relational database to store critical data for the game. It allowed our team to store user information, track game progress, and manage riddles effectively. PostgreSQL’s flexibility and advanced query capabilities enabled us to build relationships between various entities, such as users and their corresponding game sessions, while also ensuring data integrity and performance.

- Riddle API: Our team integrated the Riddle API to provide a diverse range of puzzles for players if they got stuck creating their own escape room. This third-party API allowed us to focus more on the game’s core logic and design by supplying riddles that could be dynamically loaded into the game. This integration saved time on creating riddles from scratch and allowed our team to deliver a greater variety of challenges.

- Sequelize: We used Sequelize as our Object-Relational Mapping (ORM) tool to interact with the PostgreSQL database. With Sequelize, our team could easily define models and perform database operations without writing raw SQL. This streamlined the process of querying, inserting, and updating data, and allowed us to work with a more object-oriented approach. It also made it easier to manage complex relationships, such as linking users to their individual game data.

- JWT authentication: Our team implemented JWT (JSON Web Token) authentication to secure the game and user accounts. After a user logs in, the server generates a JWT token that is sent to the frontend and used for subsequent requests. This token is then validated on the server side to ensure the user’s identity. With JWT, our team was able to create secure sessions, allowing users to track their progress and continue their game without the need for re-authentication.

- Bycrypt authentication: To further enhance security, our team used Bcrypt to handle password hashing. Rather than storing plain text passwords in the database, Bcrypt allowed us to securely hash users’ passwords before storing them. When users log in, their input password is hashed and compared to the stored hash. This ensures password security and prevents any sensitive information from being exposed, even if the database is compromised.

## Website Screenshots
- [Home](https://imgur.com/U0vQmlQ)
- [About](https://imgur.com/gEc3xKH)
- [Login](https://i.imgur.com/Ztgh6MK.jpeg)
- [Riddle](https://imgur.com/vk9SBGC)


## Link to deployed website
Link Coming Soon

## Table of Contents (Optional)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [UserStories](#userStories)


## Installation
No additional installations are required to use this web application—just access it directly through your web browser.
If you'd like to edit the code, you can fork the repository onto your own local enviorment. To get started, simply download all the project dependencies listed in the package.json file. You will also have to create your own Postgres SQL database, based on the schema. 

## Usage
To use this project, simply clone or fork the repository to your local machine. Once you've done that, navigate to the project directory and run npm install (or yarn install) to download all the necessary dependencies listed in the package.json file. After the dependencies are installed, you can start the application locally by running npm start (or yarn start) and access it in your web browser. If you’d like to contribute or make changes to the code, feel free to edit the files as needed. Once you're done, you can commit your changes and push them to your forked repository, or submit a pull request if you'd like to share your improvements.


## Credits
### Contributors
- [Yosuke Kibe](https://github.com/this-is-yosuke)
- [Dylan Middleton](https://github.com/dmiddleton92)
- [Kristy Thompson](https://github.com/Kristy-H-Thompson)


### Reasources used
- React Documentaion: [link](https://reactjs.org/)
- Logo: [Link](https://www.canva.com/)
- Escape room Image: Javier Grixo on Unsplash.com [Link](https://unsplash.com/photos/chessboard-on-table-beside-window-p1opmw12wvk)
- Tailwind CSS Documentaion: [link](https://tailwindcss.com/docs/installation)
- JWT Documentation: [link](https://jwt.io/)
- PostgreSql: [link](https://www.postgresql.org/docs/)
- Bycrypt Documentation: [link](https://www.npmjs.com/package/bcrypt)
- Dribbble: [link](https://dribbble.com/search/front-end)
- Figma: [link](https://www.figma.com/)
- Riddle API: [link](https://riddles-api.vercel.app/)

## License
MIT License

## User Story
As a player, I want an engaging and interactive experience where I can solve a series of riddles, input my answers, and unlock a final code within a limited time frame (30 minutes). I

## Acceptance Criteria
- The game starts when the user logs in and selects the escape room to play.
- A countdown timer of 30 minutes should begin once the game starts, and it should display clearly on the screen.
- If the timer reaches zero, the game ends.
- The user is presented with a series of four riddles
- Once all riddles are solved correctly, the player can input their final answer (the code) in a designated field.
- If the code is correct, the game should display a success message, and the player’s completion time should be recorded.
- If the code is incorrect, the player is given a chance to try again.
- The game should give clear, real-time feedback after each answer attempt to unlock the lock, such as “Correct!” or “Try again.”
- The player should always know how much time is left.
- Players must log in using secure authentication before accessing the game.
- All user data (like game progress) should be stored securely and associated with the player's account.


## User Story
As a developer, I need to set up a secure authentication system that allows users to log in before accessing the virtual escape room. This will help ensure that the game is only available to authorized users and that their progress can be saved. I also want to provide a simple and secure registration and login process using email and password authentication.

## Acceptance Criteria
- users should be able to create an account using their email and password.
- The system must validate the email format and ensure the password meets minimum security requirements (e.g., at least 8 characters, including a number or symbol).
- Users should be able to log in using their email and password.
- The system must validate the email and password combination, and grant access only if the credentials are correct.
- If the login is unsuccessful, the user should receive an error message (e.g., "Incorrect email or password").
- Once logged in, users should receive a JWT (JSON Web Token) that is stored in the frontend (e.g., in localStorage or cookies).
- Passwords should never be stored in plain text in the database. The system should use bcrypt to hash passwords before saving them.
- If the user logs out, the authentication token should be deleted, and the user should be redirected to the login page.

