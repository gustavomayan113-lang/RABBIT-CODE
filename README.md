# Rabbit Code — Portfólio

Site de portfólio da **Rabbit Code**. HTML, CSS e JavaScript puros, sem build, sem dependências e sem banco de dados.

Paleta: **amarelo** `#FFD60A` · **preto** `#0B0B0F` · **roxo** `#A855F7` · **branco** `#FAFAFF`.

---

## Como abrir

Abra o `index.html` no navegador. Só isso — não precisa instalar nada.

Para publicar: envie a pasta inteira para qualquer hospedagem estática
(Netlify, Vercel, GitHub Pages, Hostinger, cPanel…). Como não há build, o site funciona em qualquer lugar.

Para testar localmente com um servidor (opcional):

```
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

---

## Onde colocar os links dos seus sites

**Tudo o que é conteúdo está em um único arquivo:**

```
assets/js/06-data.js
```

Dentro dele, o array `PROJECTS` é a lista de projetos do portfólio. Para adicionar um site,
copie um bloco, cole no fim do array e preencha:

```js
{
  title: "Nome do Meu Site",
  url: "https://www.meusite.com.br",   // ← o link que abre ao clicar
  category: "landing",                  // landing (página única) | loja (com catálogo)
  year: "2026",
  tagline: "Frase curta que aparece no card.",
  desc: "Descrição de 1 a 3 linhas do que foi feito no projeto.",
  tags: ["HTML", "CSS", "JavaScript"],
  accent: "yellow",                     // yellow | purple | pink | blue | green
  feature: false                        // true = card grande (no máximo 1 projeto)
}
```

O site se atualiza sozinho: cards, filtros, numeração e animações são gerados a partir desse array.

**O card inteiro é o link.** Não é preciso clicar em "abrir site" — clicar em qualquer parte do card
(na imagem, no título, na descrição, no rodapé) abre o site em nova aba. O card é um `<a>` com
`target="_blank"`, então o `Escopo` de teclado (Tab + Enter) funciona igual ao mouse.

### Campos opcionais

| Campo | O que faz |
|---|---|
| `features` | Array de 3-4 funcionalidades realmente implementadas. Aparece na seção "Escopo". |
| `sector` | Área do negócio, ex: `"Gastronomia"`. Aparece na seção "Escopo". |
| `challenge` / `solution` / `result` | Textos da página de detalhes do projeto. |
| `cover` | Caminho de imagem de capa, ex: `"assets/img/barbearia.jpg"`. Sem esse campo o site cria uma arte colorida automaticamente. |
| `feature` | `true` gera um card largo em destaque. |

### Categorias

Existem duas: `landing` (site de página única, foco em conversão) e `loja` (site com catálogo e filtros).

**O filtro só aparece se algum projeto usar aquela categoria** — o site nunca mostra uma aba vazia.
Se criar uma categoria nova, adicione o botão em `CATEGORIES`.

### Outros blocos do mesmo arquivo

| Variável | Serve para |
|---|---|
| `CATEGORIES` | Rótulos dos filtros. Ajuste se mudar as `category`. |
| `MARQUEE_TOP` | Frases da faixa amarela que rola no topo. |
| `PROFILE` | E-mail, WhatsApp, cidade, horário e os números de `stats`. |
| `SOCIALS` | Links de WhatsApp, Instagram, GitHub, LinkedIn, etc. |
| `SCOPES` | Funcionalidades mostradas na seção "Escopo". |
| `FAQS` | Perguntas frequentes. |

---

## Projetos publicados

| Projeto | Categoria | Setor | Capa |
|---|---|---|---|
| Corte Relâmpago | landing | Serviços locais | `assets/img/covers/barbearia.jpg` |
| magusCar | loja | Automotivo | `assets/img/covers/maguscar.jpg` |
| Bem Servido | landing | Gastronomia | `assets/img/covers/restaurante.jpg` |
| Kasa Móveis | loja | Varejo | `assets/img/covers/moveis.jpg` |

As capas são capturas reais de cada site em 1440×900, convertidas para JPEG (77 a 135 KB cada).
Se um site mudar de visual, basta substituir o arquivo mantendo o nome.

---

## Estrutura de pastas

```
portifolio-MAIN/
├── index.html                     página principal
│
├── templates/                     templates de página
│   ├── projeto.html               página de detalhes de um projeto (?id=0, ?id=1…)
│   └── 404.html                   página de erro
│
├── statics/                       arquivos estáticos servidos como estão
    ├── logo.svg
    ├── favicon.svg
    ├── og-cover.svg               imagem de compartilhamento (WhatsApp/LinkedIn)
    ├── manifest.webmanifest
    └── robots.txt
