"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react';
import bg from '../../public/images/bg.png';

import Block from './types/Block';

export default function Home() {

  const [promptBlocks, setPromptBlocks] = useState<Block[]>([]);
  const [newImage, setNewImage] = useState<string | undefined>("");
  const [newPrompt, setNewPrompt] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    <main className="h-screen fixed overflow-scroll style-bg mx-auto">
        
      <div className="grid grid-cols-12 gap-4 w-full min-h-screen px-4">
        <div className="col-span-12 md:col-span-4 xl:col-span-3 min-h-full pt-10">

          <div className="mb-6">
            <h1 className="main-title text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white">🧠 PROMPT</h1>
            <h1 className="main-title text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 text-yellow-400">🧱 BLOCKS</h1>
            <p className="text-sm text-slate-400">One-Tap Copy your AI Image Prompts!</p>
          </div>

          <div className="block-card p-4">

            <form onSubmit={handleSubmit}>

              <div>

                  {newImage ? (
                    <img src={newImage} alt="Image" className="w-full rounded-lg mb-4" />

                    ) : (

                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="visuallyHidden"
                        id="imageInput"
                      />
                      
                      <label
                        htmlFor="imageInput"
                        className="bg-black rounded-md py-10 px-4 text-center mb-4 flex items-center justify-center"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                      >
                        <div>
                          <div>
                            <i className="fa-solid fa-circle-plus text-4xl mb-4"></i>
                          </div>
                          <p>Click or drag to add image</p>
                        </div>
                      </label>
                    </div>
                  )}

                </div>

              <textarea className="border-4 border-black bg-black text-white text-black p-4 rounded-md w-full mb-4" onChange={handlePromptChange} rows={6} placeholder="Enter your prompt, separate using commas!" />

              <p className="text-center mb-4">Remember to split by commas!</p>

              <div>
                <button type="submit" className="p-4 border-4 border-black bg-green-500 flex items-center justify-center w-full rounded-md text-center">
                  <i className="fa-solid fa-circle-plus text-xl"></i>
                  <div className="ms-2">Add Block</div>
                </button>
              </div>
            </form>

          </div>
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

          <div className="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">

            { filteredPromptBlocks.map((block: Block, index: number) => (
              <div key={index} className="block-card">

                { block.imgSrc ? 
                
                  <div className="">
                    <img src={ block.imgSrc } alt="" className="w-full rounded-t-lg mb-4" />
                  </div>
                  :
                  <div>
                    <label className="bg-black rounded-t-lg py-10 mb-4 flex items-center justify-center">
                      <div className="text-center">
                        <i className="fa-solid fa-circle-plus text-4xl mb-4"></i>
                        <p>Add image</p>
                      </div>
                    </label>
                  </div>
                }
                

                <div className="flex items-center justify-between px-4">
                  <div className="text-xs">Tap prompts to copy</div>
                  <div className="flex">
                    <div className="py-1 px-2 bg-green-500 text-white rounded-md text-xs mr-2 cursor-pointer">Edit</div>
                    <div 
                      className="py-1 px-2 bg-blue-500 text-white rounded-md text-xs cursor-pointer" 
                      onClick={() => handleCopyAllClick(block.promptStrings)}
                    >
                      <span>Copy all</span>
                    </div>
                  </div>
                  
                </div>
                <div className="p-4">

                  <div className="flex flex-wrap mb-4">
                    { block.promptStrings.map((promptString: string, index: number) => (
                      <div key={index} className="tag-card rounded text-sm px-4 border-2 text-white border-black mr-2 mb-2 cursor-pointer">{promptString}</div>
                    ))}
                  </div>

                  <div>
                    <textarea name="" id="" rows={6} className="border-4 border-black bg-black text-white text-black p-4 rounded-md w-full"></textarea>
                  </div>
                </div>
              </div>
            ))}
           
          </div>
        </div>
      </div>
    </main>
  )
}
