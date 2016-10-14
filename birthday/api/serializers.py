from rest_framework import serializers
from party.models import BirthDay

class BirthDaySerializer(serializers.ModelSerializer):
	class Meta:
		model=BirthDay
		fields=['id','image','tag']