import React, { useEffect, useState } from 'react';
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { BsPinMap } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import './Users.scss';

const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'


function Users() {

    const [name, setName] = useState('Random User');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('My name');
    const [modifiedResponse, setModifiedResponse] = useState(null);
    useEffect(() => {
        loadUser();
    }, [])



    const loadUser = () => {
        setLoading(true);
        fetch(url).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(res => {
            setLoading(false);
            const finalResult = res.results[0];
            const { email, phone, login: { password }, location: { city }, dob: { age } } = finalResult;
            const { large } = finalResult.picture;
            const { first, last } = finalResult.name;
            const modifiedResult = {
                email,
                phone,
                password,
                city,
                age,
                picture: large,
                name: `${first} ${last}`
            }
            setModifiedResponse(modifiedResult);
            setName(modifiedResult.name);
        })
    }

    const userMouseEvent = (e) => {
        const result = e.target.value;
        console.log(result);
        if (result) {
            setTitle(result);
            setName(modifiedResponse[result]);

        }

    }

    return (
        <>
            <header></header>
            <div className="userBox user_box_offset">
                <div className='user_inner_box'>
                    <div className="user_inner_aligement">
                        <div className="user_profile_box">
                            <img src={(modifiedResponse && modifiedResponse.picture) || defaultImage} alt="" />
                        </div>
                    </div>

                    <div className="userDetail_box">
                        <p>Hi, {title} is</p>
                        <h2>{name}</h2>
                    </div>
                    <ul className="userList">
                        <li> <button value="name" onMouseOver={userMouseEvent} type="button"><AiOutlineUser /></button></li>
                        <li> <button value="email" onMouseOver={userMouseEvent} type="button"><AiOutlineMail /> </button></li>
                        <li> <button value="age" onMouseOver={userMouseEvent} type="button"><MdDateRange /></button></li>
                        <li><button value="city" onMouseOver={userMouseEvent} type="button"><BsPinMap /></button></li>
                        <li><button value="phone" onMouseOver={userMouseEvent} type="button"><AiOutlinePhone /></button></li>
                        <li> <button value="password" onMouseOver={userMouseEvent} type="button"><AiOutlineLock /></button></li>
                    </ul>
                    <button type='button' className="random_user btn_alignment" onClick={loadUser}>
                        {loading ? 'loading...' : 'radmom user'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Users
