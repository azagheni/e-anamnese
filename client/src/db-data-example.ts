
export const ANAMNESES: any = [

    {
        id: 1,
        descricao: "Oi, tudo bem? Neste aplicativo faremos algumas perguntas importantes para o seu atendimento com os enfermeiros e médicos. Você responderá clicando algumas respostas ‘sim’, ‘não’ ou ‘não sei’ e também haverá uma escala de dor que vai de 0 a 10. Essa escala tem rostos e cores que você escolherá informando qual o nível de sua dor.",
        video: "1.mp4",
        inicio: 2
    },
    {
        id: 2,
        descricao: "Modelo de Pergunta SIM e NÃO:",
        video: "2.mp4",
        sim: 3,
        nao: 3
    },
    {
        id: 3,
        descricao: "Modelo de Pergunta SIM, NÃO e NÃO SEI:",
        video: "2.mp4",
        sim: 4,
        naosei: 4,
        nao: 4
    },
    {
        id: 4,
        descricao: "Modelo de Pergunta aguardando resposta escrita:",
        video: "4.mp4",
        texto: 5
    },
    {
        id: 5,
        descricao: "Modelo de Pegunta OPÇÕES?",
        video: "5.mp4",
        opcao1: 6,
        opcao1_desc: 'Masculino',
        opcao1_icon: 'male',
        opcao2: 6,
        opcao2_desc: 'Feminino',
        opcao2_icon: 'female',
        opcao3: 6,
        opcao3_desc: 'Opção 3',
        opcao3_icon: 'sign_language',
        opcao4: 6,
        opcao4_desc: 'Opção 4',
        opcao4_icon: 'accessibility'
    },
    {
        id: 6,
        descricao: "Modelo de pergunta com resposta no formato data:",
        video: "6.mp4",
        data: 7
    },
    {
        id: 7,
        descricao: "Modelo de Pergunta com resposta numérica:",
        video: "7.mp4",
        numero: 10
    },
    {
        id: 10,
        descricao: "Modelo de Pergunta com resposta CPF:",
        video: "10.mp4",
        cpf: 13
    },
    {
        id: 13,
        descricao: "Modelo de Pergunta com resposta E-mail:",
        video: "13.mp4",
        email: 14
    },
    {
        id: 14,
        descricao: "Modelo de Pergunta com resposta Telefone:",
        video: "14.mp4",
        telefone: 15
    },
    {
        id: 15,
        descricao: "Modelo de Pergunta com resposta ESCALA:",
        video: "23.mp4",
        escala: 16
    },
    {
        id: 16,
        privado: 1,
        descricao: "Modelo de Pergunta aguardando resposta escrita e PRIVADA AO MÉDICO:",
        video: "4.mp4",
        texto: 99999
    },

    {
        id: 99999,
        descricao: "Registro concluido!",
        video: "99999.mp4",
        fim: 1
    }
];