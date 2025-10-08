
export const ANAMNESES: any = [

    {
        id: 1,
        descricao: "Oi, tudo bem? Neste aplicativo faremos algumas perguntas importantes para o seu atendimento com os enfermeiros e médicos. Você responderá clicando algumas respostas ‘sim’, ‘não’ ou ‘não sei’ e também haverá uma escala de dor que vai de 0 a 10. Essa escala tem rostos e cores que você escolherá informando qual o nível de sua dor.",
        impressao: "Oi, tudo bem? Neste aplicativo faremos algumas perguntas importantes para o seu atendimento com os enfermeiros e médicos. Você responderá clicando algumas respostas ‘sim’, ‘não’ ou ‘não sei’ e também haverá uma escala de dor que vai de 0 a 10. Essa escala tem rostos e cores que você escolherá informando qual o nível de sua dor.",
        video: "1.mp4",
        inicio: 2
    },
	{
        id: 2,
        descricao: "Você veio acompanhado?",
        impressao: "Veio Acompanhado?",
        video: "1.mp4",
        sim: 3,
        nao: 4
    },
    {
        id: 3,
        descricao: "Qual o nome do acompanhante?:",
        impressao: "Nome do acompanhante:",
        video: "1.mp4",
        texto: 11
    },
	{
        id: 11,
        descricao: "Qual o telefone do acompanhante?:",
        impressao: "Telefone do acompanhante:",
        video: "14.mp4",
        telefone: 4
    },
    {
        id: 4,
        isNome: 1,
        descricao: "Qual o seu nome?",
        impressao: "Nome:",
        video: "4.mp4",
        texto: 5
    },
    {
        id: 5,
        descricao: "Você possui nome social?",
        impressao: "Possui nome social:",
        video: "2.mp4",
        sim: 6,
        nao: 7
    },
    {
        id: 6,
        descricao: "Qual o seu nome social?",
        impressao: "Nome social:",
        video: "4.mp4",
        texto: 7
    },
    {
        id: 7,
        descricao: "Modelo de Pergunta com resposta CPF:",
        impressao: "Modelo de Pergunta com resposta CPF:",
        video: "10.mp4",
        cpf: 8
    },
    {
        id: 8,
        descricao: "Qual o seu sexo?",
        impressao: "Sexo:",
        video: "5.mp4",
        opcao1: 9,
        opcao1_desc: 'Masculino',
        opcao1_icon: 'male',
        opcao2: 9,
        opcao2_desc: 'Feminino',
        opcao2_icon: 'female',
    },
    {
        id: 9,
        descricao: "Qual a sua idade?",
        impressao: "Idade:",
        video: "7.mp4",
        numero: 10
    },
    {
        id: 10,
        descricao: "Qual a sua data de nascimento?",
        impressao: "Nascimento:",
        video: "6.mp4",
        data: 12
    },
    {
        id: 12,
        descricao: "Qual o seu endereço? Informar rua, cidade e CEP:",
        impressao: "Endereço:",
        video: "4.mp4",
        texto: 13
    },
    {
        id: 13,
        descricao: "Qual o seu E-mail?",
        impressao: "E-mail:",
        video: "13.mp4",
        email: 14
    },
    {
        id: 14,
        descricao: "Qual o seu celular?",
        impressao: "Celular:",
        video: "14.mp4",
        telefone: 15
    },
    {
        id: 15,
        descricao: "Qual recursos você tem com o celular?",
        impressao: "Recursos:",
        video: "5.mp4",
        checkbox: 16,
        opcao1_desc: 'Whatsapp',
        opcao2_desc: 'Telegram',
        opcao3_desc: 'Signal'
    },
    {
        id: 16,
        descricao: "Qual o seu estado civil?",
        impressao: "Estado Civil:",
        video: "5.mp4",
        opcao1: 17,
        opcao1_desc: 'Solteiro(a)',
        opcao2: 17,
        opcao2_desc: 'Casado(a)',
        opcao3: 17,
        opcao3_desc: 'Separado(a)',
        opcao4: 17,
        opcao4_desc: 'Viuvo(a)',
    },
    {
        id: 17,
        descricao: "Mora com?",
        impressao: "Mora com:",
        video: "5.mp4",
        opcao1: 18,
        opcao1_desc: 'Sozinho(a)',
        opcao2: 18,
        opcao2_desc: 'Pareceiro(a)',
        opcao3: 18,
        opcao3_desc: 'Família',
    },
    {
        id: 18,
        descricao: "Qual a sua profissão?",
        impressao: "Profissão:",
        video: "4.mp4",
        texto: 19,
        opcaoTexto: 19,
        opcaoTexto_desc: 'Desempregado'
    },
    {
        id: 19,
        descricao: "Qual o nome da sua mãe?",
        impressao: "Mãe:",
        video: "4.mp4",
        texto: 20,
        opcaoTexto: 20,
        opcaoTexto_desc: 'Desconhecida'
    },
    {
        id: 20,
        descricao: "Qual o nome do seu pai?",
        impressao: "Pai:",
        video: "4.mp4",
        texto: 100,
        opcaoTexto: 100,
        opcaoTexto_desc: 'Desconhecido'
    },
    {
        id: 100,
        descricao: "Está com febre?",
        impressao: "Febre:",
        video: "2.mp4",
        sim: 101,
        nao: 110
    },
    {
        id: 101,
        descricao: "Quando iniciou?",
        impressao: "iniciou:",
        video: "4.mp4",
        texto: 102
    },
    {
        id: 102,
        descricao: "Tomou remédio?",
        impressao: "tomou remédio para febre:",
        video: "2.mp4",
        sim: 103,
        nao: 110
    },
    {
        id: 103,
        descricao: "Qual remédio?",
        impressao: "Remédios para febre:",
        video: "4.mp4",
        texto: 110
    },
    {
        id: 110,
        descricao: "Está com dor de garganta?",
        impressao: "Dor de garganta:",
        video: "2.mp4",
        sim: 111,
        nao: 120
    },
    {
        id: 111,
        descricao: "Qual o grau da sua dor:",
        impressao: "Grau da dor de garganta:",
        video: "23.mp4",
        escala: 120
    },
    {
        id: 120,
        descricao: "Está com diarreia?",
        impressao: "Dor de garganta:",
        video: "2.mp4",
        sim: 121,
        nao: 130
    },
    {
        id: 121,
        descricao: "Quando iniciou?",
        impressao: "iniciou:",
        video: "4.mp4",
        texto: 122
    },
    {
        id: 122,
        descricao: "Tomou remédio?",
        impressao: "tomou remédio para diarreia:",
        video: "2.mp4",
        sim: 123,
        nao: 130
    },
    {
        id: 123,
        descricao: "Qual remédio?",
        impressao: "Remédios para diarreia:",
        video: "4.mp4",
        texto: 130
    },
    {
        id: 130,
        descricao: "Está com vômito?",
        impressao: "Vômito:",
        video: "2.mp4",
        sim: 131,
        nao: 140
    },
    {
        id: 131,
        descricao: "Quando iniciou?",
        impressao: "iniciou:",
        video: "4.mp4",
        texto: 132
    },
    {
        id: 132,
        descricao: "Tomou remédio?",
        impressao: "tomou remédio para vômito:",
        video: "2.mp4",
        sim: 133,
        nao: 140
    },
    {
        id: 133,
        descricao: "Qual remédio?",
        impressao: "Remédios para vômito:",
        video: "4.mp4",
        texto: 140
    },
    {
        id: 140,
        descricao: "Está com otite (dor no ouvido)?",
        impressao: "Otite:",
        video: "2.mp4",
        sim: 141,
        nao: 150
    },
    {
        id: 141,
        descricao: "Qual o grau da sua dor:",
        impressao: "Grau da dor otite:",
        video: "23.mp4",
        escala: 150
    },
    {
        id: 150,
        descricao: "Está com cefaleia (dor de cabeça)?",
        impressao: "Cefaleia:",
        video: "2.mp4",
        sim: 151,
        nao: 160
    },
    {
        id: 151,
        descricao: "Qual o grau da sua dor:",
        impressao: "Grau da dor cefaleia:",
        video: "23.mp4",
        escala: 160
    },
    {
        id: 160,
        descricao: "Está com dor torácica (dor dno peito)?",
        impressao: "Dor torácica:",
        video: "2.mp4",
        sim: 161,
        nao: 170
    },
    {
        id: 161,
        descricao: "Qual o grau da sua dor:",
        impressao: "Grau da dor torácica:",
        video: "23.mp4",
        escala: 170
    },
    {
        id: 170,
        descricao: "Está com dor lombar?",
        impressao: "Dor lombar:",
        video: "2.mp4",
        sim: 171,
        nao: 180
    },
    {
        id: 171,
        descricao: "Qual o grau da sua dor:",
        impressao: "Grau da dor lombar:",
        video: "23.mp4",
        escala: 180
    },
    {
        id: 180,
        descricao: "Está com tosse?",
        impressao: "Tosse:",
        video: "2.mp4",
        sim: 181,
        nao: 190
    },
{
        id: 181,
        descricao: "Quando iniciou?",
        impressao: "iniciou:",
        video: "4.mp4",
        texto: 182
    },
    {
        id: 182,
        descricao: "Tomou remédio?",
        impressao: "tomou remédio para tosse:",
        video: "2.mp4",
        sim: 183,
        nao: 190
    },
    {
        id: 183,
        descricao: "Qual remédio?",
        impressao: "Remédios para tosse:",
        video: "4.mp4",
        texto: 190
    },
    {
        id: 190,
        descricao: "Está com Disúria (ardência, queimação ou desconforto ao urinar)?",
        impressao: "Disúria:",
        video: "2.mp4",
        sim: 191,
        nao: 500
    },
    {
        id: 191,
        descricao: "Qual o grau da sua dor:",
        impressao: "Grau da dor disúria:",
        video: "23.mp4",
        escala: 500
    },
    {
        id: 500,
        descricao: "Possui algum distúrbio gastrointestinal?",
        impressao: "Distúrbio gastrointestinal:",
        video: "23.mp4",
        sim: 510,
        naosei: 510,
        nao: 510
    },
    {
        id: 510,
        descricao: "Possui marcapasso?",
        impressao: "Marcapasso:",
        video: "23.mp4",
        sim: 520,
        naosei: 520,
        nao: 520
    },
    {
        id: 520,
        descricao: "Possui antecendente oncológico (câncer)?",
        impressao: "Antecendente oncológico:",
        video: "23.mp4",
        sim: 530,
        naosei: 530,
        nao: 530
    },
    {
        id: 530,
        descricao: "Possui hipertensão?",
        impressao: "Hipertensão:",
        video: "23.mp4",
        sim: 531,
        naosei: 540,
        nao: 540
    },
    {
        id: 531,
        descricao: "Toma medicamento para hipertensão?",
        impressao: "Usa medicamentos para hipertensão:",
        video: "2.mp4",
        sim: 532,
        nao: 540
    },
    {
        id: 532,
        descricao: "Qual medicamento?",
        impressao: "Medicamentos para hipertensão:",
        video: "4.mp4",
        texto: 540
    },
    {
        id: 540,
        descricao: "Fez algum procedimento cirúrgico?",
        impressao: "Realizou procedimentos cirúrgicos:",
        video: "23.mp4",
        sim: 541,
        nao: 550
    },
    {
        id: 541,
        descricao: "Quais procedimentos cirúrgicos?",
        impressao: "Procedimentos cirúrgicos:",
        video: "4.mp4",
        texto: 550
    },
    {
        id: 550,
        descricao: "Tem Asma?",
        impressao: "Asma:",
        video: "23.mp4",
        sim: 551,
        naosei: 560,
        nao: 560
    },
    {
        id: 551,
        descricao: "Toma medicamento para a asma?",
        impressao: "Usa medicamentos para asma:",
        video: "2.mp4",
        sim: 552,
        nao: 560
    },
    {
        id: 552,
        descricao: "Qual medicamento?",
        impressao: "Medicamentos para asma:",
        video: "4.mp4",
        texto: 560
    },
    {
        id: 560,
        descricao: "Tem crise epilética?",
        impressao: "Crise epilética:",
        video: "23.mp4",
        sim: 561,
        naosei: 580,
        nao: 580
    },
    {
        id: 561,
        descricao: "Toma medicamento para a crise epilética?",
        impressao: "Usa medicamentos para a crise epilética:",
        video: "2.mp4",
        sim: 562,
        nao: 580
    },
    {
        id: 562,
        descricao: "Qual medicamento?",
        impressao: "Medicamentos para a crise epilética:",
        video: "4.mp4",
        texto: 580
    },
    {
        id: 580,
        descricao: "Tem diabetes?",
        impressao: "Diabetes:",
        video: "23.mp4",
        sim: 581,
        naosei: 99999,
        nao: 99999
    },
    {
        id: 581,
        descricao: "Toma medicamento para diabetes?",
        impressao: "Usa medicamentos para diabetes:",
        video: "2.mp4",
        sim: 582,
        nao: 99999
    },
    {
        id: 582,
        descricao: "Qual medicamento?",
        impressao: "Medicamentos para diabetes:",
        video: "4.mp4",
        texto: 99999
    },
    {
        id: 99999,
        descricao: "Registro concluido!",
        impressao: "Registro concluido!",
        video: "99999.mp4",
        fim: 1
    }
];