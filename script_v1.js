const colors = ["Amarela", "Azul", "Branca", "Verde", "Vermelha"];
const names = ["Claudia", "Gustavo", "Maíra", "Vanish", "Wash"];
const drinks = ["Café", "Cerveja", "Chá", "Limonada", "Vinho"];
const hobbies = ["Desenho", "Fotografia", "Jardinagem", "Leitura", "Ornitologia"];
const species = ["Bruxa", "Fada", "Humano", "Lobisomem", "Vampiro"];

const colorMap = {
  "Vermelha": "#ff4c4c",
  "Verde": "#4cff4c",
  "Branca": "#ffffff",
  "Amarela": "#ffff66",
  "Azul": "#66b3ff"
};

const pistas = [
  "Claudia vive na casa Vermelha.",
  "Vanish é uma Fada.",
  "Maíra bebe Café.",
  "A casa Verde fica do lado esquerdo da casa Branca.",
  "Quem vive na casa Verde bebe Vinho.",
  "Quem pratica Bruxaria gosta de Leitura.",
  "Quem vive na casa Amarela é Ornitólogo.",
  "Quem vive na casa do centro bebe Chá.",
  "Wash vive na primeira casa.",
  "Quem pratica Jardinagem vive ao lado do Lobisomem.",
  "O ser Humano vive ao lado do Ornitólogo.",
  "Quem é Desenhista bebe Limonada.",
  "O Gustavo é Fotógrafo.",
  "Wash vive ao lado da casa Azul.",
  "Quem pratica Jardinagem é vizinho de quem bebe Cerveja."
];

function fillSelect(id, options) {
  const sel = document.getElementById(id);
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "-";
  sel.add(defaultOption);
  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.text = opt;
    sel.add(option);
  });
}

for (let i = 1; i <= 5; i++) {
  fillSelect("color" + i, colors);
  fillSelect("name" + i, names);
  fillSelect("drink" + i, drinks);
  fillSelect("hobby" + i, hobbies);
  fillSelect("species" + i, species);
}

function getColumnValues(prefix) {
  return Array.from({length: 5}, (_, i) => document.getElementById(prefix + (i + 1)).value);
}

function isUnique(array) {
  return new Set(array.filter(e => e)).size === array.filter(e => e).length;
}

function updateColumnColor(column) {
  const table = document.getElementById("logicTable");
  const selectedColor = document.getElementById("color" + column).value;
  const colorHex = colorMap[selectedColor] || "#f2f2f2";

  for (let row = 1; row <= 5; row++) {
    table.rows[row].cells[column].style.backgroundColor = colorHex;
  }
}

function checkSolution() {
  const color = getColumnValues("color");
  const name = getColumnValues("name");
  const drink = getColumnValues("drink");
  const hobby = getColumnValues("hobby");
  const species = getColumnValues("species");
  const
    claudia = name.indexOf("Claudia"),
    maira = name.indexOf("Maíra"),
    vanish = name.indexOf("Vanish"),
    gustavo = name.indexOf("Gustavo"),
    wash = name.indexOf("Wash"),

    vermelha = color.indexOf("Vermelha"),
    verde = color.indexOf("Verde"),
    branca = color.indexOf("Branca"),
    amarela = color.indexOf("Amarela"),
    azul = color.indexOf("Azul"),

    cerveja = drink.indexOf("Cerveja"),
    cafe = drink.indexOf("Café"),
    cha = drink.indexOf("Chá"),
    vinho = drink.indexOf("Vinho"),
    limonada = drink.indexOf("Limonada"),

    ornitologia = hobby.indexOf("Ornitologia"),
    jardinagem = hobby.indexOf("Jardinagem"),
    leitura = hobby.indexOf("Leitura"),
    fotografia = hobby.indexOf("Fotografia"),
    desenho = hobby.indexOf("Desenho"),

    lobisomem = species.indexOf("Lobisomem"),
    humano = species.indexOf("Humano"),
    bruxa = species.indexOf("Bruxa"),
    vampiro = species.indexOf("Vampiro"),
    fada = species.indexOf("Fada");

  const adjacente = (a, b) => Math.abs(a - b) === 1;
  const regras = [
    claudia === vermelha,
    vanish === fada,
    maira === cafe,
    verde === branca - 1,
    verde === vinho,
    bruxa === leitura,
    amarela === ornitologia,
    cha === 2,
    wash === 0,
    adjacente(jardinagem, lobisomem),
    adjacente(humano, ornitologia),
    desenho === limonada,
    gustavo === fotografia,
    adjacente(wash, azul),
    adjacente(jardinagem, cerveja)
  ];

  // Validação se há repetições
  if (![color, name, drink, hobby, species].every(isUnique)) {
    document.getElementById("result").innerText = "Existem valores repetidos nas colunas!";
  } else if (regras.every(r => r)) {
    document.getElementById("result").innerText = "Parabéns! Solução correta!";
  } else {
    document.getElementById("result").innerText = "Ainda não está correto. Revise as pistas.";
  }

  // Atualiza visual das pistas
  const lista = document.getElementById("pistasList");
  lista.innerHTML = "";
  pistas.forEach((texto, i) => {
    const item = document.createElement("li");
    item.innerText = texto;
    item.className = regras[i] ? "ok" : "fail";
    lista.appendChild(item);
  });
}

