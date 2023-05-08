import { useState } from "react";

interface NewPromptFormProps 
{
    onHandleSubmit: (event: any) => void;
    onHandleImageChange: (event: any) => void;
    onHandlePromptChange: (event: any) => void;
    onHandleDrop: (event: any) => void;
    onHandleDragOver: (event: any) => void;
    newImage: string | undefined;
    newPrompt: string;
}
  
export default function NewPromptForm(props: NewPromptFormProps) {
    
    return (
        <div className="block-card">

            <div className="mb-4 border-b border-block-card px-4">
                <div className="text-center lg:text-left whitespace-nowrap text-md py-4">Add New Prompt Block</div>
            </div>

            <form className="grid grid-cols-12 gap-4 px-4" onSubmit={props.onHandleSubmit}>

                <div className="col-span-12 lg:col-span-8">
                    <textarea className="block-card bg-black text-white p-4 rounded-md w-full mb-4" value={props.newPrompt} onChange={props.onHandlePromptChange} rows={6} placeholder="Enter your prompt, separate using commas!" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 mb-4">
                        <div className="flex items-center justify-center mb-4 lg:mb-0">
                            <p className="text-sm text-center">Remember to split by commas!</p>
                        </div>
                        <div>
                            <button type="submit" className="p-4 bg-green-500 flex items-center justify-center w-full rounded-md text-center shadow-lg shadow-green-500/50">
                                <i className="fa-solid fa-circle-plus text-xl"></i>
                                <div className="ms-2">Add Block</div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="order-first col-span-12 lg:col-span-4 mb-4">

                    { props.newImage ? (
                        <img src={props.newImage} alt="Image" className="w-full rounded-lg mb-4" />

                        ) : (

                        <div className="h-full">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={props.onHandleImageChange}
                                className="visuallyHidden"
                                id="imageInput"
                            />
                            
                            <label
                                htmlFor="imageInput"
                                className="bg-black rounded-md py-10 px-4 text-center mb-4 flex items-center justify-center block-card h-full"
                                onDrop={props.onHandleDrop}
                                onDragOver={props.onHandleDragOver}
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

                

            </form>
          </div>
    )
}