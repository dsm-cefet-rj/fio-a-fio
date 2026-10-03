import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { useChat } from '../../context/ChatContext';
import { MOCK_USERS } from '../../mocks/users';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
  MessageCircle,
  Send,
  Search,
  User,
  ArrowLeft,
  CheckCheck,
  Check,
  Plus
} from 'lucide-react';

export const ChatPage = () => {
  const { currentUser } = useRole();
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    activeConversation,
    sendMessage,
    markAsRead,
    getOrCreateConversationWithUser
  } = useChat();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Check query param (e.g., /chat?userId=usr-2 or /chat?user=mariabordadeira)
  useEffect(() => {
    const targetUserId = searchParams.get('userId') || searchParams.get('user');
    if (targetUserId) {
      const foundUser = MOCK_USERS.find(
        u => u.id === targetUserId || u.username === targetUserId
      );
      if (foundUser) {
        const convId = getOrCreateConversationWithUser(currentUser.id, foundUser);
        setActiveConversationId(convId);
      }
    } else if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [searchParams, conversations]);

  // Mark conversation as read on select
  useEffect(() => {
    if (activeConversationId) {
      markAsRead(activeConversationId);
    }
  }, [activeConversationId]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversationId) return;
    sendMessage(activeConversationId, inputText, currentUser.id);
    setInputText('');
  };

  // Helper to find other participant in conversation
  const getOtherParticipant = (conv) => {
    return conv.participants.find(p => p.id !== currentUser.id && p.username !== currentUser.username) || conv.participants[0];
  };

  const filteredConversations = conversations.filter(conv => {
    const other = getOtherParticipant(conv);
    return (
      other.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      other.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const activeOtherUser = activeConversation ? getOtherParticipant(activeConversation) : null;

  return (
    <div className="max-w-6xl mx-auto h-[calc(85vh-4rem)] min-h-[550px] max-h-[800px] flex flex-col animate-fade-in">
      <Card className="flex-1 flex overflow-hidden border border-rose-100 shadow-xl shadow-rose-900/5 rounded-3xl bg-white">
        
        {/* Left Column: Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 flex flex-col border-r border-rose-100/80 bg-rose-50/30 ${
          activeConversationId ? 'hidden md:flex' : 'flex'
        }`}>
          {/* List Header */}
          <div className="p-4 border-b border-rose-100/80 bg-white/80 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                  💬
                </div>
                <h1 className="font-extrabold text-lg text-zinc-900">Mensagens</h1>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" />
              <input
                type="text"
                placeholder="Buscar conversa ou crocheteira..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white text-xs rounded-full border border-rose-200/80 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Conversations Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-rose-50/60 p-2 space-y-1">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-zinc-400 space-y-2">
                <MessageCircle size={32} className="mx-auto text-rose-300" />
                <p className="text-xs font-semibold">Nenhuma conversa encontrada</p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const other = getOtherParticipant(conv);
                const isSelected = conv.id === activeConversationId;
                const unread = conv.unreadCount > 0;

                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 text-left ${
                      isSelected
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 scale-[1.01]'
                        : 'hover:bg-rose-100/60 bg-white/40 text-zinc-800'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <Avatar src={other.avatar} alt={other.name} size="md" />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-extrabold truncate ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                          {other.name}
                        </span>
                        {conv.lastMessage && (
                          <span className={`text-[10px] font-medium ${isSelected ? 'text-rose-100' : 'text-zinc-400'}`}>
                            {conv.lastMessage.timestamp}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-0.5">
                        <p className={`text-[11px] truncate ${
                          isSelected ? 'text-rose-100 font-medium' : unread ? 'font-bold text-zinc-900' : 'text-zinc-500'
                        }`}>
                          {conv.lastMessage?.text || 'Sem mensagens'}
                        </p>
                        {unread && !isSelected && (
                          <span className="ml-1.5 shrink-0 bg-rose-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Chat Thread */}
        <div className={`flex-1 flex flex-col bg-slate-50/40 ${
          !activeConversationId ? 'hidden md:flex' : 'flex'
        }`}>
          {activeConversation && activeOtherUser ? (
            <>
              {/* Thread Header */}
              <div className="p-3.5 px-6 border-b border-rose-100 bg-white/90 backdrop-blur-md flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveConversationId(null)}
                    className="md:hidden p-1.5 text-zinc-600 hover:text-rose-600 rounded-full hover:bg-rose-50"
                    aria-label="Voltar para conversas"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <Avatar src={activeOtherUser.avatar} alt={activeOtherUser.name} size="md" />

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-extrabold text-sm text-zinc-900">{activeOtherUser.name}</h2>
                      {activeOtherUser.role === 'creator' && (
                        <span className="bg-purple-100 text-purple-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          Professora 🧶
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500">@{activeOtherUser.username} • On-line</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/perfil`)}
                  className="rounded-full text-xs font-bold border-rose-200 text-rose-700 hover:bg-rose-50"
                >
                  <User size={14} />
                  <span className="hidden sm:inline">Ver Perfil</span>
                </Button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-[#FFF9FB]">
                <div className="text-center my-2">
                  <span className="bg-rose-100/70 text-rose-800 text-[10px] font-bold px-3 py-1 rounded-full border border-rose-200/60 shadow-2xs">
                    Conversa segura e privada no Fio a Fio 🧶
                  </span>
                </div>

                {activeConversation.messages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[70%] ${
                        isMe ? 'ml-auto' : 'mr-auto'
                      }`}
                    >
                      <div
                        className={`p-3.5 px-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isMe
                            ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl rounded-br-xs font-medium'
                            : 'bg-white text-zinc-900 border border-rose-100/90 rounded-2xl rounded-bl-xs font-normal'
                        }`}
                      >
                        {msg.text}
                      </div>

                      <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-400 px-1">
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck size={12} className="text-rose-400" />}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white border-t border-rose-100 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Escreva sua mensagem com carinho..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-rose-50/50 border border-rose-200/80 rounded-full text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-400/60 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white flex items-center justify-center shadow-md shadow-rose-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
                  aria-label="Enviar mensagem"
                >
                  <Send size={18} className="translate-x-0.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FFF9FB] space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-2xl shadow-inner">
                💬
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="font-extrabold text-base text-zinc-900">Suas Conversas no Fio a Fio</h3>
                <p className="text-xs text-zinc-500">
                  Selecione uma pessoa ao lado para conversar sobre receitas, fios e tirar dúvidas.
                </p>
              </div>
            </div>
          )}
        </div>

      </Card>
    </div>
  );
};
