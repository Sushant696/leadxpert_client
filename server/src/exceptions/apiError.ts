class ApiError extends Error {
  status: number;
  message: string;
  success: boolean

  constructor(status: number, message: string = "Something wen't wrong", success: boolean = false) {
    super();
    this.status = status;
    this.message = super.message;
    this.success = success
  }
}

export default ApiError
