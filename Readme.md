
LifeKit : Locate.Naloxone.Now
=============================

A hybrid mobile app to help curb the increasing number of deaths from opioid overdose.![

Welcome Screen           |  Main Menu
:-------------------------:|:-------------------------:
![Dashboard image] (/README/1\ (8).jpg?raw=true "LifeKit Dashboard");  |  ![Dashboard image] (/README/1\ (21).jpg?raw=true "LifeKit Dashboard");

Sign Up           |  Choose Type of User
:-------------------------:|:-------------------------:
![Dashboard image] (/README/1\ (3).jpg?raw=true "LifeKit Dashboard");  |  ![Dashboard image] (/README/1\ (4).jpg?raw=true "LifeKit Dashboard");

Emergency Contact Manager           |  Overdose Risk Assessment Tool
:-------------------------:|:-------------------------:
![Dashboard image] (/README/1\ (41).jpg?raw=true "LifeKit Dashboard");  |  ![Dashboard image] (/README/1\ (27).jpg?raw=true "LifeKit Dashboard");

Bystander Emergency Alert + Overdose Detection           |  Emergency Contact Text Notification with Location
:-------------------------:|:-------------------------:
![Dashboard image] (/README/1\ (31).jpg?raw=true "LifeKit Dashboard");  |  ![Dashboard image] (/README/1\ (23).jpg?raw=true "LifeKit Dashboard");

Pin Point Patient Location with Google Maps           |  Naloxone Carrier Locator
:-------------------------:|:-------------------------:
![Dashboard image] (/README/1\ (33).jpg?raw=true "LifeKit Dashboard");  |  ![Dashboard image] (/README/1\ (36).jpg?raw=true "LifeKit Dashboard");

Auto Overdose Detection with Accelerometer           
:-------------------------:|:-------------------------:
![Dashboard image] (/README/1\ (40).jpg?raw=true "LifeKit Dashboard"); 

Features
--------

* Cross platform (Compiles to Android, iOS and web application)
* Live vitals monitoring
* Customizable Emergency Contacts
* Naloxone store locator
* Emergency dispatcher
* Inforamtive learn pages on Opioid, Naloxone and app
* Suppports account for user and naloxone carrier


High-level overview of modules
------------------------------

Authentication
: Handles login, user registration and session management. Also modifying user info etc

Naloxone locator
: Shows the live locations of the naloxone carriers that are close to the user. Carriers maybe persons, EMS or hospital

Contact Manager
: Manages the list of friends/personel/EMS that maybe contacted in the case of emergency. User can add and remove anyone/personel/EMS from list.

Learn Pages
: Displays list of helpful resources on opioid and naloxone, as determined by the product owner. Kind of mini-blog for opioid.

Vitals Monitor
: Monitors the state of user (using accelerometer for now) and triggers emergency procedure when necessary.

Emergency Module
: Triggers and manages emergency procedure, calling ems or contacts, displaying important info on resuscitation, displaying info about naloxone locator, vibrating phone.

Porting to Native app
: Create android and ios versions of the app, including guides on how it can be installed. 
Notes: Best implemented as a task in the existing task runner. Experience with real android/ios apps would make this a breeze. 




Some Branch Management Stuff
----------------------------

The Master branch would remain reserved for historical reasons lol.
So we'll use Dev as the staging environment. Hence pulls/clones should always use Dev.
But real work is done on individual (named) branches that originate from Dev.
So I would push to a branch named origin/justice which originated from (or at least is up to date with) origin/dev.

Some nice git article just in case someone needs it - http://rogerdudler.github.io/git-guide/




Development Environment Setup
-----------------------------

An IDE is not required for this project, yaah! But using one would save you a lot.
Personally I use WebStorm, I don't know anything better than it yet. Costs about $200 but free with drexel ID.
See https://www.jetbrains.com/webstorm/ for download

Git Bash [Kinda Required] - It's does more than add git to your machine, it adds "Bash" shell as well.
Download here https://git-scm.com/downloads

Not a fan of the commandline or not interested in learning 'em git commands? Try SourceTree
Download link https://www.sourcetreeapp.com/. It's just a nice GUI for git, so you can forget all the commands.

NodeJs [Required] for managing external dependencies. Download and install https://nodejs.org/en/



Starting the Application
------------------------
You may choose to use npm -g install {package}, so then you can just type gulp or ionic server, rather than their path.

Windows:
========
1. Download and Install for your OS (you'll want 64-bit): https://nodejs.org/en/download/
2. Download and Install git bash: https://git-scm.com/download/win
3. Open up git bash
4. git clone https://github.com/justiceo/Dose-Defender.git dose-defender
5. cd dose-defender
6. npm install
7. node_modules/gulp/bin/gulp.js
8. npm install ionic
9. node_modules/ionic/bin/ionic server
10. Tell it localhost or your IP

Linux:
======
1. sudo apt-get install npm nodejs-legacy
2. git clone https://github.com/justiceo/Dose-Defender.git
3. cd dose-defender
4. npm install
5. node_modules/gulp/bin/gulp.js
6. npm install ionic
7. node_modules/ionic/bin/ionic server
8. Tell it localhost or your IP

Application Design
------------------
* For more information on ionic app layout, see http://ionicframework.com/docs/concepts/structure.html. The ones below are specific to this application
* The source code (and everything that really matters) is in /www
* The /www/app-data directory contains mock data that can be used in place of an actual http call. Example: Paste some json data in www/app-data/my_data.json and navigate to http://localhost:port/app-data/my_data.json to access it.
* The /www/css contains compiled styles (and should not be modified for styling purposes as it is overwritten each time). To style the document use /www/scss.
* /www/img contains image resources
* The application logic starts at /www/js/app.js (It is like the Main class in Java)
* New modules or pages are created by "declaring" them in app.js - in the config section. Specify a name, the end-point (url) and an associated file.
* The js & html code for the modules are usually located in /www/js/templates/module_name
* The dashboard module is the default which is loaded on init or when a desired module isn't found


Android Environment Setting
------------------
1. Setup following:
    1. Install java greater than 1.8
    2. Install Android SDK
    3. Install Android emulator if you want to use it
2. Type 'ionic hooks add' to solve permission issue
3. Type 'ionic platform add android' to add android platform
4. Type 'ionic build android' to build android apk
5. Launch
    1. on Device: Type 'ionic run android'
    2. on Emulator: Type 'ionic emulate android'

