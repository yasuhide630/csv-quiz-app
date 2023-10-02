let questions = [];
let currentQuestionIndex = 0;

document.getElementById('createQuizBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const csvData = event.target.result;
            questions = parseCSVData(csvData);
            displayQuestion(0);
            document.getElementById('quizContainer').style.display = 'block';
        };
        reader.readAsText(file);
    }
});

document.getElementById('submitAnswerBtn').addEventListener('click', function() {
    const question = questions[currentQuestionIndex];
    const choicesElement = document.getElementById('choices');
    const inputs = choicesElement.querySelectorAll('input[type="checkbox"]');
    let selectedAnswers = [];
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            selectedAnswers.push(i.toString());
        }
    }
    if (selectedAnswers.join(',') === question.answer) {
        alert('正解！');
        document.getElementById('explanation').textContent = question.explanation;
    } else {
        alert('不正解！');
        document.getElementById('explanation').textContent = question.explanation;
    }
});

document.getElementById('prevQuestionBtn').addEventListener('click', function() {
    if (currentQuestionIndex > 0) {
        displayQuestion(currentQuestionIndex - 1);
    }
});

document.getElementById('nextQuestionBtn').addEventListener('click', function() {
    if (currentQuestionIndex < questions.length - 1) {
        displayQuestion(currentQuestionIndex + 1);
    }
});

function parseCSVData(data) {
    const lines = data.trim().split('\n');
    const questions = [];
    
    for (const line of lines) {
        const [questionText, choiceText, answer, explanation] = line.split(',');
        const choices = choiceText.split('\n');
        questions.push({ questionText, choices, answer, explanation });
    }
    
    return questions;
}

function displayQuestion(index) {
    const question = questions[index];
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    
    questionElement.textContent = question.questionText;
    choicesElement.innerHTML = '';
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = i;
        label.appendChild(input);
        label.appendChild(document.createTextNode(choice));
        choicesElement.appendChild(label);
        choicesElement.appendChild(document.createElement('br'));
    }
    
    currentQuestionIndex = index;
}
