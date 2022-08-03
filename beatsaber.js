let socket;

const events = {
    hello(data){
        ui.onGameConnected(data);
    },
    noteCut(data, fullStatus){
        ui.noteCut(data, fullStatus);

    },
    noteFullyCut(data, fullStatus){
        ui.noteFullyCut(data, fullStatus);
    },
    noteSpawned(data, fullStatus){
        ui.noteSpawned(data, fullStatus);
    },
    songStart(data, fullStatus) {
        ui.gridShow(data);
        ui.onSongStart(data, fullStatus)

        
    },
    
    resume(data) {
        ui.gridShow(data);
    },
    finished(data) {
        ui.gridHide(data);

    },
    failed(data){
        ui.gridHide(data);
    },
    pause(data){
        ui.gridHide(data);
    }
};

function connect(){
    socket =  new WebSocket("ws://localhost:6557/socket");
    socket.onmessage = (message) => {
        const json = JSON.parse(message.data);

        if(["hello", "noteCut", "songStart", "finished", "failed", "pause", "resume","noteFullyCut", "noteSpawned"].some(a => a=== json.event)) {
            events[json.event](json.status, json);
        }
    };

    socket.onclose = () => {
        setTimeout(connect, 5000);
    };
}

connect();
