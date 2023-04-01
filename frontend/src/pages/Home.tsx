import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
  return (
    <>
      <h1>Home</h1>
      <Link to={"/chat"}>Ir para o chat</Link>
    </>
  );
};

export default Home;
