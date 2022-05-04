import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { deleteMemberInfoRequest, getMemberInfoRequest, searchByNameRequest, searchMemberInfoRequest } from "./actions";
import MemberInformationForm from "./MemberInformationForm";
import MemberInformationList from "./MemberInformationList";

export function MemberInformationPage() {
    const dispatch = useDispatch();
    const { memberInfoList, searchQuery } = useSelector(state => { return state.memberInfo });

    const memberInfoTableColumns = useMemo(
        () => [
            {
                Header: 'Full Name',
                accessor: 'fullName'
            },
            {
                Header: 'Email address',
                accessor: 'email'
            },
            {
                Header: 'Gender',
                accessor: 'gender'
            },
            {
                Header: 'IP address',
                accessor: 'ipAddress'
            },
            {
                Header: 'Actions',
                id: 'actions',
                Cell: ({ row }) => (
                    <div>
                        <button onClick={(e) => 
                                swal({
                                    title: "Confirm Action",
                                    text: "Delete record?",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true
                                })
                                .then((willDelete) => {
                                    if (willDelete) {
                                        dispatch(deleteMemberInfoRequest(row.original.id))
                                        swal("Operation succeeded", {
                                            icon: "success"
                                        }).then((value) => {
                                            dispatch(searchMemberInfoRequest(''));
                                        });
                                    }
                                })
                            }>
                            Delete
                        </button>
                        {' '}
                        <button className="button-primary" onClick={(e) => dispatch(getMemberInfoRequest(row.original.id))}>
                            Edit
                        </button>
                    </div>
                    
                ),
              },
        ],
        [dispatch]
    )

    return (
        <div className="container">
            <MemberInformationForm onSuccess={() => dispatch(searchMemberInfoRequest(''))}/>
            <div className="row">
                <div className="twelve columns">
                    <label htmlFor="searchForNameInput">Search By Name</label>
                    <input 
                        id="searchForNameInput" 
                        type="text" 
                        placeholder="John Doe"
                        className="u-full-width"
                        value={searchQuery}
                        onChange={(e) => dispatch(searchByNameRequest(e.target.value))}
                        onKeyDown={(e) => e.code === "Enter" ? dispatch(searchMemberInfoRequest(searchQuery)) : null}
                    />
                </div>
            </div>
            <MemberInformationList 
                columns={memberInfoTableColumns} 
                data={memberInfoList} 
                onTableLoad={() => dispatch(searchMemberInfoRequest(''))}
            />
        </div>
    );
}
