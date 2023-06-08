//talent = TalentRegister(), TalentLogin(), TalentDetailsByReg()

import axios from 'axios';
const URL = 'http://192.168.0.100:8000';

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

//get talent details by register number
// reg = talent's register number
export const TalentDetailsByReg = async (reg) => {
    const url = URL + '/api/talent/' + reg;
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