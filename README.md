# Lim_StudentProfile
This is a collection of activities for ITCC 41 - Mobile Applications Development. A student profile via Apache Cordova and HTML, CSS! 

## Last Update: 9/24/2026 - Activity 6
- Added PFP Camera Integration. You can now take a picture of yourself for your avatar!

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

## Camera Integration
- Android's Camera is integrated via the ["cordova-plugin-camera"](https://github.com/apache/cordova-plugin-camera/tree/master) plugin. It asks for permission from your device to capture an image for you to use in your avatar for the student profile.

## Device Feature Integration
- Cordova is used to access the camera because apps built with Apache Cordova are not fully native. Cordova adds this functionality so that all apps built with Cordova can use the same camera plugin without changing the code.

## Image Handling
- Camera Functionality is handled by the take_a_picture method. The method pulls up the camera and has 2 routes. The first route on success saves the image as an attribute in localStorage via the "PFP" entity. If it fails, it shows an error message, and keeps the old profile picture.

## Error Handling
- When permissions are denied, it will show an error message saying permissions weren't granted.
- If it's cancelled, a similar error message will appear.
- Same with other errors, similar error messages will appear.

## Responsive Design
I applied basic principles like flexboxes, media queries, and the meta tag in making the design responsive. For phones and tablets in portrait mode, the app is more vertical, but for landscape mode, users can read in a landscape orientation.

## How to Run
Before building the application, the cordova camera plugin must be installed.
- cordova plugin add cordova-plugin-camera: This command installs the camera plugin.
- This command should automatically modify the package.json file.

There are 2 necessary commands needed to run this application:
- cordova build android: Builds the Application for Android Devices
- cordova run android: Runs the Application for Android Devices.

These commands must be run in the terminal, and Android Studio must be open, with a device in operation before cordova run android is ran.

## Application Screenshots - Activity 6

### Student Profile Page with Previously Set Profile Picture (Activity 5)
<img width="353" height="710" alt="image" src="https://github.com/user-attachments/assets/ecb2d004-d91f-49d8-ae3c-9b699e981e65" />

### Change Profile Picture
<img width="444" height="913" alt="image" src="https://github.com/user-attachments/assets/aa8e386e-8c64-4518-98c4-5e188e33660d" />

### Camera
<img width="461" height="908" alt="image" src="https://github.com/user-attachments/assets/c11e010c-223f-496e-9b6a-fbcd123063b9" />

### Captured Image
<img width="468" height="908" alt="image" src="https://github.com/user-attachments/assets/24f81ace-6787-4135-8927-4582b2cc0c49" />

### Updated Profile Picture
<img width="424" height="902" alt="image" src="https://github.com/user-attachments/assets/aabd4cd2-a7cf-4705-aabc-640972d26b0a" />




