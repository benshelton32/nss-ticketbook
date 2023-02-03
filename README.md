# <img src="https://github.com/benshelton32/nss-ticketbook/blob/main/TicketBook/client/public/ticketbook-readme-logo.png" alt="Ticketbook" width="1000">

### Overview

Millions of Americans each year attend sporting events. Many humans, by nature, are drawn to collect various things and that includes mementos from their experiences. I believe there is a large cross-section of these two groups that enjoy both. Traditionally, an easy collectible from a game was the ticket bought and used to get in, but in an increasingly digital world, more often than not, there is no longer a physical ticket to keep.

This application will not only allow users to keep a digital collection of their <i>“tickets”</i> by allowing users to enter the date of the event, the teams involved, and their particular seat location. It also looks to improve on this classic experience by allowing the user to input the score and add notes about the game and/or seat location that they would like to remember.

![Event List View GIF](https://github.com/benshelton32/nss-ticketbook/blob/main/TicketBook/client/public/EventListView.gif)

### Project Information

This project is a fully-functioning CRUD application that was submitted as my full-stack capstone for graduation at Nashville Software School.

Ticketbook uses a React front-end styled with CSS and a .NET back-end employing a SQL Server. Firebase is used for login and authentication.

I have a user that you are more than welcome to use to log in. I have included some events I attended during the 2021 Braves season for that profile in the SQL seed script below, as well as the login information.

## Technologies Used

### Front-End

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Back-End

![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)
![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![MicrosoftSQLServer](https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Visual Studio](https://img.shields.io/badge/Visual%20Studio-5C2D91.svg?style=for-the-badge&logo=visual-studio&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

### Overall

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Running the Application

### Cloning the Application

- Open terminal and run the following commands:

            git clone git@github.com:benshelton32/nss-ticketbook.git
            cd nss-ticketbook

### Setting Up the SQL Database

- To open the project in Visual Studio, run the following command in the terminal:

            start Ticketbook.sln

- In the project under the SQL folder, there are two SQL scripts:
  - TicketBook_Create_Data.sql
  - TicketBook_Seed_Data.sql

- The TicketBook_Create_Data should be run first in order to create the SQL database with the correct tables. The SQL script can also be found in the GitHub repository <a href="https://github.com/benshelton32/nss-ticketbook/blob/main/SQL/Ticketbook_Create_Data.sql">here</a>.

- Once the create script has been run, then TicketBook_Seed_Data should be run to populate the data needed for the Event form, as well as providing a profile with some event already entered. The SQL script can also be found in the GitHub repository <a href="https://github.com/benshelton32/nss-ticketbook/blob/main/SQL/TicketBook_Seed_Data.sql">here</a>.

- After both scripts have been run, you will need to start/run the Ticketbook project in Visual Studio.

### Accessing the Application

- Once the SQL Server has been set up and the project is running in Visual Studio, run the following commands:

            cd TicketBook/client
            npm install
            npm start
            
- The application should launch on localhost:3000 and bring you to the log in screen. For authentication, Ticketbook uses Firebase, so you can either create a new user or log in using my existing profile:
  - Email: b@&#65279;b.com
  - Password: FSCapstone1122
  
- Once logged in, there is an Add Event link at the top of the page that will take you to the form to add a new attended event.
</br><strong>Note:</strong> The Add Event form will not display all fields until a league is selected from the list.
