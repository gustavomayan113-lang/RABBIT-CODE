/* ==========================================================================
   RABBIT CODE — 06. DADOS DO PORTFÓLIO
   ==========================================================================
   >>> ESTE É O ÚNICO ARQUIVO QUE VOCÊ EDITA PARA COLOCAR SEUS LINKS. <<<

   COMO ADICIONAR UM PROJETO
   -------------------------
   Copie um bloco de { ... } do array PROJECTS, cole no fim da lista
   e preencha os campos. Só isso — o site se atualiza sozinho.

   CAMPOS
   ------
   title      (obrigatório) Nome do site/projeto.
   url        (obrigatório) Link completo, com https://
category   Categoria usada nos filtros. Existem três:
               "landing" (site de página única) · "loja" (site com catálogo)
               "institucional" (site com várias páginas)
               Se criar uma categoria nova, adicione o botão em CATEGORIES.
   year       Ano de entrega, ex: "2026"
   tagline    Frase curta que aparece no card.
   desc       Descrição de 1-3 linhas (aparece no card).
   tags       Array com até 3 tecnologias.
   accent     Cor de destaque do card: "yellow" | "purple" | "pink" | "blue" | "green"
   feature    true = card grande (use em no máximo 1 projeto)
   sector     Área do negócio, usado na seção de escopo.
   features   Array com 3-4 funcionalidades realmente implementadas no site.
cover      (opcional) Caminho de imagem de capa, ex: "assets/img/covers/site.jpg".
               As 5 capas já vêm prontas em assets/img/covers/.
               Sem esse campo, o site gera uma arte colorida automaticamente.

   DICA: para testar o resultado rápido, troque a url por "#".
   ========================================================================== */

/* ---------------------------------------------------------------- PROJETOS */
const PROJECTS = [
  {
    title: "Corte Relâmpago",
    url: "https://corte-relampago-barbearia.vercel.app/",
    category: "landing",
    year: "2026",
    tagline: "Barbearia premium · São Paulo",
    desc:
      "Site de página única para barbearia premium, com agenda online, cardápio de serviços, galeria de cortes filtrável e avaliações de clientes. Foco total em converter visita em horário marcado.",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "yellow",
    feature: true,
    cover: "assets/img/corterelampago.png",
    sector: "Serviços locais",
    features: [
      "Agenda online com escolha de profissional e horário",
      "Cardápio de serviços com preços e duração",
      "Galeria de cortes com filtro por estilo",
      "Formulário com validação e resumo do pedido"
    ]
  },
  {
    title: "Lumina Odontologia",
    url: "https://clinica-dente.vercel.app/",
    category: "institucional",
    year: "2026",
    tagline: "Clínica odontológica · Alphaville/SP",
    desc:
      "Site institucional de clínica odontológica feito em Django, com página própria para cada tratamento, equipe, depoimentos e formulário validado no servidor. Animações de rolagem com GSAP e SEO local com dados estruturados.",
    tags: ["Django", "Python", "GSAP"],
    accent: "blue",
    cover: "assets/img/covers/clinica.jpg",
    sector: "Saúde",
    features: [
      "Site institucional multipágina: início, tratamentos, equipe e contato",
      "Página de cada um dos 8 tratamentos com preço, duração e o que esperar",
      "Formulário de contato validado no servidor, com resposta em JSON",
      "SEO local com JSON-LD Dentist, Open Graph e páginas 404/500 próprias"
    ]
  },
  {
    title: "magusCar",
    url: "https://masguscar-portfolio.vercel.app/",
    category: "loja",
    year: "2026",
    tagline: "Loja de seminovos · Salvador/BA",
    desc:
      "Site de concessionária com vitrine de veículos, filtro por marca, carroceria e faixa de preço, ordenação dinâmica e ficha técnica em modal. Cada carro abre a ficha completa sem sair da página.",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "purple",
    cover: "assets/img/covers/maguscar.jpg",
    sector: "Automotivo",
    features: [
      "Vitrine com filtros de marca, carroceria e preço",
      "Ordenação por relevância, preço e quilometragem",
      "Ficha técnica em modal com imagem ampliada",
      "Simulação de financiamento e pedido de test drive"
    ]
  },
  {
    title: "Bem Servido",
    url: "https://bem-servido-restaurante.vercel.app/",
    category: "landing",
    year: "2026",
    tagline: "Restaurante & bar · Jardins/SP",
    desc:
      "Site de restaurante com cardápio completo por categoria, sistema de reservas com confirmação automática, galeria e carta de harmonização. Página única pensada para levar o visitante da tela ao telefone.",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "pink",
    cover: "assets/img/covers/restaurante.jpg",
    sector: "Gastronomia",
    features: [
      "Cardápio em 4 categorias com preços e descrição",
      "Reserva com validação de dados e confirmação na tela",
      "Galeria ampliada e carta de harmonização",
      "Como chegar com rota, metrô e estacionamento"
    ]
  },
  {
    title: "Kasa Móveis",
    url: "https://loja-de-moveis-two.vercel.app/#orcamento",
    category: "loja",
    year: "2026",
    tagline: "Móveis, estofados e colchões · Salvador/BA",
    desc:
      "Loja online de móveis com catálogo por categoria, página de produto e orçamento montado direto para o WhatsApp. O cliente escolhe os itens e envia tudo em um clique.",
    tags: ["React", "CSS", "SPA"],
    accent: "green",
    cover: "assets/img/covers/moveis.jpg",
    sector: "Varejo",
    features: [
      "Catálogo de móveis, estofados e colchões",
      "Página de produto com variações e medidas",
      "Orçamento montado e enviado ao WhatsApp",
      "SPA com navegação sem recarregar a página"
    ]
  },
  {
    title: "Mecânica Automotiva",
    url: "https://mecanica-automotiva-port.vercel.app/",
    category: "landing",
    year: "2026",
    tagline: "Oficina mecânica · Confiança e transparência",
    desc:
      "Landing page para oficina mecânica com apresentação dos serviços, diferenciais, formas de contato e botão direto para WhatsApp. Foco em transmitir credibilidade e facilitar o agendamento pelo celular.",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "blue",
    cover: "assets/img/mecanica-capa.png",
    sector: "Automotivo",
    features: [
      "Apresentação dos serviços e diferenciais",
      "Seção de contato com WhatsApp direto",
      "Design responsivo e mobile-first",
      "Call-to-action otimizado para agendamento"
    ]
  },
  {
    title: "Loja Cell",
    url: "https://loja-smartphone.vercel.app/",
    category: "loja",
    year: "2026",
    tagline: "Loja de smartphones · Salvador/BA",
    desc:
      "E-commerce de smartphones com catálogo completo, filtros por marca e faixa de preço, página de produto com especificações técnicas, carrinho de compras e checkout integrado. Design mobile-first otimizado para conversão.",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "purple",
    cover: "assets/img/lojacell-capa.png",
    sector: "Varejo",
    features: [
      "Catálogo de smartphones com filtros por marca e preço",
      "Página de produto com especificações e galeria",
      "Carrinho persistente e checkout simplificado",
      "Integração com WhatsApp para orçamento e suporte"
    ]
  }
];

