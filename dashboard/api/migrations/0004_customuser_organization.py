# Generated by Django 4.1.7 on 2023-03-28 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_customuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='organization',
            field=models.CharField(default='', max_length=100),
        ),
    ]
