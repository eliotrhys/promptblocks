import { useState } from "react";

interface NewPromptFormProps 
{
    onHandleSubmit: (event: any) => void;
    onHandleImageChange: (event: any) => void;
    onHandlePromptChange: (event: any) => void;
    onHandleDrop: (event: any) => void;
    onHandleDragOver: (event: any) => void;
    newImage: string | undefined;
}
  
export default function NewPromptForm(props: NewPromptFormProps) {
    
    return (
        <div className="block-card p-4">

            <form onSubmit={props.onHandleSubmit}>

                <div>

                    { props.newImage ? (
                        <img src={props.newImage} alt="Image" className="w-full rounded-lg mb-4" />

                        ) : (

                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={props.onHandleImageChange}
                                className="visuallyHidden"
                                id="imageInput"
                            />
                            
                            <label
                                htmlFor="imageInput"
                                className="bg-black rounded-md py-10 px-4 text-center mb-4 flex items-center justify-center"
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

                <textarea className="border-4 border-black bg-black text-white text-black p-4 rounded-md w-full mb-4" onChange={props.onHandlePromptChange} rows={6} placeholder="Enter your prompt, separate using commas!" />

                <p className="text-center mb-4">Remember to split by commas!</p>

                <div>
                    <button type="submit" className="p-4 border-4 border-black bg-green-500 flex items-center justify-center w-full rounded-md text-center">
                        <i className="fa-solid fa-circle-plus text-xl"></i>
                        <div className="ms-2">Add Block</div>
                    </button>
                </div>
            </form>
          </div>
    )
}