"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
// @ts-ignore
import LinkTool from "@editorjs/link";
// @ts-ignore
import RawHTML from "@editorjs/raw";
// @ts-ignore
import CheckList from "@editorjs/checklist";
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";
// @ts-ignore
import Embed from "@editorjs/embed";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Table from "@editorjs/table";
// @ts-ignore
import NestedList from "@editorjs/nested-list";
// @ts-ignore
import TextVariantTune from "@editorjs/text-variant-tune";
// @ts-ignore
import Underline from "@editorjs/underline";
// @ts-ignore
import InlineCode from "@editorjs/inline-code";
// @ts-ignore
import CodeTool from "@editorjs/code";
// @ts-ignore
import Warning from "@editorjs/warning";
// @ts-ignore
import Marker from "@editorjs/marker";
// @ts-ignore
import AttachesTool from "@editorjs/attaches";
// @ts-ignore
import Delimiter from "@editorjs/delimiter";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
// @ts-ignore

interface PropTypes {
  setOutputData: Dispatch<SetStateAction<OutputData | null>>;
}

const ContentEditor = ({onSaveTrigger, fileId, documentData}: any) => {
  // const docDataParsed = JSON.parse(documentData);
  const ref=useRef<EditorJS>();
  const [document, setDocument] = useState<any>();

  const updateDocument = useMutation(api.files.updateDocument)

  const onSaveDocument=()=>{
    if(ref.current)
    {
      ref.current.save().then((outputData) => {
        console.log('Article data: ', outputData);
        setDocument(document);
        updateDocument({_id: fileId, document: JSON.stringify(outputData)})
          .then((res) => {
              toast.success("Document saved successfully")
          }).catch((err) => {
            console.log('Saving failed: ', err)
            toast.error("Failed to Save Document")
          })
      }).catch((error) => {
        console.log('Saving failed: ', error)
      });
    }
  }

  useEffect(() => {
    console.log(onSaveTrigger);
     onSaveDocument();
  }, [onSaveTrigger])

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Write your post content here...",
    
      // onChange: async () => {
      //   const content = await editor.saver.save();
      //   setDocument(content)
      //   console.log(content);
      // },

      tools: {
        // @ts-ignore
        header: { class: Header, inlineToolbar: true },
        list: { class: NestedList, inlineToolbar: true },
        checklist: {
          class: CheckList,
          inlineToolbar: true,
        },
        // FIXME: some fix need
        linkTool: {
          class: LinkTool,
        },
        rawHtml: RawHTML,
        image: {
          class: SimpleImage,
          inlineToolbar: true,
          config: {
            placeholder: "Paste image URL",
          },
        },
        embed: {
          class: Embed,
          config: {
            service: {
              youtube: true,
              facebook: true,
              instagram: true,
              twitter: true,
              codepen: true,
              pinterest: true,
            },
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        textVariant: TextVariantTune,
        underline: Underline,
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        code: CodeTool,
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        
        delimiter: Delimiter,
      },
      data: documentData? JSON.parse(documentData): document
    });

    ref.current = editor;

    return () => {
      editor.destroy();
    };
  }, [document, documentData]);

  

  return <div id="editorjs"></div>;
};

export default ContentEditor;
