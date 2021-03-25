import React, { useState } from "react";
import ListItem from "./list-item";
import "../styles//home.css";
import TextForm from "./text-form";
import { getKanyeQuote } from "../api/quote";

export interface helloProps {
  name: string;
}

function Home({ name }: helloProps) {
  const [text, setText] = useState("");
  const [textList, setTextList] = useState<string[]>([]);

  const insertQuote = async () => {
    const quote = await getKanyeQuote(); // get quote from kanye rest
    setTextList([...textList, quote]); // update text list
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value); // update text state
    event.preventDefault(); // do not reset to default
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (text.length > 0) {
      setTextList([...textList, text]);
      setText("");
    }
    event.preventDefault();
  };

  return (
    <div className="hello">
      <div className="greeting">Hello {name}</div>
      <TextForm {...{ handleSubmit, handleChange, text }} />
      <button onClick={() => insertQuote()}>Kanye Time</button>
      <ul>
        {textList.map((value: string, index: number) => (
          <ListItem text={value} key={index} />
        ))}
      </ul>
    </div>
  );
}

export default Home;
