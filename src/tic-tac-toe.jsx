import { useState } from "react";

const square = "btn btn-outline rounded-none w-9";
export function Square() {
  const [value, setValue] = useState(null);
  const handleClick = () => {
    setValue("X");
  };
  return (
    <button className={square} onClick={handleClick}>
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="grid">
        <div>
          <Square />
          <Square />
          <Square />
        </div>
        <div>
          <Square />
          <Square />
          <Square />
        </div>
        <div>
          <Square />
          <Square />
          <Square />
        </div>
      </div>
    </>
  );
}
