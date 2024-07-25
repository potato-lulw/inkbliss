"use client"
import React, { useEffect, useState } from 'react';
import WorkSpaceHeader from '../components/WorkSpaceHeader';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import useIsSmallScreen from '@/app/hooks/useIsSmallScreen';

// const Editor = dynamic(import ('../components/Editor'),{ssr:false});
const Editor = dynamic(() => import('../components/Editor'), {
  ssr: false,
})
// import Editor from '../components/Editor';
import dynamic from 'next/dynamic';
// import Excali from '../components/Excali';
const Excali =dynamic(() => import('../components/Excali'), {
  ssr: false,
})

interface WorkSpacePageProps {
  params: {
    fileId: string;
  };
}

const WorkSpacePage = ({ params: { fileId } }: WorkSpacePageProps) => {
  const [fileName, setFileName] = useState("");
  const convex = useConvex();
  const [file, setFile] = useState<any>();
  const isSmallScreen = useIsSmallScreen();
  const [triggerSave, setTriggerSave] = useState(false);

  useEffect(() => {
    const getFile = async () => {
      const result = await convex.query(api.files.getFileById, { fileId: fileId });
      console.log(result);
      setFileName(result[0].fileName);
      setFile(result[0]);
      
    };
    getFile();
  }, [convex, fileId]);

  return (
    <div className='h-screen flex flex-col'>
      <WorkSpaceHeader file={file} onSave={() => setTriggerSave(!triggerSave)}/>
      <div className='flex-grow overflow-hidden'>
        <ResizablePanelGroup direction={isSmallScreen ? "vertical" : "horizontal"} className='h-full'>
          <ResizablePanel defaultSize={40}>
            <div className='p-3 mt-4 h-full overflow-auto'>
              <Editor onSaveTrigger = {triggerSave} fileId = {fileId} documentData = {file?.document || ""}/>
            </div>
          </ResizablePanel>
          <ResizableHandle className='text-primary' />
          <ResizablePanel defaultSize={60}>
            <div className='p-3 h-full overflow-auto'>
              <Excali onSaveTrigger = {triggerSave} setOnSaveTrigger = {setTriggerSave} whiteboardData = {file?.whiteboard || ""} fileId = {fileId} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkSpacePage;
