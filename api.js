//talent = TalentRegister(), TalentLogin(), TalentDetailsById()

import axios from 'axios';
const URL = 'http://192.168.15.27:8000';

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
export const VerifyForgotEmail = async (type,reqbody) => {
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
export const ConfrimForgotOTP = async (type,reqbody) => {
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

// const sendOTP = async (email, otp) => {
//     const SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY';

//     try {
//         const response = await axios.post(
//             'https://api.sendgrid.com/v3/mail/send',
//             {
//                 personalizations: [
//                     {
//                         to: [{ email: email }],
//                         dynamic_template_data: {
//                             otp: otp,
//                         },
//                     },
//                 ],
//                 from: { email: 'YOUR_SENDER_EMAIL_ADDRESS' },
//                 template_id: 'YOUR_SENDGRID_TEMPLATE_ID',
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${SENDGRID_API_KEY}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         console.log('OTP email sent successfully');
//         console.log(response.data);
//     } catch (error) {
//         console.error('Error sending OTP email', error);
//     }
// };