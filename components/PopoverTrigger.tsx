import { useState } from "react";
import Popover from "./Popover";

interface PopoverTriggerProps 
{
  text: string;
}

export default function PopoverTrigger(props: PopoverTriggerProps) {

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  }

  return (
    <div>
      <div className="popover-trigger" onClick={handleClick}>{props.text}</div>
      {isClicked && <Popover isClicked={isClicked} />}
    </div>
  )
}