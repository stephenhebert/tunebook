function TuneBook(tunes) {

    this.fieldsToReplace = [
        { field: "title", regex: /\nT: *(.*)(?=\n)/ },
        { field: "notes", regex: /\nN: *(.*)(?=\n)/ }
    ];

    this.tunes = [];

    tunes.forEach(tune => {
        this.tunes.push(new Tune(this, tune));
    });

    this.abcOptions = {
        add_classes: true,
        responsive: "resize",
        clickListener: self.clickListener
    };

    this.synthAudio = new SynthAudio();

    this.current = null;

}

function SynthAudio() {

    this.cursorControl = new CursorControl();
    // this.audioContext;
    this.midiBuffer;
    this.synthControl;

    this.clickListener = function (abcElem) {
        let lastClicked = abcElem.midiPitches;
        if (!lastClicked)
            return;

        ABCJS.synth.playEvent(lastClicked, abcElem.midiGraceNotePitches, this.synthControl.visualObj.millisecondsPerMeasure()).then(function (response) {
            console.log("note played");
        }).catch(function (error) {
            console.log("error playing note", error);
        });
    }

    this.init = function () {
        // window.AudioContext = window.AudioContext ||
        //     window.webkitAudioContext ||
        //     navigator.mozAudioContext ||
        //     navigator.msAudioContext;
        // this.audioContext = new window.AudioContext();
        this.midiBuffer = new ABCJS.synth.CreateSynth();
        this.synthControl = new ABCJS.synth.SynthController();
    }

    this.load = function () {
        if (ABCJS.synth.supportsAudio()) {
            if (!this.synthControl) this.init();
            if (this.midiBuffer) this.midiBuffer.stop();
            this.synthControl.load("#audio", this.cursorControl, { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true });
        } else {
            document.querySelector("#audio").innerHTML = "<div class='audio-error'>Audio is not supported in this browser.</div>";
        }
    }
}

function CursorControl() {
    let self = this; // fix this

    self.onStart = function () {
        let svg = document.querySelector("#notation svg");
    };
    self.beatSubdivisions = 2;
    self.onEvent = function (ev) {
        if (ev.measureStart && ev.left === null)
            return; // this was the second part of a tie across a measure line. Just ignore it.

        let lastSelection = document.querySelectorAll("#notation svg .highlight");
        for (let k = 0; k < lastSelection.length; k++)
            lastSelection[k].classList.remove("highlight");

        for (let i = 0; i < ev.elements.length; i++) {
            let note = ev.elements[i];
            for (let j = 0; j < note.length; j++) {
                note[j].classList.add("highlight");
            }
        }
    };
    self.onFinished = function () {
        let els = document.querySelectorAll("svg .highlight");
        for (let i = 0; i < els.length; i++) {
            els[i].classList.remove("highlight");
        }
    };
}


function Tune(tuneBook, tune) {
    this.tuneBook = tuneBook;
    this.index = this.tuneBook.tunes.length;

    this.variations = [];

    switch (typeof (tune.abc)) {
        case "string":
            this.variations.push(new Variation(this, tune.abc));
            break;
        case "object":
            tune.abc.forEach(variation => this.variations.push(new Variation(this, variation)));
            break;
    }

    this.title = this.variations[0].title;
    this.tags = tune.tags;
    this.links = tune.links;
}

Tune.prototype.getHeading = function () { return this.title.charAt(0).toUpperCase(); }

function Variation(tune, variation) {
    this.tune = tune;
    this.index = this.tune.variations.length;

    this.abc = variation
        //        .replace(/(?<=\n) +/g, '') doesn't work with webkit
        .replace(/\n +/g, '\n') // double check with change in typeahead / dynamic table for negative lookbehind
        .trim();

    this.tune.tuneBook.fieldsToReplace.forEach(ftr => {
        if (ftr.regex.test(this.abc)) {
            this[ftr.field] = this.abc.match(ftr.regex)[1];
            this.abc = this.abc.replace(ftr.regex, '');
        }
    });
    this.html = new Html(this);
}

Variation.prototype.render = function () {

    // ABCJS.midi.stopPlaying();

    // const renderedTune = ABCJS.renderAbc(
    //     "notation",
    //     this.abc,
    //     {
    //         add_classes: true,
    //         responsive: "resize",
    //     });

    // ABCJS.renderMidi("midi", this.abc,
    //     {
    //         voicesOff: (onlyBackingTrack || false),
    //         animate: {
    //             listener: noteHighlight.animationCallback.bind(noteHighlight),
    //             target: renderedTune[0],
    //             qpm: this.getTempo()
    //         },
    //         inlineControls: {
    //             loopToggle: true,
    //         }
    //     });

    let visualObj = ABCJS.renderAbc("notation", this.abc, this.tune.tuneBook.abcOptions)[0];

    // if (!this.tune.tuneBook.synthAudio.synthControl) 
    this.tune.tuneBook.synthAudio.load();
    this.tune.tuneBook.synthAudio.midiBuffer.init({ visualObj: visualObj });
    if (this.tune.tuneBook.synthAudio.synthControl) {
        this.tune.tuneBook.synthAudio.synthControl.setTune(visualObj, true)
            .then(function (response) {
                console.log("Audio successfully loaded.")
            }).catch(function (error) {
                console.warn("Audio problem:", error);
            });
    }
}

