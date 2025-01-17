"use client";

import { useState } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState("");

  const handleGreeting = async () => {
    const response = await fetch("/api/hello");
    const data = await response.json();
    setGreeting(data.message);
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleGreeting}
      >
        Greeting
      </button>
      <div>{greeting}</div>
    </div>
  );
}
