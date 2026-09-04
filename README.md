# Landing Page — Escritório de Advocacia Digital (LGPD & Vazamento de Dados)

> Documentação técnica e guia de estudos para manutenção do projeto.
> Este é um site estático (HTML + CSS + JS vanilla, sem build step) servido via Firebase Hosting.

---

## Índice

1. [Visão Geral e Estrutura de Arquivos](#1-visão-geral-e-estrutura-de-arquivos)
2. [Design System e Identidade Visual](#2-design-system-e-identidade-visual)
3. [Arquitetura do CSS](#3-arquitetura-do-css)
4. [Lógica do JavaScript](#4-lógica-do-javascript)
5. [Acessibilidade (A11y) e Semântica](#5-acessibilidade-a11y-e-semântica)
6. [Observações e Pontos de Atenção](#6-observações-e-pontos-de-atenção)
7. [Bugs e erros Fixados em cada versão](#7-bugs-e-erros-fixados-em-cada-versão)

---

## 1. Visão Geral e Estrutura de Arquivos

O site tem um único propósito de negócio: **converter visitantes em leads para um escritório de advocacia especializado em Direito Digital, LGPD e vazamento de dados**. O contato é feito via WhatsApp (não há formulário de envio de dados — decisão consciente de simplicidade e de reduzir superfície de risco com dados pessoais).

### Arquivos na raiz do projeto

```
Advocacia - Copia/
├── index.html                     # Página principal (landing page)
├── style.css                      # Única folha de estilo global (~1760 linhas)
├── script.js                      # Única fonte de JavaScript (vanilla, sem framework)
│
├── vazamento-dados.html           # FAQ — Vazamento de Dados Pessoais
├── seguranca-privacidade.html     # FAQ — Segurança e Privacidade Digital
├── indenizacoes-danos.html        # FAQ — Indenizações e Danos Morais
├── conformidade-lgpd.html         # FAQ — Conformidade com a LGPD
│
├── termos_uso.html                # Página legal (noindex)
├── politica_privacidade.html      # Página legal (noindex)
├── 404.html                       # Página de erro padrão do Firebase
│
├── imagens/                       # SVGs, logos e imagens usadas no site
├── instrucoes/                    # Documentação antiga (FAQ accordion, trust banner)
```

### Objetivo de cada página

| Página | Tipo | Papel no funil |
|---|---|---|
| `index.html` | Landing page | Apresenta o profissional, gera confiança (prova social) e direciona para os serviços (FAQs) e para o WhatsApp |
| `vazamento-dados.html` | FAQ (8 perguntas) | Educa o lead sobre vazamento de dados e seus direitos; responde dúvidas que antecedem a contratação |
| `seguranca-privacidade.html` | FAQ (10 perguntas) | Cobre privacidade digital, crimes digitais e medidas preventivas |
| `indenizacoes-danos.html` | FAQ (9 perguntas) | Explica quando/por quanto é possível indenização por danos digitais |
| `conformidade-lgpd.html` | FAQ (11 perguntas) | Foco B2B: adequação de empresas à LGPD, multas, DPO |
| `termos_uso.html` / `politica_privacidade.html` | Legais | Transparência e compliance (marcadas `noindex` para não competirem por SEO) |

**Por que o funil é assim?** A landing page "aquece" o visitante (quem é, por que confiar), depois os cards de serviço levam a FAQs que resolvem objeções específicas. Cada FAQ termina com um CTA "Entre em Contato Agora" apontando para o `index.html`, fechando o ciclo de conversão. Isso reduz a fricção: o visitante só é direcionado ao WhatsApp depois de ter suas dúvidas respondidas.

### Arquitetura geral (o "porquê" de ser estático)

- **Zero build step**: não há `package.json`, bundler ou transpilador. Isso reduz custo de manutenção e elimina uma camada de ferramentas. O custo é a ausência de modularização/imports — tudo é global.
- **Uma única folha de estilo e um único script**, compartilhados por todas as páginas. Vantagem: consistência visual e um só lugar para corrigir bugs. Desvantagem: acoplamento — uma mudança no `style.css` afeta todas as páginas.
- **Sem framework JS**: o `script.js` usa apenas APIs nativas do navegador (`DOMContentLoaded`, `IntersectionObserver`, `localStorage`, `setInterval`). Isso é apropriado para o porte do site e evita o "peso" de um framework para interações relativamente simples.

---

## 2. Design System e Identidade Visual

### 2.1 Paleta de Cores

A paleta foi construída para transmitir **seriedade jurídica** (tons escuros e sóbrios) combinada com **prestígio e credibilidade** (dourado/ocre). É uma combinação clássica do setor jurídico: azul-marinho transmite autoridade e confiança; o dourado comunica exclusividade e alto valor — uma associação frequente em escritórios de advocacia "premium".

#### Cores primárias (identidade / escuras)

| Cor | HEX | Uso |
|---|---|---|
| Azul-marinho | `#1a2332` | Cor principal. Fundo da barra superior, overlay do hero, CTA final, footer e títulos do FAQ |
| Azul-slate | `#2c3e50` | Fim dos gradientes (junto com `#1a2332`) — cria profundidade |
| Quase-preto azulado | `#0a0e1a` | Fundo do carrossel hero e da faixa de confiança (tons mais profundos) |
| Azul-escuro profundo | `#051326` | Texto de títulos/ícones dos cards de serviço |

> Os gradientes usam sempre a diagonal `135deg`, partindo do tom mais escuro para o mais claro. Isso gera um "movimento" visual sutil e consistente em toda a página.

#### Cor de destaque (accent)

| Cor | HEX | Uso |
|---|---|---|
| Dourado/ocre | `#a78b50` | Cor de destaque principal. Botões CTA, dots ativos, hover de links, ícones da faixa de confiança |
| Dourado claro | `#c9a961` | Variação do gradiente do botão CTA e estado ativo |
| Dourado (hover card) | `#c7a86f` | Hover dos ícones e links dos cards de serviço |
| Dourado mais claro | `#d4b76e` | Estado de hover mais luminoso do CTA |

**Por que o dourado?** Em vez de um vermelho ou laranja "agressivo", o dourado comunica **autoridade, tradição e alto padrão** — exatamente a percepção que um escritório de nicho (direito digital) quer passar a potenciais clientes que lidam com dados sensíveis.

#### Cores de ação específicas

| Cor | HEX | Uso |
|---|---|---|
| Verde WhatsApp | `#25d366` → `#128c7e` | Gradiente do botão "Falar pelo WhatsApp" e do botão "Aceitar" cookies |
| Vermelho | `red` | Botão "Recusar" cookies (contraste intencional) |

#### Neutros e fundos

| Cor | HEX | Uso |
|---|---|---|
| Branco | `#ffffff` | Fundo padrão, cards |
| Off-white | `#fcfcfc` | Fundo da seção de áreas de atuação |
| Cinza-claro | `#f9f9f9`, `#f8f9fa` | Fundo das seções "Sobre" e FAQ |
| Cinza texto | `#666`, `#555`, `#4a4a4a` | Textos secundários/parágrafos |
| Cinza-azulado | `#4a5568`, `#5a6c7d` | Texto das respostas do FAQ |
| Cinza claro | `#cccccc`, `#e0e0e0`, `#777777` | Footer, separadores, textos de baixa ênfase |

### 2.2 Tipografia

As fontes são carregadas via **Google Fonts** (não há `@font-face` local). A escolha segue a mesma lógica de "autoridade + elegância":

| Fonte | Categoria | Papel |
|---|---|---|
| **Playfair Display** | Serifada | Títulos (hero, títulos de seção, FAQ). Transmite tradição e formalidade |
| **Montserrat** | Sans-serif | Subtítulos, títulos de cards e perguntas do FAQ. Moderna e legível em peso bold |
| **Lato** | Sans-serif | Corpo de texto, respostas do FAQ, textos de botões. Alta legibilidade em parágrafos |
| **Open Sans** | Sans-serif | Descrições de cards e subtítulos |
| **Manrope** | Sans-serif | Textos da barra superior (nome e endereço) |

**Lógica de hierarquia tipográfica:**
- **Serifada (Playfair)** para o que deve parecer "sólido e tradicional" — títulos e nome do profissional.
- **Sans-serif (Montserrat/Lato/Open Sans)** para o que deve ser "rápido de ler" — corpo, descrições e botões.
- Essa combinação serifada + sans-serif é um padrão consolidado: a serifada dá personalidade, a sans-serif garante legibilidade.

### 2.3 Espaçamento

O projeto não usa uma escala formal (como "8px grid"), mas segue convenções razoavelmente consistentes:

- **Seções**: `padding` vertical generoso (60–80px em desktop) para dar respiro entre blocos.
- **Cards**: `padding: 35px 25px`, `gap: 30px` entre cards no grid.
- **Espaçamento interno**: múltiplos de 5–10px (`gap: 25px`, `gap: 12px`, `margin-bottom: 15px`).
- **Botões CTA**: padding grande (`16px 42px`, `18px 40px`) para serem alvos de clique confortáveis.

O **conceito central** é: muita área em branco ("white space") transmite sofisticação e reduz a sensação de "site barato/cheio de coisa". É uma escolha deliberada para o nicho jurídico de alto valor.

---

## 3. Arquitetura do CSS

### 3.1 Estrutura geral

O `style.css` é organizado **de cima para baixo seguindo a ordem das seções do HTML**, com comentários `/* ===== SEÇÃO X ===== */` delimitando cada bloco:

1. Reset básico (`* { box-sizing: border-box }`)
2. Wrapper `.colunas` e barra superior (`.content-container-esquerda`)
3. Logo e textos chamativos
4. Hero carousel (slides, overlay, CTA, setas, dots)
5. Faixa de prova social (trust banner)
6. Animações (`@keyframes`)
7. Áreas de atuação (grid de cards)
8. Sobre o profissional
9. CTA final (WhatsApp)
10. Footer
11. Aviso de cookies
12. Páginas legais (`.container-legal`)
13. FAQ accordion
14. Media queries (responsividade)

### 3.2 Sobre variáveis CSS (`:root`) — ponto importante

**Este projeto NÃO utiliza variáveis CSS (`:root { --cor: ... }`).** Os valores de cor (ex.: `#a78b50`, `#1a2332`) são repetidos literalmente ao longo de todo o arquivo.

Isso é uma **limitação real** e não um padrão intencional:

- **Risco**: mudar a cor da marca exige localizar/substituir dezenas de ocorrências manualmente (sujeito a erro).
- **Melhoria recomendada**: extrair a paleta da seção 2.1 para um bloco `:root { --navy: #1a2332; --gold: #a78b50; ... }` e referenciar com `var(--navy)`. Isso tornaria a manutenção e a criação de temas (ex.: dark mode) muito mais simples.

> Se você for dar o próximo passo de manutenção, **consolidar as cores em variáveis CSS é a refatoração de maior impacto** neste arquivo.

### 3.3 Padrão de nomenclatura das classes

O projeto **não segue BEM** estritamente. O padrão usado é **descritivo + `kebab-case`** (palavras separadas por hífen, muitas vezes em português):

```
.content-container-esquerda   .card-item      .faq-question
.content-container-direita     .card-title     .faq-answer
.trust-banner                  .card-description
.trust-container               .card-link
.hero-carousel                 .foto-profissional
.hero-slide                    .btn-whatsapp-cta
```

**Estados e modificadores** são expressos com classes utilitárias simples anexadas ao elemento (não no formato BEM `bloco--modificador`):

- `.active` — slide/dot/item do FAQ ativo
- `.visible` — elemento que já apareceu (após IntersectionObserver)
- `.animate` — dispara a animação de entrada
- `.highlight` — destaque temporário (FAQ via deep link)

**Vantagem**: nomes autoexplicativos, fáceis de localizar no HTML correspondente. **Desvantagem**: sem escopo rígido, o risco de colisão de nomes cresce conforme o site aumenta.

### 3.4 Responsividade — Flexbox, Grid e Media Queries

#### Flexbox (layout unidimensional)

Usado na maior parte da página para alinhamento horizontal/vertical:

- `.colunas` e `.content-container-esquerda` — `display: flex` para a barra superior.
- `.textos-chamativos` — flex para alinhar nome/descrição/endereço lado a lado.
- `.trust-container` — flex `space-around` para distribuir os 4 itens de confiança.
- `.card-item`, `.container-cta`, `.rodape-minimalista`, `.aviso-cookies` — flex para organizar conteúdo interno.

#### CSS Grid (layout bidimensional)

Usado onde há um padrão de "grade" explícito:

- **`.cards-grid`** — `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`. Essa é a técnica de **grid responsivo automático**: o navegador calcula sozinho quantas colunas cabem (4 no desktop, 2 no tablet, 1 no mobile) sem precisar de media query específica para cada quantidade de colunas.
- **`.container-sobre`** — `grid-template-columns: 1fr 1.5fr` (foto menor, texto maior), colapsado para `1fr` no mobile.
- **`.trust-container`** (mobile) — vira `grid-template-columns: repeat(2, 1fr)` para empilhar 2×2.

#### Media Queries (breakpoints)

O projeto usa **`max-width`** (mobile-first implícito), com quatro pontos de quebra:

| Breakpoint | Alvo |
|---|---|
| `@media (max-width: 1024px)` | Tablet — reduz tamanhos, hero para `70vh`, grid de cards mais estreito |
| `@media (max-width: 768px)` | Mobile — colunas empilham, trust banner vira 2×2, cards viram 1 coluna |
| `@media (max-width: 480px)` | Mobile pequeno — CTA ocupa 100% de largura |
| `@media (max-width: 400px)` | Mobile muito pequeno — ajustes finos de fontes e paddings |

**Estratégia**: em vez de reescrever tudo em cada breakpoint, cada query **ajusta apenas o que muda** (tamanhos de fonte, padding, alturas). O layout estrutural (flex/grid) é definido uma única vez fora das queries.

---

## 4. Lógica do JavaScript

Todo o comportamento está em `script.js`, em **JavaScript puro**, organizado em blocos independentes, cada um aguardando o evento `DOMContentLoaded` (que dispara quando o HTML está totalmente carregado).

> Padrão importante: cada bloco **verifica se o elemento existe** antes de agir (`if (!carousel) return;`, `if (!faqSection) return;`). Isso permite que o mesmo `script.js` seja incluído em todas as páginas sem quebrar — numa página sem carrossel, o bloco do carrossel simplesmente não faz nada.

### 4.1 Accordion do FAQ

**Objetivo:** mostrar apenas uma resposta por vez, com animação suave, e permitir abertura via link direto (`#faq-3`).

A estrutura no HTML é:

```html
<div class="faq-item" id="faq-1">
  <button type="button" class="faq-question" aria-expanded="false" aria-controls="faq-1-answer">
    Pergunta?
  </button>
  <div class="faq-answer" id="faq-1-answer">
    <div class="faq-answer-content">...</div>
  </div>
</div>
```

**Passo a passo do funcionamento:**

1. **Seleção** — o script pega todos os `.faq-item`, `.faq-question` e `.faq-answer` dentro da `#faq-section`.
2. **Clique na pergunta** — para cada `.faq-question`, um listener de `click`:
   - Identifica o `.faq-item` pai (via `this.parentElement`) e a `.faq-answer` correspondente.
   - Verifica se o item já está aberto (`classList.contains("active")`).
3. **Fecha os demais** — itera por todos os itens e remove `.active` e redefine `maxHeight = null` nos outros (comportamento "um aberto por vez"). Também atualiza `aria-expanded = "false"` nos outros botões.
4. **Alterna o item clicado**:
   - Se **estava aberto**: remove `.active`, zera o `maxHeight` e define `aria-expanded = "false"`.
   - Se **estava fechado**: adiciona `.active`, define `maxHeight = scrollHeight + "px"` e `aria-expanded = "true"`.

**Por que `maxHeight` e não `height` ou `display:none`?**
A resposta tem `max-height: 0; overflow: hidden;` por padrão. Para animar a abertura, o JS define o `max-height` para a altura real do conteúdo (`scrollHeight`), permitindo uma transição CSS suave de `0` até o tamanho total. Usar `display:none` **não** permitiria animação (não há transição entre `none` e `block`).

5. **Animações de entrada** — dois `IntersectionObserver`:
   - Um observa o `.faq-header` (título) e adiciona `.visible` quando entra na viewport.
   - Outro observa a `#faq-section` e, ao entrar, adiciona `.animate` em cada `.faq-item` com **atraso em cascata** (`index * 100ms`), criando o efeito "um item aparecendo após o outro".

6. **Deep linking** — se a URL tiver um hash começando com `#faq-` (ex.: `conformidade-lgpd.html#faq-5`):
   - Localiza o item com aquele `id`.
   - Após 500ms, abre o item (adiciona `.active`, define `maxHeight`, `aria-expanded="true"`).
   - Rola suavemente até ele (`scrollIntoView({ behavior: "smooth" })`).
   - Adiciona `.highlight` por 1,5s (fundo dourado translúcido piscando) para chamar a atenção.

### 4.2 Carrossel (Hero)

**Objetivo:** rotacionar 3 slides automaticamente, permitir navegação manual por setas/dots, e pausar quando o usuário interage.

**Estado interno (variáveis no topo do script):**

```js
let indiceSlideHero = 0;        // slide atual
let temporizadorHero = null;    // referência do setInterval
let intervaloAutoplayHero = 5000; // 5 segundos
```

**Passo a passo:**

1. **Mostrar slide** — `mostrarSlideHero(indice)` remove `.active` de todos os `.hero-slide` e `.hero-dot`, e adiciona `.active` apenas no slide/dot do índice informado. O CSS então faz o fade (`.hero-slide` tem `opacity: 0` → `.active` tem `opacity: 1`).

2. **Autoplay** — `iniciarAutoplayHero()` cria um `setInterval` que chama `mudarSlideHero(1)` a cada 5 segundos (avança para o próximo slide).

3. **Pausa no hover** — dois listeners no carrossel:
   - `mouseenter` → `pausarAutoplayHero()` (limpa o `setInterval` via `clearInterval`).
   - `mouseleave` → `iniciarAutoplayHero()` (retoma).

4. **Navegação manual (setas)** — `mudarSlideHero(direcao)`:
   - Pausa o autoplay.
   - Incrementa/decrementa o índice com **wrap-around** (se passar do último, volta ao 0; se for antes do 0, vai ao último).
   - Mostra o slide e reinicia o autoplay após 2 segundos (`reiniciarAutoplayHero`).

5. **Navegação manual (dots)** — `irParaSlideHero(indice)` pula direto para um slide específico (mesmo princípio: pausa → mostra → reinicia).

6. **Teclado nos dots** — um listener de `keydown` em cada `.hero-dot`:
   - Se a tecla for `Enter` ou `" "` (espaço), chama `irParaSlideHero(index)`.
   - `event.preventDefault()` evita que o espaço role a página.

> Detalhe de UX: `reiniciarAutoplayHero` adiciona um `setTimeout` de 2s antes de retomar, para que o usuário tenha tempo de navegar entre slides sem que o autoplay "brigue" com ele.

### 4.3 Persistência do banner de Cookies (`localStorage`)

**Objetivo:** atender à LGPD — carregar o Google Analytics **apenas após consentimento**, e lembrar a decisão do usuário entre visitas.

**Passo a passo:**

1. **Estado inicial** — o banner (`#aviso-cookies`) fica visível por padrão. Ao carregar, o script lê `localStorage.getItem("cookiesAceitos")`:
   - Se já existe uma decisão (`sim` ou `nao`), esconde o banner.
   - Se `null` (nunca decidiu), mostra o banner.

2. **Aceitar** — ao clicar em "Aceitar":
   - Grava `localStorage.setItem("cookiesAceitos", "sim")`.
   - Esconde o banner.
   - Chama `carregarAnalytics()` — que injeta dinamicamente o `<script>` do Google Tag Manager e dispara o `gtag('config', ...)`.

3. **Recusar** — ao clicar em "Recusar":
   - Grava `localStorage.setItem("cookiesAceitos", "nao")`.
   - Esconde o banner. O Analytics **não** é carregado.

4. **Visita futura** — no `<head>` do `index.html`, há um bloco que verifica imediatamente: se `cookiesAceitos === "sim"`, carrega o Analytics direto (sem mostrar o banner de novo).

**Por que `localStorage` e não `sessionStorage` ou cookie?** `localStorage` persiste indefinidamente (até ser limpo), então a escolha do usuário é lembrada em visitas futuras — requisito básico para um banner de consentimento útil. O valor armazenado é apenas a string `"sim"`/`"nao"` (não contém dado pessoal sensível).

> Ponto de atenção de privacidade: o consentimento controla apenas o Google Analytics. As **fontes do Google** (Google Fonts) são carregadas incondicionalmente via `<link>` no `<head>`, o que, tecnicamente, envia o IP do visitante ao Google antes de qualquer consentimento. Se compliance estrito for necessário, considere hospedar as fontes localmente (self-host).

---

## 5. Acessibilidade (A11y) e Semântica

O HTML aplica várias boas práticas de acessibilidade. Aqui está o que existe e **por que cada técnica importa**:

### 5.1 FAQ Accordion (o exemplo mais completo)

```html
<button type="button" class="faq-question"
        aria-expanded="false"
        aria-controls="faq-1-answer">
  Pergunta?
</button>
<div class="faq-answer" id="faq-1-answer">...</div>
```

- **`type="button"`** — sem isso, um `<button>` dentro de um `<form>` seria interpretado como `submit` e recarregaria a página. Aqui é defensivo (não há form, mas é boa prática).
- **`aria-expanded`** — informa ao leitor de tela se a resposta está aberta (`true`) ou fechada (`false`). O `script.js` mantém esse atributo **sincronizado** a cada clique.
- **`aria-controls`** — liga semanticamente o botão ao elemento que ele controla (referenciando o `id` da resposta). Leitores de tela podem navegar diretamente entre os dois.
- **Usar `<button>` real (não `<div>`/`<span>` clicável)** — elementos `<button>` são **focalizáveis por teclado e acionáveis por Enter/Espaço nativamente**, sem JavaScript extra.

### 5.2 Carrossel (Hero)

- **Setas são `<button>` com `aria-label`** — `aria-label="Slide Anterior"` / `"Próximo Slide"` dão um nome acessível aos botões, já que o conteúdo interno é apenas um ícone SVG (que é "escondido" do leitor de tela — ver abaixo).
- **Dots de paginação** — são `<span>` (não `<button>`), mas recebem os três atributos que os tornam acessíveis:
  - `tabindex="0"` → permite receber foco via teclado (Tab).
  - `role="button"` → informa ao leitor de tela que é um controle clicável.
  - `aria-label="Ir para slide X"` → dá nome acessível.
  - O `keydown` (Enter/Espaço) no `script.js` completa a interação por teclado.
- **`svg aria-hidden="true"`** em todos os ícones decorativos — informa ao leitor de tela para **ignorar** o SVG (que não tem significado textual), evitando "ruído" na leitura.

### 5.3 Semântica estrutural

- **`lang="pt-BR"`** no `<html>` — permite que leitores de tela usem a pronúncia correta.
- **Hierarquia de headings** — `h1` (título principal/FAQ) → `h2` (subtítulos de seção) → `h3` (títulos de cards). Estrutura lógica que ajuda navegação por teclado e leitores de tela.
- **`alt` descritivo nas imagens** — ex.: `alt="Dr. Weslley Dias - Especialista em Direito Digital e Proteção de Dados"`.
- **`<section>` com `id`** para cada bloco — permite âncoras (`#cta-final`, `#faq-1`) e dá estrutura de documento.

### 5.4 O que **falta** (oportunidades de melhoria em A11y)

Para deixar o site plenamente acessível, considere:

1. **`aria-current="true"` no dot ativo** do carrossel — indicaria ao leitor de tela qual slide está visível.
2. **`aria-live="polite"`** na região do carrossel — anunciaria as mudanças de slide automaticamente.
3. **`aria-hidden`/`inert` nos slides inativos** — hoje os slides não-ativos ficam invisíveis via CSS (`opacity: 0` + `pointer-events: none`), mas **continuam no DOM e focalizáveis**. Links neles ainda são alcançáveis por Tab, o que confunde usuários de teclado.
4. **Respeitar `prefers-reduced-motion`** — o carrossel tem autoplay e várias animações; usuários com sensibilidade a movimento deveriam poder desativá-las.

---

## 6. Observações e Pontos de Atenção

Esta seção registra achados importantes para manutenção futura (não são bugs que travam o site, mas valem atenção):

1. **Não há variáveis CSS (`:root`)** — cores hardcoded. Refatoração recomendada (ver seção 3.2).
2. **Nomenclatura descritiva (não BEM)** — consistente, mas sem escopo rígido.
3. **Dados de placeholder** — há valores fictícios que precisam ser substituídos antes de produção real: `OAB/SP 000.000`, endereço "Rua Que não existe, 123", telefone no `wa.me`, e domínio `seusite.com.br` nas meta tags Open Graph e no JSON-LD.
4. **Âncoras possivelmente órfãs** — o rodapé do `index.html` tem `<a href="#social">` (sem elemento `id="social"`), e os CTAs das páginas FAQ apontam para `index.html#contato` (sem `id="contato"`). Vale revisar se essas âncoras deveriam apontar para `#cta-final`.
5. **Fontes não carregam nas páginas internas** — as páginas FAQ/legais usam as mesmas fontes (Playfair/Montserrat/Lato), mas não incluem o `<link>` do Google Fonts nem o `preconnect` (apenas o `index.html` faz isso). Em produção, o fallback `serif`/`sans-serif` será usado nessas páginas.
6. **Tag `<link rel="stylesheet" />` vazia** — presente no `<head>` das 4 páginas FAQ; é markup residual inválido e deve ser removido.
7. **`.logo { font-family: mont; }`** no CSS — `mont` não é uma família válida (provável typo de "Montserrat").
8. **Imagem `imagens/dr-weslley.jpg`** — referenciada no `index.html`, mas não presente na pasta `imagens/` (verificar se falta o arquivo).
9. **Arquivos órfãos em `imagens/`** — há SVGs de um projeto anterior (restaurante "Terreiro do Vovô") que não são usados: `almoco_b.svg`, `delivery_b.svg`, `festas_b.svg`, `whatsapp_b.svg`, além de `ia_1..9.png`, `banner_ia.png`, `botao*`.
10. **`README` anterior desatualizado** — substituído por este documento.

---

## Resumo rápido para novos mantenedores

| O que | Onde | Como funciona |
|---|---|---|
| Estilo global | `style.css` | CSS puro, organizado por seção, sem variáveis, sem BEM |
| Comportamento | `script.js` | JS vanilla, blocos independentes, cada um com guard `if (!el) return` |
| Landing page | `index.html` | Hero carrossel → prova social → serviços → sobre → CTA WhatsApp |
| FAQs | `*.html` (4 arquivos) | Accordion acessível (`aria-expanded`/`aria-controls`) + deep link `#faq-X` |
| Consentimento | `localStorage.cookiesAceitos` | `"sim"` carrega Analytics; `"nao"` não carrega |
| Responsividade | media queries | Breakpoints em 1024 / 768 / 480 / 400 px |
| Deploy | Firebase Hosting | `firebase.json` na raiz |

### Bugs e erros Fixados em cada versão

Esta seção registra a correção dos pontos de atenção do item 6 organizados por versão.

1.1. **Bug Fix: Variáveis CSS (`:root`) para cores e opacidades**
* **Problema:** O arquivo `style.css` possuía dezenas de cores (hexadecimais e `rgba`) "hardcoded" pelo código, dificultando a manutenção e tornando qualquer mudança de paleta arriscada.
* **Correção:** Centralização de toda a paleta em um bloco `:root`. Foram criadas variáveis semânticas para cores sólidas (ex: `--color-gold`) e para canais RGB (ex: `--color-gold-rgb`). Todas as ocorrências no CSS foram substituídas pelo uso de `var()` e `rgba(var(...), opacidade)`.
* **Por que importa:** A manutenção visual agora é centralizada, rápida e segura. Alterar qualquer cor do tema (mesmo com transparência) exige edição em um único lugar, eliminando o risco de erros por substituição manual.


1.2. **Bug Fix: Media Queries — Migração de Desktop-First (`max-width`) para Mobile-First (`min-width`)**
* **Problema:** O CSS usava estratégia Desktop-First com `max-width`, onde a base representava o layout desktop e as media queries "desfaziam" propriedades conforme a tela encolhia — arquitetura frágil, difícil de manter e com ordem de sobrescrita contra-intuitiva.
* **Correção:** Inversão completa para Mobile-First com `min-width` (400px → 480px → 768px → 1024px). A base agora representa o menor viewport (mobile), e cada breakpoint adiciona complexidade progressivamente. Blocos críticos como `.trust-container` (grid→flex), `.mini-texto/.titulo-endereco` (display:none→block) e `.container-sobre` (1fr→1fr 1.5fr) foram tratados com atenção especial à troca de display types.
* **Por que importa:** Mobile-First é o padrão moderno recomendado pelo Google (mobile-first indexing) e reduz o payload de CSS processado em dispositivos móveis. A manutenção fica mais simples porque cada breakpoint só adiciona, nunca remove — o fluxo mental é linear e previsível. O resultado visual é pixel-identical ao original em todos os breakpoints.


1.2.1. **Bug Fix: Ajustes de layout e tipografia nas páginas internas (mobile)**
* **Problema:** Dois problemas distintos afetavam a experiência mobile nas páginas FAQ/legais: (1) a logo no cabeçalho forçava 120px de altura sem limite de largura, gerando uma imagem de ~400px que estourava a tela e permitia "zoom out" indesejado com faixas brancas; (2) título, perguntas e respostas usavam tamanhos de fonte idênticos aos do tablet (ex: título a 2.8rem), ocupando espaço excessivo e prejudicando a legibilidade em telas pequenas.
* **Correção:** Para o overflow horizontal, foi adicionado `max-width` à logo (280px) e reduzida sua altura base para 80px no mobile, mantendo a proporção original de ~3.33:1, além de incluir globalmente `overflow-x: hidden` e `max-width: 100%` nas tags `html`, `body`. Para a tipografia, foi feita uma redução progressiva nas fontes base (mobile) das classes `.faq-title` (-21%), `.faq-question` (-9%) e `.faq-answer-content` (-8%), com ajustes correspondentes na media query de 768px para manter a harmonia visual.
* **Por que importa:** O conjunto resolve dois problemas de usabilidade mobile que comprometiam a apresentação profissional do escritório: elimina rolagens horizontais indesejadas e "zoom out" com faixas brancas, ao mesmo tempo que entrega uma hierarquia tipográfica mais equilibrada e confortável para leitura em dispositivos móveis, sem "trombadas" visuais.

1.2.2 **Bug Fix: Acessibilidade do Carrossel (foco, ARIA live, reduced motion)**
* **Problema:** Leitores de tela não conseguiam interpretar corretamente quais elementos do carrossel estavam visíveis/ativos, usuários podiam tabar acidentalmente em links invisíveis, e as animações disparavam mesmo quando o usuário configurava seu dispositivo para reduzi-las.
* **Correção:** Atributos `aria-hidden` e `inert` foram atrelados ao estado ativo do slide para gerir visibilidade de leitores de tela e focos da tecla Tab; adicionamos `aria-live` ao container e `aria-current` aos paginadores (dots); e integramos uma media query no CSS e API `matchMedia` no script para prevenir autoplay e bloquear transições visuais se `prefers-reduced-motion` for detectado.
* **Por que importa:** Impede que o usuário cego se perca num mar de conteúdo oculto e evita enjoo/desconforto para pessoas com distúrbios vestibulares, melhorando drasticamente a navegação equitativa da página.

1.2.3 **Bug Fix: Remoção da dependência do Google Fonts e otimização do carregamento**
* **Problema:** O site dependia de requisições externas ao Google Fonts CDN (via `@import`/`<link>`) para carregar as fontes Playfair Display, Montserrat, Lato, Open Sans e Manrope, introduzindo latência e dependência de rede, além de violar a escolha do cliente por não utilizar dependências externas.
* **Correção:** Todas as 5 famílias de fontes foram migradas do Google Fonts CDN para `@font-face` local (arquivos `.ttf` servidos na pasta `fonts/`, com `font-display: swap`). Nenhuma fonte foi removida ou substituída — a mudança foi apenas na **forma de carregamento** (local vs. externo), mantendo Playfair Display, Montserrat, Lato, Open Sans e Manrope em uso ativo.
* **Por que importa:** Elimina latência de rede e dependência de servidor externo, fortalece a privacidade e autonomia do site, e garante consistência visual em qualquer conexão, em conformidade com a escolha do cliente por não utilizar APIs de terceiros.


* 1.2.4 **Bug Fix: FAQPage JSON-LD preenchido (SEO estruturado)**
* **Problema:** As 4 páginas de FAQ declaravam um bloco `FAQPage` no JSON-LD com o array `"mainEntity": []` vazio — marcavam a página como FAQ sem listar nenhuma pergunta/resposta, tornando a marcação de dados estruturados inútil para o Google.
* **Correção:** Extraí as perguntas e respostas reais de cada `.faq-item` (via `.faq-question` e `.faq-answer-content`) e preenchi o `mainEntity` de cada página com objetos `Question`/`Answer` no formato schema.org, preservando o texto exato do conteúdo visível.
* **Por que importa:** Com `mainEntity` preenchido, as páginas ficam elegíveis para **rich results de FAQ** na busca do Google, o que pode renderizar as perguntas diretamente na SERP, aumentando a visibilidade e a taxa de cliques. Uma marcação `FAQPage` vazia era ignorada (ou pior, podia ser interpretada como erro de implementação), então isso transforma dados mortos em valor real de SEO.
