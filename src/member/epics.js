import axios from 'axios';
import { ofType } from 'redux-observable';
import { map, switchMap, debounceTime, from, catchError, of } from 'rxjs';

import { ROOT_API } from '../constants';
import { MemberInfoActionConstants, searchMemberInfoResponse, getMemberInfoResponse, saveOrUpdateMemberInfoError, saveOrUpdateMemberInfoResponse, deleteMemberInfoResponse, deleteMemberInfoError, getMemberInfoError, searchMemberInfoError } from './actions';

export const searchMemberInfoEpic = (action$) => {
    return action$.pipe(
        ofType(MemberInfoActionConstants.SEARCH_MEMBER_INFO_REQUEST),
        switchMap(action =>
            from(axios.get(ROOT_API + `/member/list?fullName=${action.payload}`)).pipe(
                map(response => {
                    return searchMemberInfoResponse(response.data.list);
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
                map(response => {
                    return getMemberInfoResponse(response.data.data);
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
                map(response => {
                    if (response.data.success === 0) {
                        return saveOrUpdateMemberInfoError(response.data.errorMessages);
                    } else {
                        return saveOrUpdateMemberInfoResponse(response.data.success);
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
                map(response => {
                    return deleteMemberInfoResponse(response.data.data);
                }),
                catchError((error) => {
                    return of(deleteMemberInfoError({ generalError: 'Unknown Error' }));
                })
            )
        )
    ); 
}