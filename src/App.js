import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import ChatLog from './components/ChatLog';
import chatMessages from './data/messages.json';

const App = () => {
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    const chatCopy = chatMessages.map((data) => {
      return {
        ...data,
      };
    });
    setChatList(chatCopy);
  }, []);

  const changeLike = (chatId, likedOr) => {
    const newchatlist = [];
    for (const chat of chatList) {
      if (chat.id !== chatId) {
        newchatlist.push(chat);
      } else {
        const newChat = {
          ...chat,
          liked: likedOr,
        };
        newchatlist.push(newChat);
      }
    }
    setChatList(newchatlist);
  };

  function countHeart(chatList) {
    let likeCount = 0;
    for (const chat of chatList) {
      if (chat.liked === true) {
        likeCount = likeCount + 1;
      }
    }
    return likeCount;
  }

  const hearts = countHeart(chatList);

  return (
    <div id="App">
      <header>
        <h1>Chat Room</h1>
        <div>
          <section className="widget" id="heartWidget">
            {hearts} ❤️s
          </section>
        </div>
      </header>
      <main>
        <ChatLog entries={chatList} changeLike={changeLike} />
      </main>
    </div>
  );
};

export default App;
