import Form from "./components/Form";
import { useState, useEffect } from "react";
import pb from "../lib/pocketbase";
import Navbar from "./components/Navbar";
import { formatDistanceToNow } from "date-fns";


export default function Home() {
  const [posts, setPosts] = useState([]); 
  
  const postsList = async () => {

    const resultList = await pb.collection('posts').getList(1, 50, {
      filter: 'created >= "2022-01-01 00:00:00"',
      sort: '-created',
    }, { requestKey: null });
    console.log(resultList);
    setPosts(resultList.items)
  }
  useEffect(()=>{

    postsList();
  },[])
  
  const handlePostClick = (id) => {
    // router.push(`/post/${id}`);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-[calc(100vw_-_6px)] flex bg-[#fafbfb] text-black">
        {/* <h1 className="font-bold text-3xl pt-10">AMUStudy</h1> */}

        {/* <Form refresh={postsList}/> */}
        <div className="flex flex-col items-start mx-10 w-[60%] mt-[15vh] rounded-md shadow-2xl ">
          <h1 className="text-[1.7rem] font-bold px-5 pt-[5vh]">Recent Posts</h1>
          {posts.map((post, index) => (
            <div 
            key={index} 
            onClick={() => handlePostClick(post.id)}
            className="flex flex-col items-start w-[60vw] py-5 pl-2 my-2 hover:rounded-lg "
            >
                <p className="font-medium text-xl text-left px-2">{post.title}</p>
                <span className="text-[#a4a5aa] mb-4 px-2 text-sm">Asked {formatDistanceToNow(new Date(post.created))} ago by <span className="font-medium">{post.username}</span></span>
                <p className="mb-4 text-left px-2">{post.text}</p>
                {post.image !== '' && <img src={`https://amustud.pockethost.io/api/files/${post.collectionId}/${post.id}/${post.image}`} alt="Post" className="w-[400px] h-auto rounded-lg" />}
              </div>
            ))}
        </div>
        <div className="flex flex-col items-start w-[40%] h-[30vh] mx-10 mt-[15vh] rounded-md shadow-2xl px-5">
            <h1 className="text-[1.7rem] font-bold pt-[5vh] mb-5">Top Tags</h1>
            <div className="flex justify-between flex-wrap gap-5">
              <div>
                <span className="bg-[#e2e2e6] px-3 py-1 rounded-full text-sm font-medium"> javascript</span>
                <span className="text-sm pl-2">999</span>
              </div>
              <div>
                <span className="bg-[#e2e2e6] px-3 py-1 rounded-full text-sm font-medium"> python</span>
                <span className="text-sm pl-2">999</span>
              </div>
              <div>
                <span className="bg-[#e2e2e6] px-3 py-1 rounded-full text-sm font-medium"> typescript</span>
                <span className="text-sm pl-2">999</span>
              </div>
            </div>
        </div>
      </main>
    </>
  );
}