import os
import pytest
import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv('BASE_URL', 'http://localhost:3000')


@pytest.fixture
def api():
    session = requests.Session()
    session.headers.update({'Content-Type': 'application/json'})
    token = os.getenv('API_TOKEN')
    if token:
        session.headers['Authorization'] = f'Bearer {token}'
    yield session
    session.close()
