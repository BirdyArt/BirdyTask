import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface AuthDto {
            firstName?: string;
            lastName?: string;
            email: string;
            password: string;
        }
        export interface CreateTaskDto {
            title: string;
            description?: string;
        }
        export interface EditTaskDto {
            title?: string;
            description?: string;
        }
        export interface EditUserDto {
            email?: string;
            firstName?: string;
            lastName?: string;
        }
    }
}
declare namespace Paths {
    namespace CreateTask {
        export type RequestBody = Components.Schemas.CreateTaskDto;
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace DeleteTaskById {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace EditTaskById {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.EditTaskDto;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace EditUser {
        export type RequestBody = Components.Schemas.EditUserDto;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetMe {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetTaskById {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetTasks {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace Signin {
        export type RequestBody = Components.Schemas.AuthDto;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace Signup {
        export type RequestBody = Components.Schemas.AuthDto;
        namespace Responses {
            export interface $201 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * signup
   */
  'signup'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Signup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Signup.Responses.$201>
  /**
   * signin
   */
  'signin'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Signin.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Signin.Responses.$200>
  /**
   * getTasks
   */
  'getTasks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTasks.Responses.$200>
  /**
   * createTask
   */
  'createTask'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateTask.Responses.$201>
  /**
   * getTaskById
   */
  'getTaskById'(
    parameters?: Parameters<Paths.GetTaskById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTaskById.Responses.$200>
  /**
   * editTaskById
   */
  'editTaskById'(
    parameters?: Parameters<Paths.EditTaskById.PathParameters> | null,
    data?: Paths.EditTaskById.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EditTaskById.Responses.$200>
  /**
   * deleteTaskById
   */
  'deleteTaskById'(
    parameters?: Parameters<Paths.DeleteTaskById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteTaskById.Responses.$204>
  /**
   * getMe
   */
  'getMe'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMe.Responses.$200>
  /**
   * editUser
   */
  'editUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.EditUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EditUser.Responses.$200>
}

export interface PathsDictionary {
  ['/auth/signup']: {
    /**
     * signup
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Signup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Signup.Responses.$201>
  }
  ['/auth/signin']: {
    /**
     * signin
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Signin.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Signin.Responses.$200>
  }
  ['/tasks']: {
    /**
     * getTasks
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTasks.Responses.$200>
    /**
     * createTask
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateTask.Responses.$201>
  }
  ['/tasks/{id}']: {
    /**
     * getTaskById
     */
    'get'(
      parameters?: Parameters<Paths.GetTaskById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTaskById.Responses.$200>
    /**
     * editTaskById
     */
    'patch'(
      parameters?: Parameters<Paths.EditTaskById.PathParameters> | null,
      data?: Paths.EditTaskById.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EditTaskById.Responses.$200>
    /**
     * deleteTaskById
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteTaskById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteTaskById.Responses.$204>
  }
  ['/users/me']: {
    /**
     * getMe
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMe.Responses.$200>
  }
  ['/users']: {
    /**
     * editUser
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.EditUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EditUser.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
