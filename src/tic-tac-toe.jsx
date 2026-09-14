const square = "btn btn-outline rounded-none";
export function Square({ val }) {
  const handleClick = () => {
    console.log("Clicked!");
  };
  return (
    <button className={square} onClick={() => handleClick()}>
      {val}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="grid">
        <div>
          <Square className="w-9" val={1} />
          <Square className="w-9" val={2} />
          <Square className="w-9" val={3} />
        </div>
        <div>
          <Square className="w-9" val={4} />
          <Square className="w-9" val={5} />
          <Square className="w-9" val={6} />
        </div>
        <div>
          <Square className="w-9" val={7} />
          <Square className="w-9" val={8} />
          <Square className="w-9" val={9} />
        </div>
      </div>
    </>
  );
}
