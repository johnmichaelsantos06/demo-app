import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveOrUpdateMemberInfoRequest } from "./actions";
import _ from 'lodash';
import swal from "sweetalert";

function MemberInformationForm({ onSuccess }) {
    const { success, errorMessages, memberInfo } = useSelector(state => { return state.memberInfo });
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        dispatch(saveOrUpdateMemberInfoRequest(data));
    }

    useEffect(() => {
        if (_.isEqual(success, 1)) {
            swal("Success", "Operation success", "success").then((value) => {
                onSuccess();
            });
            reset();
        }
    }, [success, reset]);

    useEffect(() => {
        if (!_.isEmpty(memberInfo)) {
            const fieldList = ["id", "fullName", "email", "gender", "ipAddress"];
            _.forEach(fieldList, (value) => {
                setValue(value, memberInfo[value]);
            });
        }
    }, [memberInfo, success, setValue]);
    
    useEffect(() => {
        if (!_.isEmpty(errorMessages)) {
            const listOfErrors = [];
            _.forOwn(errorMessages, function(value, key) {
                listOfErrors.push(value);
              });
            swal("Error", listOfErrors.join(', '), "error");
        }
    }, [errorMessages]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="twelve columns">
                        <label htmlFor="fullNameInput">Full Name</label>
                        <input className="u-full-width" type="text" placeholder="John Doe" id="fullNameInput" 
                            {...register('fullName', { 
                                required: "Full Name is required.",
                                validate: (value) => {
                                    return !!value.trim() || "Full Name is required.";
                                }
                            })} />
                            {errors?.fullName && <div style={{ color: 'red', paddingBottom: '20px'}}>{errors.fullName.message}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="twelve columns">
                        <label htmlFor="emailInput">Email Address</label>
                        <input className="u-full-width" type="text" placeholder="john.doe@gmail.com" id="emailInput" 
                            {...register('email', 
                            { 
                                required: "Email Address is required.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid Email address"
                                }
                            })
                        }/>
                        {errors?.email && <div style={{ color: 'red', paddingBottom: '20px'}}>{errors.email.message}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="six columns">
                        <label htmlFor="genderInput">Gender</label>
                        <select className="u-full-width" id="genderInput" {...register("gender")} >
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </select>
                    </div>
                    <div className="six columns">
                        <label htmlFor="ipAddressInput">IP Address</label>
                        <input className="u-full-width" type="text" placeholder="127.0.0.1" id="ipAddressInput" 
                        {...register("ipAddress",
                            { 
                                required: "IP Address is required.",
                                pattern: {
                                    value: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                                    message: "Invalid IP address"
                                }
                            })
                        }
                        />
                        {errors?.ipAddress && <div style={{ color: 'red', paddingBottom: '20px'}}>{errors.ipAddress.message}</div>}
                    </div>
                </div>
                <input className="button-primary" type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default MemberInformationForm;