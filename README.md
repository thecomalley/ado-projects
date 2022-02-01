# Azure DevOps project list

This is a simple static website primarily built to 

1. Learn some WebDev (HTML, CSS & Javascript)
2. Implement Azure AD sign-in page using the Javascript SDK
3. Publish to Azure static Web apps


## Introduction
Because of the way Azure DevOps permissions work it can be hard to tell how many projects exist within a given ADO organization
This project aims to build a simple app to display a list of Azure DevOps projects within a single org and some key metadata about each project

## Setting up Dev Environment

## Creating the API
Lets start with the backend, Azure DevOps has a API that will give us the data we need [Projects - List](https://docs.microsoft.com/en-us/rest/api/azure/devops/core/projects/list?view=azure-devops-rest-6.0) but instead of using the 
