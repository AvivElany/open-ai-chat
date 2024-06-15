import { useState } from 'react';
import './ChatBox.css'

// /v1/chat/completions
const apiBase = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/elran/openai"
const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXNjcmlwdGlvbiI6IlRpbWUgbGltaXRlZCB0b2tlbiBmb3IgT3BlbkFJIEFQSSBwcm94eS4iLCJpYXQiOjE3MTE2MjM2MDAsIm5iZiI6MTcxMTYyMzYwMCwiZXhwIjoxNzExODMyMzk5fQ.G6sZ60jG8Xd5Amo94lj12z9rE1b-VdgP5eXDTFlsaiQ";


export default function ChatBox() {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        {
            message: 'Hello, I am your chatbot',
            sender: 'ChatGPT',
        },
        {
            message: 'Hello, I am your user',
            sender: 'user',
        },

    ])

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMessage = {
            message: input,
            sender: 'user'
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setInput('')
    }

    const handleChange = (e) => {
        setInput(e.target.value)
        /* console.log(e.target.value); */
    }

    const processMessageToChatGPT = async (chatMessages) => {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = '';

            if (messageObject.sender === 'ChatGPT') {
                role = 'assistant'
            } else {
                role = 'user'
            }
            return { role: role, content: messageObject.message }
        }
        );
        console.log(apiMessages);

    }

    return (
        <div className='ChatBox'>

            <div className='response-area'>
                {
                messages.map((message,idx) => {
                    return (
                    <div
                    key={idx}
                    className={
                        (message.sender === 'ChatGPT') ?
                        'gpt-message message'
                        :
                        'user-message message'
                    }
                    >
                        {message.message}
                    </div>
                    )
                })
                }
            </div>

            <div>{input}</div>
            <div className="prompt-area">
                <input type="text" value={input} onChange={handleChange} placeholder='Enter a message....' /><br></br>
                <button type='submit' onClick={handleSubmit}>Send</button>

            </div>
        </div>
    )
}
