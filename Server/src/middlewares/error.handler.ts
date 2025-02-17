// export const handleError = (error: unknown): Response => {
//   if (error instanceof yup.ValidationError) {
//     return {
//       status: 400,
//       body: {
//         status: 'error',
//         message: 'Validation failed',
//         errors: error.errors
//       }
//     };
//   }
  
//   return {
//     status: 500,
//     body: {
//       status: 'error',
//       message: 'Internal server error',
//       error: error instanceof Error ? error.message : 'Unknown error occurred'
//     }
//   };
// };