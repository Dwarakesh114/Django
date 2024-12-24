import scrapy
import json
import requests
from datetime import datetime
from urllib.parse import urlencode

class DiceSpider(scrapy.Spider):
    name = 'dice_jobs'
    api_url = 'https://job-search-api.svc.dhigroupinc.com/v1/dice/jobs/search'
    api_key = '1YAt0R9wBg4WfsF9VB2778F5CHLAPMVW3WAZcKd8'
    
    custom_settings = {
        'CONCURRENT_REQUESTS': 1,
        'DOWNLOAD_DELAY': 2,
    }

    def start_requests(self):
        params = {
            'q': 'Software',
            'countryCode2': 'US',
            'radius': '30',
            'radiusUnit': 'mi',
            'page': '1',
            'pageSize': '20',
            'facets': 'employmentType|postedDate|workFromHomeAvailability|workplaceTypes|employerType|easyApply|isRemote',
            'filters.employmentType': 'CONTRACTS',
            'filters.postedDate': 'ONE',
            'fields': 'id|jobId|summary|title|postedDate|jobLocation.displayName|detailsPageUrl|salary|companyLogoUrl|companyName|employmentType|isRemote',
        }
        
        headers = {'x-api-key': self.api_key}
        yield scrapy.Request(
            f"{self.api_url}?{urlencode(params)}",
            headers=headers,
            callback=self.parse
        )

    def parse(self, response):
        data = json.loads(response.text)
        
        for job in data.get('data', []):
            job_data = {
                'job_id': job['jobId'],
                'title': job['title'],
                'summary': job['summary'],
                'company_name': job['companyName'],
                'company_logo_url': job.get('companyLogoUrl'),
                'location': job['jobLocation']['displayName'],
                'salary': job.get('salary'),
                'employment_type': job['employmentType'],
                'posted_date': job['postedDate'],
                'is_remote': job.get('isRemote', False),
                'details_page_url': job['detailsPageUrl'],
            }
            
            # Send to Django API
            self.post_to_api(job_data)

    def post_to_api(self, job_data):
        api_url = 'http://localhost:8000/api/jobs/'
        try:
            response = requests.post(api_url, json=job_data)
            if response.status_code == 201:
                self.logger.info(f"Successfully posted job: {job_data['title']}")
            else:
                self.logger.error(f"Failed to post job: {response.text}")
        except Exception as e:
            self.logger.error(f"Error posting job: {str(e)}")