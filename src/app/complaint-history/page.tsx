'use client'
import React, { useEffect, useState } from 'react';
import TwoColumnTable from '../components/ComplaintTable';
import { useSession } from 'next-auth/react';

const YourPage = () => {
  // Your dynamic data for the table (example)

//   const dynamicData = [
//     { column1: 'Data 1A', column2: 'Data 1B' },
//     { column1: 'Data 2A', column2: 'Data 2B' },
//     { column1: 'Data 3A', column2: 'Data 3B' },
//     // Add more data as needed
//   ];

    const {data: session} = useSession()
    const sessionID = session?.user.id

    const [complaintSolutionData, setComplaintSolutionData] = useState('')

    const getComplaintSolution = async (id_resident: number) => {
        const req = await fetch(`/api/layanan/keluhan-solusi/${id_resident}`)
        const res = await req.json()
        setComplaintSolutionData(res)
    }

    getComplaintSolution(sessionID)

  return (
    <div>
      <h1>Your Page</h1>
      <TwoColumnTable data={complaintSolutionData} />
    </div>
  );
};

export default YourPage;