Variation.prototype.getTempo = () => {
    let defaultTempo = "120";
    let tempoRegex = new RegExp(/\nQ: *(.*=)?([0-9]+)(?=\n)/);
    return (
        tempoRegex.test(this.abc) ?
            this.abc.match(tempoRegex)[2] :
            defaultTempo);
}

// Variation.prototype.hasChords = function () {
//     let tuneLines = this.abc.split('\n');
//     i = 0;
//     abcIndex = 0;
//     while (tuneLines[i].search(/^[A-Za-z]:/) == 0) {
//         abcIndex += tuneLines[i].length + 1;
//         i++;
//     }
//     let abcString = this.abc.substr(abcIndex);
//     // <note><accidental><type></bass>
//     let chordRegex = new RegExp(/"[A-G][b|#]?(m|min|maj|dim|aug|\+|sus)?(4|5|6|7|9|11|13)?(\/[A-G][b|#]?)?(\([A-G][b|#]?(m|min|maj|dim|aug|\+|sus)?(4|5|6|7|9|11|13)?(\/[A-G][b|#]?)?\))?"/);
//     return (abcString.search(chordRegex) != -1);
// }

Variation.prototype.display = function () {
    if (this.tune.tuneBook.current != null
        && this.tune.tuneBook.current.tuneIndex == this.tune.index
        && this.tune.tuneBook.current.variationIndex == this.index)
        return;

    this.tune.tuneBook.current = {
        tuneIndex: this.tune.index,
        variationIndex: this.index
    }

    //ABCJS.midi.stopPlaying();

    document.getElementById("default").classList.add("d-none");
    let tuneContainer = document.getElementById("tune")
    tuneContainer.classList.remove("d-none");
    tuneContainer.innerHTML = '';

    let tuneHtml = `
        ${this.html.getTitle()}
        <div class="row">
            <div class="col-lg-9 col-12 px-1">
                ${this.html.getMidi()}
                ${this.html.getNotation()}
            </div>
            <div class="col-lg-3 col-12 px-1">
                ${this.html.getTags()}
                ${this.html.getNotes()}
                ${this.html.getLinks()}
            </div>
        </div>`;

    tuneContainer.innerHTML = tuneHtml;

    this.render();
}

function Html(variation) {
    this.variation = variation;
}

Html.prototype.getTitle = function () {
    return `
        <div class="row">
            <div class="col">
                <h2 id="title">${this.variation.title}</h2>
            </div>
        </div>`;
};

Html.prototype.getMidi = function () {
    return `
        <div class="card mb-2" id="card-audio">
            <div class="card-header d-flex justify-content-between">
                <div class="h5">Audio</div>` +
        // ((this.variation.hasChords()) ?
        //     `<div class="small"><input class="align-middle" type="checkbox" onclick="renderMidi(${this.variation.tune.index},${this.variation.index},this.checked)"> Only backing track</div>` :
        //     '') +
        `</div>
            <div class="card-body" id="audio">
            </div>
        </div>`;
};

Html.prototype.getNotation = function () {
    return `
        <div class="card mb-2" id="card-notation">
            <h5 class="card-header">Notation</h5>
            <div class="card-body" id="notation">
            </div>
        </div>`;
};

Html.prototype.getTags = function () {
    if (this.variation.tune.tags == null || typeof (this.variation.tune.tags) != "object") return '';

    let tagsHtml = '';
    this.variation.tune.tags.sort().forEach(tag => tagsHtml += `<span class="badge badge-secondary">${tag.toLowerCase()}</span> `);

    return `
        <div class="card mb-2" id="card-tags">
            <h5 class="card-header">Tags</h5>
            <div class="card-body">
                ${tagsHtml}
            </div>
        </div>`;
};

Html.prototype.getNotes = function () {
    return (this.variation.notes != null) ? `
        <div class="card mb-2" id="card-notes">
            <h5 class="card-header">Notes</h5>
            <div class="card-body">
                <p class="small">${this.variation.notes}</p>
            </div>
        </div>` : '';
};

Html.prototype.getLinks = function () {
    if (this.variation.tune.links == null || typeof (this.variation.tune.links) != "object") return '';
    let tuneLinksHtml = '';
    this.variation.tune.links
        .forEach(link => tuneLinksHtml += `<li class="hanging-indent"><a href="${link.url}" target="_blank">${link.title}</a>`);
    return `
        <div class="card mb-2" id="card-resources">
            <h5 class="card-header">Resources</h5>
            <div class="card-body">
                <ul class="list-unstyled small">${tuneLinksHtml}</ul>
            </div>
        </div>`
};