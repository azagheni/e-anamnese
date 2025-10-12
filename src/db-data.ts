
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
        impressao: "Acompanhado:",
        video: "1.mp4",
        sim: 3,
        nao: 100
    },
    {
        id: 3,
        descricao: "Qual o nome do acompanhante?:",
        impressao: "Nome do acompanhante:",
        video: "1.mp4",
        texto: 4
    },
    {
        id: 4,
        descricao: "Seu acompanhante é surdo?:",
        impressao: "acompanhante surdo:",
        video: "1.mp4",
        sim: 8,
        nao: 5
    },
    {
        id: 5,
        descricao: "Seu acompanhante é Tradutor Intérprete de Línguas de Sinais?:",
        impressao: "acompanhante TILS:",
        video: "1.mp4",
        sim: 8,
        nao: 8
    },
    {
        id: 8,
        descricao: "Você autoriza acompanhar sua consulta?:",
        impressao: "Autoriza acompanhante:",
        video: "1.mp4",
        sim: 100,
        nao: 100
    },
    {
        id: 100,
        isNome: 1,
        descricao: "Qual o seu nome completo?",
        impressao: "Nome:",
        video: "4.mp4",
        texto: 101
    },
    {
        id: 101,
        descricao: "Você possui nome social?",
        impressao: "Possui nome social:",
        video: "2.mp4",
        sim: 102,
        nao: 103
    },
    {
        id: 102,
        descricao: "Qual o seu nome social?",
        impressao: "Nome social:",
        video: "4.mp4",
        texto: 103
    },
    {
        id: 103,
        descricao: "Qual o seu CPF:",
        impressao: "CPF:",
        video: "10.mp4",
        cpf: 104
    },
    {
        id: 104,
        descricao: "Qual a sua idade?",
        impressao: "Idade:",
        video: "7.mp4",
        numero: 105
    },
    {
        id: 105,
        descricao: "Qual a sua data de nascimento?",
        impressao: "Nascimento:",
        video: "6.mp4",
        data: 110
    },
    {
        id: 110,
        descricao: "Qual o seu sexo?",
        impressao: "Sexo:",
        video: "5.mp4",
        opcao1: 120,
        opcao1_desc: 'Masculino',
        opcao1_icon: 'male',
        opcao2: 120,
        opcao2_desc: 'Feminino',
        opcao2_icon: 'female',
    },
    {
        id: 120,
        descricao: "Qual o seu endereço? (rua, número, cidade e CEP)",
        impressao: "Endereço:",
        video: "4.mp4",
        texto: 130
    },
    {
        id: 130,
        descricao: "Qual o seu celular?",
        impressao: "Celular:",
        video: "14.mp4",
        telefone: 131
    },
    {
        id: 131,
        descricao: "Qual recursos você tem com o celular?",
        impressao: "Recursos:",
        video: "5.mp4",
        checkbox: 140,
        opcao1_icon: 'whatsapp',
        opcao1_desc: 'Whatsapp',
        opcao2_icon: 'telegram',
        opcao2_desc: 'Telegram',
        opcao3_icon: 'sign_language',
        opcao3_desc: 'Signal'
    },
    {
        id: 140,
        descricao: "Qual o seu E-mail?",
        impressao: "E-mail:",
        video: "13.mp4",
        email: 150
    },
    {
        id: 150,
        descricao: "Qual a sua profissão?",
        impressao: "Profissão:",
        video: "4.mp4",
        texto: 160,
        opcaoTexto: 160,
        opcaoTexto_desc: 'Desempregado'
    },
    {
        id: 170,
        descricao: "Qual o nome da sua mãe?",
        impressao: "Mãe:",
        video: "4.mp4",
        texto: 170,
        opcaoTexto: 170,
        opcaoTexto_desc: 'Desconhecida'
    },
    {
        id: 170,
        descricao: "Qual o seu estado civil?",
        impressao: "Estado Civil:",
        video: "5.mp4",
        opcao1: 180,
        opcao1_desc: 'Solteiro(a)',
        opcao2: 171,
        opcao2_desc: 'Casado(a)',
        opcao3: 180,
        opcao3_desc: 'Separado(a)',
        opcao4: 180,
        opcao4_desc: 'Divorciado(a)',
        opcao5: 180,
        opcao5_desc: 'Viúvo(a)',
    },
    {
        id: 171,
        descricao: "Qual o nome do conjuge?",
        impressao: "Conjugue:",
        video: "4.mp4",
        texto: 180
    },
	{
        id: 180,
        descricao: "Possui convênio médico?",
        impressao: "Possui convênio médico:",
        video: "1.mp4",
        sim: 181,
        nao: 182
    },
    {
        id: 181,
        descricao: "Qual o convênio médico?:",
        impressao: "Convênio Médico:",
        video: "1.mp4",
        texto: 186
    },
    {
        id: 182,
        descricao: "Qual a forma de pagamento?",
        impressao: "Forma de Pagamento:",
        video: "5.mp4",
        opcao1: 185,
        opcao1_desc: 'Pix / Transferência',
        opcao1_icon: 'pix',
        opcao2: 185,
        opcao2_desc: 'Cartão de crédito',
        opcao2_icon: 'credit_card',
        opcao3: 185,
        opcao3_desc: 'Cartão de débito',
        opcao3_icon: 'credit_card',
        opcao4: 185,
        opcao4_desc: 'Dinheiro',
        opcao4_icon: 'money'
    },
    {
        id: 185,
        descricao: "Precisa de nota fiscal?",
        impressao: "Solicitou nota fiscal:",
        video: "2.mp4",
        sim: 186,
        nao: 186
    },
    {
        id: 186,
        descricao: "Precisa de atestado médico?",
        impressao: "Solicitou Atestado:",
        video: "2.mp4",
        sim: 500,
        nao: 500
    },
    {
        id: 500,
        confidencial: 1,
        descricao: "Você veio para ter uma segunda opinião médica?",
        impressao: "Segunda opinião médica:",
        video: "2.mp4",
        sim: 501,
        nao: 501
    },
    {
        id: 501,
        confidencial: 1,
        descricao: "Outro médico indicou ou solicitou ir à um Oftalmologista?",
        impressao: "Solicitação de outro médico:",
        video: "2.mp4",
        sim: 510,
        nao: 510
    },
    {
        id: 510,
        confidencial: 1,
        descricao: "Seus olhos estão vermelhos?",
        impressao: "Olhos vermelhos:",
        video: "2.mp4",
        sim: 511,
        nao: 511
    },
    {
        id: 511,
        confidencial: 1,
        descricao: "Está com dor de cabeça?",
        impressao: "Dor de cabeça:",
        video: "2.mp4",
        sim: 512,
        nao: 512
    },
    {
        id: 512,
        confidencial: 1,
        descricao: "Tem coceira nos olhos?",
        impressao: "Coceira nos olhos:",
        video: "2.mp4",
        sim: 520,
        nao: 520
    },
    {
        id: 520,
        confidencial: 1,
        descricao: "Houve diminuição da acuidade visual?",
        impressao: "Diminuição da acuidade visual:",
        video: "2.mp4",
        sim: 521,
        nao: 523
    },
    {
        id: 521,
        confidencial: 1,
        descricao: "Necessita usar óculos?",
        impressao: "Necessita usar óculos?",
        video: "2.mp4",
        sim: 523,
        nao: 523
    },
    {
        id: 523,
        confidencial: 1,
        descricao: "Necessita trocar os óculos ou lente de contato?",
        impressao: "Necessita trocar os óculos ou lente de contato:",
        video: "2.mp4",
        sim: 530,
        nao: 530
    },
    {
        id: 530,
        confidencial: 1,
        descricao: "Os sintomas de queixa são?",
        impressao: "sintomas de queixa:",
        video: "5.mp4",
        opcao1: 531,
        opcao1_desc: 'Unilateral',
        opcao2: 531,
        opcao2_desc: 'Bilateral',
    },
    {
        id: 531,
        confidencial: 1,
        descricao: "Quando os sintomas começaram?",
        impressao: "Início dos sintomas:",
        video: "5.mp4",
        opcao1: 532,
        opcao1_desc: 'Menos de uma semana',
        opcao2: 532,
        opcao2_desc: 'Mais de uma semana',
        opcao3: 532,
        opcao3_desc: 'Menos de um mês',
        opcao4: 532,
        opcao4_desc: 'Mais de um mês',
        opcao5: 532,
        opcao5_desc: 'Não lembro',
    },
    {
        id: 532,
        confidencial: 1,
        descricao: "Fez algum tratamento ou algo para amenizar os sintomas?",
        impressao: "Fez tratamento:",
        video: "2.mp4",
        sim: 533,
        nao: 534
    },
    {
        id: 533,
        confidencial: 1,
        descricao: "Qual o tratamento realizado?:",
        impressao: "Tratamento:",
        video: "1.mp4",
        texto: 534
    },
    {
        id: 534,
        confidencial: 1,
        descricao: "O que pode ter precipitado ou antecipado os sintomas?",
        impressao: "Causa dos sintomas:",
        video: "4.mp4",
        texto: 535,
        opcaoTexto: 535,
        opcaoTexto_desc: 'Não sei',
        opcaoTexto_icon: 'question_mark'
    },
    {
        id: 535,
        confidencial: 1,
        descricao: "Os sintomas estão piorando com o tempo?",
        impressao: "Sintomas piorando?",
        video: "5.mp4",
        opcao1: 540,
        opcao1_desc: 'Sim',
        opcao1_icon: 'check',
        opcao2: 540,
        opcao2_desc: 'Não',
        opcao2_icon: 'close',
        opcao3: 540,
        opcao3_desc: 'Não percebi',
        opcao3_icon: 'question_mark'
    },
    {
        id: 540,
        confidencial: 1,
        descricao: "Houve alguma contusão que possa ter afetado a visão?",
        impressao: "Houve trauma:",
        video: "2.mp4",
        sim: 541,
        nao: 550
    },
    {
        id: 541,
        confidencial: 1,
        descricao: "O trauma foi causado por uma bolada?",
        impressao: "Trauma por bolada:",
        video: "2.mp4",
        sim: 542,
        nao: 542
    },
    {
        id: 542,
        confidencial: 1,
        descricao: "O trauma foi causado por uma agressão?",
        impressao: "Trauma por agressão:",
        video: "2.mp4",
        sim: 543,
        nao: 550
    },
    {
        id: 543,
        confidencial: 1,
        descricao: "A agressão foi pérfuro-cortante?",
        impressao: "Agressão pérfuro-cortante:",
        video: "2.mp4",
        sim: 550,
        nao: 550
    },
    {
        id: 550,
        confidencial: 1,
        descricao: "Sente dor ou desconforto ocular?",
        impressao: "Dor ou desconforto ocular:",
        video: "2.mp4",
        sim: 551,
        nao: 551
    },
    {
        id: 551,
        confidencial: 1,
        descricao: "Tem sensação de corpo estranho?",
        impressao: "Sensação de corpo estranho:",
        video: "2.mp4",
        sim: 552,
        nao: 552
    },
    {
        id: 552,
        confidencial: 1,
        descricao: "A secreção é purulenta?",
        impressao: "Secreção Purulenta:",
        video: "5.mp4",
        sim: 553,
        nao: 553
    },
    {
        id: 553,
        confidencial: 1,
        descricao: "A secreção é mucupurulenta?",
        impressao: "Secreção Mucupurulenta:",
        video: "5.mp4",
        sim: 554,
        nao: 554
    },
    {
        id: 554,
        confidencial: 1,
        descricao: "A secreção é mucosa?",
        impressao: "Secreção Mucosa:",
        video: "5.mp4",
        sim: 555,
        nao: 555
    },
    {
        id: 555,
        confidencial: 1,
        descricao: "A secreção é aquosa?",
        impressao: "Secreção Aquosa:",
        video: "5.mp4",
        sim: 556,
        nao: 556
    },
    {
        id: 556,
        confidencial: 1,
        descricao: "Possui queimação ou ardência?",
        impressao: "Queimação ou ardência:",
        video: "2.mp4",
        sim: 557,
        nao: 557
    },
    {
        id: 557,
        confidencial: 1,
        descricao: "Possui ressecamento ocular?",
        impressao: "Ressecamento ocular:",
        video: "2.mp4",
        sim: 558,
        nao: 558
    },
    {
        id: 558,
        confidencial: 1,
        descricao: "Possui lacrimejamento?",
        impressao: "Lacrimejamento:",
        video: "2.mp4",
        sim: 560,
        nao: 560
    },
    {
        id: 560,
        confidencial: 1,
        descricao: "Tem cegueira?",
        impressao: "Cegueira:",
        video: "2.mp4",
        sim: 562,
        nao: 562
    },
    {
        id: 562,
        confidencial: 1,
        descricao: "Tem alteração na forma e no tamanho da imagem?",
        impressao: "Alteração na forma e no tamanho da imagem:",
        video: "2.mp4",
        sim: 563,
        nao: 563
    },
    {
        id: 563,
        confidencial: 1,
        descricao: "Vê manchas ou moscas volantes?",
        impressao: "Manchas ou moscas volantes:",
        video: "2.mp4",
        sim: 564,
        nao: 564
    },
    {
        id: 564,
        confidencial: 1,
        descricao: "Vê flashes de luzes?",
        impressao: "Flashes de luzes:",
        video: "2.mp4",
        sim: 565,
        nao: 565
    },
    {
        id: 565,
        confidencial: 1,
        descricao: "Tem alteração da visão das cores?",
        impressao: "Alteração da visão das cores:",
        video: "2.mp4",
        sim: 566,
        nao: 566
    },
    {
        id: 566,
        confidencial: 1,
        descricao: "Tem alteração da visão à noite?",
        impressao: "Alteração da visão à noite:",
        video: "2.mp4",
        sim: 567,
        nao: 567
    },
    {
        id: 567,
        confidencial: 1,
        descricao: "Tem visão dupla?",
        impressao: "Visão dupla:",
        video: "2.mp4",
        sim: 568,
        nao: 568
    },
    {
        id: 568,
        confidencial: 1,
        descricao: "Tem estrabismo?",
        impressao: "Estrabismo:",
        video: "2.mp4",
        sim: 569,
        nao: 569
    },
    {
        id: 569,
        confidencial: 1,
        descricao: "Tem visão monocular?",
        impressao: "Visão monocular:",
        video: "2.mp4",
        sim: 570,
        nao: 570
    },
    {
        id: 570,
        confidencial: 1,
        descricao: "Tem diminuição da visão periférica?",
        impressao: "Diminuição da visão periférica:",
        video: "2.mp4",
        sim: 580,
        nao: 580
    },
    {
        id: 580,
        descricao: "A sua visão está borrada?",
        impressao: "Visão borrada:",
        video: "5.mp4",
        opcao1: 581,
        opcao1_desc: 'Visão borrada para longe',
        opcao1_icon: 'looks_one',
        opcao2: 581,
        opcao2_desc: 'Visão borrada para perto',
        opcao2_icon: 'looks_two',
        opcao3: 581,
        opcao3_desc: 'Borrada para perto e longe',
        opcao3_icon: 'looks_3',
        opcao4: 581,
        opcao4_desc: 'Não está borrada',
        opcao4_icon: 'close'
    },
    {
        id: 581,
        confidencial: 1,
        descricao: "Quando os sintomas começaram?",
        impressao: "Início dos sintomas:",
        video: "5.mp4",
        opcao1: 582,
        opcao1_desc: 'Menos de uma semana',
        opcao2: 582,
        opcao2_desc: 'Mais de uma semana',
        opcao3: 582,
        opcao3_desc: 'Menos de um mês',
        opcao4: 582,
        opcao4_desc: 'Mais de um mês',
        opcao5: 582,
        opcao5_desc: 'Não lembro',
    },
    {
        id: 582,
        confidencial: 1,
        descricao: "Já usa óculos?",
        impressao: "Uso de óculos:",
        video: "2.mp4",
        sim: 583,
        nao: 590
    },
    {
        id: 583,
        confidencial: 1,
        descricao: "Trouxe seus óculos?",
        impressao: "Trouxe os óculos:",
        video: "2.mp4",
        sim: 590,
        nao: 590
    },
    {
        id: 590,
        confidencial: 1,
        descricao: "Com relação a aparência, suas pálpebras estão caídas?",
        impressao: "Queda de pálpebra:",
        video: "2.mp4",
        sim: 592,
        nao: 592
    },
    {
        id: 592,
        confidencial: 1,
        descricao: "O globo ocular está se projetando para fora?",
        impressao: "Protrusão do olho:",
        video: "2.mp4",
        sim: 593,
        nao: 593
    },
    {
        id: 593,
        confidencial: 1,
        descricao: "O globo ocular está se projetando para dentro?",
        impressao: "Intrusão do olho:",
        video: "2.mp4",
        sim: 594,
        nao: 594
    },
    {
        id: 594,
        confidencial: 1,
        descricao: "O globo ocular apresenta vermelhidão?",
        impressao: "Vermelhidão:",
        video: "2.mp4",
        sim: 595,
        nao: 595
    },
    {
        id: 595,
        confidencial: 1,
        descricao: "O globo ocular apresenta perda de transparência?",
        impressao: "Opacidades:",
        video: "2.mp4",
        sim: 596,
        nao: 596
    },
    {
        id: 596,
        confidencial: 1,
        descricao: "O globo ocular apresenta alguma massa ou caroço?",
        impressao: "Massas hordéolo:",
        video: "2.mp4",
        sim: 1000,
        nao: 1000
    },
    {
        id: 1000,
        confidencial: 1,
        descricao: "Você tem histórico de câncer?",
        impressao: "Histórico de câncer:",
        video: "2.mp4",
        sim: 1001,
        nao: 1010
    },
    {
        id: 1001,
        confidencial: 1,
        descricao: "Em qual região?",
        impressao: "Qual sítio:",
        video: "4.mp4",
        texto: 1002
    },
    {
        id: 1002,
        confidencial: 1,
        descricao: "Qual foi o tratamento?",
        impressao: "Qual tratamento:",
        video: "4.mp4",
        texto: 1003
    },
    {
        id: 1003,
        confidencial: 1,
        descricao: "Quando tratou?",
        impressao: "Quando tratou:",
        video: "4.mp4",
        texto: 1010
    },
    {
        id: 1010,
        confidencial: 1,
        descricao: "Você tem histórico de drogas ilícitas?",
        impressao: "Histórico de drogas ilícitas:",
        video: "2.mp4",
        sim: 1020,
        nao: 1020
    },
    {
        id: 1020,
        confidencial: 1,
        descricao: "Você possui histórico de depressão?",
        impressao: "Doenças imunodepressoras:",
        video: "2.mp4",
        sim: 1030,
        nao: 1030
    },
    {
        id: 1030,
        confidencial: 1,
        descricao: "Você tem histórico de cirurgias oculares?",
        impressao: "Histórico de cirurgias oculares:",
        video: "2.mp4",
        sim: 1031,
        nao: 1040
    },
    {
        id: 1031,
        confidencial: 1,
        descricao: "Qual cirurgia?",
        impressao: "Qual cirurgia:",
        video: "4.mp4",
        texto: 1032
    },
    {
        id: 1032,
        confidencial: 1,
        descricao: "Quando fez a cirurgia?",
        impressao: "Quando fez a cirurgia:",
        video: "4.mp4",
        texto: 1040
    },
    {
        id: 1040,
        confidencial: 1,
        descricao: "Você fez uso de tampão ocular na infância (olho preguiçoso)?",
        impressao: "Histórico de tampão ocular:",
        video: "2.mp4",
        sim: 1050,
        nao: 1050
    },
    {
        id: 1050,
        confidencial: 1,
        descricao: "Faz uso de medicamentos sistêmicos?",
        impressao: "Histórico de medicamentos sistêmicos:",
        video: "2.mp4",
        sim: 1051,
        nao: 1500
    },
    {
        id: 1051,
        confidencial: 1,
        descricao: "Uso de anticoncepcional oral?",
        impressao: "Anticoncepcional oral:",
        video: "2.mp4",
        sim: 1052,
        nao: 1052
    },
    {
        id: 1052,
        confidencial: 1,
        descricao: "Uso de anti-hipertensivos?",
        impressao: "Anti-hipertensivos:",
        video: "2.mp4",
        sim: 1053,
        nao: 1053
    },
    {
        id: 1053,
        confidencial: 1,
        descricao: "Uso de anti-inflamatórios?",
        impressao: "Anti-inflamatórios:",
        video: "2.mp4",
        sim: 1054,
        nao: 1054
    },
    {
        id: 1054,
        confidencial: 1,
        descricao: "Uso de medicação para diabetes?",
        impressao: "Medicação para diabetes:",
        video: "2.mp4",
        sim: 1055,
        nao: 1055
    },
    {
        id: 1055,
        confidencial: 1,
        descricao: "Uso de medicação controlada?",
        impressao: "Medicação controlada:",
        video: "2.mp4",
        sim: 1056,
        nao: 1056
    },
    {
        id: 1056,
        confidencial: 1,
        descricao: "Uso de antidepressivos?",
        impressao: "Antidepressivos:",
        video: "2.mp4",
        sim: 1500,
        nao: 1500
    },
    {
        id: 1500,
        confidencial: 1,
        descricao: "Algum do seus familiares possui surdez?",
        impressao: "Surdez na família:",
        video: "2.mp4",
        sim: 1510,
        nao: 1510
    },
    {
        id: 1510,
        confidencial: 1,
        descricao: "Algum do seus familiares possui baixa visão?",
        impressao: "Baixa visão na família:",
        video: "2.mp4",
        sim: 1520,
        nao: 1520
    },
    {
        id: 1520,
        confidencial: 1,
        descricao: "Algum do seus familiares possui cegueira?",
        impressao: "Cegueira na família:",
        video: "2.mp4",
        sim: 1530,
        nao: 1530
    },
    {
        id: 1530,
        confidencial: 1,
        descricao: "Quais doenças acometem seus familiares?",
        impressao: "Doenças familiares?",
        video: "5.mp4",
        checkbox: 99999,
        opcao1_desc: 'Catarata',
        opcao2_desc: 'Glaucoma',
        opcao3_desc: 'Diabetes',
        opcao4_desc: 'Nenhuma dessas'
    },
	{
        id: 99999,
        descricao: "Registro concluido!",
        impressao: "Registro concluido!",
        video: "99999.mp4",
        fim: 1
    }
];