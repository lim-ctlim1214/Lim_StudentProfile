# Lim_StudentProfile
This is my 2nd activity for ITCC 41 - Mobile Applications Development. A student profile via Apache Cordova and HTML, CSS! 

## Last Update: 9/18/2026 - Activity 5
- Added Profile Editing to Index Profile Page. This feature is only available for the index page.

## Project Description
This is a project featuring my student profile! Now editable!

## Application Pages
- Profile: The homepage, contains links to navigate towards other pages. Editable, can be changed to the users needs.
- About: More about myself! My hobbies, interests, goals and educational attainment.
- Skills: A page about my skills!
- Projects: Projects from my development life.
- Contact: A directory for my contact information.

## Profile Editing
- Users can edit profiles via the "Edit Me!" button on the basic information card. This is only functional, and is shown in the index profile page.
- Users can edit their name, course, year level, the description and their avatar.
- All saved information is loaded automatically on startup on both the front page and edit settings.
- Users can also save and edit their skills! With a maximum of 6 skills editable by the user.


## UI/UX Principles Applied
- Responsive Layout: Through Flexboxes and Media Queries, the experience is seamless throughout Desktop, Tablet and Mobile.
- Mobile-Friendly Spacing: Spacing is consistent and balanced. Not too much, not too little.
- Appropriate Typography: Fonts are changed depending on the device's width. 
- Clear Visual Hierarchy: Mobile users on Portrait Mode follow a vertical hierarchy. Allowing for a smooth and consistent visual hierarchy.
- Usable Controls: Navigation Buttons are either vertical or horizontal and fully functional on mobile devices.
- Basic Accessibility: Users who have a harder time reading should have an easier time with dynamic typography.
- Consistent Design: Both Desktop and Mobile feature a consistent design, with the design language remaining the same across devices.

## JavaScript Functionality
- JavaScript is used to validate, handle and update profiles.
- Using DOM Manipulation, elements are easily updateable, this is how JS updates the frontend HTML page.
- DOM also helps attain all information from the different elements of the page. This is how forms are validated in this codebase.
- localStorage is also utilized to store crucial information about the system.
- JSON parsing and Arrays are also utilized to store different elements and pieces of data.

## Local Data Storage
- localStorage stores 3 elements: Existing Profile Details, Skills Saved and the Avatar.
- JavaScript makes the existing profile details and skills saved into JSON strings, which are parsed back when information needs to be retrieved.
- The Profile Picture is stored in a BASE64 string. Because of this, images are limited in storage, and file formats.

## Responsive Design
I applied basic principles like flexboxes, media queries, and the meta tag in making the design responsive. For phones and tablets in portrait mode, the app is more vertical, but for landscape mode, users can read in a landscape orientation.


## How to Run
There are 2 necessary commands needed to run this application:
- cordova build android: Builds the Application for Android Devices
- cordova run android: Runs the Application for Android Devices.

These commands must be run in the terminal, and Android Studio must be open, with a device in operation before cordova run android is ran.

## Application Screenshots - Activity 5

### Student Profile Page with Default Profile Picture
<img width="510" height="816" alt="image" src="https://github.com/user-attachments/assets/817776b5-0e51-44a9-b0b9-4dd3d2a9feca" />

### Edit Profile
<img width="516" height="828" alt="image" src="https://github.com/user-attachments/assets/fae2123c-9cd7-4abc-819a-d4d3f137a01e" />

### Edit Skills
<img width="510" height="817" alt="image" src="https://github.com/user-attachments/assets/2ca98c90-4065-4a96-b1e1-b7abab210729" />


### Updated Profile
<img width="508" height="820" alt="image" src="https://github.com/user-attachments/assets/bfd641a6-3032-42c2-9c42-23e19ae44db0" />
<img width="509" height="763" alt="image" src="https://github.com/user-attachments/assets/b21fad23-a4a7-4771-930e-2d1bdf0bb829" />

### Contacts Page
<img width="420" height="907" alt="image" src="https://github.com/user-attachments/assets/e6770671-3827-4d37-bf0b-1e34963be220" />


