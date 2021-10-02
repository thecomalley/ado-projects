import * as common from './common';
import * as nodeApi from 'azure-devops-node-api';

import * as CoreApi from 'azure-devops-node-api/CoreApi';
import * as CoreInterfaces from "azure-devops-node-api/interfaces/CoreInterfaces";

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const index: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const webApi: nodeApi.WebApi = await common.getWebApi();
    const coreApiObject: CoreApi.CoreApi = await webApi.getCoreApi();

    const projects: CoreInterfaces.ProjectInfo[] = await coreApiObject.getProjects();
    console.log("There are", projects.length, "projects in this organization");
    
    const JsonProjects = JSON.stringify(projects);
    console.log(JsonProjects);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JsonProjects,
        headers: {   
          'Content-Type': 'application/json',
        }
      }
};

export default index;