const api = 'http://localhost:5678/webhook/26257a08-00c6-4f89-962e-750ee92e20e5/chat';
export async function ChatApi(chatInput: string) {
    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chatInput: chatInput })
          });
    
          const data = await response.json();
          return data;
    } catch (error) {
        throw new Error;
    }
}