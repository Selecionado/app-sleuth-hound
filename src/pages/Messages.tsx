
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  RefreshCcw, 
  Send, 
  Mail, 
  MessageCircle, 
  Bell, 
  Search,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  sender: string;
  title: string;
  content: string;
  date: string;
  type: 'notification' | 'direct' | 'system';
  read: boolean;
}

const Messages = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread' | 'notifications' | 'direct'>('all');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Função para filtrar mensagens com base na tab selecionada
  const filteredMessages = messages.filter(message => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!message.title.toLowerCase().includes(term) && 
          !message.content.toLowerCase().includes(term) &&
          !message.sender.toLowerCase().includes(term)) {
        return false;
      }
    }
    
    if (selectedTab === 'all') return true;
    if (selectedTab === 'unread') return !message.read;
    if (selectedTab === 'notifications') return message.type === 'notification';
    if (selectedTab === 'direct') return message.type === 'direct';
    return true;
  });

  // Função para simular o recebimento de novas mensagens
  const handleRefresh = () => {
    const newMessages: Message[] = [
      {
        id: messages.length + 1,
        sender: "Sistema",
        title: "Nova compra registrada",
        content: "Uma nova compra foi registrada no valor de R$ 521.116,00 para POTENCIAGRO LTDA.",
        date: new Date().toLocaleString('pt-BR'),
        type: 'notification',
        read: false
      }
    ];
    
    setMessages([...newMessages, ...messages]);
    
    toast({
      title: "Atualizado",
      description: `${newMessages.length} nova(s) mensagem(ns) recebida(s)`,
    });
  };

  // Função para abrir o modal de nova mensagem
  const handleNewMessage = () => {
    setIsComposing(true);
    
    // Aqui você pode implementar a lógica para abrir um modal/dialog para compor nova mensagem
    // Por enquanto, vamos apenas exibir um toast
    toast({
      title: "Nova mensagem",
      description: "Funcionalidade de nova mensagem será implementada em breve.",
    });
    setIsComposing(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mensagens</h1>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Atualizar
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            onClick={handleNewMessage}
          >
            <Send className="h-4 w-4" />
            Nova Mensagem
          </Button>
        </div>
      </div>

      {/* Main content */}
      <Card className="overflow-hidden border-[#2a3447]">
        <div className="p-4 border-b border-[#2a3447]">
          <h2 className="text-xl font-semibold">Caixa de Entrada</h2>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-[#2a3447]">
          <button 
            className={`flex items-center gap-2 py-3 px-4 ${selectedTab === 'all' ? 'border-b-2 border-green-500 text-white' : 'text-gray-400'}`}
            onClick={() => setSelectedTab('all')}
          >
            <Mail className="h-4 w-4" />
            Todas
          </button>
          <button 
            className={`flex items-center gap-2 py-3 px-4 ${selectedTab === 'unread' ? 'border-b-2 border-green-500 text-white' : 'text-gray-400'}`}
            onClick={() => setSelectedTab('unread')}
          >
            <Mail className="h-4 w-4" />
            Não lidas
          </button>
          <button 
            className={`flex items-center gap-2 py-3 px-4 ${selectedTab === 'notifications' ? 'border-b-2 border-green-500 text-white' : 'text-gray-400'}`}
            onClick={() => setSelectedTab('notifications')}
          >
            <Bell className="h-4 w-4" />
            Notificações
          </button>
          <button 
            className={`flex items-center gap-2 py-3 px-4 ${selectedTab === 'direct' ? 'border-b-2 border-green-500 text-white' : 'text-gray-400'}`}
            onClick={() => setSelectedTab('direct')}
          >
            <User className="h-4 w-4" />
            Mensagens Diretas
          </button>
        </div>
        
        {/* Message list container */}
        <div className="flex flex-col md:flex-row">
          {/* Messages */}
          <CardContent className="p-0 w-full">
            {/* Search */}
            <div className="p-4 border-b border-[#2a3447]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Pesquisar mensagens..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Message list */}
            <div className="h-[400px] overflow-y-auto">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`p-4 border-b border-[#2a3447] hover:bg-[#1e2738] cursor-pointer ${!message.read ? 'bg-[#1e2738]/50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-sm text-gray-400">{message.date}</span>
                    </div>
                    <div className="font-medium mb-1">{message.title}</div>
                    <p className="text-sm text-gray-300 line-clamp-2">{message.content}</p>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>Nenhuma mensagem na caixa de entrada.</p>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Messages;
