import React, { useState } from "react";
import Summary from "./FormSummary";
import { useCreateLoanMutation } from "../../slices/loanApiSlice";

// Function to get the user's IP address
async function getUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
    return null;
  }
}

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    hearAbout: "",
    otherHearAbout: "", // New field for custom input
    financialSolution: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    ssn: "",
    phoneHome: "",
    address1: "",
    zipCode: "",
    driversLicense: "",
    driversLicenseState: "",
    requestedAmount: 1,
    loanPurpose: "Debtconsolidation",
    credit: "Excellent",
    ownHome: true,
    employerName: "",
    monthsAtCompany: 1,
    incomeType: "",
    monthlyIncome: 1,
    payDate1: "",
    payFrequency: "Weekly",
    directDeposit: true,
    bankName: "",
    bankAccountType: "Checking",
    bankABA: "e.g 123",
    bankAccountNumber: "",
    ipAddress: "", // Added field for IP address
  });

  const [showSummary, setShowSummary] = useState(false);
  const [createLoan, { isLoading, error }] = useCreateLoanMutation();
  const [currentSection, setCurrentSection] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [isOtherSelected, setIsOtherSelected] = useState(false); // New state to track "Other" option

  const validateSection = () => {
    const errors = {};
    const sectionFields = {
      0: [
        { key: "firstName", message: "First name is required." },
        { key: "lastName", message: "Last name is required." },
        { key: "email", message: "Email is required." },
        { key: "dob", message: "Date of birth is required." },
        { key: "ssn", message: "SSN is required." },
        { key: "phoneHome", message: "Phone number is required." },
        { key: "address1", message: "Address is required." },
        { key: "zipCode", message: "Zip Code is required." },
        { key: "driversLicense", message: "Driver's License is required." },
        {
          key: "driversLicenseState",
          message: "Driver's License State is required.",
        },
      ],
      1: [
        { key: "loanPurpose", message: "Loan purpose is required." },
        { key: "employerName", message: "Employer name is required." },
        { key: "monthsAtCompany", message: "Months at company is required." },
        { key: "monthlyIncome", message: "Monthly income is required." },
        { key: "payDate1", message: "Pay date  is required." },
      ],
      2: [
        { key: "bankName", message: "Bank name is required." },
        { key: "directDeposit", message: "Direct deposit is required." },
        { key: "bankAccountType", message: "Bank account type is required." },
        { key: "bankABA", message: "Bank ABA is required." },
        {
          key: "bankAccountNumber",
          message: "Bank account number is required.",
        },
      ],
    };

    const currentFields = sectionFields[currentSection] || [];

    currentFields.forEach((field) => {
      if (!formData[field.key]) {
        errors[field.key] = field.message;
      }
    });

    return errors;
  };

  const handleNext = () => {
    const errors = validateSection();
    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      setCurrentSection(currentSection + 1);
      setProgress(progress + 33.33);
    } else {
      setFormErrors(errors);
    }
  };

  const handlePrev = () => {
    setCurrentSection(currentSection - 1);
    setShowSummary(false);
    setProgress(progress - 33.33);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "hearAbout") {
      setIsOtherSelected(value === "Other");
      setFormData({
        ...formData,
        [name]: value,
        otherHearAbout: "", // Clear otherHearAbout if another option is selected
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSection();
    if (Object.keys(errors).length === 0) {
      setFormErrors({});

      try {
        // Fetch the user's IP address
        const ipAddress = await getUserIP();

        // Update formData with the IP address and the custom input if "Other" was selected
        const updatedFormData = {
          ...formData,
          ipAddress,
          hearAbout: isOtherSelected
            ? formData.otherHearAbout
            : formData.hearAbout,
        };

        setFormData(updatedFormData); // Ensure formData is updated

        const response = await createLoan(updatedFormData).unwrap();
        console.log("response...", response);
        console.log("Form data submitted:", updatedFormData);
        setShowSummary(true);
        if (response.success) {
        } else {
          setFormErrors({ general: `${response.message}` });
        }
      } catch (err) {
        console.log("err...........", err);
        setFormErrors({ general: `${err.message}` });
      }
    } else {
      console.log("errors...........", errors);
      setFormErrors(errors);
    }
  };

  return (
    <div className="pb-[124px] font-sans min-h-screen flex flex-col items-center bg-gray-100">
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-700"> Form</h1>
      </header>

      <div className="lg:w-[60%] sm:w-[100%] mx-auto p-6 bg-white shadow-md rounded-md">
        {/* stepper progressbar start */}
        <div className="flex items-start max-w-screen-lg mx-auto mb-6">
          <div className="w-full">
            <div className="flex items-center w-full">
              <div
                className={`w-8 h-8 shrink-0 p-1.5 flex items-center justify-center rounded-full ${
                  currentSection >= 1 ? "bg-bardum" : "bg-bardum"
                }`}
              >
                <span className="text-base text-white font-bold">1</span>
              </div>
              <div
                className={`w-full h-1 mx-4 rounded-lg ${
                  currentSection >= 1 ? "bg-bardum" : "bg-gray-300"
                }`}
              ></div>
            </div>
            <div className="mt-2">
              <h6 className="text-base font-bold text-bardum">Personal Info</h6>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center w-full">
              <div
                className={`w-8 h-8 shrink-0 p-1.5 flex items-center justify-center rounded-full ${
                  currentSection >= 2
                    ? "bg-bardum"
                    : currentSection === 1
                    ? "bg-gray-300"
                    : "bg-gray-300"
                }`}
              >
                <span className="text-base text-white font-bold">2</span>
              </div>
              <div
                className={`w-full h-1 mx-4 rounded-lg ${
                  currentSection >= 2 ? "bg-bardum" : "bg-gray-300"
                }`}
              ></div>
            </div>
            <div className="mt-2">
              <h6 className="text-base font-bold text-bardum">Income Info</h6>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center w-full">
              <div
                className={`w-8 h-8 shrink-0 p-1.5 flex items-center justify-center rounded-full ${
                  currentSection >= 3
                    ? "bg-bardum"
                    : currentSection === 2
                    ? "bg-bardum"
                    : "bg-gray-300"
                }`}
              >
                <span className="text-base text-white font-bold">3</span>
              </div>
              <div
                className={`w-full h-1 mx-4 rounded-lg ${
                  currentSection >= 3 ? "bg-bardum" : "bg-gray-300"
                }`}
              ></div>
            </div>
            <div className="mt-2">
              <h6 className="text-base font-bold text-bardum">Bank Info</h6>
            </div>
          </div>

          <div className="w-[1/3]">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 shrink-0 p-1.5 flex items-center justify-center rounded-full ${
                  currentSection === 4
                    ? "bg-bardum"
                    : currentSection === 3
                    ? "bg-bardum"
                    : "bg-gray-300"
                }`}
              >
                <span className="text-base text-white font-bold">
                  {currentSection === 4 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    "4"
                  )}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <h6 className="text-base font-bold text-bardum">Complete</h6>
            </div>
          </div>
        </div>

        {/* stepper progress bar  ends*/}

        <form className="w-full" id="loanForm " onSubmit={handleSubmit}>
          {Object.keys(formErrors).length > 0 && (
            <div className="mb-4 p-4 bg-red-100 text-bardum rounded-md">
              <p>{Object.values(formErrors)[0]}</p>
            </div>
          )}
          {currentSection === 0 && (
            <fieldset className="form-section border border-gray-500 p-8 rounded-[12px]">
              <legend className="text-lg text-gray-700 font-semibold mb-4 p-[10px]">
                Personal Information
              </legend>
              {/* Personal Info Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hearAbout" className="block mb-2">
                    How did you hear about us?
                  </label>
                  {isOtherSelected ? (
                    <input
                      type="text"
                      id="otherHearAbout"
                      name="otherHearAbout"
                      value={formData.otherHearAbout}
                      onChange={handleChange}
                      placeholder="Please specify"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    />
                  ) : (
                    <select
                      id="hearAbout"
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    >
                      <option value="Google">Google</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Tiktok">Tiktok</option>
                      <option value="LinkedIN">LinkedIN</option>
                      <option value="Other">Other</option>
                    </select>
                  )}
                </div>
                <div>
                  <label htmlFor="financialSolution" className="block mb-2">
                    Financial Solutions
                  </label>
                  <select
                    id="financialSolution"
                    name="financialSolution"
                    value={formData.financialSolution}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  >
                    <option value="HomeEquity">Home Equity</option>
                    <option value="HomeRefinance">Home Refinance</option>
                    <option value="PersonalLoan">Personal Loan</option>
                    <option value="Insurance">Insurance</option>{" "}
                    {/* Corrected value */}
                    <option value="BusinessLoan">Business Loan</option>{" "}
                    {/* Corrected value */}
                    <option value="StudentLoan">Student Loan</option>
                    <option value="TaxRelief">Tax Relief</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="firstName" className="block mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    maxlength="50"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter first name."
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block mb-2">
                    Last Name
                  </label>
                  <input
                    maxlength="50"
                    type="text"
                    placeholder="Enter last name."
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email."
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="dob" className="block mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    placeholder="Enter date-of-birth."
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="ssn" className="block mb-2">
                    SSN
                  </label>
                  <input
                    maxlength="50"
                    type="text"
                    id="ssn"
                    placeholder="Enter SSN."
                    name="ssn"
                    value={formData.ssn}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phoneHome" className="block mb-2">
                    Phone
                  </label>
                  <input
                    maxlength="12"
                    type="text"
                    placeholder="Enter home phone number."
                    id="phoneHome"
                    name="phoneHome"
                    value={formData.phoneHome}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="address1" className="block mb-2">
                    Address
                  </label>
                  <input
                    maxLength="50"
                    type="text"
                    id="address1"
                    placeholder="Enter address."
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block mb-2">
                    Zip Code
                  </label>
                  <input
                    placeholder="Enter zip code."
                    type="number"
                    maxlength="10"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onInput={(e) => {
                      if (e.target.value.length > 50) {
                        e.target.value = e.target.value.slice(0, 50);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="driversLicense" className="block mb-2">
                    Driver's License
                  </label>
                  <input
                    type="text"
                    id="driversLicense"
                    name="driversLicense"
                    placeholder="Enter driving license."
                    value={formData.driversLicense}
                    onChange={handleChange}
                    onInput={(e) => {
                      if (e.target.value.length > 50) {
                        e.target.value = e.target.value.slice(0, 50);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="driversLicenseState" className="block mb-2">
                    Driver's License State
                  </label>
                  <input
                    minlength="2"
                    maxlength="2"
                    type="text"
                    id="driversLicenseState"
                    placeholder="Enter driving license state."
                    name="driversLicenseState"
                    value={formData.driversLicenseState}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
              </div>
            </fieldset>
          )}
          {/* Income Information Section */}
          {currentSection === 1 && (
            <fieldset className="form-section border border-gray-500 p-8 rounded-[10px]">
              <legend className="text-lg text-gray-700 font-semibold mb-4 p-[10px]">
                Income Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* New fields start here */}
                <div>
                  <label htmlFor="loanPurpose" className="block mb-2">
                    Debt Loan Purpose (Optional)
                  </label>
                  <select
                    id="loanPurpose"
                    name="loanPurpose"
                    placeholder="Enter loan purpose."
                    value={formData.loanPurpose}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  >
                    <option value="Debtconsolidation">
                      Debt Consolidation
                    </option>
                    <option value="Creditcard">Credit Card</option>
                    <option value="Homeimprovement">Home Improvement</option>
                    <option value="Studentloanconsolidation">
                      Student Loan Consolidation
                    </option>
                    <option value="Majorpurchase">Major Purchase</option>
                    <option value="Car">Car</option>
                    <option value="Greenloan">Green Loan</option>
                    <option value="Business">Business</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Relocation">Relocation</option>
                    <option value="Medical">Medical</option>
                    <option value="Household">Household</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="requestedAmount" className="block mb-2">
                    Requested Amount (Optional)
                  </label>
                  <input
                    type="number"
                    id="requestedAmount"
                    placeholder="Enter the requested amount."
                    name="requestedAmount"
                    value={formData.requestedAmount}
                    onChange={handleChange}
                    onInput={(e) => {
                      if (e.target.value.length > 50) {
                        e.target.value = e.target.value.slice(0, 50);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="credit" className="block mb-2">
                    Credit Score
                  </label>
                  <select
                    id="credit"
                    name="credit"
                    value={formData.credit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Verygood">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                    <option value="Verypoor">Very Poor</option>
                    <option value="Unsure">Unsure</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ownHome" className="block mb-2">
                    Own Home
                  </label>
                  <select
                    id="ownHome"
                    name="ownHome"
                    value={formData.ownHome}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="employerName" className="block mb-2">
                    Employer Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter employer name."
                    id="employerName"
                    name="employerName"
                    value={formData.employerName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="monthsAtCompany" className="block mb-2">
                    Months at Company
                  </label>
                  <input
                    type="number"
                    placeholder="Enter number of months."
                    id="monthsAtCompany"
                    name="monthsAtCompany"
                    value={formData.monthsAtCompany}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="incomeType" className="block mb-2">
                    Income Type
                  </label>
                  <select
                    id="incomeType"
                    name="incomeType"
                    value={formData.incomeType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  >
                    <option value="employed">Employed</option>
                    <option value="selfemployed">Self-Employed</option>
                    <option value="military">Military</option>
                    <option value="benefits">Benefits</option>
                    <option value="retired">Retired</option>
                    <option value="unemployed">Unemployed</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="monthlyIncome" className="block mb-2">
                    Monthly Income
                  </label>
                  <input
                    placeholder="Enter monthly income."
                    type="number"
                    id="monthlyIncome"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="payDate1" className="block mb-2">
                    Pay Date
                  </label>
                  <input
                    type="date"
                    placeholder="Enter pay date."
                    id="payDate1"
                    name="payDate1"
                    value={formData.payDate1}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="payFrequency" className="block mb-2">
                    Pay Frequency
                  </label>
                  <select
                    id="payFrequency"
                    name="payFrequency"
                    value={formData.payFrequency}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Biweekly">Bi-Weekly</option>
                    <option value="Semimonthly">Semi-Monthly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </fieldset>
          )}
          {/* payment details */}
          {currentSection === 2 && (
            <fieldset className="form-section border border-gray-500 p-8 rounded-[12px]">
              <legend className="text-lg text-gray-700 font-semibold mb-4 p-[10px]">
                Bank Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bankName" className="block mb-2">
                    Bank Name
                  </label>
                  <input
                    maxLength="50"
                    placeholder="Enter bank name."
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="directDeposit" className="block mb-2">
                    Direct Deposit
                  </label>
                  <select
                    id="directDeposit"
                    name="directDeposit"
                    value={formData.directDeposit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    required
                  >
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bankAccountType" className="block mb-2">
                    Bank Account Type
                  </label>
                  <select
                    id="bankAccountType"
                    name="bankAccountType"
                    value={formData.bankAccountType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    required
                  >
                    <option value="Checking">Checking</option>
                    <option value="Savings">Savings</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bankABA" className="block mb-2">
                    Bank ABA
                  </label>
                  <input
                    maxLength="50"
                    type="text"
                    placeholder="Enter bank ABA."
                    id="bankABA"
                    name="bankABA"
                    value={formData.bankABA}
                    onChange={handleChange}
                    pattern="\d{9}"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2">Bank Account Number</label>
                  <input
                    type="number"
                    id="bankAccountNumber"
                    placeholder="Enter bank account number."
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={handleChange}
                    onInput={(e) => {
                      if (e.target.value.length > 50) {
                        e.target.value = e.target.value.slice(0, 50);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
              </div>
            </fieldset>
          )}
          {/* ------------------ */}
          {showSummary && <Summary formData={formData} />}

          <div className="flex  mt-6 justify-between ">
            <div className="flex justify-start">
              {currentSection > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md"
                >
                  Back
                </button>
              )}
            </div>
            {currentSection < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="py-2 px-[60px]  bg-transparent transition-all duration-300 ease-in-out   text-bardum border hover:bg-bardum hover:text-white  border-bardum font-semibold rounded-md"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="py-2 px-4 bg-bardum text-white rounded-md"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoanApplicationForm;
