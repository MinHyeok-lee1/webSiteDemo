"use client";

import React, { useState } from "react";

const ContextClickCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => setCount(count + 1)}
        className="rounded-lg bg-gray-700 px-3 py-1 text-sm font-medium tabular-nums text-gray-100 hover:bg-gray-500 hover:text-white"
      >
        {count} Clicks
      </button>
    </div>
  );
};

export const Counter = () => {
  const [count] = useState(0);

  return (
    <div>
      <div className="span text-xl font-bold text-white">
        <span className="tabular-nums">{count}</span> Clicks
      </div>
    </div>
  );
};

export default ContextClickCounter;
