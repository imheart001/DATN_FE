import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useFetchBlogQuery, useGetBlogByIdQuery } from '../../../service/blog.service';
import Header from '../../../Layout/LayoutUser/Header';
import { useFetchProductQuery } from '../../../service/films.service';
import { compareDates } from '../../../utils';
import FilmShowing from '../../../components/FilmShowing';
import { IBlogs, IFilms } from '../../../interface/model';
import { Avatar, Rate, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const BlogsDetail = () => {
    const { id } = useParams<string>();
    const { data: blog } = useGetBlogByIdQuery(id || '');

    const { data: blogs } = useFetchBlogQuery();

    //xem thêm, ẩn film
    const [visibleMovies, setVisibleMovies] = useState(4); // Số lượng mục ban đầu cần hiển thị
    const [, setShowAllMovies] = useState(false); // Biến trạng thái để kiểm soát việc hiển thị tất cả mục
    const handleShowMore = () => {
        // Tăng số lượng mục hiển thị khi nhấp vào nút "Xem thêm"
        setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 2); // Thay đổi số lượng hiển thị tùy ý
        setShowAllMovies(true);
    };

    const handleShowLess = () => {
        // Hiển thị chỉ 4 mục khi nhấp vào nút "Ẩn bớt"
        setVisibleMovies(4);
        setShowAllMovies(false);
    }

    //tất cả film
    const { data } = useFetchProductQuery() as any;

    const movieReleases = data?.data.filter((item: any) => {
        const result = compareDates(item.release_date, item.end_date);
        return result;
    });
    return (
        <>
            <section className="relative bg-[url(/banner-home.png/)] bg-cover w-full bg-center bg-no-repeat">

                <Header />
            </section>
            <div className='mt-10 flex flex-col min-h-[1400px] max-w-6xl mx-auto '>
                <section className=" flex-1 mt-10 rounded-lg max-w-6xl mx-auto ">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 text-white" >
                        <div className="h-32 rounded-lg ">
                            <article className="overflow-hidden rounded-lg    shadow-sm">
                                <img
                                    alt="Office"
                                    srcSet={blog?.data.image}
                                    style={{ width: '800px' }}

                                    className="h-32 w-full object-cover md:h-full"
                                />
                                <div className="p-4  ">
                                    <a href="#">
                                        <h3 style={{ fontSize: '1.3rem' }} className="font-bold ">
                                            {blog?.data.title}
                                        </h3>
                                    </a>
                                    <p className="mt-2 text-sm">
                                        {blog?.data.content}
                                    </p>

                                    <br />

                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                                        <div className="h-12 rounded-lg">0 comment</div>
                                        <div className="h-12 rounded-lg">
                                            <Rate allowHalf defaultValue={4} />

                                        </div>
                                    </div>

                                </div>

                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[120px_1fr] lg:gap-8">
                                    <div className="h-32 rounded-lg ">
                                        <Space direction="vertical" size={16}>
                                            <Space wrap size={16}>
                                                <Avatar size={64} icon={<UserOutlined />} />
                                            </Space>
                                        </Space>
                                    </div>
                                </div>

                                {/* phần tin tức khác */}
                                <div className="What’s On img  text-white">
                                    <h1 className='text-xl'>BÀI VIẾT KHÁC</h1>


                                    <div className="What’s On img my-10 grid grid-cols-3 gap-8">
                                        {blogs &&
                                            blogs?.data?.map((blog: IBlogs) => blog.status === 1 ? (
                                                <article
                                                    key={blog.id}
                                                    className="relative overflow-hidden rounded-lg border border-gray-200 shadow transition hover:shadow-lg"
                                                >
                                                    <Link to={`/blog/${blog.id}`}>
                                                        <img
                                                            src={blog.image}
                                                            className="w-full h-full object-cover"
                                                            alt={blog.title}
                                                        />
                                                    </Link>
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                                        <Link to={`/blog/${blog.id}`}>
                                                            <h3 className="text-white text-sm">{blog.title}</h3>
                                                        </Link>
                                                    </div>
                                                </article>
                                            ) : null)}
                                    </div>




                                </div>



                            </article>

                        </div>


                        {/* phần bên phải */}
                        <div className="h-32 rounded-lg ml-16">
                            <h1 className="text-[#FFFFFF] mb-[34px] mx-auto text-center text-[41px] font-bold">
                                Đang chiếu
                            </h1>
                            <div className="grid grid-cols-2 gap-7">
                                {movieReleases &&
                                    movieReleases.slice(0, visibleMovies).map((film: IFilms, index: number) => (
                                        <FilmShowing key={index} data={film} />
                                    ))}
                            </div>
                            {movieReleases && movieReleases.length > 4 && (
                                <div className="block text-center">
                                    {visibleMovies === 4 ? (
                                        <u
                                            className="text-[#8E8E8E] text-center text-[17px]"
                                            onClick={handleShowMore}
                                        >
                                            <a>Hiển thị thêm!</a>
                                        </u>
                                    ) : (
                                        <u
                                            className="text-[#8E8E8E] text-center text-[17px]"
                                            onClick={handleShowLess}
                                        >
                                            <a>Ẩn bớt</a>
                                        </u>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

            </div>

        </>
    )
}

export default BlogsDetail