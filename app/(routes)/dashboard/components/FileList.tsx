import { useFilesContext } from '@/app/_context/FilesListContext'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, Delete, Edit, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import CustomDropDown from '@/components/ui/CustomDropDown';




const FileList = () => {

  const router =  useRouter();

  const { fileList, setFileList } = useFilesContext();
  const { user } = useKindeBrowserClient();
  useEffect(() => {
    console.log(fileList);
  }, [fileList])

  const formatCreationTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const handleFileListClick = (fileId: string) => {
    router.push(`/workspace/${fileId}`)
  }

  return (
    <div className='p-8 mt-5'>

      <Table >
        <TableCaption>A list of your all files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">File Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Edited</TableHead>
            <TableHead className="text-center">Author</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fileList.map((file, index) => (
            <TableRow key={index} onClick={() => handleFileListClick(file._id)}>
              <TableCell className="font-medium">{file.fileName}</TableCell>
              <TableCell>{formatCreationTime(file._creationTime)}</TableCell>
              <TableCell>{formatCreationTime(file._creationTime)}</TableCell>
              <TableCell className="flex justify-center">
                {
                  user && <Image src={user?.picture || ""} width={20} height={20} alt='creator' className='rounded-full' />
                }
              </TableCell>
              <TableCell className="" >


                <CustomDropDown/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  )
}

export default FileList