import Form from "./components/Form";
import { useState, useEffect, useCallback } from "preact/hooks";
import pb from "@/lib/pb";
import Navbar from "./components/Navbar";
import Chevron from "../public/chevron.png";
import { useLocation } from "preact-iso";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)


export default function Home() {
  const [posts, setPosts] = useState([]);

  const {route: navigate} = useLocation();

  const fetchLikes = useCallback(async (postId: string) => {
    try {
      const records = await pb.collection("likes").getFullList({
        filter: `postId = "${postId}"`,
      });
      console.log(records);
      let totalLikes = 0;
      let totalDislikes = 0;

      for (const record of records) {
        if (record.like) {
          totalLikes += record.like;
        }
        if (record.dislike) {
          totalDislikes += record.dislike;
        }
      }

      const netLikes = totalLikes - totalDislikes;
      return netLikes;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const postsList = useCallback(async () => {
    try {
      const resultList = await pb.collection("posts").getList(1, 10, {
        filter: 'created >= "2022-01-01 00:00:00"',
        sort: "-created",
        requestKey: null,
      });

      // Update posts state with fetched data
      setPosts(resultList.items);

      // Initialize an array to store updated posts
      const updatedPosts = [];

      // Loop through each post and fetch likes sequentially
      for (let post of resultList.items) {
        try {
          const netLikes = await fetchLikes(post.id);
          post = { ...post, netLikes }; // Create a new object with updated netLikes
        } catch (error) {
          console.error(`Error fetching likes for post ${post.id}:`, error);
          post = { ...post, netLikes: 0 }; // Default to 0 netLikes on error
        }
        updatedPosts.push(post); // Push updated post to the array
      }

      // Update state with the array of updated posts
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [fetchLikes]);

  useEffect(() => {
    postsList();
  }, [postsList]);

  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-[calc(100vw_-_6px)] flex bg-[#fafbfb] text-black pb-[10vh]">
        {/* <h1 className="pt-10 text-3xl font-bold">AMUStudy</h1> */}

        {/* <Form refresh={postsList}/> */}
        <div className="flex flex-col items-start mx-10 w-[60%] mt-[15vh] rounded-md shadow ">
          <h1 className="text-[1.7rem] font-bold px-5 pt-[5vh]">
            Recent Posts
          </h1>
          {posts.map((post, index) => (
            <div
              key={crypto.randomUUID()}
              onClick={() => handlePostClick(post.id)}
              className="w-[60vw] flex items-center py-5 pl-2 my-2 hover:rounded-lg hover:bg-gray-100"
              onKeyUp={()=>false}
            >
              <div className="flex flex-col gap-2 items-center px-5">
                <img
                  src={Chevron}
                  className="w-[40px] rotate-[90deg] p-2 rounded-md hover:bg-[#e2e2e6] cursor-pointer"
                  alt="img"
                />
                <span>{post.netLikes}</span>
                <img
                  src={Chevron}
                  className="w-[40px] rotate-[-90deg] p-2 rounded-md hover:bg-[#e2e2e6] cursor-pointer"
              alt="img"
              />
              </div>
              <div>
                <p className="px-2 text-xl font-medium text-left cursor-pointer">
                  {post.title}
                </p>
                <p className="text-[#a4a5aa] mb-4 px-2 text-sm">
                  Asked {dayjs((post.created)).fromNow()} by{" "}
                  <span className="font-medium">{post.username}</span>
                </p>
                <span className="bg-[#e2e2e6] px-3 py-1 rounded-full text-sm font-medium">
                  {" "}
                  javascript
                </span>
                {/* <p className="px-2 mb-4 text-left">{post.text.slice(0, 300)}</p> */}
                {/* {post.image !== '' && <img src={`https://amustud.pockethost.io/api/files/${post.collectionId}/${post.id}/${post.image}`} alt="Post" className="w-[400px] h-auto rounded-lg" />} */}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <Form refresh={postsList} />

          <div className="flex flex-col items-start  h-[30vh] mr-5 mt-[15vh] rounded-md shadow px-5">
            <h1 className="text-[1.7rem] font-bold pt-[5vh] mb-5">Top Tags</h1>
            <div className="flex flex-wrap gap-5 justify-between">
              <div>
                <span className="bg-[#e2e2e6] px-3 py-1 rounded-full text-sm font-medium">
                  {" "}
                  javascript
                </span>
                <span className="pl-2 text-sm">999</span>
              </div>
              <div>
                <span className="bg-[#e2e2e6] px-3 py-1 rounded-full text-sm font-medium">
                  {" "}
                  python
                </span>
                <span className="pl-2 text-sm">999</span>
              </div>
              <div>
                <span className="bg-[#e2e2e6] px-3 py-1 rounded-full text-sm font-medium">
                  {" "}
                  typescript
                </span>
                <span className="pl-2 text-sm">999</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
