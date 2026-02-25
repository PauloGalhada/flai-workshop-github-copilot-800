from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
import datetime


class UserAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username='testuser',
            email='testuser@example.com',
            password='testpass',
        )

    def test_list_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {'username': 'newuser', 'email': 'new@example.com', 'password': 'pass'}
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TeamAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(name='Alpha Team', members=[])

    def test_list_teams(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_team(self):
        data = {'name': 'Beta Team', 'members': []}
        response = self.client.post('/api/teams/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ActivityAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.activity = Activity.objects.create(
            username='testuser',
            activity_type='Running',
            duration=30.0,
            date=datetime.date.today(),
        )

    def test_list_activities(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_activity(self):
        data = {
            'username': 'testuser',
            'activity_type': 'Cycling',
            'duration': 45.0,
            'date': str(datetime.date.today()),
        }
        response = self.client.post('/api/activities/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LeaderboardAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.entry = Leaderboard.objects.create(username='testuser', score=100.0)

    def test_list_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_leaderboard_entry(self):
        data = {'username': 'anotheruser', 'score': 200.0}
        response = self.client.post('/api/leaderboard/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class WorkoutAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.workout = Workout.objects.create(
            name='Morning Routine',
            description='Light stretching and cardio',
            duration=20.0,
        )

    def test_list_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_workout(self):
        data = {
            'name': 'Evening Run',
            'description': '5km easy run',
            'duration': 30.0,
        }
        response = self.client.post('/api/workouts/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
