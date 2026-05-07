class ApiError extends Error {
  status: number;
  message: string;
  success: boolean

  constructor(status: number, message: string = "Something wen't wrong", success: boolean = false) {
    super();
    this.status = status;
    this.success = success
    this.message = super.message;
  }
}

export default ApiError
