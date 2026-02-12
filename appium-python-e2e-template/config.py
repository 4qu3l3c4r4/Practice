import os
from dotenv import load_dotenv

load_dotenv()

APPIUM_URL = os.getenv('APPIUM_URL', 'http://localhost:4723')
PLATFORM_NAME = os.getenv('PLATFORM_NAME', 'Android')
DEVICE_NAME = os.getenv('DEVICE_NAME', 'emulator-5554')
APP_PACKAGE = os.getenv('APP_PACKAGE', 'com.example.app')
APP_ACTIVITY = os.getenv('APP_ACTIVITY', '.MainActivity')