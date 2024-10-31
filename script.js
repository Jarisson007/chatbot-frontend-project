const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');
const chatbotToggler = document.querySelector('.chatbot-toggler');
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
let userName = "";
let projectName = "";
let companyName = "";

//const API_kEY = "YOUR_API_KEY";  // Substitua pela sua chave de API


const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add("chat", className);
    let chatContent = className === "continuacao" ? `<p>${message}</p>` : `<img class="manu" src="componets/img/MANU.svg"/><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

// Função para rolar a caixa de chat para o final
const scrollToBottom = () => {
    chatbox.scrollTop = chatbox.scrollHeight;
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


// Função para gerar respostas automáticas
const generateResponse = (message) => {
    // Remove a mensagem "Digitando..."
    const typingMessage = document.querySelector('.chat.entrada:last-child');
    if (typingMessage) typingMessage.remove();

    let responseMessage = "";

    // Lógica para respostas automáticas
    if (message.toLowerCase().includes("olá") || message.toLowerCase().includes("oi")) {
        if (userName) {
            responseMessage = `Olá, ${userName}. Como posso te ajudar hoje?`;
        } else {
            responseMessage = "Olá! Para iniciarmos, informe seu nome.";
        }
    } else if (userName === "" && !message.toLowerCase().includes("olá") && !message.toLowerCase().includes("oi")) {
        userName = message;
        responseMessage = `Prazer em conhecê-lo, ${userName}. Como posso te ajudar hoje?`;
    } else if (message.toLowerCase().includes("preciso de um relatorio sobre o projeto")) {
        projectName = message.replace(/preciso de um relatorio sobre o projeto/i, "").trim();
        responseMessage = `${userName}, para prosseguirmos, informe o nome da empresa parceira.`;
    } else if (companyName === "" && projectName !== "") {
        companyName = message;
        responseMessage = `Acabei de localizar o projeto ${projectName} da empresa ${companyName}.<br>O senhor(a) poderá acessar o relatório clicando no link que estou enviando ou, se preferir, pode baixá-lo.<br>Além do relatório, estou enviando um gráfico que oferece uma visão visual do andamento do projeto, útil para apresentar à sua equipe.`;
        
        // Adicionar um "link" e um "gráfico" (GIF) fictício
        setTimeout(() => {
            //criando o link para baixar o relatório
            const reportLink = '<a href="componets/docs/Relatorio.pdf" download>Baixar Relatório</a>';
            chatbox.appendChild(createChatLi(reportLink, "entrada"));
            
            //criando elemento img
            const imgElement = document.createElement('img');
            imgElement.src = "/componets/img/dashboard.svg";
            imgElement.alt = "Gráfico";
            imgElement.classList.add("grafico");

            //adicionando o elemento img ao chatbox
            chatbox.appendChild(createChatLi(imgElement.outerHTML, "entrada"));
            chatbox.appendChild(createChatLi("Espero ter lhe ajudado da melhor forma possível. Caso você precise de mais informações, estarei aqui para lhe ajudar.", "entrada"));
            scrollToBottom();
        }, 3000);
    } else {
        responseMessage = "Desculpe, não entendi. Pode reformular sua pergunta?";
    }
    
    // Anexa a resposta à caixa de bate-papo
    chatbox.appendChild(createChatLi(responseMessage, "entrada"));
    scrollToBottom();
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    // Anexe a mensagem do usuário à caixa de bate-papo  
    chatbox.appendChild(createChatLi (userMessage, "continuacao"));
    chatInput.value =''; //Limpa a área de texto após enviar a mensagem
    scrollToBottom();

    setTimeout(() => {
        //Exibirá a mensagem "pensando..." enquanto aguarda a resposta
        chatbox.appendChild(createChatLi ("Digitando...", "entrada"));
        scrollToBottom();
        generateResponse(userMessage);
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