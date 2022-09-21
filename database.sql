CREATE TABLE IF NOT EXISTS public.users (
	user_id serial PRIMARY KEY,
	user_username VARCHAR(255) UNIQUE NOT NULL,
	user_name VARCHAR(255) NOT NULL,
	user_password VARCHAR(255) NOT NULL,
	user_role INT NOT NULL,
	user_isactive BOOLEAN NOT NULL,
	user_createdat TIMESTAMP NOT NULL
);

INSERT INTO public.users (
	user_username,
	user_name,
	user_password,
	user_role,
	user_isactive,
	user_createdat
) VALUES (
	'samaradeoliveira@gmail.com',
	'Samara de Oliveira',
	'$2a$10$qH.qVNhmZ4AbANwadMdKgOO0TUCnmB4zhZCPrY6EKB6Aq1t9e3Pie',
	2,
	true,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO public.users (
	user_username,
	user_name,
	user_password,
	user_role,
	user_isactive,
	user_createdat
) VALUES (
	'theteacher@gmail.com',
	'Professor de Oliveira',
	'$2a$10$qH.qVNhmZ4AbANwadMdKgOO0TUCnmB4zhZCPrY6EKB6Aq1t9e3Pie',
	1,
	true,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO public.users (
	user_username,
	user_name,
	user_password,
	user_role,
	user_isactive,
	user_createdat
) VALUES (
	'thadmin@gmail.com',
	'Admin de Oliveira',
	'$2a$10$TfMXTUv.qLtvDj4tUj2K3OV/0m9jE/ksRrQQeyfGe6kpxNN73fwKu',
	0,
	true,
	'2022-09-14 14:48:21.995308'
);


CREATE TABLE IF NOT EXISTS public.courses (
	crs_id serial PRIMARY KEY,
	crs_maker serial NOT NULL,
	crs_name TEXT NOT NULL,
	crs_description TEXT NOT NULL,
	crs_color VARCHAR(255) NOT NULL,
	crs_createdat TIMESTAMP NOT NULL,
  FOREIGN KEY (crs_maker) REFERENCES users(user_id)
);

INSERT INTO public.courses (
	crs_maker,
	crs_name,
	crs_description,
	crs_color,
	crs_createdat
) VALUES (
	3,
	'MATEMÁTICA para enem',
	'Só aqui no FIC questions você vê todo o conteúdo para conseguir uma boa pontuação nesta prova, pois não basta que você tenha habilidade com números ou figuras geométricas. É preciso ler com atenção e interpretar o texto de cada questão para entender o que é exigido, pois somente assim você chegará na resposta desejada.',
	'#4169E1',
	'2022-09-13 19:52:34.593027'
);

INSERT INTO public.courses (
	crs_maker,
	crs_name,
	crs_description,
	crs_color,
	crs_createdat
) VALUES (
	3,
	'PORTUGUÊS para enem',
	'O conteúdo das aulas de Português para o Enem, desenvolvido por nossos professores, é voltado para ajudar o aluno a estudar para a prova. Os professores do FIC questions estudaram as provas do Enem e identificaram os principais assuntos que elas costumam abordar (Gramática, Literatura, Interpretação de Texto).',
	'#9B111E',
	'2022-09-13 19:52:34.593027'
);

-- INSERT INTO public.courses (
-- 	crs_maker,
-- 	crs_name,
-- 	crs_description,
-- 	crs_color,
-- 	crs_createdat
-- ) VALUES (
-- 	3,
-- 	'BIOLOGIA para ENEM',
-- 	'A Biologia e uma area que contempla diversos temas, pois nesta disciplina e estudado tudo que tem vida.',
-- 	'#008000',
-- 	'2022-09-13 19:52:34.593027'
-- );

CREATE TABLE IF NOT EXISTS questions (
	qst_id serial PRIMARY KEY,
	qst_maker serial NOT NULL,
	qst_course serial NOT NULL,
	qst_name TEXT NOT NULL,
	qst_createdat TIMESTAMP NOT NULL,
  FOREIGN KEY (qst_maker) REFERENCES users(user_id),
  FOREIGN KEY (qst_course) REFERENCES courses(crs_id)
);

CREATE TABLE IF NOT EXISTS question_options (
	qst_opt_id serial PRIMARY KEY,
	qst_opt_question serial NOT NULL,
	qst_opt_name TEXT NOT NULL,
	qst_opt_is_correct boolean NOT NULL,
	qst_opt_createdat TIMESTAMP NOT NULL,
  FOREIGN KEY (qst_opt_question) REFERENCES questions(qst_id)
);

CREATE TABLE IF NOT EXISTS question_answers (
	qst_ans_id serial PRIMARY KEY,
	qst_ans_question_option serial NOT NULL,
  qst_ans_maker serial NOT NULL,
	qst_ans_createdat TIMESTAMP NOT NULL,
  FOREIGN KEY (qst_ans_question_option) REFERENCES question_options(qst_opt_id),
  FOREIGN KEY (qst_ans_maker) REFERENCES users(user_id)
);

-- primeira questão de matemática

INSERT INTO questions (
	qst_maker,
	qst_course,
	qst_name,
  qst_createdat
) VALUES (
	2,
	1,
  'A caixa-dágua de um edifício terá a forma de um paralelepípedo retângulo reto com volume igual a 28 080 litros. Em uma maquete que representa o edifício, a caixa-dágua tem dimensões 2 cm x 3,51 cm x 4 cm.<br/><br/>Dado: 1 dm³ = 1 L.<br/><br/>A escala usada pelo arquiteto foi: ',
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	1,
  '1 : 10',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	1,
  '1 : 100',
  true,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	1,
  '1 : 1000',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	1,
  '1 : 10000',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	1,
  '1 : 100000',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_answers (
	qst_ans_question_option,
	qst_ans_maker,
	qst_ans_createdat
) VALUES (
	2,
  2,
	'2022-09-13 19:52:34.593027'
);

-- segunda questão de matemática

INSERT INTO questions (
	qst_maker,
	qst_course,
	qst_name,
  qst_createdat
) VALUES (
	2,
	1,
  '(Enem 2020). Nos livros Harry Potter, um anagrama do nome do personagem “TOM MARVOLO RIDDLE” gerou a frase “I AM LORD VOLDEMORT”.<br/><br/>Suponha que Harry quisesse formar todos os anagramas da frase “I AM POTTER”, de tal forma que as vogais e consoantes aparecessem sempre intercaladas, e sem considerar o espaçamento entre as letras.<br/><br/>Nessas condições, o número de anagramas formados é dado por ',
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	2,
  '9!',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	2,
  '4! 5!',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	2,
  '2 x 4! 5!',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	2,
  '9! / 2',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	2,
  '4! 5! / 2',
  true,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_answers (
	qst_ans_question_option,
	qst_ans_maker,
	qst_ans_createdat
) VALUES (
	8,
  2,
	'2022-09-13 19:52:34.593027'
);

-- terceira questão de matemática

INSERT INTO questions (
	qst_maker,
	qst_course,
	qst_name,
  qst_createdat
) VALUES (
	2,
	1,
  '(Enem/2019) Em um determinado ano, os computadores da receita federal de um país identificaram como inconsistentes 20% das declarações de imposto de renda que lhe foram encaminhadas. Uma declaração é classificada como inconsistente quando apresenta algum tipo de erro ou conflito nas informações prestadas. Essas declarações consideradas inconsistentes foram analisadas pelos auditores, que constataram que 25% delas eram fraudulentas. Constatou-se ainda que, dentre as declarações que não apresentaram inconsistências, 6,25% eram fraudulentas.<br/><br/>Qual é a probabilidade de, nesse ano, a declaração de um contribuinte ser considerada inconsistente, dado que ela era fraudulenta?',
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	3,
  '0,0500',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	3,
  '0,1000',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	3,
  '0,1125',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	3,
  '0,3125',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	3,
  '0,5000',
  true,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_answers (
	qst_ans_question_option,
	qst_ans_maker,
	qst_ans_createdat
) VALUES (
	15,
  2,
	'2022-09-13 19:52:34.593027'
);

-- primeira questão de português

INSERT INTO questions (
	qst_maker,
	qst_course,
	qst_name,
  qst_createdat
) VALUES (
	2,
	2,
  '(Enem/2018)<br/><br/>“Acuenda o Pajubá”: conheça o “dialeto secreto” utilizado por gays e travestis<br/>Com origem no iorubá, linguagem foi adotada por travestis e ganhou a comunidade<br/><br/>“Nhaí, amapô! Não faça a loka e pague meu acué, deixe de equê se não eu puxo teu picumã!” Entendeu as palavras dessa ? Se sim, é porque você manja alguma coisa de pajubá, o “dialeto secreto” dos gays e travestis.<br/><br/>Adepto do uso das expressões, mesmo nos ambientes mais formais, um advogado afirma: “É claro que eu não vou falar durante uma audiência ou uma reunião, mas na firma, com meus colegas de trabalho, eu falo de acué o tempo inteiro”, brinca. “A gente tem que ter cuidado de falar outras palavras porque hoje o pessoal já entende, né? Tá na internet, tem até dicionário...”, comenta.<br/><br/>O dicionário a que ele se refere é o Aurélia, a dicionária da língua afiada, lançado no ano de 2006 e escrito pelo jornalista Angelo Vip e por Fred Libi. Na obra, há mais de 1 300 verbetes revelando o significado das palavras do pajubá.<br/><br/>Não se sabe ao certo quando essa linguagem surgiu, mas sabe-se que há claramente uma relação entre o pajubá e a cultura africana, numa costura iniciada ainda na época do Brasil colonial.<br/><br/>Disponível em: www.midiamax.com.br. Acesso em: 4 abr. 2017 (adaptado).<br/><br/>Da perspectiva do usuário, o pajubá ganha status de dialeto, caracterizando-se como elemento de patrimônio linguístico, especialmente por',
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	4,
  'ter mais de mil palavras conhecidas. ',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	4,
  'ter palavras diferentes de uma linguagem secreta. ',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	4,
  'ser consolidado por objetos formais de registro. ',
  true,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	4,
  'ser utilizado por advogados em situações formais. ',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	4,
  'ser comum em conversas no ambiente de trabalho.',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_answers (
	qst_ans_question_option,
	qst_ans_maker,
	qst_ans_createdat
) VALUES (
	18,
  2,
	'2022-09-13 19:52:34.593027'
);

-- segunda questão de português

INSERT INTO questions (
	qst_maker,
	qst_course,
	qst_name,
  qst_createdat
) VALUES (
	2,
	2,
  '(Enem/2018)<br/><br/>Certa vez minha mãe surrou-me com uma corda nodosa que me pintou as costas de manchas sangrentas. Moído, virando a cabeça com dificuldade, eu distinguia nas costelas grandes lanhos vermelhos. Deitaram-me, enrolaram-me em panos molhados com água de sal – e houve uma discussão na família. Minha avó, que nos visitava, condenou o procedimento da filha e esta afligiu-se. Irritada, ferira-me à toa, sem querer. Não guardei ódio a minha mãe: o culpado era o nó. <br/> <br/> RAMOS, G. Infância. Rio de Janeiro. Record, 1998. <br/> <br/> Num texto narrativo, a sequência dos fatos contribui para a progressão temática. No fragmento, esse processo é indicado pela',
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	5,
  'alternância das pessoas do discurso que determinam o foco narrativo.',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	5,
  'utilização de formas verbais que marcam tempos narrativos variados.',
  true,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	5,
  'indeterminação dos sujeitos de ações que caracterizam os eventos narrados.',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	5,
  'justaposição de frases que relacionam semanticamente os acontecimentos narrados.',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	5,
  'recorrência de expressões adverbiais que organizam temporalmente a narrativa.',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_answers (
	qst_ans_question_option,
	qst_ans_maker,
	qst_ans_createdat
) VALUES (
	22,
  2,
	'2022-09-13 19:52:34.593027'
);

-- terceira questão de português

INSERT INTO questions (
	qst_maker,
	qst_course,
	qst_name,
  qst_createdat
) VALUES (
	2,
	2,
  '(Enem/2018)<br/><br/>Mais big do que bang<br/><br/>A comunidade científica mundial recebeu, na semana passada, a confirmação oficial de uma descoberta sobre a qual se falava com enorme expectativa há alguns meses. Pesquisadores do Centro de Astrofísica Harvard-Smithsonian revelaram ter obtido a mais forte evidência até agora de que o universo em que vivemos começou mesmo pelo Big Bang, mas este não foi explosão, e sim uma súbita expansão de matéria e energia infinitas concentradas em um ponto microscópico que, sem muitas opções semânticas, os cientistas chamam de “singularidade”. Essa semente cósmica permanecia em estado latente e, sem que exista ainda uma explicação definitiva, começou a inchar rapidamente [...]. No intervalo de um piscar de olhos, por exemplo, seria possível, portanto, que ocorressem mais de 10 trilhões de Big Bangs.<br/><br/>ALLEGRETTI, F. Veja, 26 mar. 2014 (adaptado).<br/><br/>No título proposto para esse texto de divulgação científica, ao dissociar os elementos da expressão Big Bang, a autora revela a intenção de',
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	6,
  'evidenciar a descoberta recente que comprova a explosão de matéria e energia.',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	6,
  'resumir os resultados de uma pesquisa que trouxe evidências para a teoria do Big Bang.',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	6,
  'sintetizar a ideia de que a teoria da expansão de matéria e energia substitui a teoria da explosão.',
  true,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	6,
  'destacar a experiência que confirma uma investigação anterior sobre a teoria de matéria e energia.',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_options (
	qst_opt_question,
	qst_opt_name,
	qst_opt_is_correct,
  qst_opt_createdat
) VALUES (
	6,
  'condensar a conclusão de que a explosão de matéria e energia ocorre em um ponto microscópico.',
  false,
	'2022-09-13 19:52:34.593027'
);

INSERT INTO question_answers (
	qst_ans_question_option,
	qst_ans_maker,
	qst_ans_createdat
) VALUES (
	28,
  2,
	'2022-09-13 19:52:34.593027'
);
