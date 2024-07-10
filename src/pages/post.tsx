import { useEffect, useState } from "react";
import pb from "@/lib/pb";

import Navbar from "../components/Navbar";
import Arrow from "../../public/arrow-black.png";
import Comment from "../../public/comment.png";
import Share from "../../public/share.png";
import User from "../../public/user.png";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import type { RecordModel } from "pocketbase";
import { useRoute } from "preact-iso";
import {} from 'preact-iso'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

interface Post extends RecordModel {
    // updated: string
    image: string
    title: string
    username: string
    text: string
    // collectionId: string
    // id: string
} 

const Post = () => {
  const [post, setPost] = useState<Post>();
  const [netLikes, setNetLikes] = useState(0);
  const { postId } = useRoute().params;

  const { userId } = useContext(UserContext);
  console.log(userId);

  const fetchLikes = async () => {
    try {
      const records = await pb.collection("likes").getFullList({
        filter: `postId = "${postId}"`,
      });

      let totalLikes = 0;
      let totalDislikes = 0;

      for (const record of records) {
        totalLikes += record.like;
        totalDislikes += record.dislike;
      }

      const netLikes = totalLikes - totalDislikes;
      setNetLikes(netLikes);
      console.log(records);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReaction = async (likeValue, dislikeValue) => {
    try {
      // Check if the user has already reacted with the same type
      const existingRecords = await pb.collection("likes").getFullList({
        filter: `postId = "${postId}" && userId = "${userId}" && ${
          likeValue ? "like = 1" : "dislike = 1"
        }`,
      });

      if (existingRecords.length > 0) {
        // User has already reacted with the same type, delete the reaction
        const recordId = existingRecords[0].id;
        await pb.collection("likes").delete(recordId);
      } else {
        // Create a new reaction
        await pb.collection("likes").create({
          like: likeValue,
          dislike: dislikeValue,
          userId: userId,
          postId: postId,
        });
      }

      fetchLikes(); // Refresh the likes count after updating
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const postView = async () => {
      try {
        const record = await pb.collection("posts").getOne<Post>(postId);
        setPost(record);
        console.log(record);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    postView();
    // fetchLikes();
  }, [postId]);

  return (
    <>
      <Navbar />
      <div className="flex bg-[#fafbfb] min-h-screen  min-w-[calc(100vw_-_6px)] justify-center text-black pt-[15vh] pb-[10vh]">
        <div className="w-[60vw] h-fit flex flex-col shadow rounded-md p-5">
          <div className="flex gap-5 items-center mb-4 text-gray-600">
            <div className="flex items-center justify-center h-[40px] w-[40px] border-[1px] border-gray-500 rounded-full">
              <img src={User} className="w-[30px]" alt="img"/>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-black">{post.username}</span>
              <p className="text-sm text-gray-500">
                {post.updated
                  ? `${dayjs((post.updated)).fromNow()} ago`
                  : "N/A"}
              </p>
            </div>
          </div>
          <h1 className="font-semibold text-[1.7rem]">{post.title}</h1>
          {post.image !== "" && (
            <img
              src={`https://amustud.pockethost.io/api/files/${post?.collectionId}/${post.id}/${post.image}`}
              alt="Post"
              className="w-[400px] h-auto rounded-lg"
            />
          )}
          <p className="py-5 text-sm">{post.text}</p>
          <div className="flex justify-between w-[100%]">
            <div className="flex gap-5">
              <div className="flex items-center gap-2  bg-[#fafbfb] shadow rounded-full mb-10">
                <img
                  src={Arrow}
                  alt="arrow"
                  className="w-[35px] h-[35px] rotate-[270deg] p-2 hover:rounded-full hover:bg-blue-600/40 cursor-pointer"
                  onClick={() => handleReaction(1, 0)}
                  onKeyUp={()=>false}
                />
                <span className="text-xs">{netLikes}</span>
                <img
                  src={Arrow}
                  alt="arrow"
                  className="w-[35px] h-[35px] p-2 rotate-[90deg] hover:rounded-full hover:bg-red-600/40 cursor-pointer"
                  onClick={() => handleReaction(0, 1)}
                  onKeyUp={()=>false}
                />
              </div>
              <div className="flex items-center gap-2 px-3 bg-[#fafbfb] shadow rounded-full mb-10 hover:bg-gray-600/40 cursor-pointer">
                <img src={Comment} alt="arrow" className="w-[20px] h-[20px] " />
                <span className="text-xs">123</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-[#fafbfb] shadow rounded-full mb-10  hover:bg-gray-600/40 cursor-pointer">
              <img src={Share} alt="arrow" className="w-[20px] h-[20px]  " />
              <span className="text-xs">Share</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
