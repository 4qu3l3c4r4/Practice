import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    BASE_URL = os.getenv("BASE_URL")
    UI_USERNAME = os.getenv("UI_USERNAME")
    UI_PASSWORD = os.getenv("UI_PASSWORD")
    HEADLESS_MODE = os.getenv("HEADLESS_MODE", "true").lower() == "true"
    LOGIN_PATH = os.getenv("LOGIN_PATH", "/login")