// pages/laundry/index.tsx
import SolutionForm from '../../components/SolutionForm';
import ComplaintDesc from '../../components/ComplaintDesc'

const DetailedComplaintPage = (id_keluhan: number) => {
  return (
    <div>
      <h1>Complaint Solution Page</h1>
      <ComplaintDesc id_keluhan={id_keluhan}/>
      <SolutionForm id_keluhan={id_keluhan}/>
    </div>
  );
}