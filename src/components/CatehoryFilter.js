const CategoryFilter = ({ categories, setCurrentCategory }) => {
  const clickHandler = (e) => {
    setCurrentCategory(e.target.innerText);
  };
  return (
    <aside>
      <ul>
        <li className="category">
          <button onClick={clickHandler} className="btn btn-all-categories ">
            All
          </button>
        </li>
        {categories.map((category) => {
          return (
            <>
              <li key={category.name} className="category">
                <button
                  onClick={clickHandler}
                  className="btns btn-category"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </button>
              </li>
            </>
          );
        })}
      </ul>
    </aside>
  );
};
export default CategoryFilter;
