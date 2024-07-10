"use client"
import { useEffect, useState } from 'react'
import pb from '../../../../lib/pocketbase'; 
import Image from 'next/image';
import { formatDistanceToNow } from "date-fns";
import Navbar from '../../../app/components/Navbar';
import Arrow from "../../../../public/arrow.png";
import Comment from "../../../../public/comment.png";
import Share from "../../../../public/share1.png";
const Post = ({params}) => {
    
    const [post, setPost] = useState({})
    const postId = params.postid;
    console.log(postId);

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
        <div className='flex bg-[#0e1113] min-h-screen w-[100%] justify-center pt-[10vh]'>
            <div className='w-[60vw] flex flex-col '>
                <span className="flex gap-2 items-center text-gray-600 mb-4">
                    <div className='h-[30px] w-[30px] bg-slate-600 rounded-full'></div>
                    <span className="text-gray-300">{post.username}</span>
                    <p className="text-gray-500 text-sm">
                        {post.updated ? formatDistanceToNow(new Date(post.updated)) + ' ago' : 'N/A'}
                    </p>
                </span>
                <h1 className='font-semibold text-[1.7rem]'>
                    {post.title}
                </h1>
                {post.image !== '' && <Image src={`https://amustud.pockethost.io/api/files/${post.collectionId}/${post.id}/${post.image}`} width={300} height={400} alt="Post" className="w-[400px] h-auto rounded-lg" />}
                <p className='py-5 text-[#b7cbd5] text-sm'>
                    {post.text}
                </p>
            <div className='flex justify-between w-[100%]'>
                <div className='flex gap-5'>
                    <div className='flex items-center gap-2  bg-[#2b3336] rounded-full mb-10'>
                        <Image src={Arrow} width={100} height={100} alt='arrow' className='w-[35px] h-[35px] rotate-[270deg] p-2 hover:rounded-full hover:bg-blue-600/40 cursor-pointer'/>
                        <span className='text-xs'>999</span>
                        <Image src={Arrow} width={100} height={100} alt='arrow' className='w-[35px] h-[35px] p-2 rotate-[90deg] hover:rounded-full hover:bg-red-600/40 cursor-pointer'/>
                    </div>
                    <div className='flex items-center gap-2 px-3 bg-[#2b3336] rounded-full mb-10 hover:bg-gray-600/40 cursor-pointer'>
                        <Image src={Comment} width={100} height={100} alt='arrow' className='w-[20px] h-[20px] '/>
                        <span className='text-xs'>123</span>
                    </div>
                </div>
                <div className='flex items-center gap-2 p-3 bg-[#2b3336] rounded-full mb-10  hover:bg-gray-600/40 cursor-pointer'>
                    <Image src={Share} width={100} height={100} alt='arrow' className='w-[20px] h-[20px]  '/>
                    <span className='text-xs'>Share</span>

                </div>
            </div>
            </div>
            
        </div>
        </>
    )
}

export default Post;