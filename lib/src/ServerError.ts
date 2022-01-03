import ErrorDefinition from "./ErrorDefinition";

type Payload = {
    error?: Error;
    data?: Error | Record<string, unknown> | any;
};

type ErrorMessage = string  | Error | Payload;

export default class ServerError extends Error {
    errorId: ErrorDefinition['errorId'];
    message: ErrorDefinition['message'];
    statusCode: ErrorDefinition['statusCode'];
    causedBy: ({
        name: string;
        message: string;
        stack: string;
    } & Record<string, unknown>)[];

    data: Record<string, unknown> | any;
  
  constructor(errorDefinition: ErrorDefinition,
         message?: ErrorMessage,
         excludeDataKeys: string [] = []) {
             super();
        
             if(Error.captureStackTrace)
             {
                 Error.captureStackTrace(this, ServerError)
             }

            this.name = 'ServerError';
            this.errorId = errorDefinition.errorId;
            this.message = errorDefinition.message; 
            this.statusCode = errorDefinition.statusCode;

            this.causedBy = [];            

            this.parsePayload(message);
            this.data = this.excludeKeys(this?.data, excludeDataKeys)
    }

    parsePayload(payload?: ErrorMessage): void {
        if (typeof payload === 'string') {
          this.data = {message: payload};
        } else if (payload instanceof Error) {
          this.chainError(payload);
        } else if (payload instanceof Object) {
          if (payload.data instanceof Error) {
            this.chainError(payload.data);
          } else if (payload.error instanceof Error) {
            this.data = payload.data || {};
            this.chainError(payload.error);
          } else {
            this.data = payload.data || {};
          }
        }
    }

    excludeKeys(data: Record<string, unknown>, excludeKeys: string []) {
      if(data) {
        Object.keys(data).forEach(prop => {
            if(excludeKeys.includes(prop)) {
               delete data[prop]
            }
        });
      }
      return data;
    }

    chainError(error: Error) {
      this.stack = error.stack;
      if (error instanceof ServerError) {
        this.causedBy.push(...error.causedBy);
      }
    }
    
    is(errorDefinition: ErrorDefinition): boolean {
        return this.errorId === errorDefinition.errorId;
    }
}