/* -------------------------------------------------------- CATEGORIAS/FILTROS
   Só entram aqui as categorias que você realmente usa nos projetos.
   Cada botão só aparece se algum projeto tiver o `category` correspondente. */
const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "landing", label: "Landing Pages" },
  { id: "institucional", label: "Institucionais" },
  { id: "loja", label: "Lojas" }
];

/* ------------------------------------------------------------------ MARQUEE */
const MARQUEE_TOP = [
  "Sites de página única",
  "Sites institucionais",
  "Lojas online",
  "Agendamento online",
  "Catálogo com filtros",
  "Formulários validados",
  "Frontend rápido"
];

/* --------------------------------------------------------------- PERFIL/CTA */
const PROFILE = {
  brand: "Rabbit Code",
  role: "Studio de sites & desenvolvimento web",
  email: "contato@rabbitcode.com.br",
  whatsappNumber: "5571993157663",
  whatsappLabel: "(71) 99315-7663",
  city: "Remoto · Brasil",
  hours: "Seg a Sex · 9h às 19h",
  stats: [
    { value: 7, suffix: "", label: "Sites publicados" },
    { value: 100, suffix: "%", label: "Responsivos" },
    { value: 100, suffix: "%", label: "Código próprio" },
    { value: 24, suffix: "h", label: "Prazo de entrega" }
  ]
};

/* ------------------------------------------------------------------- SOCIALS */
const SOCIALS = [
  { id: "whatsapp", label: "WhatsApp", handle: "(71) 99315-7663", url: "https://wa.me/5571993157663" },
  { id: "instagram", label: "Instagram", handle: "@rabbitcode", url: "https://instagram.com/" },
  { id: "github", label: "GitHub", handle: "github.com/rabbitcode", url: "https://github.com/" },
  { id: "linkedin", label: "LinkedIn", handle: "in/rabbitcode", url: "https://linkedin.com/" },
  { id: "email", label: "E-mail", handle: "contato@rabbitcode.com.br", url: "mailto:contato@rabbitcode.com.br" }
];

