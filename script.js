const students = [
  { name: "Anna", skill: 7, locked: false },
  { name: "Ben", skill: 5, locked: false },
  { name: "Clara", skill: 9, locked: false },
  { name: "David", skill: 4, locked: false },
  { name: "Eva", skill: 6, locked: false }
];

const manualAssignBtn = document.getElementById('manualAssignBtn');
const groupSetup = document.getElementById('groupSetup');
const startAssign = document.getElementById('startAssign');
const assignArea = document.getElementById('assignArea');
const poolList = document.getElementById('poolList');
const groupsContainer = document.getElementById('groupsContainer');

manualAssignBtn.addEventListener('click', () => {
  groupSetup.classList.remove('hidden');
});

startAssign.addEventListener('click', () => {
  const count = parseInt(document.getElementById('groupCount').value);
  setupGroups(count);
  groupSetup.classList.add('hidden');
  assignArea.classList.remove('hidden');
});

function setupGroups(count) {
  poolList.innerHTML = '';
  groupsContainer.innerHTML = '';
  students.forEach((s, index) => {
    const li = document.createElement('li');
    li.textContent = s.name + ' (' + s.skill + ')';
    li.draggable = true;
    li.dataset.index = index;
    li.addEventListener('dragstart', dragStart);
    poolList.appendChild(li);
  });

  for (let i = 0; i < count; i++) {
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('group');
    groupDiv.innerHTML = '<h2>Gruppe ' + (i+1) + '</h2><ul class="dropzone"></ul>';
    const dropzone = groupDiv.querySelector('.dropzone');
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('drop', drop);
    groupsContainer.appendChild(groupDiv);
  }

  poolList.addEventListener('dragover', dragOver);
  poolList.addEventListener('drop', drop);
}

let dragged;

function dragStart(e) {
  dragged = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (dragged) {
    e.currentTarget.appendChild(dragged);
    const index = dragged.dataset.index;
    students[index].locked = true; // beim Verschieben automatisch sperren
    dragged.classList.add('locked');
  }
}

// Buttons für Auffüllen
document.getElementById('fillRandom').addEventListener('click', () => {
  alert('Demo: Rest zufällig auffüllen (noch nicht implementiert)');
});

document.getElementById('fillBalanced').addEventListener('click', () => {
  alert('Demo: Rest nach Stärke auffüllen (noch nicht implementiert)');
});

document.getElementById('saveGroups').addEventListener('click', () => {
  alert('Gruppen gespeichert!');
});

document.getElementById('cancelGroups').addEventListener('click', () => {
  assignArea.classList.add('hidden');
  groupSetup.classList.add('hidden');
});
