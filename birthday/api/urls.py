from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = format_suffix_patterns([
    url(r'^birthday_list/$', views.BirthDayList.as_view(), name='birthday-list'),
    url(r'^birthday/(?P<pk>[0-9]+)/$', views.BirthDayList.as_view(), name='BirthDayList-detail'),

])
