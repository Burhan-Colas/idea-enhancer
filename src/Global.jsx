// import { useState, useEffect, useContext } from "react";

// import useFetch from "./useFetch";

const Global = () => { }

export default Global;

Global.answers = [];
// the currentStep in the n number of steps retrieved from the database
Global.currentStep = 1;
// for every step, the user must submit their answer
Global.hasSubmitted = false;
Global.submittedAnswer = "";

// the maximum number of steps (array size) retrieved from the database for this innovation type
Global.maxSteps = 8;
// this is a test change
Global.increaseCurrentStep = () => {
    Global.currentStep += 1;
    //alert('currentStep is:' + Global.currentStep);
    //useFetch()
    //return (() => useFetch)
}
