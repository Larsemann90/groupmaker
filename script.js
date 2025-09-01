let names = [];

function addName() {
  const input = document.getElementById("nameInput");
  if (input.value.trim() !== "") {
    names.push(input.value.trim());
    updateList();
    input.value = "";
  }
}

function updateList() {
  const list = document.getElementById("nameList");
  list.innerHTML = "";
  names.forEach((n, i) => {
    const li = document.createElement("li");
    li.textContent = n;
    list.appendChild(li);
  });
}

function makeGroups() {
  const groupSize = parseInt(document.getElementById("groupSize").value);
  let shuffled = [...names].sort(() => Math.random() - 0.5);
  let groups = [];
  for (let i = 0; i < shuffled.length; i += groupSize) {
    groups.push(shuffled.slice(i, i + groupSize));
  }
  const container = document.getElementById("groups");
  container.innerHTML = "";
  groups.forEach((g, idx) => {
    const div = document.createElement("div");
    div.innerHTML = "<h3>Gruppe " + (idx + 1) + "</h3><p>" + g.join(", ") + "</p>";
    container.appendChild(div);
  });
}