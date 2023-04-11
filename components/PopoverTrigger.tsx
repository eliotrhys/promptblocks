import { useState } from "react";
import Popover from "./Popover";

export default function PopoverTrigger() {

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div>
      <div className="popover-trigger" onClick={() => setIsClicked(true)}>TEST</div>
      {isClicked && <Popover />}
    </div>

  )
}