  const colors = ["Vermelha", "Verde", "Branca", "Amarela", "Azul"];
  const names = ["Claudia", "Maíra", "Vanish", "Gustavo", "Wash"];
  const drinks = ["Cerveja", "Café", "Chá", "Vinho", "Limonada"];
  const hobbies = ["Ornitologia", "Jardinagem", "Leitura", "Fotografia", "Desenho"];
  const species = ["Lobisomem", "Humano", "Bruxa", "Vampiro", "Fada"];

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
    defaultOption.text = "Escolha";
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

  const pistasList = document.getElementById("pistasList");
  pistas.forEach((texto) => {
    const item = document.createElement("li");
    item.innerText = texto;
    pistasList.appendChild(item);
  });

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

  function handleChange() {
    for (let i = 1; i <= 5; i++) {
      updateColumnColor(i);
    }
    checkSolution();
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

    const invalidIndex = [claudia, maira, vanish, gustavo, wash, vermelha, verde, branca, amarela, azul,
      cerveja, cafe, cha, vinho, limonada, ornitologia, jardinagem, leitura, fotografia, desenho,
      lobisomem, humano, bruxa, vampiro, fada].some(i => i === -1);

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

    Array.from(pistasList.children).forEach((item, i) => {
      item.className = (!invalidIndex && regras[i]) ? "ok" : "fail";
    });

    if (invalidIndex) {
      document.getElementById("result").innerText = "Preencha todos os campos para validar.";
    } else if (regras.every(r => r)) {
      document.getElementById("result").innerText = "🎉 Parabéns! Solução correta!";
    } else {
      document.getElementById("result").innerText = "Algumas pistas ainda estão incorretas.";
    }
  }