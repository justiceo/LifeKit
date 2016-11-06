
android:
	ionic build android
	ionic run android

web:
	ionic serve

init:
	npm install
	ionic hooks add
	bower install ngCordova
	ionic platform add android
	ionic platform add ios
	cordova plugin add cordova-plugin-device-motion
	cordova plugin add cordova-plugin-contacts
	cordova plugin add cordova-plugin-vibration
	cordova plugin add cordova-plugin-geolocation
	cordova plugin add cordova-plugin-whitelist
	cordova plugin add cordova-plugin-ionic-keyboard
	cordova plugin add https://github.com/katzer/cordova-plugin-background-mode.git
	cordova plugin add https://github.com/cordova-sms/cordova-sms-plugin.git
	./node_modules/gulp/bin/gulp.js

