'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSession } from 'next-auth/react';

interface keluhanProp {
    id_keluhan: number
}

const ComplaintDesc: React.FC<keluhanProp> = ({id_keluhan}) => {
    const { data: session } = useSession();
    const [complaint, setComplaint] = useState('');

    const keluhan = async () => {
        const response = await fetch(`/api/layanan/keluhan/keluhanByID/${id_keluhan}`)
        const result = await response.json()

        setComplaint(result.keluhan)

        return result
    }

    return (
        <div>
            <h1>Keluhan</h1>
            <div>{complaint}</div>
        </div> 
    )
}

export default ComplaintDesc