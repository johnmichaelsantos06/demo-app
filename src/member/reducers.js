import { handleActions } from "redux-actions"
import { MemberInfoActionConstants } from "./actions";
import update from 'immutability-helper';

const initialState = {
    memberInfo: {},
    success: 0,
    deletedMemberInfoId: 0,
    memberInfoList: [],
    errorMessages: {}
}

export const memberInfoReducer = handleActions({
    [MemberInfoActionConstants.GET_MEMBER_INFO_RESPONSE]: (state, action) => {
        const newState = update(state, {
            memberInfo: { $set: action.payload }
        });
        return newState;
    },
    [MemberInfoActionConstants.GET_MEMBER_INFO_ERROR]: (state, action) => {
        const newState = update(state, {
            errorMessages: { $set: action.payload }
        });
        return newState;
    },
    [MemberInfoActionConstants.SAVE_OR_UPDATE_MEMBER_INFO_RESPONSE]: (state, action) => {
        const newState = update(state, {
            success: { $set: action.payload }
        });
        return newState;
    },
    [MemberInfoActionConstants.SAVE_OR_UPDATE_MEMBER_INFO_ERROR]: (state, action) => {
        const newState = update(state, {
            errorMessages: { $set: action.payload }
        });
        return newState;
    },
    [MemberInfoActionConstants.DELETE_MEMBER_INFO_RESPONSE]: (state, action) => {
        const newState = update(state, {
            deletedMemberInfoId: { $set: action.payload }
        });
        return newState;
    },
    [MemberInfoActionConstants.DELETE_MEMBER_INFO_ERROR]: (state, action) => {
        const newState = update(state, {
            errorMessages: { $set: action.payload }
        });
        return newState;
    },
    [MemberInfoActionConstants.SEARCH_MEMBER_INFO_RESPONSE]: (state, action) => {
        const newState = update(state, {
            memberInfoList: { $set: action.payload }
        });
        return newState;
    },
    [MemberInfoActionConstants.SEARCH_MEMBER_INFO_ERROR]: (state, action) => {
        const newState = update(state, {
            errorMessages: { $set: action.payload }
        });
        return newState;
    },
},
    initialState
);