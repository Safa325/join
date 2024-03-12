let tasks = [
    {
        'title': 'Kochwelt Page & Recipe Recommender',
        'description': 'Build start page with recipe recommendation...',
        'assignedTo': [
            {
                badgecolor: "#FF7A00",
                initials: "CG",
                register: "C",
                name: "Claire Grube",
                email: "cgrube@mail.de",
                phone: "+49 40 276 5436",
            },
            {
                badgecolor: "#FF5EB3",
                initials: "VP",
                register: "V",
                name: "Volker Putt",
                email: "volkerputt@yahoo.com",
                phone: "+49 30 2589963",
            }
        ],
        'priority': 'medium',
        'category': 'User Story',
        'dueDate': '2024-03-12',
        'status': 'todo',
        'subtasks': [
            {
                'title': 'Implement Recipe Recommondation',
                'done': true
            },
            {
                'title': 'Start Page Layout',
                'done': false
            }
        ]
    },
    {
        'title': 'Kochwelt Page & Recipe Recommender',
        'description': 'Build start page with recipe recommendation...',
        'assignedTo': [
            {
                badgecolor: "#FF7A00",
                initials: "CG",
                register: "C",
                name: "Claire Grube",
                email: "cgrube@mail.de",
                phone: "+49 40 276 5436",
            },
            {
                badgecolor: "#FF5EB3",
                initials: "VP",
                register: "V",
                name: "Volker Putt",
                email: "volkerputt@yahoo.com",
                phone: "+49 30 2589963",
            }
        ],
        'priority': 'medium',
        'category': 'User Story',
        'dueDate': '2024-03-12',
        'status': 'todo',
        'subtasks': [
            {
                'title': 'Implement Recipe Recommondation',
                'done': true
            },
            {
                'title': 'Start Page Layout',
                'done': false
            }
        ]
    }
]


function initBoard() {

    renderCards()
}

function renderCards() {


    let todoTasks = tasks.filter((task) => task.status == 'todo');
    renderTodoCards(todoTasks)
}

function renderTodoCards(tasks){
    let container = document.getElementById('todo-card-container');
    container.innerHTML = ''

    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        container.innerHTML += cardHTML(task)
    }
}



function cardHTML(task){
    return /*html*/`
         <div draggable='true' class="board-task-card">
                        <p class="board-task-category">User Story</p>
                        <h6 class="board-task-title">Kochwelt Page & Recipe</h6>
                        <p class="board-task-description">Build start page with recipe recommendation</p>

                        <div class="board-task-progress">
                            <div class="board-task-progressbar">
                                <div class="board-task-progress-inner"></div>
                            </div>
                            <p>1/2 Subtasks</p>
                        </div>

                        <div class="board-task-profile-badge-container">
                            <div class="board-task-profile-badge">RP</div>
                            <div class="board-task-profile-badge">NA</div>
                            <div class="board-task-profile-badge">LI</div>
                        </div>

                    </div>
    `

}