import Link from "next/link";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Link href={"/chat"}>Chat</Link>
    </>
  );
};

export default Home;
