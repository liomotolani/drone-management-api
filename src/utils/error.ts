
   export const handleError = (err: { statusCode: any; message: any }, res: any) => {
       let { statusCode, message } = err;

       console.error(message);

       if(!statusCode) statusCode = 500;
       res.status(statusCode).json({
           status: "error",
           statusCode,
           message,
       });
   }
