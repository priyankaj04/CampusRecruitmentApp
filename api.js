//talent = TalentRegister(), TalentLogin(), TalentDetailsById()

import axios from 'axios';
const URL = 'http://192.168.0.101:8000';

//student registration 
// reqbody = { firstname, lastname, email, password, register_no, enable, college}
export const TalentRegister = async (reqbody) => {
    const url = URL + '/api/talent/registration';
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Recruiter registration
// reqbody = { firstname, lastname, email, password, company_name, contact_no, enable}
export const RecruiterRegisteration = async (reqbody) => {
    const url = URL + '/api/recruiter/registration';
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Admin registration
// reqbody = {code, firstname, lastname, email, password, contactno}
export const AdminRegisteration = async (reqbody) => {
    const url = URL + '/api/admin/registration';
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//hod registration
// reqbody = { name,department, password}
export const HodRegisteration = async (reqbody) => {
    const url = URL + '/api/hod/registration';
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//student login
// reqbody = { register_no, password }
export const TalentLogin = async (reqbody) => {
    const url = URL + '/api/talent/login';
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Recruiter login
// reqbody = { company_name, password }
export const RecruiterLoginForm = async (reqbody) => {
    const url = URL + '/api/recruiter/login';
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Admin login
// reqbody = { email, password }
export const AdminLoginForm = async (reqbody) => {
    const url = URL + '/api/admin/login';
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Hod login
// reqbody = { department, password }
export const HodLogin = async (reqbody) => {
    const url = URL + '/api/hod/login';
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//get talent details by id
// reg = talent's id
export const TalentDetailsById = async (id) => {
    const url = URL + '/api/talent/' + id;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//get recruiter details by recruiter id
// rid = recruiter id
export const RecruiterDetailsById = async (rid) => {
    const url = URL + '/api/recruiter/' + rid;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//update talent details by id
// id = talent_id, reqbody = {branch,fieldofinterest,semester,bio,college,contactno,whatappno,cgpa,enable,resume,cv,profile_img }
export const UpdateTalentDetailsById = async (reqbody, id) => {
    const url = URL + '/api/talent/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//update Recruiter details by id
// id = recruiter_id, reqbody = {branch,fieldofinterest,semester,bio,college,contactno,whatappno,cgpa,enable,resume,cv,profile_img }
export const UpdateRecruiterDetailsById = async (reqbody, id) => {
    const url = URL + '/api/recruiter/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Change password for talent 
export const ChangeTalentPassword = async (reqbody, id) => {
    const url = URL + '/api/talent/checkpassword/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Change password for Recruiter 
export const ChangeRecruiterPassword = async (reqbody, id) => {
    const url = URL + '/api/recruiter/changepassword/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Query
// reqbody = { id, type, email, contact_no, fullname, message}
export const NewQuery = async (reqbody) => {
    const url = URL + '/api/query/newquery';
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Query
// reqbody = { id, type, email, contact_no, fullname, message}
export const AllQueryById = async (id) => {
    const url = URL + '/api/query/' + id;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}


//Resume creation/updation
// reqbody = { resume body }
export const ResumeUpdation = async (id, reqbody) => {
    const url = URL + '/api/resume/update/' + id;
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}


//Get Resume details by talent id
export const ResumeDetailsByTalentID = async (id) => {
    const url = URL + '/api/resume/talent/' + id;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const CreateJob = async (id, reqbody) => {
    const url = URL + '/api/application/create/' + id;
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const SendOTPCode = async (reqbody, id) => {
    const url = URL + '/api/talent/verify/' + id;
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const verifyOTP = async (reqbody, id) => {
    const url = URL + '/api/talent/auth/' + id;
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const SendOTPCodeSMS = async (reqbody, id) => {
    const url = URL + '/api/recruiter/verify/' + id;
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const verifyOTPSMS = async (reqbody, id) => {
    const url = URL + '/api/recruiter/auth/' + id;
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const CreateStudentAPI = async (reqbody) => {
    const url = URL + '/api/student/create'
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Check if entered email is valid or not, if valid, send otp
export const VerifyForgotEmail = async (type, reqbody) => {
    const url = URL + '/api/forgotpassword/verify/' + type;
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Check if entered otp is valid or not
export const ConfrimForgotOTP = async (type, reqbody) => {
    const url = URL + '/api/forgotpassword/otp/' + type
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const ForgotpasswordEmail = async (type, reqbody) => {
    const url = URL + '/api/forgotpassword/' + type
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//get application which are pending
export const GetApplicationsForAdmin = async () => {
    const url = URL + '/api/admin/action/pending';
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}


//get class students from classname
export const StudentsByClassName = async (classes) => {
    const url = URL + '/api/student/class/' + classes;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const UpdateStudentDetailsById = async (reqbody, id) => {
    const url = URL + '/api/student/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const UpdateApplicationStatusById = async (reqbody, id) => {
    const url = URL + '/api/application/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

// to get application details by status
export const ApplicationsDetailsByStatus = async (status, rid) => {
    const url = URL + '/api/application/status?status=' + status + '&rid=' + rid;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

// to get all approved applications
export const GetAllApprovedApplications = async () => {
    const url = URL + '/api/talent/alljobs/approved';
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

// to get all query for admin
export const GetAllQueries = async () => {
    const url = URL + '/api/query/allquery';
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//response to query by query id
export const Responsetoquery = async (id, reqbody) => {
    const url = URL + '/api/query/replyquery/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}


// get Application by application_id
export const ApplicationById = async (id) => {
    const url = URL + '/api/application/' + id;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//
export const UpdateApplicationDetailsById = async (reqbody, id) => {
    const url = URL + '/api/application/update/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}


//get talent details by id
// reg = talent's id
export const GetStudentByEmail = async (email) => {
    let em = encodeURIComponent(email);

    const url = URL + '/api/student/email/' + em;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}


//Change password for Recruiter 
export const ChangeForgotPassword = async (reqbody, id) => {
    const url = URL + '/api/recruiter/change/password';
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Apply for application
export const ApplyingForApplication = async (reqbody) => {
    const url = URL + '/api/applicants/pitch';
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Get all the applications applied by talent
export const ApplicationsAppliedbytalentid = async (id) => {
    const url = URL + '/api/applicants/talent/' + id;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Get all the applicants applied by talentid and applicationid
export const ApplicantsByTidAid = async (tid, aid) => {
    const url = URL + '/api/applicants/details?tid=' + tid + '&aid=' + aid;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Get all the applicants applied by talentid and applicationid
export const ApplicantsByAid = async (aid) => {
    const url = URL + '/api/applicants/?aid=' + aid
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Get all the applicants by application id
export const ApplicantsByApplicationId = async (status, id) => {
    const url = URL + '/api/applicants/application/' + id + '/?status=' + status;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Accept or reject applicants
export const DecisionApplicant = async (reqbody, id) => {
    const url = URL + '/api/applicants/decision/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//Change password for admin 
export const ChangeAdminPassword = async (reqbody, id) => {
    const url = URL + '/api/admin/changepassword/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}


export const SaveApplication = async (reqbody) => {
    const url = URL + '/api/application/save/id';
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const RemoveSavedApplication = async (reqbody) => {
    const url = URL + '/api/application/save/remove';
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const GetAllSavedApplications = async (reqbody) => {
    const url = URL + '/api/application/save/application';
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

// schedule interview details
export const ScheduleInterviewAPI = async (reqbody) => {
    const url = URL + '/api/interview/create';
    const fetchOptions = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };

    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

// schedule interview details
export const GetInterviewDetails = async (aid, tid) => {
    const url = URL + '/api/interview/getdetails?aid=' + aid + '&tid=' + tid;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

//update/edit interview details.
export const UpdateInterviewDetails = async (reqbody, id) => {
    const url = URL + '/api/interview/update/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const UpdateSubjects = async (req, course, year) => {
    const url = URL + '/api/subjects/update/' + course + '?year=' + year;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    };
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const GetSubjects = async (course, year) => {
    const url = URL + '/api/subjects/course/' + course + '?year=' + year;
    const fetchOptions = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}

export const UpdateSlots = async (reqbody, id) => {
    const url = URL + '/api/applicants/updateslot/' + id;
    const fetchOptions = {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody)
    };
    //console.log("slkdfdfdjfsldf",reqbody)
    return await fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
}