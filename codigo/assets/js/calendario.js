const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");
const selectedDay = document.getElementById("selected-day"); // Elemento h6

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
let selectedDate = new Date(); // Inicializa a data selecionada com a data atual

// Função para formatar a data em um formato personalizado
function formatarData(data) {
  const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const mes = months[data.getMonth()];
  const dia = data.getDate();

  return `${diasSemana[data.getDay()]}, ${dia} ${mes}`;
}

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    let className = "";
    
    // Verifica se o dia é o dia atual
    if (
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      className = "today";
    }

    // Verifica se o dia é o dia selecionado pelo usuário
    if (
      i === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    ) {
      className = "selected";
      selectedDay.textContent = formatarData(selectedDate); // Atualiza o elemento h6 com a data selecionada
    }

    datesHtml += `<li class="${className}">${i}</li>`;
  }

  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    renderCalendar();
  });
});

dates.addEventListener("click", (e) => {
  if (e.target.tagName === "LI" && !e.target.classList.contains("inactive")) {
    selectedDate = new Date(year, month, parseInt(e.target.textContent));
    renderCalendar();
  }
});

renderCalendar();
