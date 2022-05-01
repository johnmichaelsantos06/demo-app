import { createAction } from "redux-actions";

export const MemberInfoActionConstants = {
    GET_MEMBER_INFO_REQUEST: "GET_MEMBER_INFO_REQUEST",
    GET_MEMBER_INFO_RESPONSE: "GET_MEMBER_INFO_RESPONSE",
    GET_MEMBER_INFO_ERROR: "GET_MEMBER_INFO_ERROR",
    SAVE_OR_UPDATE_MEMBER_INFO_REQUEST: "SAVE_OR_UPDATE_MEMBER_INFO_REQUEST",
    SAVE_OR_UPDATE_MEMBER_INFO_RESPONSE: "SAVE_OR_UPDATE_MEMBER_INFO_RESPONSE",
    SAVE_OR_UPDATE_MEMBER_INFO_ERROR: "SAVE_OR_UPDATE_MEMBER_INFO_ERROR",
    DELETE_MEMBER_INFO_REQUEST: "DELETE_MEMBER_INFO_REQUEST",
    DELETE_MEMBER_INFO_RESPONSE: "DELETE_MEMBER_INFO_RESPONSE",
    DELETE_MEMBER_INFO_ERROR: "DELETE_MEMBER_INFO_ERROR",
    SEARCH_MEMBER_INFO_REQUEST: "SEARCH_MEMBER_INFO_REQUEST",
    SEARCH_MEMBER_INFO_RESPONSE: "SEARCH_MEMBER_INFO_RESPONSE",
    SEARCH_MEMBER_INFO_ERROR: "SEARCH_MEMBER_INFO_ERROR"
}

export const getMemberInfoRequest = createAction(MemberInfoActionConstants.GET_MEMBER_INFO_REQUEST);
export const getMemberInfoResponse = createAction(MemberInfoActionConstants.GET_MEMBER_INFO_RESPONSE);
export const getMemberInfoError = createAction(MemberInfoActionConstants.GET_MEMBER_INFO_ERROR);

export const saveOrUpdateMemberInfoRequest = createAction(MemberInfoActionConstants.SAVE_OR_UPDATE_MEMBER_INFO_REQUEST);
export const saveOrUpdateMemberInfoResponse = createAction(MemberInfoActionConstants.SAVE_OR_UPDATE_MEMBER_INFO_RESPONSE);
export const saveOrUpdateMemberInfoError = createAction(MemberInfoActionConstants.SAVE_OR_UPDATE_MEMBER_INFO_ERROR);

export const deleteMemberInfoRequest = createAction(MemberInfoActionConstants.DELETE_MEMBER_INFO_REQUEST);
export const deleteMemberInfoResponse = createAction(MemberInfoActionConstants.DELETE_MEMBER_INFO_RESPONSE);
export const deleteMemberInfoError = createAction(MemberInfoActionConstants.DELETE_MEMBER_INFO_ERROR);

export const searchMemberInfoRequest = createAction(MemberInfoActionConstants.SEARCH_MEMBER_INFO_REQUEST);
export const searchMemberInfoResponse = createAction(MemberInfoActionConstants.SEARCH_MEMBER_INFO_RESPONSE);
export const searchMemberInfoError = createAction(MemberInfoActionConstants.SEARCH_MEMBER_INFO_ERROR);