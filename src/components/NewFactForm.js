import { useState } from "react";
import supabase from "../database/supabase";

const NewFactForm = ({ categories, onAddNewFact, setShowForm }) => {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textChangeHandler = (event) => {
    setText(event.target.value);
  };
  const sourceChangeHandler = (event) => {
    setSource(event.target.value);
  };
  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };

  //NOTE URL VALIDATION
  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  //IMPORTANT!
  const submitHandler = async (event) => {
    event.preventDefault();
    //VALIDATE THE INPUTS
    if (text.length !== 0 && isValidUrl(source) && category.length !== 0) {
      // const newFact = {
      //   id: Math.floor(Math.random() * 1000),
      //   text: text,
      //   source: source,
      //   category: category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      //IMPORTANT! ADDING THE NEW FACT TO THE DATABASE
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      console.log(newFact);
      setIsUploading(false);
      onAddNewFact(newFact);
      setCategory("");
      setSource("");
      setText("");
      setShowForm(false);
    } else {
      alert("Please fill in all fields");
    }
  };
  return (
    <form className="fact-form" onSubmit={submitHandler}>
      <input
        value={text}
        type="text"
        placeholder="Share a fact with the world..."
        onChange={textChangeHandler}
      />
      <span>{200 - text.length}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={sourceChangeHandler}
      />
      <select value={category} onChange={categoryChangeHandler}>
        <option value="">Choose category:</option>
        {categories.map((category) => {
          return (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          );
        })}
      </select>
      <button disabled={isUploading} className="btn-post">
        {" "}
        Enter Room
        <svg
          viewBox="0 0 16 16"
          className="bi bi-arrow-right"
          fill="currentColor"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    </form>
  );
};

export default NewFactForm;
