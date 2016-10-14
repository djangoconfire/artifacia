from django import forms
from models import BirthDay

class BirthDayForm(forms.ModelForm):
	class Meta:
		model=BirthDay
		fields=['image']

