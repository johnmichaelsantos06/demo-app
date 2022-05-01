import { combineEpics } from "redux-observable";
import { deleteMemberInfoEpic, getMemberInfoEpic, saveOrUpdateMemberInfoEpic, searchMemberInfoEpic } from "./member/epics";

const rootEpic = combineEpics(
    searchMemberInfoEpic,
    getMemberInfoEpic,
    saveOrUpdateMemberInfoEpic,
    deleteMemberInfoEpic,
  );

export default rootEpic;