const Header = ({ showForm, setShowForm }) => {
  const handleClick = () => {
    setShowForm(!showForm);
  };
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>FACTS-LIST</h1>
      </div>

      <button onClick={handleClick} className="btn btn-main btn-large btn-open">
        {showForm ? "Close Form" : "Add New Fact"}
      </button>
    </header>
  );
};
export default Header;
