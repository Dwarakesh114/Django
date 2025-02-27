from django.contrib import admin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company_name', 'location', 'posted_date', 'is_remote')
    list_filter = ('employment_type', 'is_remote', 'posted_date')
    search_fields = ('title', 'company_name', 'location')
    ordering = ('-posted_date',)