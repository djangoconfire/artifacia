from party.models import BirthDay
from serializers import BirthDaySerializer
from rest_framework import generics
from rest_framework import permissions



class BirthDayList(generics.ListCreateAPIView):
    queryset = BirthDay.objects.all()
    serializer_class = BirthDaySerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class BirthDayDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BirthDay.objects.all()
    serializer_class = BirthDaySerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


