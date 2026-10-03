import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_CONVERSATIONS } from '../mocks/chats';
import { MOCK_USERS } from '../mocks/users';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('fioafio_chats');
    return saved ? JSON.parse(saved) : MOCK_CONVERSATIONS;
  });

  const [activeConversationId, setActiveConversationId] = useState(null);

  useEffect(() => {
    localStorage.setItem('fioafio_chats', JSON.stringify(conversations));
  }, [conversations]);

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

  const totalUnreadCount = conversations.reduce((acc, conv) => acc + (conv.unreadCount || 0), 0);

  const sendMessage = (conversationId, text, senderId) => {
    if (!text.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId,
      text: text.trim(),
      timestamp
    };

    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: {
              text: text.trim(),
              timestamp,
              senderId,
              read: true
            },
            messages: [...conv.messages, newMessage]
          };
        }
        return conv;
      })
    );
  };

  const markAsRead = (conversationId) => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            unreadCount: 0,
            lastMessage: conv.lastMessage ? { ...conv.lastMessage, read: true } : null
          };
        }
        return conv;
      })
    );
  };

  const getOrCreateConversationWithUser = (currentUserId, targetUser) => {
    // Check if conversation already exists between currentUserId and targetUser
    const existing = conversations.find(c =>
      c.participants.some(p => p.id === currentUserId || p.username === currentUserId) &&
      c.participants.some(p => p.id === targetUser.id || p.username === targetUser.username)
    );

    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    // Create new conversation
    const currentUserObj = MOCK_USERS.find(u => u.id === currentUserId || u.role === currentUserId) || MOCK_USERS[0];
    const newConvId = `conv-${Date.now()}`;
    const newConv = {
      id: newConvId,
      participants: [
        {
          id: currentUserObj.id,
          name: currentUserObj.name,
          username: currentUserObj.username,
          avatar: currentUserObj.avatar,
          role: currentUserObj.role
        },
        {
          id: targetUser.id,
          name: targetUser.name,
          username: targetUser.username,
          avatar: targetUser.avatar,
          role: targetUser.role
        }
      ],
      lastMessage: {
        text: "Conversa iniciada! Diga olá 🧶",
        timestamp: "Agora",
        senderId: currentUserObj.id,
        read: true
      },
      unreadCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: currentUserObj.id,
          text: "Olá! Gostaria de conversar com você sobre o seu conteúdo no Fio a Fio 🧶",
          timestamp: "Agora"
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConvId);
    return newConvId;
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversationId,
        setActiveConversationId,
        activeConversation,
        totalUnreadCount,
        sendMessage,
        markAsRead,
        getOrCreateConversationWithUser
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
