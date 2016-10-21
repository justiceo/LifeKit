
Dose Defender : Your Opioid Buddy
=================================

A hybrid mobile app to help curb the increasing number of deaths from opioid overdose.
[Add more to this later]



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

* Steps below assume NodeJs has been installed and working.
* Open Git Bash and navigate to the project root directory
* Install Gulp (the build system and task runner) - type `npm install -g gulp`
* Install the apps dependencies - type `npm install`
* Launch in browser - type `gulp`