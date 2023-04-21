import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './App.css'

const initialValues = {
  // initial form values
  requisitionDetails: {
    // fields for Requisition details
    jobTitle: "",
    jobLocation: "",
    gender: "",
    salaryRange: "",
    jobDescription: "",
  },
  jobDetails: {
    // fields for Job details
    employmentType: "",
    jobFunction: "",
    industry: "",
  },
  interviewSettings: {
    // fields for Interview settings
    interviewType: "",
    interviewDuration: "",
    interviewLocation: "",
  },
};

const validationSchema = Yup.object({
  requisitionDetails: Yup.object({
    jobTitle: Yup.string().required("Required"),
    jobLocation: Yup.string().required("Required"),
    gender: Yup.string().required("Gender is required"),
    salaryRange: Yup.string().required("Required"),
    jobDescription: Yup.string().required("Required"),
  }),
  jobDetails: Yup.object({
    employmentType: Yup.string().required("Employment type is required"),
    jobFunction: Yup.string().required("Job function is required"),
    industry: Yup.string().required("Industry is required"),
  }),
  interviewSettings: Yup.object({
    interviewType: Yup.string().required("Interview type is required"),
    interviewDuration: Yup.string().required("Interview duration is required"),
    interviewLocation: Yup.string().required("Interview location is required"),
  }),
});

const onSubmit = (values) => {
  // handle form submission
  console.log(values);
};

const RequisitionDetailsForm = () => (
  <div className="continer">
    <h2>Requisition Details</h2>
    <div>
      <label htmlFor="jobTitle">Job Title</label>
      <Field type="text" id="jobTitle" name="jobTitle"  placeholder="software "/>
      <ErrorMessage name="jobTitle" />
    </div>
    <div>
      <label htmlFor="jobLocation">Job Location</label>
      <Field type="text" id="jobLocation" name="jobLocation"  placeholder="Location"/>
      <ErrorMessage name="jobLocation" />
    </div>
    <div >
    <label for="gender">Gender:</label>
    <select name="gender" id="gender" className="dropdown"> 
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
      </select>
    </div>
    <div>
      <label htmlFor="salaryRange">Salary Range</label>
      <Field type="Number" id="salaryRange" name="salaryRange"  placeholder="5LPA" />
      <ErrorMessage name="salaryRange" />
    </div>
    <div>
      <label htmlFor="Number of openings ">Number of openings </label>
      <Field type="Numbers" id="jobDescription" name="jobDescription"  placeholder="02"/>
      <ErrorMessage name="jobDescription" />
    </div>
  </div>
);

const JobDetailsForm = () => (
  <div className="continer">
    <h2>Job Details</h2>
    <div>
      <label htmlFor="employmentType">Employment Type</label>
      <Field type="text" id="employmentType" name="employmentType" />
      <ErrorMessage name="employmentType" />
    </div>
    <div>
      <label htmlFor="jobFunction">Job Function</label>
      <Field type="text" id="jobFunction" name="jobFunction" />
      <ErrorMessage name="jobFunction" />
    </div>
    <div>
      <label htmlFor="industry">Industry</label>
      <Field type="text" id="industry" name="industry" />
      <ErrorMessage name="industry" />
    </div>
  </div>
);

const InterviewSettingsForm = () => (
  <div className="continer">
    <h2>Interview Settings</h2>
   
<div>
<label for="interviewType">Interview Type:</label>
    <select name="interviewType" id="interviewType" className="dropdown"> 
      <option value="">Select type</option>
      <option value="online">online</option>
      <option value="offline">offline</option>
      </select>
</div>
<div>
  <label htmlFor="interviewDuration">Interview Duration</label>
  <select name="interviewDuration" id="interviewDuration" className="dropdown"> 
      <option value="">Select Duration</option>
      <option value="short">short</option>
      <option value="medium">medium</option>
      <option value="large">large</option>
  </select>
  <ErrorMessage name="interviewDuration" />
</div>
<div>
  <label htmlFor="interviewLocation">Interview Location</label>
  <select type="text" id="interviewLocation" name="interviewLocation" >
    <option value="">Select Language</option>
    <option value='English'>English</option>
    <option value='Hindi'>Hindi</option>
    </select>
  <ErrorMessage name="interviewLocation" />
</div>
</div>
);


const MultiPageForm = () => {
const [currentPage, setCurrentPage] = useState(0);
const [draftValues, setDraftValues] = useState(initialValues);

const handleNextPage = (values) => {
setDraftValues({ ...draftValues, ...values });
setCurrentPage(currentPage + 1);
};

const handlePreviousPage = (values) => {
setDraftValues({ ...draftValues, ...values });
setCurrentPage(currentPage - 1);
};

return (
<div>
<h1>Creat Candiate requirements </h1>
<Formik
     initialValues={draftValues}
     validationSchema={validationSchema}
     onSubmit={onSubmit}
     enableReinitialize={true}
   >
{({ values, errors, touched }) => (
<Form>
{currentPage === 0 && <RequisitionDetailsForm />}
{currentPage === 1 && <JobDetailsForm />}
{currentPage === 2 && <InterviewSettingsForm />}
        <div className="btn">
          {currentPage > 0 && (
            <button type="button" onClick={() => handlePreviousPage(values)}>
              Previous
            </button>
            
          )}
          {currentPage < 2 && (
            <button type="button" onClick={() => handleNextPage(values)}>
              Next
            </button>
          )}
          {currentPage === 2 && (
            <button type="submit" disabled={Object.keys(errors).length > 0}>
              Submit
            </button>
          )}
        </div>
      </Form>
    )}
  </Formik>
  <div className="details">
    <h2>Draft Values</h2>
    <pre>{JSON.stringify(draftValues, null, 2)}</pre>
  </div>
</div>
);
};

export default MultiPageForm;