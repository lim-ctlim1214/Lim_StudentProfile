# Lim_StudentProfile
This is a collection of activities for ITCC 41 - Mobile Applications Development. A student profile via Apache Cordova and HTML, CSS! 

## Last Update: 9/27/2026 - Activity 7
- Added Database Integration. SQLite is now used to store information!

## Project Description
This is a project featuring my student profile! Now editable!

## Application Pages
- Profile: The homepage, contains links to navigate towards other pages. Editable, can be changed to the users needs.
- About: More about myself! My hobbies, interests, goals and educational attainment.
- Skills: A page about my skills!
- Projects: Projects from my development life.
- Contact: A directory for my contact information.

## Authentication
- The first thing new users see is a Login Page. One can make an account or attempt to login.
- By default, no accounts are registered. So one needs to register an account to enter.
- When users log in: The system checks their details, and if the password and ID match, they can log in.

## Student Profile Management
- After login, students can view their profile, edit their details and it's automatically saved by the system.

## Database Integration
- SQLite is used for this project.
- The SQLite database stores your ID, Name, Course, Year Level, About and PFP on the same table.
- Skills are a separate table, as it's a multivalued attribute.
- User Login Details are also stored in another table.

## API/Backend
- Cordova has a plugin for SQLite. This means JavaScript directly accesses the database via the plugin.
- Cordova -> Cordova Plugin -> Database

## CRUD Operations
- CREATE: A record is made every time a user registers an account
- READ: Every time a user logs in, the system retrieves information.
- UPDATE: Users can edit their information and it's automatically saved.
- DELETE: Skills can be deleted.

## Camera Integration
- Camera Functionality is Retained, there are barely any changes to the camera functionality.
- Except for it being saved into the database, and also getting rid of the requirement where you needed to edit details first.

## Data Persistence
- SQLite allows for data to continue to be persistent.
- Restarting the application, Logging Out and Logging in will not affect the data, and it is retained.

## Responsive Design
I applied basic principles like flexboxes, media queries, and the meta tag in making the design responsive. For phones and tablets in portrait mode, the app is more vertical, but for landscape mode, users can read in a landscape orientation.

## Security
- All passwords are encrypted and are not stored in plain text.
- Database credentials are not needed, as SQLite does not need passwords to operate.
- Authentication is handled through JavaScript.

## How to Run
Before building the application, the cordova camera plugin and cordova SQLite plugin must be installed.
- cordova plugin add cordova-plugin-camera: This command installs the camera plugin.
- cordova plugin add cordova-sqlite-storage: This command installs the SQLite plugin.
- This command should automatically modify the package.json file.
- JavaScript also automatically creates the databases provided the sqlite-storage plugin is installed.

There are 2 necessary commands needed to run this application:
- cordova build android: Builds the Application for Android Devices
- cordova run android: Runs the Application for Android Devices.

These commands must be run in the terminal, and Android Studio must be open, with a device in operation before cordova run android is ran.
This application does not have test accounts.



## Application Screenshots - Activity 7

### Login Page
<img width="353" height="730" alt="image" src="https://github.com/user-attachments/assets/f5b7296b-1b5a-4d46-99ed-88cda34d4d30" />

### Successful Login and Student Profile
<img width="362" height="636" alt="image" src="https://github.com/user-attachments/assets/8cceaf4c-fb89-49bc-8dd1-f08462cd1ac9" />

- Successful login automatically redirects you to the Student Profile

### Edit Profile
<img width="358" height="724" alt="image" src="https://github.com/user-attachments/assets/47d66d0a-c749-4f0f-ab15-0e5bd8c79813" />

### Updated Profile
<img width="350" height="702" alt="image" src="https://github.com/user-attachments/assets/74c6f80f-20fd-459d-b784-bec021d07362" />

### Updated Profile Picture
<img width="355" height="729" alt="image" src="https://github.com/user-attachments/assets/e897eea8-8fc1-4a9f-ae7f-5d6ef2bb434a" />

### Logout - Redirects you to the login page automatically.
### Database Related Functionality - Editing, Updating counts as database related functionality.





