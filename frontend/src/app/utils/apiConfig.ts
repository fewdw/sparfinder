export const BASE_URL = "http://127.0.0.1:5000";
export const CREATE_ACCOUNT_URL = `${BASE_URL}/sparfinder/api/user/register`;
export const LOGIN_URL = `${BASE_URL}/sparfinder/api/user/login`;
export const GET_COACH_URL = `${BASE_URL}/sparfinder/api/coach/profile/info`;
export const CHANGE_COACH_URL = `${BASE_URL}/sparfinder/api/coach/profile`;
export const GET_BOXER_URL = `${BASE_URL}/sparfinder/api/boxer/profile/info`;
export const UPDATE_BOXER_URL = `${BASE_URL}/sparfinder/api/boxer/profile`;
export const GET_COACH_GYM = `${BASE_URL}/sparfinder/api/gym/coach`;
export const UPDATE_OR_DELETE_COACH_GYM = `${BASE_URL}/sparfinder/api/gym/`;
export const GET_BOXER_CURRENT_GYM_NAME = `${BASE_URL}/sparfinder/api/boxer/gym/name`;
export const GET_ALL_GYM_NAMES = `${BASE_URL}/sparfinder/api/gym/gyms`;
export const BOXER_ASSOCIATE_GYM = `${BASE_URL}/sparfinder/api/boxer/gym`;
export const GET_ALL_COACHES_URL = `${BASE_URL}/sparfinder/api/coach`;
export const GET_GYM_BY_ID = `${BASE_URL}/sparfinder/api/gym`;
export function getBoxersFromGymById(id: string) {
    return `${BASE_URL}/sparfinder/api/gym/${id}/boxers`;
  }
  export function getCoachesFromGymById(id: string) {
    return `${BASE_URL}/sparfinder/api/gym/${id}/coaches`;
  }
export const GET_ALL_GYMS_FOR_PROFILE_PAGE = `${BASE_URL}/sparfinder/api/gym/`;
export const GET_ALL_BOXERS_URL = `${BASE_URL}/sparfinder/api/boxer/boxers`;
export const GET_BOXER_BY_ID = `${BASE_URL}/sparfinder/api/boxer`;
export const POST_NEW_EVENT = `${BASE_URL}/sparfinder/api/event/`
export const VIEW_COACH_PAST_EVENTS = `${BASE_URL}/sparfinder/api/event/coach/past`;
export const VIEW_COACH_FUTURE_EVENTS = `${BASE_URL}/sparfinder/api/event/coach/future`;
export const DELETE_EVENT = `${BASE_URL}/sparfinder/api/event/`;
export const EVENT_BELONGS_TO_COACH = `${BASE_URL}/sparfinder/api/event/belongsto`;
export const GET_SINGLE_EVENT_INFO_TO_MODIFY = `${BASE_URL}/sparfinder/api/event/`;
export const EDIT_EVENT = `${BASE_URL}/sparfinder/api/event/`;
export const GET_EVENT_BY_ID = `${BASE_URL}/sparfinder/api/event`;
export const GET_ALL_EVENTS_EVENTS_PAGE_FUTURE = `${BASE_URL}/sparfinder/api/event/events/future`;
export const GET_ALL_EVENTS_EVENTS_PAGE_PAST = `${BASE_URL}/sparfinder/api/event/events/past`;
export const BOXER_PARTICIPATE_TO_EVENT = `${BASE_URL}/sparfinder/api/event/participate`;
export const GET_LIST_OF_PARTICIPANTS = `${BASE_URL}/sparfinder/api/event/participants`;
export const GET_EVENT_WAITING_LIST = `${BASE_URL}/sparfinder/api/event/waiting`;
export const APPROVE_BOXER_WAITLIST = `${BASE_URL}/sparfinder/api/event/approve`;
export const REMOVE_BOXER_FROM_WAITLIST = `${BASE_URL}/sparfinder/api/event/remove`;