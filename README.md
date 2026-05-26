# BotFlix

BotFlix é uma página web estática que funciona como um assistente pessoal para encontrar filmes com base no seu humor ou descrição. O usuário digita como está se sentindo ou que tipo de conteúdo quer assistir, e o site consulta um webhook para retornar recomendações de filmes.

## 🚀 Visão Geral

- Interface moderna em estilo `BotFlix` com fundo escuro e animações suaves.
- Entrada de texto para descrever humor, intenção ou preferência de filme.
- Busca acionada por botão ou Enter (sem Shift).
- Resultados exibidos com pôster, título, avaliação e sinopse.
- Layout responsivo para funcionar em desktop e dispositivos móveis.

## 📁 Estrutura do Projeto

- `index.html` — página principal do aplicativo.
- `src/css/reset.css` — reset básico de estilos.
- `src/css/styles.css` — estilos principais do layout e cards.
- `src/css/animation.css` — animações visuais.
- `src/css/responsivo.css` — estilos para responsividade.
- `src/js/index.js` — lógica de interação e requisição de filmes.
- `src/images/` — imagens usadas na interface (`botflix-robot.jpg`).

## 🛠️ Como Usar

### 1. Abrir localmente

Basta abrir `index.html` no navegador.

### 2. Rodar com servidor local (recomendado)

Se quiser usar um servidor local para evitar problemas de CORS ou servir arquivos estáticos:

```bash
# Exemplo com Python 3
cd c:\Users\Jasiel Rasengan\OneDrive\Desktop\botflix
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## 🔗 Integração de API

A busca de filmes usa um webhook externo definido em `src/js/index.js`:

```js
fetch('https://jasielrasec.app.n8n.cloud/webhook-test/botflix', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: prompt
});
```

### Atenção

- Esse endpoint precisa estar ativo para que a busca funcione.
- Se quiser usar seu próprio backend, atualize essa URL no arquivo `src/js/index.js`.

## 🔧 Como Personalizar

- Altere o título e subtítulo em `index.html`.
- Atualize texto de exemplo e placeholders no campo de busca.
- Modifique cores, tipografia e animações em `src/css/styles.css`.
- Ajuste o comportamento de busca no `handleSearch()` de `src/js/index.js`.

## 💡 Recomendações de melhoria

- Adicionar suporte para exibir múltiplos filmes em vez de apenas o primeiro resultado.
- Tratar estados de carregamento e erro com mensagens na página em vez de `alert()`.
- Integrar diretamente com TMDB ou outra API de filmes para reduzir dependência de webhook.
- Adicionar validação de campos mais robusta e contagem de caracteres.

## 📌 Observações

- O projeto é estático e não exige ferramentas de build.
- Basta editar os arquivos existentes e recarregar o navegador.
- Ideal para prototipagem rápida de uma interface de recomendação de filmes.
