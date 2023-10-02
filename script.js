let questions = [];
let currentIndex = 0;

document.getElementById('upload-csv').addEventListener('change', function(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function(event) {
        parseCSV(event.target.result);
        displayQuestion(0);
        document.getElementById('quiz-container').style.display = 'block';
    };
    reader.readAsText(file);
});

function parseCSV(csv) {
    let lines = csv.trim().split("\n");
    questions = lines.map(line => {
        let columns = line.split(",");
        return {
            question: columns[0],
            options: columns[1].split("\n"),
            answer: columns[2],
            explanation: columns[3]
        };
    });
}

function displayQuestion(index) {
    if (index < 0 || index >= questions.length) return;

    let questionObj = questions[index];
    document.getElementById('question').innerText = questionObj.question;
    let optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = "";
    questionObj.options.forEach((option, i) => {
        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'option';
        radio.value = String.fromCharCode(65 + i);
        let label = document.createElement('label');
        label.innerHTML = `${String.fromCharCode(65 + i)}. ${option}`;
        optionsDiv.appendChild(radio);
        optionsDiv.appendChild(label);
        optionsDiv.appendChild(document.createElement('br'));
    });
    document.getElementById('explanation').innerText = '';
}

function submitAnswer() {
    let selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) return;

    if (selectedOption.value === questions[currentIndex].answer) {
        document.getElementById('explanation').innerText = "正解! " + questions[currentIndex].explanation;
    } else {
        document.getElementById('explanation').innerText = "不正解... " + questions[currentIndex].explanation;
    }
}

function previousQuestion() {
    currentIndex--;
    displayQuestion(currentIndex);
}

function nextQuestion() {
    currentIndex++;
    displayQuestion(currentIndex);
}
