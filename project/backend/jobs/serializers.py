from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'id', 'job_id', 'title', 'summary', 'company_name',
            'company_logo_url', 'location', 'salary', 'employment_type',
            'posted_date', 'is_remote', 'details_page_url'
        ]