import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv('BASE_URL', 'https://example.com')
UI_USERNAME = os.getenv('UI_USERNAME', 'test@example.com')
UI_PASSWORD = os.getenv('UI_PASSWORD', 'password123')
BROWSER = os.getenv('BROWSER', 'chrome')