import Block from "@/app/types/Block";
import { LegacyRef } from "react";
import PopoverTrigger from "./PopoverTrigger";

interface PromptBlockProps 
{
    block: Block;
    index: number;
    showTextareaIndex: number;
    onHandleEditClick: (event: any) => void;
    onHandleCopyAllClick: (event: any) => void;
    onHandleTextareaBlur: (event: any) => void;
    textareaRef: LegacyRef<HTMLTextAreaElement> | undefined;
}
  
export default function PromptBlock(props: PromptBlockProps) {
    
    return (
        <div className="block-card">

            { props.block.imgSrc ? 
            
                <div className="">
                    <img src={ props.block.imgSrc } alt="" className="w-full rounded-t-lg mb-4" />
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
            
            <div className="flex items-center justify-between px-4 relative z-10">
                <div>
                    <div className="text-xs">Tap prompts to copy</div>
                </div>
                
                <div className="flex">
                    <div 
                        className={`py-1 px-2 text-white rounded-md text-xs mr-2 cursor-pointer ${
                        props.showTextareaIndex === props.index ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        onClick={() => props.onHandleEditClick(props.index)}
                    >{props.showTextareaIndex === props.index ? 'Save' : 'Edit'}
                    </div>
                    <div 
                        className="py-1 px-2 bg-blue-500 text-white rounded-md text-xs cursor-pointer" 
                        onClick={() => props.onHandleCopyAllClick(props.block.promptStrings)}
                    >
                        <span>Copy all</span>
                    </div>
                </div>
                
            </div>
            <div className="p-4">

                <div className={`flex-wrap mb-4 ${props.showTextareaIndex === props.index ? 'hidden' : 'flex'}`}>
                { props.block.promptStrings.map((promptString: string, index: number) => (
                    <div key={index} className="tag-card rounded text-sm px-4 border-2 text-white border-black mr-2 mb-2 cursor-pointer">{promptString}</div>
                ))}
                </div>

                <div className={props.showTextareaIndex === props.index ? 'block' : 'hidden'}>
                    <textarea 
                        name="" 
                        id="" 
                        rows={6} 
                        className="border-4 border-black bg-black text-white text-black p-4 rounded-md w-full"
                        onBlur={props.onHandleTextareaBlur}
                        ref={props.textareaRef}
                        value={props.block.promptStrings}
                        onChange={() => console.log("yeet")}
                    >
                    </textarea>
                </div>
            </div>
        </div>
    )
}