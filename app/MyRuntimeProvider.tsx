'use client';

import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useAISDKRuntime } from '@assistant-ui/react-ai-sdk';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';

interface AgentContextType {
  selectedAgent: string;
  setSelectedAgent: (agent: string) => void;
}

const AgentContext = createContext<AgentContextType>({
  selectedAgent: 'simpleAssistant',
  setSelectedAgent: () => {},
});

export const useAgentContext = () => useContext(AgentContext);

export function MyRuntimeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedAgent, setSelectedAgentInternal] = useState('simpleAssistant');

  const selectedAgentRef = useRef(selectedAgent);
  selectedAgentRef.current = selectedAgent;

  const setSelectedAgent = (agent: string) => {
    console.log(
      '[Frontend] Agent selection changed from',
      selectedAgent,
      'to',
      agent
    );
    setSelectedAgentInternal(agent);
  };

  useEffect(() => {
    console.log('[Frontend] selectedAgent state is now:', selectedAgent);
  }, [selectedAgent]);

  const transport = useMemo(
    () => {
      console.log(
        '[Frontend] Creating new transport with agent:',
        selectedAgent
      );
      return new DefaultChatTransport({
        api: '/api/chat',
        prepareSendMessagesRequest: ({ id, messages }) => {
          const body = {
            id,
            messages,
            agent: selectedAgentRef.current,
          };
          console.log('[Frontend] Sending request with agent:', body.agent);
          return { body };
        },
      });
    },
    []
  );

  const chat = useChat({
    messages: [],
    transport,
  });

  const runtime = useAISDKRuntime(chat);

  const contextValue = useMemo(
    () => ({
      selectedAgent,
      setSelectedAgent,
    }),
    [selectedAgent]
  );

  return (
    <AgentContext.Provider value={contextValue}>
      <AssistantRuntimeProvider runtime={runtime}>
        {children}
      </AssistantRuntimeProvider>
    </AgentContext.Provider>
  );
}