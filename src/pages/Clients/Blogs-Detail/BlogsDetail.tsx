import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetBlogByIdQuery } from '../../../service/blog.service';
import Header from '../../../Layout/LayoutUser/Header';

const BlogsDetail = () => {
    const { id } = useParams<string>();
    const { data: blog, error, isLoading } = useGetBlogByIdQuery(id);
    console.log(blog);
    return (
        <>
            <Header />

            <section className=" mt-10 overflow-hidden rounded-lg shadow-2xl max-w-6xl mx-auto md:grid md:grid-cols-3">
                <img
                    alt="Trainer"
                    srcSet={blog?.data.image}
                    style={{ width: '800px' }}

                    className="h-32 w-full object-cover md:h-full"
                />

                <div className="p-4 text-center bg-red-400 sm:p-6 md:col-span-2 lg:p-8">

                    <h2 className="mt-6 font-black uppercase">
                        <span className="text-4xl font-black sm:text-5xl lg:text-3xl">{blog?.data.title} </span>

                        <span className="mt-2 block text-sm">{blog?.data.content}</span>
                    </h2>

                    <a
                        className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white"
                        href="/"
                    >
                        Quay lại
                    </a>

                </div>
            </section>
        </>
        // <>
        //     <div className="flex items-center justify-center text-white gap-4">
        //         <img
        //             srcSet={blog?.data.image}
        //             alt=""
        //             style={{ width: '624px', height: '242px' }}
        //             className="aspect-square rounded-lg object-cover"
        //         />

        //         <div>
        //             <h3 className="text-lg/tight font-medium">{blog?.data.title}</h3>
        //             <p className="mt-0.5 ">{blog?.data.content}</p>
        //         </div>
        //     </div>

        // </>
    )
}

export default BlogsDetail