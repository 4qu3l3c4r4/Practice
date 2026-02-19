import pytest
from conftest import BASE_URL


@pytest.mark.smoke
def test_health_check(api):
    res = api.get(f'{BASE_URL}/api/health')
    assert res.status_code == 200


@pytest.mark.smoke
def test_get_users(api):
    res = api.get(f'{BASE_URL}/api/users')
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_create_user(api):
    res = api.post(f'{BASE_URL}/api/users', json={'name': 'Test User', 'email': 'test@example.com'})
    assert res.status_code == 201
    assert 'id' in res.json()


def test_unknown_route(api):
    res = api.get(f'{BASE_URL}/api/nonexistent')
    assert res.status_code == 404
