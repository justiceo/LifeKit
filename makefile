
android:
	ionic build android
	ionic run android

web:
	ionic serve

init:
	npm install
	ionic hooks add
	ionic platform add android
	cordova plugin add cordova-plugin-device-motion
	cordova plugin add https://github.com/katzer/cordova-plugin-background-mode.git
	./node_modules/gulp/bin/gulp.js

