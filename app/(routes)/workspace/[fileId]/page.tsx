"use client"
import React, { useEffect, useState } from 'react'
import WorkSpaceHeader from '../components/WorkSpaceHeader'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'

interface WorkSpacePageProps {
    params: {
        fileId: string
    }
}

const WorkSpacePage = ({params: {fileId}}: WorkSpacePageProps) => {
    const [fileName, setFileName] = useState("");
    const convex = useConvex();

    const getFile = async () => {
        const result = await convex.query(api.files.getFileById, {fileId: fileId})
        console.log(result);
        setFileName(result[0].fileName);
    }

    useEffect(() => {
        getFile();
        
    }, []);
  return (
    <div>
        <WorkSpaceHeader fileName={fileName}/>
    </div>
  )
}

export default WorkSpacePage