import React, { useEffect } from 'react';
import { MenuProps, message } from 'antd';
import { Dropdown, Space, Layout } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';

export const HeaderAdmin = () => {
    const { Header } = Layout;
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')!);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className='grid border-b p-3 text-center'>
                    <span>{user ? user.name : "Admin"}</span>
                    <span>{user ? user.role : "Admin"}</span>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span>
                    Setting
                </span>
            ),
            disabled: true,
        },
        {
            key: '3',
            label: (
                <NavLink target="_blank" to="/">
                    Client
                </NavLink>
            )
        },
        {
            key: '4',
            danger: true,
            label: (
                <button onClick={() => {
                    message.success("Đăng xuất thành công!")
                    localStorage.clear();
                    setTimeout(() => {
                        navigate("/");
                    }, 1000)
                }} > Đăng xuất</button >
            ),
        },
    ];

    return (
        <Header className="bg-white text-center text-black flex justify-end items-center">
            <Dropdown menu={{ items }}>
                <Space className="w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 flex justify-center">
                    <i className="fa-solid fa-user-tie text-[20px]"></i>
                </Space>
            </Dropdown>
        </Header>
    )
};