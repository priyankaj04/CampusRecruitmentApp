const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const talent = require('./routers/talent');
const resume = require('./routers/resume');
const application = require('./routers/application');
const recruiter = require('./routers/recruiter');
const query = require('./routers/query');
const admin = require('./routers/admin');
const student = require('./routers/student');
const forgotpassword = require('./routers/forgotpassword');
const applicants = require('./routers/applicants');
const interview = require('./routers/interview');
const rec_query = require('./routers/rec_query');
const subjects = require('./routers/subjects');
const search = require('./routers/search');
const hod = require('./routers/hod');

app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // Set the desired maximum file size (e.g., 50 MB)
}));

app.listen(8000, () => {
    console.log(`Example app listening on port 8000`)
})

app.use('/api/talent', talent);
app.use('/api/resume', resume);
app.use('/api/application', application);
app.use('/api/recruiter', recruiter);
app.use('/api/query', query);
app.use('/api/admin', admin);
app.use('/api/student', student);
app.use('/api/forgotpassword', forgotpassword);
app.use('/api/applicants', applicants);
app.use('/api/interview', interview);
app.use('/api/recquery', rec_query);
app.use('/api/subjects', subjects);
app.use('/api/search', search);
app.use('/api/hod', hod)