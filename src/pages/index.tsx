import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { getData } from "../lib/api";
import { log } from "console";

const inter = Inter({ subsets: ["latin"] });

type Post = {
  id: number;
  userId: number;
  title: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("enter useEffect");

    setLoading(true);
    getData()
      .then((data) => setPosts(data))
      .then(() => setLoading(false));

    console.log("exit useEffect");
  }, []);

  if (!posts) return <h1 className="text-2xl font-bold">No Posts</h1>;

  return (
    <main>
      <h1 className="text-4xl font-bold">Posts</h1>
      {loading && <pre className="my-2">Loading...</pre>}
      <ol className="list-decimal list-inside">
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </main>
  );
}
