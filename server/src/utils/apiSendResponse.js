class ApiResponse{
    constructor(statusCode,video,message="Success"){
        this.statusCode=statusCode,
        this.video=video,
        this.message=message,
        this.success=statusCode<400
    }
}

export {ApiResponse}