document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('survey-form');
const result = document.getElementById('survey-result');
const output = document.getElementById('survey-output');
const copy = document.getElementById('copy-response');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  output.value = [
    'Pesquisa Perksverse',
    `Frequência: ${data.get('frequencia')}`,
    `Serviços de interesse: ${data.get('servicos')}`,
    `Principal dificuldade: ${data.get('dificuldade')?.toString().trim() || 'Não informado'}`
  ].join('\n');
  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    copy.textContent = 'Copiado!';
    setTimeout(() => { copy.textContent = 'Copiar resposta'; }, 2500);
  } catch {
    output.focus();
    output.select();
    copy.textContent = 'Selecione e copie o texto';
  }
});
