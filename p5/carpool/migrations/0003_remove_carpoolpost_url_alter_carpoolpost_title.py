# Generated by Django 4.2.6 on 2023-11-02 01:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carpool', '0002_alter_carpoolpost_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='carpoolpost',
            name='url',
        ),
        migrations.AlterField(
            model_name='carpoolpost',
            name='title',
            field=models.CharField(max_length=200),
        ),
    ]
