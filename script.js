let distractions = [];
let subjects = [];

function addDistraction() {
    const name = dName.value.trim();
    let importance = Number(dImportance.value);
    let time = Number(dTime.value);

    if (!name) {
        alert("Enter a distraction name.");
        return;
    }
    if (isNaN(importance) || importance < 1 || importance > 5) {
        alert("Importance must be a number between 1 and 5.");
        return;
    }
    if (isNaN(time) || time < 0) {
        alert("Time wasted cannot be negative.");
        return;
    }

    const cost = importance * time;
    distractions.push({ name, importance, time, cost });

    const li = document.createElement("li");
    li.textContent = `${name} → Cost: ${cost}`;
    distractionList.appendChild(li);

    dName.value = dImportance.value = dTime.value = "";
}

function addSubject() {
    const name = sName.value.trim();
    let hours = Number(sHours.value);

    if (!name) {
        alert("Enter a subject name.");
        return;
    }
    if (isNaN(hours) || hours < 0) {
        alert("Hours per week cannot be negative.");
        return;
    }

    subjects.push({ name, hours });

    const li = document.createElement("li");
    li.textContent = `${name} → ${hours} hrs/week`;
    subjectList.appendChild(li);

    sName.value = sHours.value = "";
}

function analyze() {
    if (distractions.length === 0 || subjects.length === 0) {
        alert("Add distractions and subjects first");
        return;
    }

    const totalDistractionCost = distractions.reduce((sum, d) => sum + d.cost, 0);
    const worstDistraction = distractions.reduce((max, d) => d.cost > max.cost ? d : max);

    const totalHours = subjects.reduce((sum, s) => sum + s.hours, 0);
    const averageHours = totalHours / subjects.length;
    const imbalance = subjects.filter(s => s.hours > 1.5 * averageHours);

    let state = "Balanced";
    if (totalDistractionCost > 300 || totalHours > 40) {
        state = "Overloaded";
    } else if (totalDistractionCost > 150) {
        state = "Fatigued";
    }

    results.innerHTML = `
        Total Distraction Cost: ${totalDistractionCost}<br>
        Worst Distraction: ${worstDistraction.name}<br><br>
        Total Academic Load: ${totalHours} hours<br>
        Average Subject Load: ${averageHours.toFixed(1)} hours<br><br>
        Cognitive State: ${state}<br>
        ${imbalance.length > 0 ? "Imbalanced Subjects: " + imbalance.map(s => s.name).join(", ") : "No subject imbalance detected"}
    `;
}
