interface PopoverProps 
{
  isClicked: boolean;
}

export default function Popover(props: PopoverProps) {

  return (
    <div className={`popover duration-300 ease rounded-md z-20 ${props.isClicked ? "opacity-1" : "opacity-0"}`}>
      <div className="text-center min-w-[100px]">
        <div className="whitespace-nowrap text-xl">Copied!</div>
      </div>
    </div>
  )
}