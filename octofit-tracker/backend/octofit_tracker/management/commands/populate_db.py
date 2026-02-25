from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Deleted existing data.')

        # Create users - superheroes
        users_data = [
            {'username': 'ironman', 'email': 'ironman@avengers.com', 'password': 'tony1234'},
            {'username': 'captainamerica', 'email': 'cap@avengers.com', 'password': 'steve1234'},
            {'username': 'thor', 'email': 'thor@avengers.com', 'password': 'thor1234'},
            {'username': 'blackwidow', 'email': 'blackwidow@avengers.com', 'password': 'natasha1234'},
            {'username': 'hulk', 'email': 'hulk@avengers.com', 'password': 'bruce1234'},
            {'username': 'batman', 'email': 'batman@dc.com', 'password': 'bruce1234'},
            {'username': 'superman', 'email': 'superman@dc.com', 'password': 'clark1234'},
            {'username': 'wonderwoman', 'email': 'wonderwoman@dc.com', 'password': 'diana1234'},
            {'username': 'theflash', 'email': 'theflash@dc.com', 'password': 'barry1234'},
            {'username': 'aquaman', 'email': 'aquaman@dc.com', 'password': 'arthur1234'},
        ]

        users = []
        for data in users_data:
            user = User(**data)
            user.save()
            users.append(user)
        self.stdout.write(f'Created {len(users)} users.')

        # Create teams
        marvel_members = ['ironman', 'captainamerica', 'thor', 'blackwidow', 'hulk']
        dc_members = ['batman', 'superman', 'wonderwoman', 'theflash', 'aquaman']

        team_marvel = Team(name='Team Marvel', members=marvel_members)
        team_marvel.save()

        team_dc = Team(name='Team DC', members=dc_members)
        team_dc.save()

        self.stdout.write('Created 2 teams: Team Marvel and Team DC.')

        # Create activities
        activities_data = [
            {'username': 'ironman', 'activity_type': 'Flying', 'duration': 60.0, 'date': date(2024, 1, 10)},
            {'username': 'captainamerica', 'activity_type': 'Running', 'duration': 45.0, 'date': date(2024, 1, 11)},
            {'username': 'thor', 'activity_type': 'Hammer Throw', 'duration': 30.0, 'date': date(2024, 1, 12)},
            {'username': 'blackwidow', 'activity_type': 'Martial Arts', 'duration': 50.0, 'date': date(2024, 1, 13)},
            {'username': 'hulk', 'activity_type': 'Weightlifting', 'duration': 40.0, 'date': date(2024, 1, 14)},
            {'username': 'batman', 'activity_type': 'Stealth Training', 'duration': 55.0, 'date': date(2024, 1, 10)},
            {'username': 'superman', 'activity_type': 'Flying', 'duration': 70.0, 'date': date(2024, 1, 11)},
            {'username': 'wonderwoman', 'activity_type': 'Combat Training', 'duration': 65.0, 'date': date(2024, 1, 12)},
            {'username': 'theflash', 'activity_type': 'Speed Running', 'duration': 20.0, 'date': date(2024, 1, 13)},
            {'username': 'aquaman', 'activity_type': 'Swimming', 'duration': 60.0, 'date': date(2024, 1, 14)},
        ]

        for data in activities_data:
            activity = Activity(**data)
            activity.save()
        self.stdout.write(f'Created {len(activities_data)} activities.')

        # Create leaderboard entries
        leaderboard_data = [
            {'username': 'superman', 'score': 950.0},
            {'username': 'thor', 'score': 900.0},
            {'username': 'wonderwoman', 'score': 880.0},
            {'username': 'ironman', 'score': 860.0},
            {'username': 'hulk', 'score': 840.0},
            {'username': 'captainamerica', 'score': 820.0},
            {'username': 'aquaman', 'score': 800.0},
            {'username': 'batman', 'score': 780.0},
            {'username': 'blackwidow', 'score': 760.0},
            {'username': 'theflash', 'score': 740.0},
        ]

        for data in leaderboard_data:
            entry = Leaderboard(**data)
            entry.save()
        self.stdout.write(f'Created {len(leaderboard_data)} leaderboard entries.')

        # Create workouts
        workouts_data = [
            {'name': 'Iron Man Endurance', 'description': 'High-intensity cardio workout inspired by Tony Stark', 'duration': 60.0},
            {'name': 'Captain America Circuit', 'description': 'Full body strength training inspired by Steve Rogers', 'duration': 45.0},
            {'name': 'Thor Power Training', 'description': 'Upper body strength and explosiveness like Thor', 'duration': 50.0},
            {'name': 'Black Widow Agility', 'description': 'Flexibility and martial arts conditioning', 'duration': 40.0},
            {'name': 'Hulk Smash Strength', 'description': 'Maximum power weightlifting program', 'duration': 55.0},
            {'name': 'Batman Combat Prep', 'description': 'Mixed martial arts and stealth movement training', 'duration': 60.0},
            {'name': 'Superman Aerial', 'description': 'Core strength and flying simulation workout', 'duration': 50.0},
            {'name': 'Wonder Woman Warrior', 'description': 'Combat sport and ancient fighting techniques', 'duration': 65.0},
            {'name': 'Flash Speed Intervals', 'description': 'Sprint intervals and speed endurance training', 'duration': 30.0},
            {'name': 'Aquaman Aquatics', 'description': 'Underwater strength and swimming endurance', 'duration': 55.0},
        ]

        for data in workouts_data:
            workout = Workout(**data)
            workout.save()
        self.stdout.write(f'Created {len(workouts_data)} workouts.')

        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db with superhero test data!'))
