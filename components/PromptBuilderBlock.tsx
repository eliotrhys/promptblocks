import PopoverTrigger from "./PopoverTrigger"

interface PromptBuilderBlockProps 
{
  promptBuilderStrings: string[]
  onHandleCopyAllClick: (event: any) => void;
  onHandleClearPromptBuilderStrings: (event: any) => void;
}

export default function PromptBuilderBlock(props: PromptBuilderBlockProps) {

  return (
    <div className="block-card sticky top-0">
      <div className="text-center mb-4">
        <div className="mb-4 border-b border-block-card px-4 py-4">
          <div className="whitespace-nowrap text-md">Prompt Builder</div>
          <div className="text-sm text-slate-500">Tap prompts to add</div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-4">
          <div>
            <button 
                className="py-1 px-2 w-full duration-100 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs cursor-pointer shadow-lg shadow-blue-500/50" 
                onClick={() => props.onHandleCopyAllClick(props.promptBuilderStrings)}
              >
                <PopoverTrigger text={"Copy all"} />
            </button>
          </div>
          <div>
            <button 
                className="py-1 px-2 w-full duration-100 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-xs cursor-pointer shadow-lg shadow-yellow-500/50" 
                onClick={props.onHandleClearPromptBuilderStrings}
              >Clear
            </button>
          </div>
        </div>
      </div>

      { props.promptBuilderStrings.length > 0 &&
        <div className="px-4 py-4">
          { props.promptBuilderStrings.map((promptString: string, index: number) => (
            <button key={index} className="tag-card rounded text-sm px-4 border-2 text-white border-black mr-2 mb-2 cursor-pointer">{promptString}</button>
          ))}
        </div>
      }

      
    </div>
  )
}