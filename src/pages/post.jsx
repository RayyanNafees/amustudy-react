import { useEffect, useState } from 'react'
import pb from '../../lib/pocketbase';
import { formatDistanceToNow } from "date-fns";
import Navbar from '../components/Navbar';
import Arrow from "../../public/arrow-black.png";
import Comment from "../../public/comment.png";
import Share from "../../public/share.png";
import User from "../../public/user.png";
import { useParams } from "react-router-dom";

const Post = () => {
    
    const [post, setPost] = useState({})
    
    const {postId} = useParams();

    useEffect(() => {

        const postView = async () => {

            try {
                const record = await pb.collection('posts').getOne(postId);
                setPost(record);
                console.log(record)
              } catch (error) {
                console.error('Error fetching post:', error);
            }
        }
        postView();
    },[postId])
    
    return(
        <>
        <Navbar />
        <div className='flex bg-[#fafbfb] h-screen  min-w-[calc(100vw_-_6px)] justify-center text-black pt-[15vh]'>
            <div className='w-[60vw] h-fit flex flex-col shadow rounded-md p-5'>
                <div className="flex gap-5 items-center text-gray-600 mb-4">
                    <div className='flex items-center justify-center h-[40px] w-[40px] border-[1px] border-gray-500 rounded-full'>
                        <img src={User} className='w-[30px]'/>
                    </div>
                    <div className='flex flex-col'>
                        <span className="font-medium text-black">{post.username}</span>
                        <p className="text-gray-500 text-sm">
                            {post.updated ? formatDistanceToNow(new Date(post.updated)) + ' ago' : 'N/A'}
                        </p>
                    </div>
                </div>
                <h1 className='font-semibold text-[1.7rem]'>
                    {post.title}
                </h1>
                {post.image !== '' && <img src={`https://amustud.pockethost.io/api/files/${post.collectionId}/${post.id}/${post.image}`} alt="Post" className="w-[400px] h-auto rounded-lg" />}
                <p className='py-5 text-sm'>
                    {post.text}
                </p>
            <div className='flex justify-between w-[100%]'>
                <div className='flex gap-5'>
                    <div className='flex items-center gap-2  bg-[#fafbfb] shadow rounded-full mb-10'>
                        <img src={Arrow}  alt='arrow' className='w-[35px] h-[35px] rotate-[270deg] p-2 hover:rounded-full hover:bg-blue-600/40 cursor-pointer'/>
                        <span className='text-xs'>999</span>
                        <img src={Arrow}  alt='arrow' className='w-[35px] h-[35px] p-2 rotate-[90deg] hover:rounded-full hover:bg-red-600/40 cursor-pointer'/>
                    </div>
                    <div className='flex items-center gap-2 px-3 bg-[#fafbfb] shadow rounded-full mb-10 hover:bg-gray-600/40 cursor-pointer'>
                        <img src={Comment} alt='arrow' className='w-[20px] h-[20px] '/>
                        <span className='text-xs'>123</span>
                    </div>
                </div>
                <div className='flex items-center gap-2 p-3 bg-[#fafbfb] shadow rounded-full mb-10  hover:bg-gray-600/40 cursor-pointer'>
                    <img src={Share} alt='arrow' className='w-[20px] h-[20px]  '/>
                    <span className='text-xs'>Share</span>

                </div>
            </div>
            </div>
            
        </div>
        </>
    )
}

export default Post;