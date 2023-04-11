"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import bg from '../../public/images/bg.png';

import Block from './types/Block';
import NewPromptForm from '../../components/NewPromptForm';
import PromptBlock from '../../components/PromptBlock';

export default function Home() {
  const [promptBlocks, setPromptBlocks] = useState<Block[]>([]);
  const [newImage, setNewImage] = useState<string | undefined>("");
  const [newPrompt, setNewPrompt] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showTextareaIndex, setShowTextareaIndex] = useState<number>(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEditClick = (index: number) => {
    setShowTextareaIndex(index);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleTextareaBlur = () => {
    setShowTextareaIndex(-1);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const commaSeparatedString = newPrompt.split(",").map(str => str.trim());
    const newBlock = { promptStrings: commaSeparatedString, imgSrc: newImage };

    const updatedPromptBlocks = [...promptBlocks, newBlock];
    setPromptBlocks(updatedPromptBlocks);
    setNewPrompt("");
    setNewImage("");

    // Save the updated promptBlocks array to localStorage
    localStorage.setItem("promptBlocks", JSON.stringify(updatedPromptBlocks));
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPromptBlocks = JSON.parse(localStorage.getItem('promptBlocks') || '[]');

      setPromptBlocks(savedPromptBlocks);
    }
  }, []);

  const handlePromptChange = (event: any) => {
    setNewPrompt(event.target.value);
  }

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const url = reader.result;
      setNewImage(url as string);
    };
    
    reader.readAsDataURL(file);
  }

  function handleDrop(event: any) {
    event.preventDefault();
    setNewImage(event.dataTransfer.files[0]);
  }

  function handleDragOver(event: any) {
    event.preventDefault();
  }

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  }

  const filteredPromptBlocks = promptBlocks.filter((block) => {
    return block.promptStrings.some((prompt) => prompt.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  
  function handleCopyAllClick(promptStrings: string[]) 
  {
    const textToCopy = promptStrings.join(", ");
    navigator.clipboard.writeText(textToCopy);
  }

  return (
    <main className="h-screen w-screen fixed overflow-scroll style-bg mx-auto">
        
      <div className="grid grid-cols-12 gap-4 w-full min-h-screen px-4">
        <div className="col-span-12 md:col-span-4 xl:col-span-3 min-h-full pt-10">

          <div className="mb-6">
            <h1 className="main-title text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white">🧠 PROMPT</h1>
            <h1 className="main-title text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 text-yellow-400">🧱 BLOCKS</h1>
            <p className="text-sm text-slate-400">One-Tap Copy your AI Image Prompts!</p>
          </div>

          <NewPromptForm 
            onHandlePromptChange={handlePromptChange} 
            onHandleDrop={handleDrop} 
            onHandleDragOver={handleDragOver} 
            onHandleSubmit={handleSubmit}
            onHandleImageChange={handleImageChange}
            newImage={newImage}
          />
        </div>

        <div className="col-span-12 md:col-span-8 xl:col-span-9 max-h-screen md:overflow-scroll pt-10 relative">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 md:sticky top-0 z-10">
            <div className="border-4 border-black bg-black text-white text-black p-4 rounded-md w-full xl:mb-4 flex items-center w-full">
              <div className="me-4">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input className="bg-transparent w-full" onChange={handleSearchChange} placeholder="Search prompts" />
            </div>
            <div className="col-span-3"></div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-4">

            { filteredPromptBlocks.map((block: Block, index: number) => (
              <PromptBlock 
                block={block} 
                key={index} 
                index={index}
                showTextareaIndex={showTextareaIndex}
                onHandleCopyAllClick={handleCopyAllClick}
                onHandleEditClick={handleEditClick}
                onHandleTextareaBlur={handleTextareaBlur}
                textareaRef={textareaRef}
              />
            ))}
           
          </div>
        </div>
      </div>
    </main>
  )
}
