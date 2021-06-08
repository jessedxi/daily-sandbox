/**
 * Call state is comprised of:
 * - "Call items" (inputs to the call, i.e. participants or shared screens)
 * - UI state that depends on call items (for now, just whether to show "click allow" message)
 *
 * Call items are keyed by id:
 * - "local" for the current participant
 * - A session id for each remote participant
 * - "<id>-screen" for each shared screen
 */

const initialCallState = {
  callItems: {
    local: {
      videoTrackState: null,
      audioTrackState: null,
    },
  },
  clickAllowTimeoutFired: false,
  camOrMicError: null,
  fatalError: null,
};

// --- Actions ---

/**
 * CLICK_ALLOW_TIMEOUT action structure:
 * - type: string
 */

const CLICK_ALLOW_TIMEOUT = "CLICK_ALLOW_TIMEOUT";

/**
 * PARTICIPANTS_CHANGE action structure:
 * - type: string
 * - participants: Object (from Daily callObject.participants())
 */

const PARTICIPANTS_CHANGE = "PARTICIPANTS_CHANGE";

const CAM_OR_MIC_ERROR = "CAM_OR_MIC_ERROR";

/**
 * CAM_OR_MIC_ERROR action structure:
 * - type: string
 * - message: string
 */

const FATAL_ERROR = "FATAL_ERROR";

// --- Reducer and helpers --

function callReducer(callState, action) {
  switch (action.type) {
    case CLICK_ALLOW_TIMEOUT:
      return { ...callState, clickAllowTimeoutFired: true };
    case PARTICIPANTS_CHANGE:
      const callItems = getCallItems(action.participants);
      return {
        ...callState,
        callItems,
      };
    case CAM_OR_MIC_ERROR:
      return { ...callState, camOrMicError: action.message };
    case FATAL_ERROR:
      return { ...callState, fatalError: action.message };
    default:
      throw new Error();
  }
}
