// logger middleware
// console.debug the whole action
const logger = store => next => action => {
  console.debug("%o",action);
  return next(action);
};
export default logger;
