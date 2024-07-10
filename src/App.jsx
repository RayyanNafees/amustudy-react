import Form from "./components/Form";
import { useState, useEffect } from "react";
import pb from "../lib/pocketbase";
import Navbar from "./components/Navbar";
import { formatDistanceToNow } from "date-fns";
import Chevron from "../public/chevron.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import useLogout from "./utils/useLogout";

export default function Home() {
  const [posts, setPosts] = useState([]); 
  
  const navigate = useNavigate();

  const postsList = async () => {

    const resultList = await pb.collection('posts').getList(1, 10, {
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
    navigate(`/post/${id}`);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-[calc(100vw_-_6px)] flex bg-[#fafbfb] text-black pb-[10vh]">
        {/* <h1 className="font-bold text-3xl pt-10">AMUStudy</h1> */}

        {/* <Form refresh={postsList}/> */}
        <div className="flex flex-col items-start mx-10 w-[60%] mt-[15vh] rounded-md shadow ">
          <h1 className="text-[1.7rem] font-bold px-5 pt-[5vh]">Recent Posts</h1>
          {posts.map((post, index) => (
            <div 
            key={index} 
            onClick={() => handlePostClick(post.id)}
            className="w-[60vw] flex items-center py-5 pl-2 my-2 hover:rounded-lg hover:bg-gray-100"
            >   
              <div className="flex flex-col items-center gap-2 px-5">
                <img src={Chevron} className="w-[40px] rotate-[90deg] p-2 rounded-md hover:bg-[#e2e2e6] cursor-pointer"/>
                <span>10</span>
                <img src={Chevron} className="w-[40px] rotate-[-90deg] p-2 rounded-md hover:bg-[#e2e2e6] cursor-pointer"/>
              </div>
              <div>
                <p className="font-medium text-xl text-left px-2 cursor-pointer">{post.title}</p>
                <p className="text-[#a4a5aa] mb-4 px-2 text-sm">Asked {formatDistanceToNow(new Date(post.created))} ago by <span className="font-medium">{post.username}</span></p>
                <span className="bg-[#e2e2e6] px-3 py-1 rounded-full text-sm font-medium"> javascript</span>
                {/* <p className="mb-4 text-left px-2">{post.text.slice(0, 300)}</p> */}
                {/* {post.image !== '' && <img src={`https://amustud.pockethost.io/api/files/${post.collectionId}/${post.id}/${post.image}`} alt="Post" className="w-[400px] h-auto rounded-lg" />} */}
              </div>
            </div>
            ))}
        </div>
        <div className="flex flex-col">
          
          <Form refresh={postsList}/>
          
          <div className="flex flex-col items-start  h-[30vh] mr-5 mt-[15vh] rounded-md shadow px-5">
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
        </div>
      </main>
    </>
  );
}