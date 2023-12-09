import React from 'react'
import SolutionForm from '../../components/SolutionForm';
import ComplaintDesc from '../../components/ComplaintDesc'

interface keluhanProp {
    id_keluhan: number
}

const DetailedComplaintPage: React.FC<keluhanProp> = ({id_keluhan}) => {
  return (
    <div>
      <h1>Complaint Solution Page</h1>
      <ComplaintDesc id_keluhan={id_keluhan}/>
      <SolutionForm id_keluhan={id_keluhan}/>
    </div>
  );
}

export default DetailedComplaintPage