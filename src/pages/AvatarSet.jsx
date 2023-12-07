import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { Buffer } from "buffer";
import { avatarRoute } from '../utils/APIRoutes';

const AvatarSet = () => {

    const api = 'https://api.multiavatar.com/518';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [selectedavatars, setSelectedAvatars] = useState(undefined);

    useEffect(() => {
      if (!localStorage.getItem('chat-app-user')){
        navigate('/login');
      }
    }, []);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };



    const setProfilePic = async () =>{
        if(selectedavatars === undefined){
            toast.error("Please select an avatar", toastOptions)
        } else{
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
            const { data } = await axios.post(`${avatarRoute}/${user._id}`, {
                image: avatars[selectedavatars],
            });

            if (data.isSet){
                user.isAvatarImageSet = true;
                user.avatar = data.image;
                localStorage.setItem('chat-app-user', JSON.stringify(user));
                navigate('/')
            } else{
                toast.error('Error setting avatar please try again', toastOptions);
            }
        }
    }


    
    useEffect(() => {
      const setProfilePicture = async () => { 
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          console.log(image);
          const buffer = Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
    setAvatars(data);
    setIsLoading(false);
}
setProfilePicture();
  }, []);

    return (
        <>
            <Container>
                <div className="title-container">
                    <h1>Pick an Avatar as your profile picture.</h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, ind) => {
                            return (
                                <div key={ind} className={`avatar ${selectedavatars === ind ? "selected" : ""
                                    }`}>

                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt="avatar"
                                        key={avatar}
                                        onClick={() => setSelectedAvatars(ind)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={setProfilePic} className="submit-btn">
            Set as Profile Picture
          </button>
            </Container>
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;

.title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`

export default AvatarSet;