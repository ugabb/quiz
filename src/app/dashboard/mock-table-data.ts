//TODO: Refatorar a interface e os tableItems

export interface TableItem {
  enviadoEm: string;
  resultadoQuiz: string;
  cliente: string;
  evc: string;
  telefone: string;
  email: string;
  endereco: string;
  complemento: string;
  numero: string;
  bairro: string;
  cep: string;
  ultimoMovimento: string;
  seguro: string;
}

export const tableItems: TableItem[] = [
  {
      enviadoEm: "24/06/2024",
      resultadoQuiz: "8/10",
      cliente: "Gustavo Henrique Eloi Domingues",
      evc: "Escola da Câmara",
      telefone: "(61) 9999-9999",
      email: "evcdashboard@teste.com",
      endereco: "Qn 15 Conjunto 08 Casa 4",
      complemento: "Perto da Igreja",
      numero: "11",
      bairro: "Riacho Fundo 1",
      cep: "71099-422",
      ultimoMovimento: "3 meses",
      seguro: "Sim"
  },
  {
      enviadoEm: "15/05/2024",
      resultadoQuiz: "7/10",
      cliente: "Mariana Silva Santos",
      evc: "Centro Educacional Norte",
      telefone: "(21) 8888-8888",
      email: "marianasilva@teste.com",
      endereco: "Av. Central, Bloco B, Ap. 301",
      complemento: "Ao lado do parque",
      numero: "301",
      bairro: "Centro",
      cep: "20000-000",
      ultimoMovimento: "1 mês",
      seguro: "Não"
  },
  {
      enviadoEm: "10/04/2024",
      resultadoQuiz: "9/10",
      cliente: "João Pedro Oliveira",
      evc: "Universidade Federal",
      telefone: "(11) 7777-7777",
      email: "joaopedro@teste.com",
      endereco: "Rua das Flores, 45",
      complemento: "Próximo ao supermercado",
      numero: "45",
      bairro: "Jardim das Palmeiras",
      cep: "50000-500",
      ultimoMovimento: "6 meses",
      seguro: "Sim"
  },
  {
      enviadoEm: "02/03/2024",
      resultadoQuiz: "6/10",
      cliente: "Ana Clara Souza",
      evc: "Colégio Estadual",
      telefone: "(31) 6666-6666",
      email: "anaclara@teste.com",
      endereco: "Praça das Nações, 120",
      complemento: "Em frente à biblioteca",
      numero: "120",
      bairro: "Bairro Novo",
      cep: "30000-300",
      ultimoMovimento: "2 semanas",
      seguro: "Não"
  },
  {
      enviadoEm: "25/02/2024",
      resultadoQuiz: "10/10",
      cliente: "Carlos Eduardo Almeida",
      evc: "Faculdade Integrada",
      telefone: "(41) 5555-5555",
      email: "carlosalmeida@teste.com",
      endereco: "Rua Principal, 99",
      complemento: "Bloco A, Sala 5",
      numero: "99",
      bairro: "Centro",
      cep: "40000-400",
      ultimoMovimento: "1 ano",
      seguro: "Sim"
  },
  {
      enviadoEm: "20/01/2024",
      resultadoQuiz: "5/10",
      cliente: "Fernanda Lima",
      evc: "Instituto Tecnológico",
      telefone: "(71) 4444-4444",
      email: "fernandalima@teste.com",
      endereco: "Rua dos Pioneiros, 80",
      complemento: "Casa Verde",
      numero: "80",
      bairro: "Vila Nova",
      cep: "70000-700",
      ultimoMovimento: "4 meses",
      seguro: "Não"
  },
  {
      enviadoEm: "30/12/2023",
      resultadoQuiz: "4/10",
      cliente: "Rafael Alves",
      evc: "Escola Politécnica",
      telefone: "(81) 3333-3333",
      email: "rafaelalves@teste.com",
      endereco: "Av. Brasil, 1200",
      complemento: "Prédio Azul",
      numero: "1200",
      bairro: "Liberdade",
      cep: "80000-800",
      ultimoMovimento: "5 meses",
      seguro: "Sim"
  },
  {
      enviadoEm: "05/11/2023",
      resultadoQuiz: "3/10",
      cliente: "Bianca Oliveira",
      evc: "Escola Técnica",
      telefone: "(91) 2222-2222",
      email: "biancaoliveira@teste.com",
      endereco: "Rua das Acácias, 23",
      complemento: "Condomínio Fechado",
      numero: "23",
      bairro: "Bela Vista",
      cep: "90000-900",
      ultimoMovimento: "7 meses",
      seguro: "Não"
  },
  {
      enviadoEm: "15/10/2023",
      resultadoQuiz: "8/10",
      cliente: "Lucas Pereira",
      evc: "Escola Estadual",
      telefone: "(31) 1111-1111",
      email: "lucaspereira@teste.com",
      endereco: "Rua das Orquídeas, 50",
      complemento: "Apto 2",
      numero: "50",
      bairro: "Flores",
      cep: "10000-100",
      ultimoMovimento: "8 meses",
      seguro: "Sim"
  },
  {
      enviadoEm: "25/09/2023",
      resultadoQuiz: "9/10",
      cliente: "Marcos Silva",
      evc: "Colégio Central",
      telefone: "(41) 1010-1010",
      email: "marcossilva@teste.com",
      endereco: "Avenida Principal, 400",
      complemento: "Esquina com Rua B",
      numero: "400",
      bairro: "Jardim América",
      cep: "11000-110",
      ultimoMovimento: "9 meses",
      seguro: "Sim"
  },
  {
      enviadoEm: "01/08/2023",
      resultadoQuiz: "10/10",
      cliente: "Juliana Souza",
      evc: "Escola Nacional",
      telefone: "(61) 9090-9090",
      email: "julianasouza@teste.com",
      endereco: "Rua das Palmeiras, 300",
      complemento: "Próximo ao shopping",
      numero: "300",
      bairro: "Centro",
      cep: "12000-120",
      ultimoMovimento: "10 meses",
      seguro: "Sim"
  },
  {
      enviadoEm: "10/07/2023",
      resultadoQuiz: "7/10",
      cliente: "Renato Alves",
      evc: "Faculdade Metropolitana",
      telefone: "(81) 8080-8080",
      email: "renatoalves@teste.com",
      endereco: "Avenida Rio Branco, 500",
      complemento: "Edifício Central",
      numero: "500",
      bairro: "São José",
      cep: "13000-130",
      ultimoMovimento: "11 meses",
      seguro: "Não"
  },
  {
      enviadoEm: "20/06/2023",
      resultadoQuiz: "6/10",
      cliente: "Patrícia Mendes",
      evc: "Universidade Estadual",
      telefone: "(31) 7070-7070",
      email: "patriciamendes@teste.com",
      endereco: "Rua das Hortênsias, 15",
      complemento: "Bloco B, Sala 2",
      numero: "15",
      bairro: "Nova Lima",
      cep: "14000-140",
      ultimoMovimento: "1 ano",
      seguro: "Sim"
  },
  {
      enviadoEm: "30/05/2023",
      resultadoQuiz: "5/10",
      cliente: "Felipe Cardoso",
      evc: "Colégio Integral",
      telefone: "(21) 6060-6060",
      email: "felipecardoso@teste.com",
      endereco: "Rua dos Cravos, 70",
      complemento: "Próximo ao estádio",
      numero: "70",
      bairro: "São Francisco",
      cep: "15000-150",
      ultimoMovimento: "13 meses",
      seguro: "Não"
  },
  {
      enviadoEm: "05/04/2023",
      resultadoQuiz: "4/10",
      cliente: "Camila Ferreira",
      evc: "Centro Universitário",
      telefone: "(91) 5050-5050",
      email: "camilaferreira@teste.com",
      endereco: "Avenida Paulista, 900",
      complemento: "Torre B",
      numero: "900",
      bairro: "Paulista",
      cep: "16000-160",
      ultimoMovimento: "14 meses",
      seguro: "Sim"
  }
]

