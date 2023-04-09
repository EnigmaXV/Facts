import Fact from "./Fact";
const FactList = ({ facts, categories, setFacts }) => {
  // if (facts.length === 0) {
  //   return <h2 className="no-facts">No facts found, Add your own ... ✌️😁</h2>;
  // }
  return (
    <section>
      <ul>
        {facts.map((fact) => {
          return (
            <Fact
              setFacts={setFacts}
              key={fact.id}
              fact={fact}
              categories={categories}
            />
          );
        })}
      </ul>
    </section>
  );
};
export default FactList;
