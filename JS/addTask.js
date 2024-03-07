profileBadgeColors = [
    '#FF7A00',
    '#FF5EB3',
    '#6E52FF',
    '#9327FF',
    '#00BEE8',
    '#1FD7C1',
    '#FF745E',
    '#FFA35E',
    '#FC71FF',
    '#FFC701',
    '#0038FF',
    '#C3FF2B',
    '#FFE62B',
    '#FF4646',
    '#FFBB2B',
]



function toggleDropdown(id, dropdown) {
    let element = document.getElementById(id)
    element.classList.toggle('arrow-up')

    let dropContainer = document.getElementById(dropdown);
    dropContainer.classList.toggle('d-none')

}


function selectPrio(prio) {
    let containerUrgent = document.getElementById('addTask-prio-urgent');
    let containerMedium = document.getElementById('addTask-prio-medium');
    let containerLow = document.getElementById('addTask-prio-low');

    containerUrgent.classList.remove('selected')
    containerMedium.classList.remove('selected')
    containerLow.classList.remove('selected')

    if (prio == 'urgent') {
        containerUrgent.classList.add('selected')
    } else if (prio == 'medium') {
        containerMedium.classList.add('selected')
    }
    else {
        containerLow.classList.add('selected')
    }
}

function selectCategory(event) {
    let inputField = document.getElementById('addTask-category')
    let text = '';
    let element = event.target.querySelector("p")
    if (element == null) {
        text = event.target.innerHTML;

    } else {
        text = element.innerHTML;
    }

    inputField.value = text;

    toggleDropdown('arrow-category', 'category-dropdown-container')


}