/* ------------------------------------------------- ESCOPO DE CADA PROJETO
   Funcionalidades realmente implementadas nos sites acima.
   Seções esta aqui porque ainda não há depoimentos de clientes:
   o que existe de verdade é o trabalho entregue, e é isso que se mostra. */
const SCOPES = [
  {
    title: "Corte Relâmpago",
    sector: "Serviços locais",
    category: "landing",
    url: "https://corte-relampago-barbearia.vercel.app/",
    features: [
      "Agenda online com escolha de profissional e horário",
      "Cardápio de serviços com preços e duração",
      "Galeria de cortes com filtro por estilo",
      "Formulário com validação e resumo do pedido"
    ]
  },
  {
    title: "Lumina Odontologia",
    sector: "Saúde",
    category: "institucional",
    url: "https://clinica-dente.vercel.app/",
    features: [
      "Home, tratamentos, equipe e contato em Django",
      "Página de detalhe dos 8 tratamentos",
      "Formulário validado no servidor com resposta em JSON",
      "SEO local com JSON-LD Dentist e OG"
    ]
  },
  {
    title: "magusCar",
    sector: "Automotivo",
    category: "loja",
    url: "https://masguscar-portfolio.vercel.app/",
    features: [
      "Vitrine com filtros de marca, carroceria e preço",
      "Ordenação por relevância, preço e quilometragem",
      "Ficha técnica em modal com imagem ampliada",
      "Simulação de financiamento e test drive"
    ]
  },
  {
    title: "Bem Servido",
    sector: "Gastronomia",
    category: "landing",
    url: "https://bem-servido-restaurante.vercel.app/",
    features: [
      "Cardápio em 4 categorias com preços",
      "Reserva com validação e confirmação na tela",
      "Galeria ampliada e carta de harmonização",
      "Como chegar com rota e estacionamento"
    ]
  },
  {
    title: "Kasa Móveis",
    sector: "Varejo",
    category: "loja",
    url: "https://loja-de-moveis-two.vercel.app/#orcamento",
    features: [
      "Catálogo de móveis, estofados e colchões",
      "Página de produto com variações",
      "Orçamento enviado direto ao WhatsApp",
      "SPA sem recarregar a página"
    ]
  },
  {
    title: "Mecânica Automotiva",
    sector: "Automotivo",
    category: "landing",
    url: "https://mecanica-automotiva-port.vercel.app/",
    features: [
      "Apresentação dos serviços e diferenciais",
      "Contato com WhatsApp direto",
      "Design responsivo e mobile-first",
      "Call-to-action para agendamento"
    ]
  },
  {
    title: "Loja Cell",
    sector: "Varejo",
    category: "loja",
    url: "https://loja-smartphone.vercel.app/",
    features: [
      "Catálogo de smartphones com filtros por marca e preço",
      "Página de produto com especificações e galeria",
      "Carrinho persistente e checkout simplificado",
      "Integração com WhatsApp para orçamento e suporte"
    ]
  }
];

/* -------------------------------------------------------------------- FAQ */
const FAQS = [
  {
    q: "Quanto tempo leva um site?",
    a: "Landing pages de página única ficam prontas em 3 a 5 dias úteis. Sites com catálogo e mais páginas levam de 1 a 2 semanas. Você recebe o prazo fechado antes de começar."
  },
  {
    q: "O site fica pronto para celular?",
    a: "Sim. Todo projeto é desenhado mobile-first e testado em telas de celular, tablet e desktop. Os cinco sites deste portfólio foram construídos assim, desde o primeiro pixel."
  },
  {
    q: "Quais tecnologias você usa?",
    a: "HTML, CSS e JavaScript na maioria dos projetos — é o que garante site rápido e fácil de manter. Para projetos maiores uso React no front-end e Django com Python quando o site precisa de painel, páginas internas ou formulário processado no servidor. Nada de framework pesado sem necessidade."
  },
  {
    q: "Você faz manutenção depois da entrega?",
    a: "Sim. Todo site sai com um período de garantia. Também ofereço planos mensais para atualizações, monitoramento e backups."
  },
  {
    q: "Quanto custa?",
    a: "Depende do escopo. Landing pages têm valor de entrada; lojas e sites com catálogo e páginas investem mais. Você sempre recebe o orçamento fechado antes de começar — sem surpresa no final."
  }
];