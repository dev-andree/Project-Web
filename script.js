const localStorage = window.localStorage;
let tasks = JSON.parse(localStorage.getItem('tasksList')) || [];

class Task {
    constructor(id, description, concluida = false) {
        this.id = id;
        this.description = description;
        this.concluida = concluida;
    }
}

window.onload = listarTarefas;

function listarTarefas() {
    const table = document.getElementById("table");
    table.innerHTML = ""; // Limpa a tabela antes de renderizar novamente

    tasks.forEach((task, index) => {
        task.id = index; // Atualiza os IDs das tarefas
        criarElemento(task);
    });

    localStorage.setItem('tasksList', JSON.stringify(tasks));
}

function criarElemento(task) {
    const row = document.createElement("tr");
    // Adiciona uma classe de estilo para tarefas concluídas
    const statusClass = task.concluida ? "concluida" : "";
    row.innerHTML = `
        <td class="${statusClass}">${task.description}</td>
        <td><button onclick="modalEdicaoTarefa(${task.id})">Edit</button></td>
        <td><button onclick="deletarTarefa(${task.id})">Delete</button></td>
        <td><button onclick="marcarConcluido(${task.id})">Concluído</button></td>
        <td><input type="checkbox" ${task.concluida ? 'checked' : ''} disabled></td>
    `;
    document.getElementById("table").appendChild(row);
}

function addTask() {
    const newTaskDescription = document.getElementById('input_nova_tarefa').value.trim();
    if (!newTaskDescription) {
        alert('Por favor insira a descrição da tarefa.');
        return;
    }

    const newTask = new Task(tasks.length, newTaskDescription);
    tasks.push(newTask);
    listarTarefas();
    document.getElementById('input_nova_tarefa').value = ''; // Limpa o campo de entrada
}

function modalEdicaoTarefa(taskId) {
    const newTaskDescription = prompt('Mudar Task', tasks[taskId].description);
    if (newTaskDescription !== null) {
        tasks[taskId].description = newTaskDescription.trim();
        listarTarefas();
    }
}

function marcarConcluido(taskId) {
    if (confirm(`Tem certeza de que deseja marcar esta tarefa como concluída: "${tasks[taskId].description}"?`)) {
        tasks[taskId].concluida = true;
        listarTarefas();
    }
}

function deletarTarefa(taskId) {
    if (confirm(`Tem certeza de que deseja excluir esta Task: "${tasks[taskId].description}"?`)) {
        tasks.splice(taskId, 1);
        listarTarefas();
    }
}
