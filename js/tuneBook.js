function TuneBook(tunes) {

    this.fieldsToReplace = [
        { field: "title", regex: /\nT: *(.*)(?=\n)/ },
        { field: "notes", regex: /\nN: *(.*)(?=\n)/ }
    ];

    this.tunes = [];

    tunes.forEach(tune => {
        this.tunes.push(new Tune(this, tune));
    });

    // this.tunes = this.tunes
    //     .sort((a, b) => {
    //         if (a.title.toUpperCase() < b.title.toUpperCase())
    //             return -1;
    //         else if (a.title.toUpperCase() > b.title.toUpperCase())
    //             return 1;
    //         else
    //             return 0;
    //     });

    // let i = 0;
    // this.tunes.forEach(tune => tune.index = i++);
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
        .replace(/(?<=\n) +/g, '')
        .trim();

    this.tune.tuneBook.fieldsToReplace.forEach(ftr => {
        if (ftr.regex.test(this.abc)) {
            this[ftr.field] = this.abc.match(ftr.regex)[1];
            this.abc = this.abc.replace(ftr.regex, '');
        }
    });
    this.html = new Html(this);
}

Variation.prototype.render = function (onlyBackingTrack) {

    ABCJS.midi.stopPlaying();

    const renderedTune = ABCJS.renderAbc(
        "notation",
        this.abc,
        {
            add_classes: true,
            responsive: "resize",
        });

    ABCJS.renderMidi("midi", this.abc,
        {
            voicesOff: (onlyBackingTrack || false),
            animate: {
                listener: noteHighlight.animationCallback.bind(noteHighlight),
                target: renderedTune[0],
                qpm: this.getTempo()
            },
            inlineControls: {
                loopToggle: true,
            }
        });

}

Variation.prototype.getTempo = () => {
    let defaultTempo = "120";
    let tempoRegex = new RegExp(/\nQ: *(.*=)?([0-9]+)(?=\n)/);
    return (
        tempoRegex.test(this.abc) ?
            this.abc.match(tempoRegex)[2] :
            defaultTempo);
}

Variation.prototype.hasChords = function () {
    let tuneLines = this.abc.split('\n');
    i = 0;
    abcIndex = 0;
    while (tuneLines[i].search(/^[A-Za-z]:/) == 0) {
        abcIndex += tuneLines[i].length + 1;
        i++;
    }
    let abcString = this.abc.substr(abcIndex);
    // <note><accidental><type></bass>
    let chordRegex = new RegExp(/"[A-G][b|#]?(m|min|maj|dim|aug|\+|sus)?(4|5|6|7|9|11|13)?(\/[A-G][b|#]?)?(\([A-G][b|#]?(m|min|maj|dim|aug|\+|sus)?(4|5|6|7|9|11|13)?(\/[A-G][b|#]?)?\))?"/);
    return (abcString.search(chordRegex) != -1);
}

Variation.prototype.display = function () {
    if (current != null
        && current.tuneIndex == this.tune.index
        && current.variationIndex == this.index)
        return;

    current = {
        tuneIndex: this.tune.index,
        variationIndex: this.index
    }

    ABCJS.midi.stopPlaying();

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
        <div class="card mb-2" id="card-midi">
            <div class="card-header d-flex justify-content-between">
                <div class="h5">Midi</div>` +
        ((this.variation.hasChords()) ?
            `<div class="small"><input class="align-middle" type="checkbox" onclick="renderMidi(${this.variation.tune.index},${this.variation.index},this.checked)"> Only backing track</div>` :
            '') +
        `</div>
            <div class="card-body" id="midi">
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