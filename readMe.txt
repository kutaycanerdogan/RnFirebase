1-copy google-services.json into android/app folder
2- add 
classpath('com.google.gms:google-services:4.3.10') into dependencies in android/build.gradle file
3-add;
include ':react-native-vector-icons'
project(':react-native-vector-icons').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vector-icons/android') in android.settings.gradle
