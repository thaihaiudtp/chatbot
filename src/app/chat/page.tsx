'use client'
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ButtonClear } from '@/components/ui/buttonclear';
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/modal";
import { ChatApi } from '@/service/api/chat/chatApi';
export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const data = await ChatApi(userInput)
      const botReply = data.output || 'Xin lỗi, có lỗi xảy ra.';

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Không thể kết nối đến server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  const clearMessages = () => {
    setMessages([{ sender: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn?' }]);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-800 p-4">
      <Card className="w-full max-w-md flex flex-col h-full">
        <CardContent className="flex-1 overflow-auto p-4 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg ${msg.sender === 'bot' ? 'bg-gray-200 text-gray-800 text-left' : 'bg-blue-500 text-white text-right'}`}>
              <div className={`text-xs font-semibold ${msg.sender === 'bot' ? 'text-gray-600' : 'text-white'}`}>{msg.sender === 'bot' ? 'Bot' : 'User'}</div>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="p-2 rounded-lg bg-gray-200 text-left italic text-gray-500">
              Đang trả lời...
            </div>
          )}
        </CardContent>
        <div className="flex p-2 border-t gap-2 text-gray-800">
          <ButtonClear onClick={() => setIsDialogOpen(true)} disabled={isLoading}>
            <p>Clear</p>
          </ButtonClear>
          <Input
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={isLoading}>
            {isLoading ? 'Đang gửi...' : 'Gửi'}
          </Button>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <p>Bạn có chắc muốn xóa tất cả tin nhắn không?</p>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Hủy</Button>
            <Button onClick={clearMessages} className="bg-red-500 text-white">Xóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
