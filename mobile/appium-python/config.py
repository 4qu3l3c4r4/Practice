import os
from dotenv import load_dotenv

load_dotenv()

APPIUM_URL = os.getenv('APPIUM_URL', 'http://localhost:4723')
PLATFORM_NAME = os.getenv('PLATFORM_NAME', 'Android')

# Android
DEVICE_NAME = os.getenv('DEVICE_NAME', 'emulator-5554')
APP_PACKAGE = os.getenv('APP_PACKAGE', 'com.android.settings')
APP_ACTIVITY = os.getenv('APP_ACTIVITY', '.Settings')

# iOS
IOS_DEVICE_NAME = os.getenv('IOS_DEVICE_NAME', 'iPhone 15')
IOS_PLATFORM_VERSION = os.getenv('IOS_PLATFORM_VERSION', '17.4')
IOS_BUNDLE_ID = os.getenv('IOS_BUNDLE_ID', 'com.apple.Preferences')
