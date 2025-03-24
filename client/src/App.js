import Header from "./components/header";
import TodoContainer from "./components/TodoContainer";

function App() {
  return (
    <div className="h-full bg-slate-200 p-12">
      <Header />
      <TodoContainer />
    </div>
  );
}

export default App;
