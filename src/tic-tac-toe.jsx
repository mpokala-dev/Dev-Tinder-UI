const square = "btn btn-outline rounded-none";
export function Square({ val }) {
  return <button className={square}>{val}</button>;
}

export default function Board() {
  return (
    <>
      <div className="grid">
        <div>
          <Square val={1} />
          <Square val={2} />
          <Square val={3} />
        </div>
        <div>
          <Square val={4} />
          <Square val={5} />
          <Square val={6} />
        </div>
        <div>
          <Square val={7} />
          <Square val={8} />
          <Square val={9} />
        </div>
      </div>
    </>
  );
}
