import {create} from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages: [],
    setMessages: (messagesOrFunction) => set(state => {
        const newMessages = typeof messagesOrFunction === 'function' 
            ? messagesOrFunction(state.messages) 
            : messagesOrFunction;
            
        return { messages: Array.isArray(newMessages) ? newMessages : [] };
    }),
}));

export default useConversation;