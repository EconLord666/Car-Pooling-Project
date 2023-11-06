# Generated by Django 4.2.6 on 2023-11-02 04:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('carpool', '0003_remove_carpoolpost_url_alter_carpoolpost_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='CarpoolComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('author', models.CharField(max_length=30)),
                ('date_posted', models.DateTimeField(auto_now_add=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='carpool.carpoolpost')),
            ],
        ),
    ]