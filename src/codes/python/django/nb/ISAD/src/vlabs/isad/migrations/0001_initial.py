# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=100)),
                ('publisher', models.CharField(max_length=25, null=True, blank=True)),
                ('edition', models.CharField(max_length=50, null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='CaseStudy',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=125, null=True, blank=True)),
                ('case', models.TextField(null=True, blank=True)),
                ('analysis', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=25)),
                ('email', models.EmailField(max_length=254)),
                ('website', models.URLField(null=True, blank=True)),
                ('organization', models.CharField(max_length=25, null=True, blank=True)),
                ('subject', models.CharField(max_length=35)),
                ('comment', models.TextField()),
                ('post_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('problem_id', models.IntegerField()),
                ('problem', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='InlineWorkspace',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('problem_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='PostAnswer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='Procedure',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Reference',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.URLField(null=True, blank=True)),
                ('url_desc', models.TextField(null=True, blank=True)),
                ('book', models.ForeignKey(blank=True, to='isad.Book', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='SelfEvaluation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('question_num', models.IntegerField()),
                ('question', models.TextField()),
                ('option1', models.CharField(max_length=100)),
                ('option2', models.CharField(max_length=100)),
                ('option3', models.CharField(max_length=100, null=True, blank=True)),
                ('option4', models.CharField(max_length=100, null=True, blank=True)),
                ('answer', models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4)])),
            ],
        ),
        migrations.CreateModel(
            name='Simulation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('problem', models.TextField()),
                ('video_url', models.CharField(max_length=120, null=True, blank=True)),
                ('discussion', models.TextField(null=True, blank=True)),
                ('type', models.CharField(max_length=6)),
                ('html_inline', models.CharField(max_length=120, null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Solution',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('graph', models.TextField(null=True, blank=True)),
                ('image_url', models.CharField(max_length=120, null=True, blank=True)),
                ('other', models.TextField(null=True, blank=True)),
                ('exercise', models.ForeignKey(to='isad.Exercise')),
            ],
        ),
        migrations.CreateModel(
            name='Theory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('objectives', models.TextField(null=True, blank=True)),
                ('time_required', models.DecimalField(max_digits=4, decimal_places=2)),
                ('extra', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Workspace',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('wtype', models.CharField(max_length=80)),
                ('description', models.CharField(max_length=80)),
                ('code', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='simulation',
            name='theory',
            field=models.ForeignKey(to='isad.Theory'),
        ),
        migrations.AddField(
            model_name='selfevaluation',
            name='theory',
            field=models.ForeignKey(to='isad.Theory'),
        ),
        migrations.AddField(
            model_name='reference',
            name='theory',
            field=models.ForeignKey(to='isad.Theory'),
        ),
        migrations.AddField(
            model_name='procedure',
            name='theory',
            field=models.ForeignKey(to='isad.Theory'),
        ),
        migrations.AddField(
            model_name='inlineworkspace',
            name='theory',
            field=models.ForeignKey(to='isad.Theory'),
        ),
        migrations.AddField(
            model_name='exercise',
            name='theory',
            field=models.ForeignKey(to='isad.Theory'),
        ),
        migrations.AddField(
            model_name='exercise',
            name='workspace',
            field=models.ForeignKey(to='isad.Workspace'),
        ),
        migrations.AddField(
            model_name='casestudy',
            name='theory',
            field=models.ForeignKey(to='isad.Theory'),
        ),
    ]
