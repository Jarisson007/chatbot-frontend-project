const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');
const chatbotToggler = document.querySelector('.chatbot-toggler');
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;

//const API_kEY = "YOUR_API_KEY";  // Substitua pela sua chave de API


const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add("chat", className);
    let chatContent = className === "continuacao" ? `<p>${message}</p>` : `<img class="manu" src="componets/img/MANU.png"/><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

/*const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        hearders: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_kEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",  // ou outro modelo disponível
            prompt: userMessage,
            max_tokens: 150,
            temperature: 0.7
        })
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        const responseMessage = data.choices[0].text.trim();

        // Remove a mensagem "Digitando..."
        const typingMessage = document.querySelector('.chat.entrada:last-child');
        if (typingMessage) typingMessage.remove();

        // Anexa a resposta da API à caixa de bate-papo
        chatbox.appendChild(createChatLi(responseMessage, "entrada"));
    } catch (error) {
        console.error("Erro ao acessar a API:", error);

        // Remove a mensagem "Digitando..." se houver erro
        const typingMessage = document.querySelector('.chat.entrada:last-child');
        if (typingMessage) typingMessage.remove();

        chatbox.appendChild(createChatLi("Erro ao obter resposta. Tente novamente mais tarde.", "entrada"));
    }
}*/

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    // Anexe a mensagem do usuário à caixa de bate-papo  
    chatbox.appendChild(createChatLi (userMessage, "continuacao"));
    chatInput.value =''; //Limpa a área de texto após enviar a mensagem

    setTimeout(() => {
        //Exibirá a mensagem "pensando..." enquanto aguarda a resposta
        chatbox.appendChild(createChatLi ("Digitando...", "entrada"));
        generateResponse(entradaChatLi);
    }, 600);
}

// Suporte para enviar a mensagem ao pressionar a tecla "Enter"
chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Evita a quebra de linha
        handleChat();
    }
});


sendChatBtn.addEventListener('click', handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));