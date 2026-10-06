import React, { createContext, useContext, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createRecord, getConversations, getUsers, updateRecord } from '../services/api';
import { useApiData } from '../hooks/useApiData';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: conversations = [], isFetched: conversationsLoaded } = useApiData('conversations', getConversations);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const activeConversation = conversations.find(item => item.id === activeConversationId) || null;
  const totalUnreadCount = conversations.reduce((total, item) => total + (item.unreadCount || 0), 0);

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['conversations'] });

  const sendMessage = async (conversationId, text, senderId) => {
    if (!text.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    await createRecord('messages', { conversationId, senderId, text: text.trim(), timestamp, read: true });
    await updateRecord('conversations', conversationId, { unreadCount: 0 });
    await refresh();
  };

  const markAsRead = async (conversationId) => {
    const conversation = conversations.find(item => item.id === conversationId);
    if (!conversation || (!conversation.unreadCount && conversation.lastMessage?.read)) return;
    const lastMessage = conversation.messages.at(-1);
    if (lastMessage) await updateRecord('messages', lastMessage.id, { read: true });
    await updateRecord('conversations', conversationId, { unreadCount: 0 });
    await refresh();
  };

  const getOrCreateConversationWithUser = async (currentUserId, targetUser) => {
    const existing = conversations.find(item =>
      item.participants.some(user => user.id === currentUserId) &&
      item.participants.some(user => user.id === targetUser.id)
    );
    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const users = await getUsers();
    const currentUser = users.find(user => user.id === currentUserId) || users[0];
    const conversation = await createRecord('conversations', {
      participantIds: [currentUser.id, targetUser.id],
      unreadCount: 0,
    });
    await createRecord('messages', {
      conversationId: conversation.id,
      senderId: currentUser.id,
      text: 'Olá! Gostaria de conversar com você sobre o seu conteúdo no Fio a Fio 🧶',
      timestamp: 'Agora',
      read: true,
    });
    await refresh();
    setActiveConversationId(conversation.id);
    return conversation.id;
  };

  return (
    <ChatContext.Provider value={{ conversations, conversationsLoaded, activeConversationId, setActiveConversationId, activeConversation, totalUnreadCount, sendMessage, markAsRead, getOrCreateConversationWithUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
