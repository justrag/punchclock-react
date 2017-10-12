import { addFlashMessage, removeFlashMessage } from '../actions/';
// flash messages middleware
// checks for meta.flash
// dispatches addFlash
// and schedules the removal of the flash message after meta.flash.duration
let nextFlashMessageId = 1;
const flash = ({ getState, dispatch }) => next => action => {
  if (action.meta && action.meta.flash) {
    const { type, text, duration } = action.meta.flash;
    const id = nextFlashMessageId;
    nextFlashMessageId += 1;
    dispatch(addFlashMessage(id, type, text, duration));
    if (duration !== false) {
      setTimeout(() => {
        dispatch(removeFlashMessage(id));
      }, duration);
    }
  }
  return next(action);
};
export default flash;
