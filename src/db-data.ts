
export const ANAMNESES: any = [

    {
        id: 1,
        descricao: "Oi, tudo bem? Neste aplicativo faremos algumas perguntas importantes para o seu atendimento com os enfermeiros e médicos. Você responderá clicando algumas respostas ‘sim’, ‘não’ ou ‘não sei’ e também haverá uma escala de dor que vai de 0 a 10. Essa escala tem rostos e cores que você escolherá informando qual o nível de sua dor.",
        impressao: "Oi, tudo bem? Neste aplicativo faremos algumas perguntas importantes para o seu atendimento com os enfermeiros e médicos. Você responderá clicando algumas respostas ‘sim’, ‘não’ ou ‘não sei’ e também haverá uma escala de dor que vai de 0 a 10. Essa escala tem rostos e cores que você escolherá informando qual o nível de sua dor.",
        video: "1.mp4",
        inicio: 70
    },
    {
        id: 2,
        isNome: 1,
        descricao: "Modelo de informação usado para dividir sessões de perguntas:",
        impressao: "Modelo de informação usado para dividir sessões de perguntas:",
        video: "4.mp4",
        informacao: 20
    },
    {
        id: 20,
        isNome: 1,
        descricao: "Modelo de Pergunta aguardando resposta do nome (MANDATÓRIO):",
        impressao: "Modelo de Pergunta aguardando resposta do nome (MANDATÓRIO):",
        video: "4.mp4",
        texto: 30,
        placeholder: "Digite seu nome completo"
    },
    {
        id: 30,
        descricao: "Modelo de Pergunta aguardando resposta do texto:",
        impressao: "Modelo de Pergunta aguardando resposta do texto:",
        video: "4.mp4",
        texto: 40,
        placeholder: "Digite seu nome texto aqui"
    },
    {
        id: 40,
        descricao: "Modelo de Pergunta SIM e NÃO:",
        impressao: "Modelo de Pergunta SIM e NÃO:",
        video: "2.mp4",
        sim: 50,
        nao: 50
    },
    {
        id: 50,
        descricao: "Modelo de Pergunta SIM, NÃO e NÃO SEI:",
        impressao: "Modelo de Pergunta SIM, NÃO e NÃO SEI:",
        video: "2.mp4",
        sim: 60,
        naosei: 60,
        nao: 60
    },
    {
        id: 60,
        descricao: "Modelo de Pergunta aguardando resposta escrita e com uma opção padrão:",
        impressao: "Modelo de Pergunta aguardando resposta escrita e com uma opção padrão:",
        video: "4.mp4",
        texto: 70,
        opcaoTexto: 70,
        placeholder: "Digite aqui o texto que não segue a resposta padrão",
        opcaoTexto_desc: 'Resposta Padrão'
    },
    {
        id: 70,
        descricao: "Modelo de Pegunta OPÇÕES?",
        impressao: "Modelo de Pegunta OPÇÕES?",
        video: "5.mp4",
        opcao1: 170,
        opcao1_desc: 'Masculino',
        opcao1_icon: 'male',
        opcao2: 170,
        opcao2_desc: 'Feminino',
        opcao2_icon: 'female',
        opcao3: 170,
        opcao3_desc: 'Opção 3',
        opcao3_icon: 'sign_language',
        opcao4: 170,
        opcao4_desc: 'Opção 4',
        opcao4_icon: 'accessibility'
    },
    {
        id: 80,
        descricao: "Modelo de pergunta com resposta no formato data:",
        impressao: "Modelo de pergunta com resposta no formato data:",
        video: "6.mp4",
        data: 90,
        placeholder: "ex: 20/12/2020 (dd/mm/aaaa)"
    },
    {
        id: 90,
        descricao: "Modelo de Pergunta com resposta numérica:",
        impressao: "Modelo de Pergunta com resposta numérica:",
        video: "7.mp4",
        numero: 100,
        placeholder: "ex: 51"
    },
    {
        id: 100,
        descricao: "Modelo de Pergunta com resposta CPF:",
        impressao: "Modelo de Pergunta com resposta CPF:",
        video: "10.mp4",
        cpf: 130,
        placeholder: "ex: 000.000.000-00"
    },
    {
        id: 130,
        descricao: "Modelo de Pergunta com resposta E-mail:",
        impressao: "Modelo de Pergunta com resposta E-mail:",
        video: "13.mp4",
        email: 140,
        placeholder: "ex: exemplo@dominio.com"
    },
    {
        id: 140,
        descricao: "Modelo de Pergunta com resposta Telefone:",
        impressao: "Modelo de Pergunta com resposta Telefone:",
        video: "14.mp4",
        telefone: 150,
        placeholder: "ex: (41)99999-9999"
    },
    {
        id: 150,
        descricao: "Modelo de Pergunta com resposta ESCALA:",
        impressao: "Modelo de Pergunta com resposta ESCALA:",
        video: "23.mp4",
        escala: 160
    },
    {
        id: 160,
        confidencial: 1,
        descricao: "Modelo de Pergunta aguardando resposta escrita e PRIVADA AO MÉDICO:",
        impressao: "Modelo de Pergunta aguardando resposta escrita e PRIVADA AO MÉDICO:",
        video: "4.mp4",
        texto: 170,
        placeholder: "Digite seu texto confidencial aqui"
    },
    {
        id: 170,
        descricao: "Modelo de Pergunta CHECKBOX?",
        impressao: "Modelo de Pegunta CHECKBOX?",
        video: "5.mp4",
        checkbox: 160,
        opcao1_desc: 'Opção 1',
        opcao2_desc: 'Opção 2',
        opcao3_desc: 'Opção 3',
        opcao4_desc: 'Opção 4'
    },
    {
        id: 99999,
        descricao: "Registro concluido!",
        impressao: "Registro concluido!",
        video: "99999.mp4",
        fim: 1
    }
];