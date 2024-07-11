import pb from "@/lib/pb";
import {
  getLike,
  handleLike,
  getUserReaction,
  type LikeAction,
} from "@/lib/likes";
import { cx } from "classix";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ShareIcon,
  UserIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";

import Navbar from "../components/Navbar";
// import Arrow from "../../public/arrow-black.png";
// import Comment from "../../public/comment.png";
// import Share from "../../public/share.png";
// import User from "../../public/user.png";

import type { RecordModel } from "pocketbase";
import { useRoute } from "preact-iso";
import useSWR from "swr";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Collections } from "../../pocketbase-types";
import { useCallback, useState } from "preact/hooks";
dayjs.extend(relativeTime);

interface Post extends RecordModel {
  image: string;
  title: string;
  username: string;
  text: string;
}

const getPost = async (postId: string) => {
  const post = await pb.collection(Collections.PostLikes).getOne(postId, {
    expand: "authorId,postId",
  });

  return {
    ...post,
    id: post.postId,
    likes: post.netLikes,
    collectionId: post.expand.postId.collectionId,

    userName: post.expand.authorId.name,
    userAvatar: post.expand.authorId.avatar,
    userVerified: post.expand.authorId.verified,
    userId: post.expand.authorId.id,

    title: post.expand.postId.title,
    text: post.expand.postId.text,
    updated: post.expand.postId.updated,
    image: post.expand.postId.image,
  };
};

const Post = () => {
  const { postId } = useRoute().params;

  const {
    data: post,
    isLoading: postLoading,
    error: postError,
    mutate: mutatePost,
  } = useSWR(`posts/${postId}`, () => getPost(postId));

  const {
    data: [reaction, likeId] = [0, null],
    isLoading: reactionLoading,
    error: reactionError,
    mutate: react,
  } = useSWR(`likes/${postId}`, () => getUserReaction(postId));

  const handleReaction = useCallback(
    async (likeType: LikeAction) => {
      const newLikeState = await handleLike(
        reaction,
        likeType,
        postId,
        likeId ?? undefined
      );

      react([newLikeState, likeId]);
    },
    [reaction, postId, likeId, react]
  );

  return postLoading
    ? "Post is loading...."
    : postError || (
        <>
          <Navbar />
          <div className="flex bg-[#fafbfb] min-h-screen  min-w-[calc(100vw_-_6px)] justify-center text-black pt-[15vh] pb-[10vh]">
            <div className="w-[60vw] h-fit flex flex-col shadow rounded-md p-5">
              <div className="flex gap-5 items-center mb-4 text-gray-600">
                <div className="flex items-center justify-center h-[40px] w-[40px] border-[1px] border-gray-500 rounded-full">
                  <UserIcon className="w-[30px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-black">
                    {post.userName}
                  </span>
                  <p className="text-sm text-gray-500">
                    {dayjs(post.updated).fromNow() || "N/A"}
                  </p>
                </div>
              </div>
              <h1 className="font-semibold text-[1.7rem]">{post.title}</h1>
              {post.image !== "" && (
                <img
                  src={pb.files.getUrl(post, post.image)}
                  alt="Post"
                  className="w-[400px] h-auto rounded-lg"
                />
              )}
              <p className="py-5 text-sm">{post.text}</p>
              <div className="flex justify-between w-[100%]">
                <div className="flex gap-5">
                  <div className="flex items-center gap-2  bg-[#fafbfb] shadow rounded-full mb-10">
                    <ArrowUpIcon
                      className={cx(
                        "p-2 cursor-pointer w-[35px] h-[35px] hover:rounded-full hover:bg-blue-600/40",
                        reaction === 1 && "text-green-600"
                      )}
                      onClick={() => handleReaction(1)}
                      onKeyUp={() => false}
                    />
                    <span
                      className={cx(
                        "text-xs",
                        reaction === 1
                          ? "text-green-600"
                          : reaction === -1
                          ? "text-red-600"
                          : ""
                      )}
                    >
                      {post.likes+reaction}
                    </span>
                    <ArrowDownIcon
                      className={cx(
                        "p-2 cursor-pointer w-[35px] h-[35px] hover:rounded-full hover:bg-red-600/40",
                        reaction === -1 && "text-red-600"
                      )}
                      onClick={() => handleReaction(-1)}
                      onKeyUp={() => false}
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 bg-[#fafbfb] shadow rounded-full mb-10 hover:bg-gray-600/40 cursor-pointer">
                    <ChatBubbleLeftIcon
                      alt="arrow"
                      className="w-[20px] h-[20px] "
                    />
                    <span className="text-xs">123</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[#fafbfb] shadow rounded-full mb-10  hover:bg-gray-600/40 cursor-pointer">
                  <ShareIcon className="w-[20px] h-[20px]  " />
                  <span className="text-xs">Share</span>
                </div>
              </div>
            </div>
          </div>
        </>
      );
};

export default Post;
