const api = 'http://localhost:5678/webhook/2265efbf-f45b-482c-901f-f99e9ddfac12/chat';
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