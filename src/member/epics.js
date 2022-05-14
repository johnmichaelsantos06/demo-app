import axios from 'axios';
import { ofType } from 'redux-observable';
import { switchMap, debounceTime, from, catchError, of, mergeMap } from 'rxjs';

import { ROOT_API } from '../constants';
import { MemberInfoActionConstants, searchMemberInfoResponse, getMemberInfoResponse, saveOrUpdateMemberInfoError, saveOrUpdateMemberInfoResponse, deleteMemberInfoResponse, deleteMemberInfoError, getMemberInfoError, searchMemberInfoError, searchByNameRequest } from './actions';

export const searchMemberInfoEpic = (action$) => {
    return action$.pipe(
        ofType(MemberInfoActionConstants.SEARCH_MEMBER_INFO_REQUEST),
        switchMap(action =>
            from(axios.get(ROOT_API + `/member/list?fullName=${action.payload}`)).pipe(
                mergeMap(response => {
                    if (response.data.success === 0) {
                        return of(searchMemberInfoError(response.data.errorMessages));
                    } else {
                        return of(searchMemberInfoResponse(response.data.list), saveOrUpdateMemberInfoResponse(0), getMemberInfoResponse({}), searchMemberInfoError({}));
                    }
                }),
                catchError((error) => {
                    return of(searchMemberInfoError({ generalError: 'Unknown Error' }));
                })
            )
        )
    );
}

export const getMemberInfoEpic = (action$) => {
    return action$.pipe(
        ofType(MemberInfoActionConstants.GET_MEMBER_INFO_REQUEST),
        switchMap(action =>
            from(axios.get(ROOT_API + `/member/${action.payload}`)).pipe(
                mergeMap(response => {
                    if (response.data.success === 0) {
                        return of(getMemberInfoError(response.data.errorMessages));
                    } else {
                        return of(getMemberInfoResponse(response.data.data), getMemberInfoError({}));
                    }
                    
                }),
                catchError((error) => {
                    return of(getMemberInfoError({ generalError: 'Unknown Error' }));
                })
            )
        )
    ); 
}

export const saveOrUpdateMemberInfoEpic = (action$) => {
    return action$.pipe(
        ofType(MemberInfoActionConstants.SAVE_OR_UPDATE_MEMBER_INFO_REQUEST),
        debounceTime(1000),
        switchMap(action =>
            from(axios.post(ROOT_API + '/member', action.payload)).pipe(
                mergeMap(response => {
                    if (response.data.success === 0) {
                        return of(saveOrUpdateMemberInfoError(response.data.errorMessages), saveOrUpdateMemberInfoError({}));
                    } else {
                        return of(saveOrUpdateMemberInfoResponse(response.data.success), searchByNameRequest(''), saveOrUpdateMemberInfoError({}));
                    }
                }),
                catchError((error) => {
                    return of(saveOrUpdateMemberInfoError({ generalError: 'Unknown Error' }));
                })
            )
        )
    ); 
}

export const deleteMemberInfoEpic = (action$) => {
    return action$.pipe(
        ofType(MemberInfoActionConstants.DELETE_MEMBER_INFO_REQUEST),
        switchMap(action =>
            from(axios.delete(ROOT_API + `/member/${action.payload}`)).pipe(
                mergeMap(response => {
                    return of(deleteMemberInfoResponse(response.data.data), deleteMemberInfoError({}));
                }),
                catchError((error) => {
                    return of(deleteMemberInfoError({ generalError: 'Unknown Error' }));
                })
            )
        )
    ); 
}