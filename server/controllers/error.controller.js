import dbErrorHandler from "../helpers/dbErrorHandler.js";

function handleError(req, res) {
  const err = req.error; // || new Error("Unknown error occurred");

  const errorMessage = dbErrorHandler.getErrorMessage(err);
  const statusCode = err.status || 500; // Default to 500 if no status is set

  console.log(err);

  // Send the error response as JSON
  res.status(statusCode).json({
    error: errorMessage,
  });
}
function getErrorMessage(errMsg) {
  const errorMessage = dbErrorHandler.getErrorMessage(errMsg);
  //console.log("Error:", errorMessage); // Log the error for debugging
  return errorMessage;
}
// Export the controller function
export default {
  handleError: handleError,
  getErrorMessage: getErrorMessage,
};
