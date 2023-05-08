"use client"

import { useEffect, useRef, useState } from 'react';

import Block from './types/Block';
import NewPromptForm from '../../components/NewPromptForm';
import PromptBlock from '../../components/PromptBlock';
import PromptBuilderBlock from '../../components/PromptBuilderBlock';

export default function Home() {
  const [promptBlocks, setPromptBlocks] = useState<Block[]>([]);
  const [newImage, setNewImage] = useState<string | undefined>("");
  const [newPrompt, setNewPrompt] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showTextareaIndex, setShowTextareaIndex] = useState<number>(-1);
  const [promptBuilderStrings, setPromptBuilderStrings] = useState<string[]>([]);
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
  
    const commaSeparatedString = newPrompt
      .split(",")
      .map(str => str.trim())
      .filter(str => str !== "");
  
    const newBlock = { promptStrings: commaSeparatedString, imgSrc: newImage };
  
    const updatedPromptBlocks = [...promptBlocks, newBlock];
    setPromptBlocks(updatedPromptBlocks);
    setNewImage("");
    setNewPrompt("");
  
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

  const handlePromptStringClick = (event: any, promptString: string) => {
    event.preventDefault();
    setPromptBuilderStrings([...promptBuilderStrings, promptString]);
  }

  const handleClearPromptBuilderStrings = (event: any) => {
    event.preventDefault();
    setPromptBuilderStrings([]);
  }

  return (
    <main className="h-screen w-screen fixed overflow-scroll style-bg mx-auto">
        
      <div className="grid grid-cols-12 gap-4 w-full min-h-screen px-4">
        <div className="col-span-12 md:col-span-4 xl:col-span-3 min-h-full pt-4 md:pt-6 relative">

          <div className="mb-6">
            <div className="flex items-center">
              <div className="mr-2">
                <h1 className="main-title text-xl md:text-2xl lg:text-3xl xl:text-3xl text-white">🧠</h1>
                <h1 className="main-title text-xl md:text-2xl lg:text-3xl xl:text-3xl text-white ml-4">🧱</h1>
              </div>

              <div>
                <div className="flex">
                  <h1 className="main-title text-xl md:text-2xl lg:text-3xl xl:text-3xl text-white"> PROMPT</h1>
                  <h1 className="main-title text-2xl md:text-3xl lg:text-4xl xl:text-3xl text-yellow-400">BLOCKS</h1>
                </div>
                <p className="text-sm text-slate-400">One-Tap Copy your AI Image Prompts!</p>
              </div>
            </div>
          </div>

          <PromptBuilderBlock 
            promptBuilderStrings={promptBuilderStrings} 
            onHandleCopyAllClick={handleCopyAllClick}
            onHandleClearPromptBuilderStrings={handleClearPromptBuilderStrings}
          />

        </div>

        <div className="col-span-12 md:col-span-8 xl:col-span-9 max-h-screen md:overflow-scroll lg:pt-10 relative">

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:sticky top-0 z-10">
            <div className="border-4 border-black bg-black text-white rounded-md w-full xl:mb-4 flex items-center col-span-4 xl:col-span-1 block-card">
              <div className="ps-4">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input className="bg-transparent w-full p-4" onChange={handleSearchChange} placeholder="Search prompts" />
            </div>
            <div className="col-span-3"></div>
          </div>

          <div className="mb-4">
            <NewPromptForm 
              onHandlePromptChange={handlePromptChange} 
              onHandleDrop={handleDrop} 
              onHandleDragOver={handleDragOver} 
              onHandleSubmit={handleSubmit}
              onHandleImageChange={handleImageChange}
              newImage={newImage}
              newPrompt={newPrompt}
            />
          </div>

          { filteredPromptBlocks.length > 0 ? 

            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xxl:grid-cols-4 gap-4">
            
              { filteredPromptBlocks.map((block: Block, index: number) => (
                <PromptBlock 
                  block={block} 
                  key={index} 
                  index={index}
                  showTextareaIndex={showTextareaIndex}
                  onHandleCopyAllClick={handleCopyAllClick}
                  onHandleEditClick={handleEditClick}
                  onHandleTextareaBlur={handleTextareaBlur}
                  onHandlePromptStringClick={handlePromptStringClick}
                  textareaRef={textareaRef}
                />
                ))}
              </div> 
            :
              <div className="block-card lg:w-1/2 mb-4">
                <div className="p-4 border-b border-block-card mx-auto flex flex-col justify-center">
                  <h2 className="text-md mb-4 text-center lg:text-left">Welcome to Promptblocks</h2>
                  <div className="bg-yellow-400 p-2 text-center text-black inline-block rounded-lg text-sm mx-auto lg:mx-0">🚧 Promptblocks is under construction!</div>
                </div>
                <div className="container mx-auto">
                  <ul className="list-disc p-8">
                    <li className="mb-4">🧠 🧱 Promptblocks is a lightweight place to store AI prompts in your browser</li>
                    <li className="mb-4">🏠 📦 Uses Local Storage so you can use and browse offline</li>
                    <li className="mb-4">😬 ⚠️ Storage is limited to 5MB at the moment, soon we will be moving to IndexedDB with much more space</li>
                    <li>💻 🔗 Image web links support coming soon</li>
                  </ul>
                </div>
              </div>
          }

        </div>
      </div>
    </main>
  )
}
