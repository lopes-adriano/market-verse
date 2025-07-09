import { getPayload } from "payload";
import config from "@payload-config";

const categories = [
  {
    name: "Todos",
    slug: "all",
  },
  {
    name: "Negócios & Dinheiro",
    color: "#4CAF50",
    slug: "negocios-dinheiro",
    subcategories: [
      { name: "Contabilidade", slug: "contabilidade" },
      { name: "Empreendedorismo", slug: "empreendedorismo" },
      { name: "Bicos & Projetos Paralelos", slug: "bicos-projetos-paralelos" },
      { name: "Investimentos", slug: "investimentos" },
      { name: "Gestão & Liderança", slug: "gestao-lideranca" },
      { name: "Marketing & Vendas", slug: "marketing-vendas" },
      {
        name: "Networking, Carreiras & Empregos",
        slug: "networking-carreiras-empregos",
      },
      { name: "Finanças Pessoais", slug: "financas-pessoais" },
      { name: "Imóveis", slug: "imoveis" },
    ],
  },
  {
    name: "Desenvolvimento de Software",
    color: "#2196F3",
    slug: "desenvolvimento-de-software",
    subcategories: [
      { name: "Desenvolvimento Web", slug: "desenvolvimento-web" },
      { name: "Desenvolvimento Mobile", slug: "desenvolvimento-mobile" },
      { name: "Desenvolvimento de Jogos", slug: "desenvolvimento-de-jogos" },
      { name: "Linguagens de Programação", slug: "linguagens-de-programacao" },
      { name: "DevOps", slug: "devops" },
    ],
  },
  {
    name: "Escrita & Publicação",
    color: "#9C27B0",
    slug: "escrita-publicacao",
    subcategories: [
      { name: "Ficção", slug: "ficcao" },
      { name: "Não-Ficção", slug: "nao-ficcao" },
      { name: "Blogging", slug: "blogging" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Autopublicação", slug: "autopublicacao" },
    ],
  },
  {
    name: "Outros",
    slug: "outros",
  },
  {
    name: "Educação",
    color: "#FFC107",
    slug: "educacao",
    subcategories: [
      { name: "Cursos Online", slug: "cursos-online" },
      { name: "Tutoria", slug: "tutoria" },
      { name: "Preparação para Testes", slug: "preparacao-para-testes" },
      { name: "Aprendizagem de Idiomas", slug: "aprendizagem-de-idiomas" },
    ],
  },
  {
    name: "Autodesenvolvimento",
    color: "#8BC34A",
    slug: "autodesenvolvimento",
    subcategories: [
      { name: "Produtividade", slug: "produtividade" },
      { name: "Desenvolvimento Pessoal", slug: "desenvolvimento-pessoal" },
      { name: "Mindfulness", slug: "mindfulness" },
      { name: "Crescimento na Carreira", slug: "crescimento-na-carreira" },
    ],
  },
  {
    name: "Fitness & Saúde",
    color: "#F44336",
    slug: "fitness-saude",
    subcategories: [
      { name: "Planos de Treino", slug: "planos-de-treino" },
      { name: "Nutrição", slug: "nutricao" },
      { name: "Saúde Mental", slug: "saude-mental" },
      { name: "Yoga", slug: "yoga" },
    ],
  },
  {
    name: "Design",
    color: "#673AB7",
    slug: "design",
    subcategories: [
      { name: "UI/UX", slug: "ui-ux" },
      { name: "Design Gráfico", slug: "design-grafico" },
      { name: "Modelagem 3D", slug: "modelagem-3d" },
      { name: "Tipografia", slug: "tipografia" },
    ],
  },
  {
    name: "Desenho & Pintura",
    color: "#FF9800",
    slug: "desenho-pintura",
    subcategories: [
      { name: "Aquarela", slug: "aquarela" },
      { name: "Acrílica", slug: "acrilica" },
      { name: "Óleo", slug: "oleo" },
      { name: "Pastel", slug: "pastel" },
      { name: "Carvão", slug: "carvao" },
    ],
  },
  {
    name: "Música",
    color: "#FFEB3B",
    slug: "musica",
    subcategories: [
      { name: "Composição", slug: "composicao" },
      { name: "Produção Musical", slug: "producao-musical" },
      { name: "Teoria Musical", slug: "teoria-musical" },
      { name: "História da Música", slug: "historia-da-musica" },
    ],
  },
  {
    name: "Fotografia",
    color: "#E91E63",
    slug: "fotografia",
    subcategories: [
      { name: "Retrato", slug: "retrato" },
      { name: "Paisagem", slug: "paisagem" },
      { name: "Fotografia de Rua", slug: "fotografia-de-rua" },
      { name: "Natureza", slug: "natureza" },
      { name: "Macro", slug: "macro" },
    ],
  },
];

async function seed() {
  const payload = await getPayload({ config });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parentCategory: null,
      },
    });

    for (const subcategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subcategory.name,
          slug: subcategory.slug,
          parentCategory: parentCategory.id,
        },
      });
    }
  }
}

await seed();
process.exit(0);
