# Generated by Django 4.2.6 on 2023-11-02 07:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carpool', '0004_carpoolcomment'),
    ]

    operations = [
        migrations.AddField(
            model_name='carpoolpost',
            name='comments',
            field=models.IntegerField(default=0),
        ),
    ]