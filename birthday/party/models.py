from __future__ import unicode_literals

from django.db import models

class BirthDay(models.Model):
	image	=models.FileField(upload_to="birthday_party/images")
	tag		=models.CharField(max_length=200)


	def __unicode__(self):
		return self.tag

		



