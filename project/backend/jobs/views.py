from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters import rest_framework as filters
from .models import Job
from .serializers import JobSerializer

class JobFilter(filters.FilterSet):
    posted_after = filters.DateTimeFilter(field_name='posted_date', lookup_expr='gte')
    employment_type = filters.CharFilter(lookup_expr='iexact')
    is_remote = filters.BooleanFilter()

    class Meta:
        model = Job
        fields = ['employment_type', 'is_remote', 'posted_after']

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filter_backends = [SearchFilter, OrderingFilter, filters.DjangoFilterBackend]
    filterset_class = JobFilter
    search_fields = ['title', 'company_name', 'location', 'summary']
    ordering_fields = ['posted_date', 'title']
    ordering = ['-posted_date']