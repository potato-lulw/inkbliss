import { api } from "@/convex/_generated/api";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from "convex/react";
import { useTheme } from "next-themes";
import React, { Suspense, useEffect, useState } from 'react'
import { toast } from "sonner";

const Excali = ({ onSaveTrigger, setOnSaveTrigger, fileId, whiteboardData }: any) => {
    const { theme }: any = useTheme();
    const updateWhiteboard = useMutation(api.files.updateWhiteboard);
    const [whiteBoard, setWhiteBoard] = useState<any>([]);

    useEffect(() => {

        onSaveTrigger && saveWhiteboard();
        setOnSaveTrigger(false);
       
    }, [onSaveTrigger, whiteboardData])

    const saveWhiteboard = () => {
        updateWhiteboard({ _id: fileId, whiteboard: JSON.stringify(whiteBoard) })
            .then((res) => {
                toast.success("Whiteboard updated successfully");
            })
            .catch((err) => {
                console.log('Saving failed: ', err)
                toast.error("Failed to Save Whiteboard");
            })

    }


    return (
        <div className="h-full">
            <Suspense fallback={<Loading />}>

                <Excalidraw
                    theme={theme}
                    onChange={(excalidrawElements, appState, files) => {

                        setWhiteBoard(excalidrawElements);
                    }}
                    initialData={{ elements: whiteboardData ? JSON.parse(whiteboardData) : whiteBoard }}
                >
                    <WelcomeScreen>
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.HelpHint />
                        <WelcomeScreen.Hints.ToolbarHint />
                    </WelcomeScreen>
                </Excalidraw>
            </Suspense>
        </div>
    )
}


function Loading() {
    return <h2>Loading...</h2>;
}


export default Excali