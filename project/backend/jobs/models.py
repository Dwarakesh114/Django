from django.db import models

class Job(models.Model):
    job_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=200)
    summary = models.TextField()
    company_name = models.CharField(max_length=200)
    company_logo_url = models.URLField(max_length=500, null=True, blank=True)
    location = models.CharField(max_length=200)
    salary = models.CharField(max_length=100, null=True, blank=True)
    employment_type = models.CharField(max_length=50)
    posted_date = models.DateTimeField()
    is_remote = models.BooleanField(default=False)
    details_page_url = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-posted_date']

    def __str__(self):
        return f"{self.title} at {self.company_name}"