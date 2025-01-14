const ui = {
    var : fadeTime = parseInt(new URLSearchParams(window.location.search).get("fadeTime") || "500"),
    var : showStrict = parseInt(new URLSearchParams(window.location.search).get("showStrict") || "0"),
    var : showGrid = parseInt(new URLSearchParams(window.location.search).get("showGrid") || "1"),
    bloqColor : [[255, 0 , 0], [0, 0, 255]],
    onGameConnected(data){
        console.log("Connected to Beat Saber v" + data.game.gameVersion);
        if(showGrid == "0"){
            document.getElementsByTagName("Grid")[0].remove();
        }
    },
    onSongStart(data, fullStatus){
        // console.log(fullStatus);
        ui.bloqColor[0] = fullStatus.status.beatmap.color.saberA;
        ui.bloqColor[1] = fullStatus.status.beatmap.color.saberB;
    },

    noteCut(data, fullStatus){

    },
    noteMissed(data, fullStatus) {
        let bloq = document.createElement("img");

        console.log(fullStatus.noteCut)

        let hsv = []
        if(fullStatus.noteCut.noteCutDirection == "Any"){
            switch(fullStatus.noteCut.noteType){
                case "NoteA":
                    bloq.src = "images/BloqDot.png";
                    hsv = ui.rgb2hsv(ui.bloqColor[0]);
                    bloq.style.setProperty("filter" , `hue-rotate(${ hsv[0] }deg) saturate(${ hsv[1] * 100 }%) brightness(${ hsv[2] * 100 }%)`);
                    break;
                case "NoteB":
                    bloq.src = "images/BloqDot.png";
                    hsv = ui.rgb2hsv(ui.bloqColor[1]);
                    bloq.style.setProperty("filter" , `hue-rotate(${ hsv[0] }deg) saturate(${ hsv[1] * 100 }%) brightness(${ hsv[2] * 100 }%)`);
                    break;
            }

        } else {
            switch(fullStatus.noteCut.noteType){
                case "NoteA":
                    bloq.src = "images/Bloq.png";
                    hsv = ui.rgb2hsv(ui.bloqColor[0]);
                    bloq.style.setProperty("filter" , `hue-rotate(${ hsv[0] }deg) saturate(${ hsv[1] * 100 }%) brightness(${ hsv[2] * 100 }%)`);
                    break;
                case "NoteB":
                    bloq.src = "images/Bloq.png";
                    hsv = ui.rgb2hsv(ui.bloqColor[1]);
                    bloq.style.setProperty("filter" , `hue-rotate(${ hsv[0] }deg) saturate(${ hsv[1] * 100 }%) brightness(${ hsv[2] * 100 }%)`);
                    break;
            }

            console.log(hsv);
        }


        bloq.classList.add("Note");
        bloq.classList.add(`Layer${fullStatus.noteCut.noteLayer}`);
        bloq.classList.add(`Line${fullStatus.noteCut.noteLine}`);
        bloq.classList.add(fullStatus.noteCut.noteCutDirection);
        bloq.style.setProperty("--fadeTime",  `${fadeTime}ms`);


        document.body.appendChild(bloq);

        setTimeout(function(){ui.deleteNote(bloq);}, fadeTime);

    },
    deleteNote(note){
        if(document.body.contains(note)){
            document.body.removeChild(note);
        }

    },

    noteFullyCut(data, fullStatus) {
        let bloq = document.createElement("img");

        console.log(fullStatus.noteCut)

        let hsv = []
        if(fullStatus.noteCut.noteCutDirection == "Any"){
            switch(fullStatus.noteCut.noteType){
                case "NoteA":
                    bloq.src = "images/BloqDot.png";
                    hsv = ui.rgb2hsv(ui.bloqColor[0]);
                    bloq.style.setProperty("filter" , `hue-rotate(${ hsv[0] }deg) saturate(${ hsv[1] * 100 }%) brightness(${ hsv[2] * 100 }%)`);
                    break;
                case "NoteB":
                    bloq.src = "images/BloqDot.png";
                    hsv = ui.rgb2hsv(ui.bloqColor[1]);
                    bloq.style.setProperty("filter" , `hue-rotate(${ hsv[0] }deg) saturate(${ hsv[1] * 100 }%) brightness(${ hsv[2] * 100 }%)`);
                    break;
            }

        } else {
            switch(fullStatus.noteCut.noteType){
                case "NoteA":
                    bloq.src = "images/Bloq.png";
                    hsv = ui.rgb2hsv(ui.bloqColor[0]);
                    bloq.style.setProperty("filter" , `hue-rotate(${ hsv[0] }deg) saturate(${ hsv[1] * 100 }%) brightness(${ hsv[2] * 100 }%)`);
                    break;
                case "NoteB":
                    bloq.src = "images/Bloq.png";
                    hsv = ui.rgb2hsv(ui.bloqColor[1]);
                    bloq.style.setProperty("filter" , `hue-rotate(${ hsv[0] }deg) saturate(${ hsv[1] * 100 }%) brightness(${ hsv[2] * 100 }%)`);
                    break;
            }

            console.log(hsv);
        }


        bloq.classList.add("Note");
        bloq.classList.add(`Layer${fullStatus.noteCut.noteLayer}`);
        bloq.classList.add(`Line${fullStatus.noteCut.noteLine}`);
        bloq.classList.add(fullStatus.noteCut.noteCutDirection);
        bloq.style.setProperty("--fadeTime",  `${fadeTime}ms`);


        document.body.appendChild(bloq);

        setTimeout(function(){ui.deleteNote(bloq);}, fadeTime);
        
        let hitLine = document.createElement("img");
        

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

        if(fullStatus.noteCut.noteCutDirection != "Any"){
            document.body.appendChild(hitLine);
        }

        hitLine.style.setProperty("transform", `rotate(${-fullStatus.noteCut.cutDirectionDeviation + ui.getDirectionValue(fullStatus.noteCut.noteCutDirection)}deg)`);
        hitLine.style.setProperty("--fadeTime", `${fadeTime + 100}ms`);

        console.log(`${fadeTime + 100}ms`);
        setTimeout(function(){ui.deleteHitLine(hitLine);}, fadeTime);

        // score display
        if(document.getElementsByClassName(`Score Layer${fullStatus.noteCut.noteLayer} Line${fullStatus.noteCut.noteLine}`)[0]){
            ui.deleteNote(document.getElementsByClassName(`Score Layer${fullStatus.noteCut.noteLayer} Line${fullStatus.noteCut.noteLine}`)[0]);
        }

        let score = document.createElement("div");
        score.innerText = fullStatus.noteCut.finalScore;

        score.classList.add("Score");
        score.classList.add(`Layer${fullStatus.noteCut.noteLayer}`);
        score.classList.add(`Line${fullStatus.noteCut.noteLine}`);
        score.style.setProperty("--fadeTime",  `${fadeTime}ms`);

        document.body.appendChild(score);
        
        setTimeout(function(){ui.deleteScore(score);}, fadeTime);
        
    },
    deleteScore(score){
        if(document.body.contains(score)){
            document.body.removeChild(score);
        }
    },
    deleteHitLine(hitLine){
        setTimeout(function(){
            if(document.body.contains(hitLine)){
                document.body.removeChild(hitLine);
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
    },

    rgb2hsv ( rgb ) {
        var r = rgb[0] / 255 ;
        var g = rgb[1] / 255 ;
        var b = rgb[2] / 255 ;

        var max = Math.max( r, g, b ) ;
        var min = Math.min( r, g, b ) ;
        var diff = max - min ;

        var h = 0 ;

        switch( min ) {
            case max :
                h = 0 ;
            break ;

            case r :
                h = (60 * ((b - g) / diff)) + 180 ;
            break ;

            case g :
                h = (60 * ((r - b) / diff)) + 300 ;
            break ;

            case b :
                h = (60 * ((g - r) / diff)) + 60 ;
            break ;
        }

        var s = max == 0 ? 0 : diff / max ;
        var v = max ;

        return [ h, s, v ] ;
    }
};
