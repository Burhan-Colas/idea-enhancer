import React from 'react'
import Global from "../Global"

export default function FinalOutput() {
  
  return (
    <div className='FinalOutput-output'>
      
    <h2 className='heading-output'>Final Submission</h2>
  
    <div className='div-label-output'>
    <label className='label-output'>Title: {Global.answers[1]}</label>
    <label className='label-output'>Description: {Global.answers[2]}</label>
    <label className='label-output'>Opportunity Being Pursued: {Global.answers[3]}</label>
    </div>

    </div>
  )
}
