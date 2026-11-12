#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
: "${ANDROID_SDK_ROOT:?Set ANDROID_SDK_ROOT to an Android SDK with platform 35 and build-tools 35.0.0}"
BUILD_TOOLS="$ANDROID_SDK_ROOT/build-tools/35.0.0"
ANDROID_JAR="$ANDROID_SDK_ROOT/platforms/android-35/android.jar"
BUILD_DIR="$PWD/android/app/build"
mkdir -p "$BUILD_DIR/classes" "$BUILD_DIR/dex"
node scripts/sync-android.mjs
"$BUILD_TOOLS/aapt" package -f -M android/app/src/main/AndroidManifest.xml -I "$ANDROID_JAR" -S android/app/src/main/res -A android/app/src/main/assets -F "$BUILD_DIR/unsigned.apk"
javac --release 8 -cp "$ANDROID_JAR" -d "$BUILD_DIR/classes" android/app/src/main/java/app/daemon/deck/*.java
find "$BUILD_DIR/classes" -name '*.class' -print0 | xargs -0 "$BUILD_TOOLS/d8" --lib "$ANDROID_JAR" --min-api 26 --output "$BUILD_DIR/dex"
(cd "$BUILD_DIR/dex" && zip -q -u "$BUILD_DIR/unsigned.apk" classes.dex)
"$BUILD_TOOLS/zipalign" -f 4 "$BUILD_DIR/unsigned.apk" "$BUILD_DIR/aligned.apk"
if [ -z "${DAEMON_KEYSTORE:-}" ]; then
  DAEMON_KEYSTORE="$BUILD_DIR/daemon-debug.keystore"
  if [ ! -f "$DAEMON_KEYSTORE" ]; then
    keytool -genkeypair -keystore "$DAEMON_KEYSTORE" -storepass android -keypass android -alias androiddebugkey -dname 'CN=Daemon Deck Development' -keyalg RSA -keysize 2048 -validity 10000
  fi
  "$BUILD_TOOLS/apksigner" sign --ks "$DAEMON_KEYSTORE" --ks-pass pass:android --key-pass pass:android --ks-key-alias androiddebugkey --out "$BUILD_DIR/daemon-deck-debug.apk" "$BUILD_DIR/aligned.apk"
else
  "$BUILD_TOOLS/apksigner" sign --ks "$DAEMON_KEYSTORE" --out "$BUILD_DIR/daemon-deck-debug.apk" "$BUILD_DIR/aligned.apk"
fi
"$BUILD_TOOLS/apksigner" verify --verbose "$BUILD_DIR/daemon-deck-debug.apk"
echo "APK ready: $BUILD_DIR/daemon-deck-debug.apk"
