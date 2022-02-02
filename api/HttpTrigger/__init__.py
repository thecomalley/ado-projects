import datetime
import json
import logging
import pprint
import os

import azure.functions as func
from azure.devops.connection import Connection
from msrest.authentication import BasicAuthentication

## https://github.com/Microsoft/azure-devops-python-api

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    # Fill in with your personal access token and org URL
    personal_access_token = os.environ['PERSONAL_ACCESS_TOKEN']
    organization_url = os.environ['ORGANIZATION_URL']

    # Create a connection to the org
    credentials = BasicAuthentication('', personal_access_token)
    connection = Connection(base_url=organization_url, creds=credentials)

    # Get a client (the "core" client provides access to projects, teams, etc)
    core_client = connection.clients.get_core_client()
    
    # Get a client (the "Graph" client provides access to Groups, Users, etc)
    graph_client = connection.clients_v6_0.get_graph_client()

    # Build a JSON object to store the results
    project_list = []

    # Get the first page of projects
    get_projects_response = core_client.get_projects()
    index = 0
    while get_projects_response is not None:
        for project in get_projects_response.value:
            project_info = {
                'id': project.id,
                'name': project.name,
                'url': project.url,
                'state': project.state,
                'visibility': project.visibility,
                'last_update_time': project.last_update_time.strftime('%Y-%m-%d'),
                'description': project.description,
            }
            project_list.append(project_info)
            pprint.pprint("[" + str(index) + "] " + project.name)
            index += 1
        if get_projects_response.continuation_token is not None and get_projects_response.continuation_token != "":
            # Get the next page of projects
            get_projects_response = core_client.get_projects(continuation_token=get_projects_response.continuation_token)
        else:
            # All projects have been retrieved
            get_projects_response = None
    
    return func.HttpResponse(
        body=json.dumps(project_list),
        headers={
            'Content-Type': 'application/json'
        },
        status_code=200
    )