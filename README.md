# Guide to install and run project:

- Clone the project
- npm install
- bundle install
- react-native run-android & react-native run-ios

# Project Structure

1. `App.js` is main app navigation for `HomeScreen` & `AboutScreen`.
2. `src` folder contains below :

   > `assets` contains all images, logo, fonts

   > `components` contains custom TabBar & single Tab

   > `config` contains all the root & quality of the scale, chord, triad & arpeggio for generating answer.

   > `page` contains 4 main pages on HomeScreen of the app : SCALE, CHORD, TRIAD & ARPEGGIO

   > `screen` contains 2 main screen : HomeScreen & AboutScreen

# How to fix broken OpusText font on Android
* Step 1: Find all text `"Opus Text"` in SVG file 
* Step 2: Replace the `"Opus Text"` to `"OpusText"` (remove the space character)

# How to fix broken `bb` charater
* Step 1: Find in the broken SVG image the broken character (maybe `<?>` character)
* Step 2: Replace the `<?>` character with `bb`