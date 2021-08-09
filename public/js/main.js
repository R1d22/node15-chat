const socket = io();

let profile = {
    uid: null,
    name: null
};

//** LOGIN **//
{
    const loginForm = document.forms.login;
    loginForm.addEventListener('submit', (ev) => {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const name = formData.get('name');
        socket.emit('login', { name }, (data) => {
            console.log(data);
            profile.uid = data.id;
            profile.name = name
            document.querySelector('.login').classList.remove('show');
            document.querySelector('.chatbox').classList.add('show');
        });
    });
}


//** CHAT **//

{
    const colors = [];
    const addMessage = (uid, name, message) => {
        let color = colors.find(item => item.uid === uid);
        if(!color) {
            color = {
                code: uniqolor.random().color,
                uid
            };
            colors.push(color);
        }
        const text = `${name}: ${message}`;
        const html = `<div style="background-color: ${color.code}">${text}</div>`;

        const elAllMessages = document.querySelector('.messages');
        elAllMessages.insertAdjacentHTML('beforeend', html);


        // const sysTypingMessage = () => {
        //     let timer = null;
        //     const elSysDiv = document.querySelector('.sysMessage');
        //     const html = `<div> ${name} typing..</div>`;
        //     elSysDiv.insertAdjacentHTML('beforeend', html);
        //     elSysDiv.classList.remove('hidden');
        //     clearTimeout(timer);
        //     timer = setTimeout(() => {
        //         elSysDiv.classList.add('hidden');
        //     }, 1000);
        // };

        // const chatArea = document.querySelector('.text-area');
        // chatArea.addEventListener('keypress', (ev) => {
        //     console.log(sysTypingMessage());
        // });
    
    };

    // const sysTypingMessage = () => {
    //     let timer = null;
    //     const elSysDiv = document.querySelector('.sysMessage');
    //     const html = `typing..`;
    //     elSysDiv.insertAdjacentHTML('beforeend', html);
    //     elSysDiv.classList.remove('hidden');
    //     clearTimeout(timer);
    //     timer = setTimeout(() => {
    //         elSysDiv.classList.add('hidden');
    //     }, 1000);
    // };



    const chatForm = document.forms.chat;
    chatForm.addEventListener('submit', (ev) => {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const message = formData.get('message');
        socket.emit('message', { message });
        addMessage(profile.id, profile.name, message );
    });


    socket.on('message', (data) => {
        addMessage(data.id, data.name, data.message );
    });
}
