const ui = {
    var : fadeTime = parseInt(new URLSearchParams(window.location.search).get("fadeTime") || "500"),
    var : showStrict = parseInt(new URLSearchParams(window.location.search).get("showStrict") || "0"),
    var : showGrid = parseInt(new URLSearchParams(window.location.search).get("showGrid") || "1"),
    onGameConnected(data){
        console.log("Connected to Beat Saber v" + data.game.gameVersion);
        if(showGrid == "0"){
            document.getElementsByTagName("Grid")[0].remove();
        }
    },
    noteCut(data, fullStatus){
        let bloq = document.createElement("img");
        let hitLine = document.createElement("img");
        let score = document.createElement("div")

        if(document.getElementsByClassName(`HitLine Layer${fullStatus.noteCut.noteLayer} Line${fullStatus.noteCut.noteLine}`)[0]){
            ui.deleteNote(document.getElementsByClassName(`HitLine Layer${fullStatus.noteCut.noteLayer} Line${fullStatus.noteCut.noteLine}`)[0]);
        }

        if((fullStatus.noteCut.cutDirectionDeviation > -15 && fullStatus.noteCut.cutDirectionDeviation < 15) && showStrict == 1) {
            hitLine.src = "images/HitGood.png";
        } else {
            hitLine.src = "images/Hit.png";
        }

        hitLine.classList.add("HitLine");
        hitLine.classList.add(`Layer${fullStatus.noteCut.noteLayer}`);
        hitLine.classList.add(`Line${fullStatus.noteCut.noteLine}`);

        if(fullStatus.noteCut.noteCutDirection == "Any"){
            switch(fullStatus.noteCut.saberType){
                case "SaberA":
                    bloq.src = "images/RBloqDot.png";
                    break;
                case "SaberB":
                    bloq.src = "images/BBloqDot.png";
                    break;
            }

            hitLine.style.setProperty("display", "none");
        } else {
            switch(fullStatus.noteCut.saberType){
                case "SaberA":
                    bloq.src = "images/RBloq.png";
                    break;
                case "SaberB":
                    bloq.src = "images/BBloq.png";
                    break;
            }
        }

        score.innerText = fullStatus.noteCut.initialScore;

        bloq.classList.add("Note");
        bloq.classList.add(`Layer${fullStatus.noteCut.noteLayer}`);
        bloq.classList.add(`Line${fullStatus.noteCut.noteLine}`);
        bloq.classList.add(fullStatus.noteCut.noteCutDirection);
        bloq.style.setProperty("--fadeTime",  `${fadeTime}ms`);

        score.classList.add("Score");
        score.classList.add(`Layer${fullStatus.noteCut.noteLayer}`);
        score.classList.add(`Line${fullStatus.noteCut.noteLine}`);
        score.style.setProperty("--fadeTime",  `${fadeTime}ms`);

        document.body.appendChild(bloq);
        document.body.appendChild(hitLine);
        document.body.appendChild(score);

        hitLine.style.setProperty("transform", `rotate(${-fullStatus.noteCut.cutDirectionDeviation + ui.getDirectionValue(fullStatus.noteCut.noteCutDirection)}deg)`);
        hitLine.style.setProperty("--fadeTime", `${fadeTime + 100}ms`);

        console.log(`${fadeTime + 100}ms`);
        setTimeout(function(){ui.deleteNote(bloq, hitLine, score);}, fadeTime);
    },
    deleteNote(note, line, score){
        if(document.body.contains(note)){
            document.body.removeChild(note);
        }
        if(document.body.contains(score)){
            document.body.removeChild(score);
        }
        if(line) setTimeout(function(){
                if(document.body.contains(line)){
                    document.body.removeChild(line);
                }
            }, 100);
    },
    gridShow(){
        const grid = document.getElementsByClassName("Grid");
        if(grid.length){
            grid[0].style.setProperty("opacity",  `100`);
        }
    },
    gridHide(){
        const grid = document.getElementsByClassName("Grid");
        if(grid.length){
            grid[0].style.setProperty("opacity",  `0`);
        }
    },

    getDirectionValue(direction){
        switch(direction){
            case "Up": return 0;
            case "UpRight": return 45;
            case "Right": return 90;
            case "DownRight": return 135;
            case "Down": return 180;
            case "DownLeft": return 225;
            case "Left" : return 270;
            case "UpLeft": return 315;
        }
    }
};
