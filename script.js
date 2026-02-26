function conjugate() {
    let verb = document.getElementById("verbInput").value.trim();
    let tense = document.getElementById("tense").value;
    let politeness = document.getElementById("politeness").value;

    let necessity = document.getElementById("necessity").checked;
    let advice = document.getElementById("advice").checked;
    let negation = document.getElementById("negation").checked;
    let question = document.getElementById("question").checked;

    if (necessity && advice) {
        document.getElementById("result").innerText = "Cannot combine -fe and -qavo.";
        return;
    }

    if (!verb) {
        document.getElementById("result").innerText = "Enter a verb.";
        return;
    }

    let base = "";
    let group = "";

    // Irregular ek
    if (verb === "ek") {
        group = "irregular";
    }
    else if (verb.endsWith("mon")) {
        group = "mon";
        base = verb.slice(0, -3);
    }
    else if (verb.endsWith("nzr")) {
        group = "nzr";
        base = verb.slice(0, -3);
    }
    else if (verb.endsWith("ek")) {
        group = "ek";
        base = verb.slice(0, -2);
    }
    else {
        document.getElementById("result").innerText = "Unknown verb group.";
        return;
    }

    let ending = "";

    const endings = {
        present: {
            mon: { formal: "m", informal: "" },
            nzr: { formal: "ne", informal: "n" },
            ek: { formal: "em", informal: "ai" }
        },
        past: {
            mon: { formal: "met", informal: "t" },
            nzr: { formal: "net", informal: "nt" },
            ek: { formal: "emet", informal: "aiqet" }
        },
        future: {
            mon: { formal: "qem", informal: "q" },
            nzr: { formal: "niqe", informal: "niq" },
            ek: { formal: "iqa", informal: "a" }
        }
    };

    if (group === "irregular") {
        if (tense === "present") {
            ending = politeness === "formal" ? "em" : "ekai";
        }
        else if (tense === "past") {
            ending = politeness === "formal" ? "emet" : "ekaiqet";
        }
        else if (tense === "future") {
            ending = politeness === "formal" ? "iqa" : "eka";
        }
    }
    else {
        if (tense === "futureAnterior") {
            let pastEnding = endings.past[group][politeness];
            let futureEnding = endings.future[group][politeness];
            ending = pastEnding + futureEnding;
        } else {
            ending = endings[tense][group][politeness];
        }
    }

    let finalVerb = group === "irregular" ? ending : base + ending;

    // Particle order
    if (necessity) finalVerb += "fe";
    if (advice) finalVerb += "qavo";
    if (negation) finalVerb += "nuk";
    if (question) finalVerb += "ma";

    document.getElementById("result").innerText = finalVerb;
}