│
├── assets/
    ├── css/
    │   ├── 01-tokens.css          cores, tipografia, espaçamentos, reset
    │   ├── 02-base.css            tipografia utilitária, layout, efeitos de fundo
    │   ├── 03-components.css      botões, cards, navegação, marquee, preloader
    │   ├── 04-sections.css        cada seção da página
    │   └── 05-responsive.css      regras de celular, tablet e desktop
    ├── js/
    │   ├── 06-data.js             ← EDITE AQUI: projetos, links e textos
    │   ├── 07-main.js             interações da página principal
    │   └── 08-projeto.js          renderização da página de projeto
    └── img/
        └── covers/                 capturas de tela dos sites do portfólio
```

---

## Identidade visual

| | |
|---|---|
| Amarelo | `#FFD60A` (claro `#FFE566`, escuro `#F0A800`) |
| Roxo | `#A855F7` (escuro `#7C3AED`, profundo `#4C1D95`) |
| Preto | `#0B0B0F` (superfícies `#12121A` e `#1A1A24`) |
| Branco | `#FAFAFF` |

Todas as cores estão declaradas como variáveis no topo de `assets/css/01-tokens.css`.
Para mudar a identidade, edite aquele bloco — o site inteiro acompanha.

Tipografia: **Space Grotesk** (títulos e texto) e **JetBrains Mono** (código e rótulos),
carregadas pelo Google Fonts.

---

## Detalhes técnicos

**Responsivo.** Layout mobile-first. Breakpoints em 1080px, 900px, 720px, 480px e 380px.
Tipografia e espaçamentos usam `clamp()`, então escalam continuamente em vez de pular de tamanho.
Testado de 320px a 1920px sem rolagem horizontal e com alvos de toque de 40px ou mais no celular.

**Acessibilidade.** Navegação por teclado com `:focus-visible`, `aria-label` nos controles,
`aria-pressed` nos filtros, `aria-expanded` no menu e no FAQ, e respeito a `prefers-reduced-motion` —
quem desativar movimento no sistema vê tudo estático e instantâneo.

**Desempenho.** Sem framework e sem jQuery. O cursor customizado e o spotlight só são
iniciados em dispositivos com mouse fino; em telas de toque eles nem são carregados.
Os SVGs de ícones são inline, o ruído de fundo é um `data-uri` e as fontes usam `preconnect`.

**Estrutura para SEO.** Uma única `<h1>`, headings em ordem, `meta description`,
Open Graph e Twitter Card para o compartilhamento no WhatsApp e redes sociais.

---

## Publicando

1. Edite `assets/js/06-data.js` com seus links.
2. Troque o e-mail, se quiser, no mesmo arquivo (`PROFILE.email`).
3. Atualize a URL em `https://rabbitcode.com.br/` nas tags `canonical` e `og:url`.
4. Envie a pasta.

Se for usar Netlify ou Vercel: public directory = `.`, comando de build = nenhum.

**WhatsApp:** o número `(71) 99315-7663` aparece em 5 lugares (menu mobile, card de contato,
CTA, rodapé e redes sociais). Todos apontam para `https://wa.me/5571993157663` — com DDI 55 e
55 à frente. Para trocar, altere no `index.html` e no bloco `SOCIALS` do `06-data.js`.