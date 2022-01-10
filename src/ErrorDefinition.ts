import crypto from 'crypto'

class ErrorDefinition {
    id: string;
    errorId!: string;
  
    statusCode!: number;
  
    message: string;
  
    constructor(statusCode: number, message: string) {
      this.message = message;
      this.statusCode = statusCode;
    } 
  
  
    /**
     * use to attach a unique code to an ErrorDefintion. this can be used by consumers of your error 
     * to reference an error defintion.
     * returned code is unique so you can guarantee distinctiveness  and uniquely identify an error
     * @param code usually a common status code of the error. e.g httpStatusCode
     * @returns an updated ErrorDefinition with an errorCode (unique hash id)
     */
    tag(id: string): ErrorDefinition {
      this.id = id;
      this.errorId = this.generateId(`${this.statusCode}:${this.message}`);
      return this;
    }

    private generateId (id: string) : string { 
      return crypto
      .createHash('MD5')
      .update(id)
      .digest('hex')
      .substr(0, 6)
      .toUpperCase();
    }
  
    toString(): string {
      const message = this.message.replace(/"/g, '""');
  
      return `Error definition "${this.errorId}" [${this.statusCode}]: ${message}`;
    }
  }
  
  export default ErrorDefinition;