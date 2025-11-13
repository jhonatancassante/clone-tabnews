const quotesList = [
  {
    emoji: "🧠",
    quote: "Penso, logo existo.",
    autor: "René Descartes, filósofo francês (em Discurso do Método, 1637)",
  },
  {
    emoji: "🌌",
    quote:
      "O mistério é a coisa mais bela que podemos experimentar. É a fonte de toda arte e ciência verdadeira.",
    autor:
      "Albert Einstein, físico alemão, Prêmio Nobel de Física (em The World As I See It, 1931)",
  },
  {
    emoji: "🔥",
    quote:
      "Aquele que tem um porquê para viver pode suportar quase qualquer como.",
    autor:
      "Friedrich Nietzsche, filósofo alemão (em Crepúsculo dos Ídolos, 1889)",
  },
  {
    emoji: "💡",
    quote: "A vida examinada não vale a pena ser vivida.",
    autor:
      "Sócrates, filósofo grego (registrado por Platão em Apologia de Sócrates)",
  },
  {
    emoji: "🌿",
    quote: "O homem é livre no momento em que deseja ser.",
    autor:
      "Voltaire, filósofo iluminista francês (em Cartas Filosóficas, 1734)",
  },
  {
    emoji: "🕊️",
    quote:
      "A paz não pode ser mantida à força; só pode ser alcançada pela compreensão.",
    autor: "Albert Einstein (discurso em Nova York, 1930)",
  },
  {
    emoji: "⏳",
    quote: "Tudo flui, nada permanece.",
    autor:
      "Heráclito de Éfeso, filósofo pré-socrático grego (fragmentos preservados, séc. VI a.C.)",
  },
  {
    emoji: "🌍",
    quote:
      "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
    autor:
      "Nelson Mandela, Prêmio Nobel da Paz (discurso em Madison Park High School, 1990)",
  },
  {
    emoji: "⚖️",
    quote: "A liberdade de um termina onde começa a liberdade do outro.",
    autor:
      "Jean-Jacques Rousseau, filósofo suíço (em Do Contrato Social, 1762)",
  },
  {
    emoji: "🧩",
    quote: "O essencial é invisível aos olhos.",
    autor:
      "Antoine de Saint-Exupéry, escritor e aviador francês (em O Pequeno Príncipe, 1943)",
  },
  {
    emoji: "⚙️",
    quote:
      "Os filósofos se limitaram a interpretar o mundo de diversas maneiras; o que importa é transformá-lo.",
    autor:
      "Karl Marx, filósofo e economista alemão (Teses sobre Feuerbach, 1845)",
  },
  {
    emoji: "🌱",
    quote:
      "A felicidade é a única coisa que se multiplica quando é compartilhada.",
    autor: "Albert Schweitzer, médico, teólogo e Prêmio Nobel da Paz (1952)",
  },
  {
    emoji: "🔥",
    quote: "A indiferença é o peso morto da história.",
    autor:
      "Antonio Gramsci, filósofo e político italiano (Lettere dal carcere, 1929)",
  },
  {
    emoji: "🕰️",
    quote: "O tempo é uma ilusão. A única coisa real é o agora.",
    autor: "Alan Watts, filósofo britânico (The Illusion of Time, 1959)",
  },
  {
    emoji: "🌌",
    quote: "Somos feitos da mesma matéria de que são feitos os sonhos.",
    autor: "William Shakespeare, dramaturgo inglês (A Tempestade, 1611)",
  },
  {
    emoji: "⚖️",
    quote:
      "A injustiça em qualquer lugar é uma ameaça à justiça em todo lugar.",
    autor: "Martin Luther King Jr. (Carta da Prisão de Birmingham, 1963)",
  },
  {
    emoji: "🪞",
    quote: "Conhece-te a ti mesmo e conhecerás o universo e os deuses.",
    autor:
      "Inscrição no Templo de Apolo em Delfos, atribuída a Sócrates (séc. V a.C.)",
  },
  {
    emoji: "🧭",
    quote:
      "Aquele que abre mão da liberdade essencial por um pouco de segurança temporária não merece nem liberdade nem segurança.",
    autor:
      "Benjamin Franklin, estadista americano (Carta à Assembleia da Pensilvânia, 1755)",
  },
  {
    emoji: "🌹",
    quote: "Sem o contraste da tristeza, a alegria perde o sentido.",
    autor:
      "Carl Jung, psiquiatra e pensador suíço (Memórias, Sonhos, Reflexões, 1962)",
  },
  {
    emoji: "🕊️",
    quote: "Se queres paz, prepara-te para a justiça.",
    autor: "Papa Paulo VI (discurso à ONU, 1965)",
  },
  {
    emoji: "🪶",
    quote:
      "Liberdade é o direito de dizer às pessoas o que elas não querem ouvir.",
    autor: "George Orwell, escritor e ensaísta britânico (Liberty, 1945)",
  },
  {
    emoji: "🧠",
    quote: "A mente é tudo. O que você pensa, você se torna.",
    autor: "Buda Siddhartha Gautama (século V a.C.)",
  },
  {
    emoji: "🌍",
    quote:
      "Não herdei a Terra de meus antepassados, estou a tomando emprestada de meus filhos.",
    autor:
      "Provérbio indígena norte-americano (atribuído também a Antoine de Saint-Exupéry)",
  },
  {
    emoji: "🔮",
    quote: "Quem olha para fora sonha, quem olha para dentro desperta.",
    autor: "Carl Jung (The Collected Works, 1954)",
  },
  {
    emoji: "🧩",
    quote:
      "A vida só pode ser compreendida olhando-se para trás; mas deve ser vivida olhando-se para frente.",
    autor: "Søren Kierkegaard, filósofo dinamarquês (Diários, 1843)",
  },
  {
    emoji: "⚔️",
    quote: "A neutralidade ajuda o opressor, nunca a vítima.",
    autor:
      "Elie Wiesel, escritor e Prêmio Nobel da Paz (The Perils of Indifference, 1999)",
  },
  {
    emoji: "🔭",
    quote: "A imaginação é mais importante que o conhecimento.",
    autor:
      "Albert Einstein, físico e Prêmio Nobel (Saturday Evening Post, 1929)",
  },
  {
    emoji: "⚒️",
    quote: "A esperança é o sonho do homem acordado.",
    autor: "Aristóteles, filósofo grego (Ética a Nicômaco, séc. IV a.C.)",
  },
  {
    emoji: "🌾",
    quote: "Não há caminho para a paz, a paz é o caminho.",
    autor: "Mahatma Gandhi (discurso em 1931)",
  },
  {
    emoji: "🕯️",
    quote: "Aquele que combate monstros deve cuidar para não se tornar um.",
    autor: "Friedrich Nietzsche (Além do Bem e do Mal, 1886)",
  },
  {
    emoji: "⚖️",
    quote: "A ignorância afirma ou nega violentamente; a ciência duvida.",
    autor: "Voltaire, filósofo iluminista francês (Cartas Inglesas, 1733)",
  },
  {
    emoji: "🌙",
    quote:
      "Não é o que nos acontece, mas como reagimos ao que nos acontece, que nos fere.",
    autor: "Epicteto, filósofo estoico grego (Manual de Epicteto, séc. I d.C.)",
  },
  {
    emoji: "🔥",
    quote:
      "A coragem é a resistência ao medo, o domínio do medo — não a ausência dele.",
    autor: "Mark Twain, escritor americano",
  },
  {
    emoji: "🌍",
    quote:
      "Devemos aprender a viver juntos como irmãos ou perecer juntos como tolos.",
    autor: "Martin Luther King Jr. (discurso, 1964)",
  },
  {
    emoji: "🧩",
    quote: "Aquele que não consegue mudar sua mente não muda nada.",
    autor: "George Bernard Shaw, dramaturgo irlandês",
  },
  {
    emoji: "⏳",
    quote: "O tempo que você gosta de perder não é tempo perdido.",
    autor:
      "Bertrand Russell, filósofo britânico, Prêmio Nobel de Literatura (1950)",
  },
  {
    emoji: "🕊️",
    quote: "A educação é o grande motor do desenvolvimento pessoal.",
    autor: "Nelson Mandela (discurso, 1994)",
  },
  {
    emoji: "🧠",
    quote: "A dúvida é o começo da sabedoria.",
    autor: "Aristóteles, filósofo grego",
  },
  {
    emoji: "🌾",
    quote:
      "Ser livre não é meramente livrar-se das correntes, mas viver de forma a respeitar e ampliar a liberdade dos outros.",
    autor: "Nelson Mandela (Long Walk to Freedom, 1994)",
  },
  {
    emoji: "🪶",
    quote: "Nada é permanente, exceto a mudança.",
    autor: "Heráclito de Éfeso",
  },
  {
    emoji: "💡",
    quote: "A vida é 10% o que acontece comigo e 90% como eu reajo a isso.",
    autor: "Charles R. Swindoll, teólogo americano",
  },
  {
    emoji: "🌹",
    quote: "O amor é a única força capaz de transformar um inimigo em amigo.",
    autor: "Martin Luther King Jr.",
  },
  {
    emoji: "🔮",
    quote: "A imaginação governa o mundo.",
    autor: "Napoleão Bonaparte",
  },
  {
    emoji: "🕰️",
    quote: "Não há fatos eternos, como não há verdades absolutas.",
    autor: "Friedrich Nietzsche (Humano, Demasiado Humano, 1878)",
  },
  {
    emoji: "🪞",
    quote: "Conhecimento sem ação é inútil, ação sem conhecimento é tola.",
    autor: "Al-Ghazali, filósofo persa (séc. XI)",
  },
  {
    emoji: "⚙️",
    quote:
      "A tecnologia é apenas uma ferramenta. O que importa é a intenção de quem a usa.",
    autor: "Tim Berners-Lee, criador da World Wide Web",
  },
  {
    emoji: "🌌",
    quote: "A ciência sem religião é manca; a religião sem ciência é cega.",
    autor: "Albert Einstein",
  },
  {
    emoji: "🧭",
    quote: "Nada pode trazer paz a você, exceto você mesmo.",
    autor: "Ralph Waldo Emerson",
  },
  {
    emoji: "🏛️",
    quote:
      "Aqueles que não conseguem lembrar o passado estão condenados a repeti-lo.",
    autor: "George Santayana (The Life of Reason, 1905)",
  },
  {
    emoji: "⚔️",
    quote: "O preço da liberdade é a eterna vigilância.",
    autor: "Thomas Jefferson, estadista americano",
  },
  {
    emoji: "🌙",
    quote: "Tudo o que é amado é salvo pelo amor.",
    autor: "William Blake, poeta e místico inglês",
  },
  {
    emoji: "🔥",
    quote: "Aquele que procura o infinito deve deixar o finito para trás.",
    autor: "Johann Goethe, poeta e pensador alemão",
  },
  {
    emoji: "🪶",
    quote: "A maior riqueza é contentar-se com pouco.",
    autor: "Platão",
  },
  {
    emoji: "🌾",
    quote: "É melhor ser odiado pelo que se é do que amado pelo que não se é.",
    autor: "André Gide, escritor francês (Prêmio Nobel de Literatura, 1947)",
  },
  {
    emoji: "🕊️",
    quote: "A compaixão é a base da moralidade.",
    autor: "Arthur Schopenhauer, filósofo alemão",
  },
  {
    emoji: "🌍",
    quote:
      "O poder tende a corromper, e o poder absoluto corrompe absolutamente.",
    autor: "Lord Acton, historiador britânico",
  },
  {
    emoji: "💡",
    quote: "O homem é o lobo do homem.",
    autor: "Thomas Hobbes (Leviatã, 1651)",
  },
  {
    emoji: "⚖️",
    quote: "Não existe liberdade sem igualdade.",
    autor: "Jean-Jacques Rousseau",
  },
  {
    emoji: "🌱",
    quote: "Você deve ser a mudança que deseja ver no mundo.",
    autor: "Mahatma Gandhi",
  },
  {
    emoji: "🪞",
    quote: "Conhecimento é poder.",
    autor: "Francis Bacon, filósofo inglês",
  },
  {
    emoji: "🧩",
    quote: "A imaginação é o começo da criação.",
    autor: "George Bernard Shaw",
  },
  {
    emoji: "🔮",
    quote:
      "Não é sinal de saúde estar bem ajustado a uma sociedade profundamente doente.",
    autor: "Jiddu Krishnamurti, filósofo indiano",
  },
  {
    emoji: "⚙️",
    quote:
      "A ciência é o grande antídoto contra o veneno do entusiasmo e da superstição.",
    autor: "Adam Smith, economista escocês",
  },
  {
    emoji: "🌌",
    quote:
      "Somos o que repetidamente fazemos. A excelência, portanto, não é um ato, mas um hábito.",
    autor: "Aristóteles",
  },
  {
    emoji: "🕯️",
    quote: "A escuridão não pode expulsar a escuridão; só a luz pode fazê-lo.",
    autor: "Martin Luther King Jr.",
  },
  {
    emoji: "🧭",
    quote:
      "A mente que se abre a uma nova ideia jamais volta ao seu tamanho original.",
    autor: "Oliver Wendell Holmes Jr., jurista americano",
  },
  {
    emoji: "🌍",
    quote:
      "A Terra provê o suficiente para satisfazer as necessidades de todos, mas não a ganância de todos.",
    autor: "Mahatma Gandhi",
  },
  {
    emoji: "🪶",
    quote: "O homem nasce livre, mas por toda parte se encontra acorrentado.",
    autor: "Jean-Jacques Rousseau",
  },
  {
    emoji: "💡",
    quote: "O propósito da vida é uma vida com propósito.",
    autor: "Robert Byrne, escritor americano",
  },
  {
    emoji: "🔥",
    quote:
      "A esperança é a última que morre, mas é a primeira que precisa nascer.",
    autor: "Eduardo Galeano, escritor uruguaio",
  },
  {
    emoji: "🌱",
    quote: "A cultura é a resistência mais profunda à barbárie.",
    autor: "Theodor Adorno, filósofo alemão",
  },
  {
    emoji: "🕰️",
    quote: "A história é um pesadelo do qual estou tentando acordar.",
    autor: "James Joyce (Ulysses, 1922)",
  },
  {
    emoji: "⚖️",
    quote:
      "A verdadeira medida de um homem é como ele trata alguém que não pode lhe trazer benefício algum.",
    autor: "Samuel Johnson, escritor inglês",
  },
  {
    emoji: "🌾",
    quote: "A solidão é a sorte de todos os espíritos excepcionais.",
    autor: "Arthur Schopenhauer",
  },
  {
    emoji: "🕊️",
    quote: "A bondade é a linguagem que o surdo pode ouvir e o cego pode ver.",
    autor: "Mark Twain",
  },
  {
    emoji: "🔮",
    quote: "O destino não é uma questão de sorte, mas de escolha.",
    autor: "William Jennings Bryan",
  },
  {
    emoji: "🧠",
    quote: "O homem é condenado a ser livre.",
    autor: "Jean-Paul Sartre (O Ser e o Nada, 1943)",
  },
  {
    emoji: "🌌",
    quote:
      "O universo não está sob nenhuma obrigação de fazer sentido para você.",
    autor: "Neil deGrasse Tyson, astrofísico americano",
  },
  {
    emoji: "🪶",
    quote: "A vida é realmente simples, mas insistimos em complicá-la.",
    autor: "Confúcio, filósofo chinês",
  },
  {
    emoji: "🕰️",
    quote: "O passado é um prólogo.",
    autor: "William Shakespeare (A Tempestade, 1611)",
  },
  {
    emoji: "⚙️",
    quote: "A ciência é o que você sabe; filosofia é o que você não sabe.",
    autor: "Bertrand Russell",
  },
  {
    emoji: "🌙",
    quote: "Não há caminho para a verdade — a verdade é o caminho.",
    autor: "Mahatma Gandhi",
  },
  {
    emoji: "🌍",
    quote:
      "Aqueles que renunciam à liberdade em nome da segurança não merecem nem uma nem outra.",
    autor: "Benjamin Franklin",
  },
  {
    emoji: "💡",
    quote: "A arte é a mentira que nos permite enxergar a verdade.",
    autor: "Pablo Picasso",
  },
  {
    emoji: "🕊️",
    quote: "Nenhum man é uma ilha.",
    autor: "John Donne, poeta inglês",
  },
  {
    emoji: "🔥",
    quote: "Aquele que move montanhas começa removendo pequenas pedras.",
    autor: "Confúcio",
  },
  {
    emoji: "🌾",
    quote:
      "Não espere por uma crise para descobrir o que é importante na sua vida.",
    autor: "Platão",
  },
  {
    emoji: "🪞",
    quote: "O mais corajoso dos atos ainda é pensar com a própria cabeça.",
    autor: "Simone de Beauvoir, filósofa existencialista francesa",
  },
  {
    emoji: "🧩",
    quote: "O conhecimento fala, mas a sabedoria ouve.",
    autor: "Jimi Hendrix",
  },
  {
    emoji: "⚖️",
    quote: "A primeira condição para a paz é a vontade de alcançá-la.",
    autor: "Juan Luis Vives, humanista espanhol (séc. XVI)",
  },
  {
    emoji: "🌌",
    quote: "Somos todos aprendizes em um ofício onde ninguém se torna mestre.",
    autor: "Ernest Hemingway (Prêmio Nobel de Literatura, 1954)",
  },
  {
    emoji: "🕰️",
    quote:
      "O passado é um país estrangeiro: lá as coisas são feitas de maneira diferente.",
    autor: "L.P. Hartley, escritor inglês",
  },
  {
    emoji: "🔮",
    quote: "A vida é uma aventura ousada ou nada.",
    autor: "Helen Keller, escritora e ativista americana",
  },
  {
    emoji: "🌱",
    quote:
      "A verdadeira viagem de descoberta não consiste em procurar novas paisagens, mas em ter novos olhos.",
    autor: "Marcel Proust",
  },
  {
    emoji: "💡",
    quote: "A sabedoria começa na admiração.",
    autor: "Sócrates",
  },
  {
    emoji: "🌙",
    quote: "A simplicidade é o último grau da sofisticação.",
    autor: "Leonardo da Vinci",
  },
  {
    emoji: "⚔️",
    quote: "A guerra é uma fuga das soluções dos problemas da paz.",
    autor: "Thomas Mann (Prêmio Nobel de Literatura, 1929)",
  },
  {
    emoji: "🧭",
    quote: "Não existe caminho certo para quem está na direção errada.",
    autor: "Gandhi (atribuída)",
  },
  {
    emoji: "🌾",
    quote:
      "A utopia está no horizonte. Caminho dois passos, ela se afasta dois passos... então, para que serve a utopia? Para isso: para que eu não deixe de caminhar.",
    autor: "Eduardo Galeano",
  },
  {
    emoji: "🜂",
    quote: "Somos feitos de tempo e esperança. Tudo o resto é distração.",
    autor: "José Saramago (Prêmio Nobel de Literatura, 1998)",
  },
  {
    emoji: "🌟",
    quote: "Não é a carga que o derruba, mas a maneira como você a carrega.",
    autor: "Lou Holtz, treinador americano",
  },
  {
    emoji: "🕊️",
    quote:
      "O perdão é a fragrância que a violeta deixa no calcanhar que a esmagou.",
    autor: "Mark Twain",
  },
  {
    emoji: "🌌",
    quote: "O homem é a medida de todas as coisas.",
    autor: "Protágoras, filósofo grego",
  },
  {
    emoji: "⚖️",
    quote:
      "A liberdade consiste em poder fazer tudo aquilo que não prejudique ninguém.",
    autor: "John Stuart Mill, filósofo britânico",
  },
  {
    emoji: "🧠",
    quote: "O intelecto é fogo, não recipiente.",
    autor: "Aristóteles",
  },
  {
    emoji: "🌱",
    quote: "A felicidade não é algo pronto. Ela vem de suas próprias ações.",
    autor: "Dalai Lama, líder tibetano",
  },
  {
    emoji: "🪞",
    quote: "A arrogância é a sombra da ignorância.",
    autor: "Baltasar Gracián, escritor espanhol",
  },
  {
    emoji: "💡",
    quote:
      "Não se mede a grandeza de um homem pelo que ele conquista, mas pelo que supera.",
    autor: "Ralph Waldo Emerson",
  },
  {
    emoji: "🔥",
    quote: "Não há caminho para a felicidade: a felicidade é o caminho.",
    autor: "Buda Siddhartha Gautama",
  },
  {
    emoji: "🌾",
    quote: "Aprender sem pensar é inútil; pensar sem aprender é perigoso.",
    autor: "Confúcio",
  },
  {
    emoji: "🕰️",
    quote:
      "Não se mede o valor de uma vida pelo tempo que ela dura, mas pelo impacto que ela deixa.",
    autor: "Ralph Waldo Emerson",
  },
  {
    emoji: "🧭",
    quote: "A verdadeira sabedoria está em reconhecer a própria ignorância.",
    autor: "Sócrates",
  },
  {
    emoji: "⚙️",
    quote: "A prática é a melhor das teorias.",
    autor: "Leonardo da Vinci",
  },
  {
    emoji: "🌹",
    quote:
      "O amor não consiste em olhar um para o outro, mas em olhar juntos na mesma direção.",
    autor: "Antoine de Saint-Exupéry",
  },
  {
    emoji: "🕯️",
    quote: "A luz não brilha sem sombra.",
    autor: "Leonardo da Vinci",
  },
  {
    emoji: "🧩",
    quote: "A simplicidade é a sofisticação suprema.",
    autor: "Leonardo da Vinci",
  },
  {
    emoji: "🔮",
    quote:
      "A vida não é sobre encontrar a si mesmo, mas sobre criar a si mesmo.",
    autor: "George Bernard Shaw",
  },
  {
    emoji: "⚔️",
    quote: "A maior riqueza de um homem é o conhecimento.",
    autor: "Sócrates",
  },
  {
    emoji: "🌍",
    quote: "Não há caminho para a justiça, a justiça é o caminho.",
    autor: "Mahatma Gandhi",
  },
  {
    emoji: "🪶",
    quote: "O caráter de um homem é seu destino.",
    autor: "Heráclito",
  },
  {
    emoji: "💡",
    quote: "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.",
    autor: "Winston Churchill",
  },
  {
    emoji: "🌱",
    quote: "O que não provoca minha morte faz com que eu fique mais forte.",
    autor: "Friedrich Nietzsche",
  },
  {
    emoji: "🧭",
    quote: "A vida é 10% o que acontece e 90% como reagimos.",
    autor: "Charles R. Swindoll",
  },
  {
    emoji: "🌌",
    quote: "O conhecimento é limitado; a imaginação circunda o mundo.",
    autor: "Albert Einstein",
  },
  {
    emoji: "🕊️",
    quote: "Não faça aos outros o que você não quer que façam a você.",
    autor: "Confúcio",
  },
  {
    emoji: "⚖️",
    quote:
      "A educação é o passaporte para o futuro, pois o amanhã pertence àqueles que se preparam hoje.",
    autor: "Malcolm X",
  },
  {
    emoji: "🔥",
    quote: "O medo é apenas uma ilusão que você cria para si mesmo.",
    autor: "Napoleon Hill",
  },
  {
    emoji: "🌙",
    quote:
      "A felicidade não depende do que você é ou do que possui, mas apenas do que pensa.",
    autor: "Dale Carnegie",
  },
  {
    emoji: "🧠",
    quote: "Quem domina os outros é forte; quem domina a si mesmo é poderoso.",
    autor: "Lao Tsé",
  },
  {
    emoji: "🪞",
    quote: "A reflexão é o caminho para a sabedoria.",
    autor: "Buda",
  },
  {
    emoji: "🌹",
    quote: "Não há maior riqueza que a paz de espírito.",
    autor: "Marco Aurélio, imperador romano",
  },
  {
    emoji: "💡",
    quote: "A arte de vencer consiste em aprender a lidar com os fracassos.",
    autor: "Napoleon Bonaparte",
  },
  {
    emoji: "🌾",
    quote: "O espírito se enriquece com a adversidade.",
    autor: "Séneca, filósofo romano",
  },
  {
    emoji: "🕯️",
    quote: "A paciência é amarga, mas seus frutos são doces.",
    autor: "Jean-Jacques Rousseau",
  },
  {
    emoji: "🧩",
    quote: "Aquele que não conhece sua história está condenado a repeti-la.",
    autor: "George Santayana",
  },
  {
    emoji: "🔮",
    quote: "A mente é como um paraquedas: só funciona quando está aberta.",
    autor: "Thomas Dewar",
  },
  {
    emoji: "⚙️",
    quote: "O conhecimento é a chave para a liberdade.",
    autor: "Epicteto",
  },
  {
    emoji: "🌌",
    quote: "O que sabemos é uma gota; o que ignoramos é um oceano.",
    autor: "Isaac Newton",
  },
  {
    emoji: "🕰️",
    quote: "Não podemos dirigir o vento, mas podemos ajustar as velas.",
    autor: "Thomas S. Monson",
  },
  {
    emoji: "🪶",
    quote: "O homem é aquilo que ele acredita ser.",
    autor: "Anton Tchekhov",
  },
  {
    emoji: "💡",
    quote:
      "O verdadeiro sinal de inteligência não é o conhecimento, mas a imaginação.",
    autor: "Albert Einstein",
  },
  {
    emoji: "🧭",
    quote: "A vida é sobre fazer escolhas e aceitar suas consequências.",
    autor: "Elbert Hubbard",
  },
  {
    emoji: "🌍",
    quote:
      "Para sobreviver, precisamos de pão; para viver, precisamos de arte.",
    autor: "Maxim Gorki",
  },
  {
    emoji: "⚖️",
    quote:
      "Não julgue cada dia pela colheita que você faz, mas pelas sementes que planta.",
    autor: "Robert Louis Stevenson",
  },
  {
    emoji: "🔥",
    quote: "A verdadeira grandeza consiste em ser grande na humildade.",
    autor: "Charles Simmons",
  },
  {
    emoji: "🌱",
    quote: "A mente é tudo; o que você pensa, você se torna.",
    autor: "Buda",
  },
  {
    emoji: "🕊️",
    quote:
      "O bem que você faz hoje pode ser esquecido amanhã. Faça-o de qualquer forma.",
    autor: "Madre Teresa",
  },
  {
    emoji: "🪞",
    quote: "A simplicidade é a chave para a verdadeira elegância.",
    autor: "Coco Chanel",
  },
  {
    emoji: "💡",
    quote:
      "A força não provém da capacidade física, mas de uma vontade indomável.",
    autor: "Mahatma Gandhi",
  },
  {
    emoji: "🌌",
    quote: "A criatividade é a inteligência se divertindo.",
    autor: "Albert Einstein",
  },
  {
    emoji: "🕊️",
    quote: "A paz começa com um sorriso.",
    autor: "Madre Teresa",
  },
  {
    emoji: "🧠",
    quote:
      "Não é a riqueza nem a pobreza que determina a felicidade, mas a tranquilidade da mente.",
    autor: "Epicuro",
  },
  {
    emoji: "🌱",
    quote: "A vida não examinada não vale a pena ser vivida.",
    autor: "Sócrates",
  },
  {
    emoji: "🪶",
    quote:
      "Não podemos ensinar nada a ninguém; podemos apenas ajudá-los a descobrir por si mesmos.",
    autor: "Galileu Galilei",
  },
  {
    emoji: "💡",
    quote:
      "O verdadeiro valor de um homem é medido pela forma como ele trata aqueles que não podem ajudá-lo.",
    autor: "Samuel Johnson",
  },
  {
    emoji: "🌹",
    quote: "O coração tem razões que a própria razão desconhece.",
    autor: "Blaise Pascal",
  },
  {
    emoji: "🕯️",
    quote: "A vida é feita de escolhas; escolha sabiamente.",
    autor: "Wayne Dyer",
  },
  {
    emoji: "⚖️",
    quote: "A justiça não é uma questão de sentimento, mas de dever.",
    autor: "Aristóteles",
  },
  {
    emoji: "🔥",
    quote: "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    autor: "Robert Collier",
  },
  {
    emoji: "🧩",
    quote: "A sabedoria começa na reflexão.",
    autor: "Sócrates",
  },
  {
    emoji: "🌌",
    quote: "Não espere; o tempo nunca será 'certo'.",
    autor: "Napoleon Hill",
  },
  {
    emoji: "🪞",
    quote:
      "A vida é o que acontece enquanto você está ocupado fazendo outros planos.",
    autor: "John Lennon",
  },
  {
    emoji: "🧭",
    quote:
      "Você nunca sabe a força que tem até que sua única alternativa é ser forte.",
    autor: "Johnny Depp",
  },
  {
    emoji: "🌱",
    quote: "O homem que move montanhas começa carregando pequenas pedras.",
    autor: "Confúcio",
  },
  {
    emoji: "💡",
    quote: "O maior obstáculo para o sucesso é o medo do fracasso.",
    autor: "Sven Goran Eriksson",
  },
  {
    emoji: "🕊️",
    quote:
      "A vida é curta, a arte é longa, a oportunidade é fugaz, a experiência enganosa, o julgamento difícil.",
    autor: "Hipócrates",
  },
  {
    emoji: "⚖️",
    quote: "O poder corrompe; o poder absoluto corrompe absolutamente.",
    autor: "Lord Acton",
  },
  {
    emoji: "🌹",
    quote: "O amor não conhece barreiras.",
    autor: "Maya Angelou",
  },
  {
    emoji: "🪶",
    quote: "A humildade é a verdadeira marca de grandeza.",
    autor: "Mahatma Gandhi",
  },
  {
    emoji: "🕯️",
    quote:
      "O segredo da saúde mental e corporal está em não lamentar o passado, não se preocupar com o futuro, nem se antecipar a problemas.",
    autor: "Buda",
  },
  {
    emoji: "🧩",
    quote: "A paciência é a companheira da sabedoria.",
    autor: "Santidade de Éfeso",
  },
  {
    emoji: "🔥",
    quote: "Seja a mudança que você quer ver no mundo.",
    autor: "Mahatma Gandhi",
  },
  {
    emoji: "🌌",
    quote: "A vida é realmente simples, mas insistimos em torná-la complicada.",
    autor: "Confúcio",
  },
  {
    emoji: "💡",
    quote: "O que não nos mata nos torna mais fortes.",
    autor: "Friedrich Nietzsche",
  },
  {
    emoji: "🪞",
    quote: "Tudo o que somos é resultado do que pensamos.",
    autor: "Buda",
  },
  {
    emoji: "🧭",
    quote:
      "Não se pode ensinar nada a alguém; só se pode ajudá-lo a encontrar a verdade dentro de si.",
    autor: "Galileu Galilei",
  },
  {
    emoji: "⚖️",
    quote: "Não existe caminho para a felicidade: a felicidade é o caminho.",
    autor: "Buda",
  },
  {
    emoji: "🌹",
    quote: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
    autor: "Eleanor Roosevelt",
  },
  {
    emoji: "🕊️",
    quote: "O silêncio é a linguagem de Deus, todo o resto é má tradução.",
    autor: "Rumi",
  },
  {
    emoji: "🕰️",
    quote: "A mente é como um paraquedas, só funciona quando aberta.",
    autor: "Thomas Dewar",
  },
  {
    emoji: "🌌",
    quote: "Não espere por oportunidades, crie-as.",
    autor: "George Bernard Shaw",
  },
  {
    emoji: "🧠",
    quote: "O homem nasce livre, mas está em toda parte acorrentado.",
    autor: "Jean-Jacques Rousseau",
  },
  {
    emoji: "⚔️",
    quote: "O objetivo da vida é a autossuperação.",
    autor: "Platão",
  },
  {
    emoji: "🪞",
    quote: "Se você quer ser feliz, seja.",
    autor: "Lev Tolstói",
  },
  {
    emoji: "💡",
    quote: "A sorte favorece a mente preparada.",
    autor: "Louis Pasteur",
  },
  {
    emoji: "🌱",
    quote: "A gratidão transforma o que temos em suficiente.",
    autor: "Melody Beattie",
  },
  {
    emoji: "🕯️",
    quote:
      "A coragem não é ausência de medo, mas a capacidade de agir apesar dele.",
    autor: "Mark Twain",
  },
  {
    emoji: "🧩",
    quote: "A alegria está em coisas simples.",
    autor: "Platão",
  },
  {
    emoji: "🪶",
    quote: "O mundo é um espelho que reflete a imagem de quem você é.",
    autor: "Thomas Dreier",
  },
  {
    emoji: "🔥",
    quote:
      "O sábio nunca diz tudo o que pensa, mas sempre pensa tudo o que diz.",
    autor: "Aristóteles",
  },
  {
    emoji: "🌹",
    quote:
      "O verdadeiro homem mede a sua força quando se defronta com o obstáculo.",
    autor: "Confúcio",
  },
  {
    emoji: "⚖️",
    quote:
      "A liberdade não é um prêmio a ser ganho, mas um direito a ser protegido.",
    autor: "Franklin D. Roosevelt",
  },
  {
    emoji: "🧭",
    quote: "O aprendizado nunca esgota a mente.",
    autor: "Leonardo da Vinci",
  },
  {
    emoji: "🌌",
    quote: "A dúvida é o princípio da sabedoria.",
    autor: "Aristóteles",
  },
  {
    emoji: "💡",
    quote:
      "O verdadeiro teste do caráter de um homem é como ele trata aqueles que não podem beneficiá-lo.",
    autor: "Samuel Johnson",
  },
  {
    emoji: "🌱",
    quote: "O que você faz fala tão alto que não consigo ouvir o que você diz.",
    autor: "Ralph Waldo Emerson",
  },
  {
    emoji: "🪶",
    quote: "A sabedoria consiste em saber o que fazer com o que se sabe.",
    autor: "Sócrates",
  },
  {
    emoji: "🕯️",
    quote:
      "Não é mais forte aquele que nunca cai, mas sim aquele que sempre se levanta.",
    autor: "Confúcio",
  },
  {
    emoji: "⚔️",
    quote: "A felicidade não está em ter, mas em ser.",
    autor: "Henry Van Dyke",
  },
  {
    emoji: "🧩",
    quote: "A paciência é o melhor remédio para todos os males.",
    autor: "Esopo",
  },
  {
    emoji: "💡",
    quote: "Não espere por inspiração; seja a inspiração.",
    autor: "William Shakespeare",
  },
  {
    emoji: "🌌",
    quote: "A vida é curta demais para ser pequena.",
    autor: "Benjamin Disraeli",
  },
  {
    emoji: "🪞",
    quote:
      "O conhecimento sem ação é inútil, e a ação sem conhecimento é perigosa.",
    autor: "Al-Ghazali",
  },
  {
    emoji: "🌱",
    quote: "A disciplina é a ponte entre objetivos e realizações.",
    autor: "Jim Rohn",
  },
  {
    emoji: "🔥",
    quote:
      "O sucesso é o resultado de preparação, trabalho árduo e aprender com o fracasso.",
    autor: "Colin Powell",
  },
  {
    emoji: "⚖️",
    quote:
      "Não se pode ensinar nada a alguém; apenas ajudá-lo a descobrir a verdade dentro de si.",
    autor: "Galileu Galilei",
  },
  {
    emoji: "🕰️",
    quote: "O homem que não valoriza a vida não a merece.",
    autor: "Leonardo da Vinci",
  },
  {
    emoji: "🪶",
    quote: "Tudo o que você pode imaginar é real.",
    autor: "Pablo Picasso",
  },
  {
    emoji: "🌹",
    quote: "Não existe nada permanente, exceto a mudança.",
    autor: "Heráclito",
  },
  {
    emoji: "🔥",
    quote:
      "A maior glória em viver não está em nunca cair, mas em nos levantar a cada queda.",
    autor: "Nelson Mandela",
  },
  {
    emoji: "🕯️",
    quote: "A vida é a soma de todas as suas escolhas.",
    autor: "Albert Camus",
  },
  {
    emoji: "🪶",
    quote:
      "Não se mede a força de um homem pelo que ele suporta, mas pelo que ele supera.",
    autor: "Epicteto",
  },
  {
    emoji: "🌌",
    quote: "A simplicidade é a maior sofisticação.",
    autor: "Leonardo da Vinci",
  },
  {
    emoji: "💡",
    quote: "A educação é a chave para abrir a porta dourada da liberdade.",
    autor: "George Washington Carver",
  },
  {
    emoji: "🌹",
    quote: "Não há nada permanente, exceto a mudança.",
    autor: "Heráclito",
  },
  {
    emoji: "⚔️",
    quote: "A coragem é a resistência ao medo, não a ausência dele.",
    autor: "Mark Twain",
  },
  {
    emoji: "🌌",
    quote: "O universo não conspira contra você, ele conspira com você.",
    autor: "Ralph Waldo Emerson",
  },
  {
    emoji: "🧠",
    quote: "O verdadeiro conhecimento vem de dentro.",
    autor: "Sócrates",
  },
  {
    emoji: "🌱",
    quote: "Não espere. O tempo nunca será 'certo'.",
    autor: "Napoleon Hill",
  },
  {
    emoji: "🪞",
    quote: "Conhecimento sem ação é inútil; ação sem conhecimento é perigosa.",
    autor: "Al-Ghazali",
  },
  {
    emoji: "🕊️",
    quote: "Nenhum homem é uma ilha.",
    autor: "John Donne",
  },
  {
    emoji: "🕊️",
    quote: "A verdadeira compaixão não exige palavras, exige ação.",
    autor: "Dalai Lama",
  },
  {
    emoji: "🪞",
    quote: "Olhe para dentro, tudo o que você precisa já está lá.",
    autor: "Rumi",
  },
  {
    emoji: "🧭",
    quote: "O conhecimento sem aplicação é inútil.",
    autor: "Abu Bakr",
  },
  {
    emoji: "🪶",
    quote: "A verdadeira sabedoria consiste em saber que nada se sabe.",
    autor: "Sócrates",
  },
  {
    emoji: "🔥",
    quote: "O verdadeiro progresso é o que beneficia a todos.",
    autor: "Mahatma Gandhi",
  },
  {
    emoji: "🕯️",
    quote: "O medo não é real. Ele é uma criação da mente.",
    autor: "Will Smith",
  },
  {
    emoji: "⚖️",
    quote: "O tempo é o único capital que todos possuem igualmente.",
    autor: "Thomas Mann",
  },
  {
    emoji: "💡",
    quote:
      "A vida é como andar de bicicleta. Para manter o equilíbrio, é preciso continuar em movimento.",
    autor: "Albert Einstein",
  },
  {
    emoji: "🌹",
    quote:
      "Os filósofos apenas interpretaram o mundo de diferentes maneiras; o que importa é transformá-lo.",
    autor: "Karl Marx",
  },
  {
    emoji: "⚙️",
    quote:
      "A história de todas as sociedades até hoje é a história da luta de classes.",
    autor: "Karl Marx e Friedrich Engels",
  },
  {
    emoji: "🔥",
    quote: "Proletários de todos os países, uni-vos!",
    autor: "Karl Marx e Friedrich Engels",
  },
  {
    emoji: "🩸",
    quote:
      "A violência é a parteira de toda velha sociedade que está prenhe de uma nova.",
    autor: "Karl Marx",
  },
  {
    emoji: "🌍",
    quote:
      "De cada um segundo suas capacidades, a cada um segundo suas necessidades.",
    autor: "Karl Marx",
  },
  {
    emoji: "🧱",
    quote: "A liberdade é o reconhecimento da necessidade.",
    autor: "Friedrich Engels",
  },
  {
    emoji: "🪓",
    quote:
      "O Estado é um produto da sociedade em um certo estágio de desenvolvimento; é a confissão de que essa sociedade se enredou em uma contradição insolúvel consigo mesma.",
    autor: "Friedrich Engels",
  },
  {
    emoji: "🌾",
    quote:
      "A emancipação dos trabalhadores será obra dos próprios trabalhadores.",
    autor:
      "Associação Internacional dos Trabalhadores (Primeira Internacional)",
  },
  {
    emoji: "⚖️",
    quote:
      "O poder político é apenas o poder organizado de uma classe para oprimir outra.",
    autor: "Karl Marx",
  },
  {
    emoji: "🧭",
    quote: "A ideologia dominante é a ideologia da classe dominante.",
    autor: "Karl Marx",
  },
  {
    emoji: "📚",
    quote: "A cultura é um campo de batalha.",
    autor: "Antonio Gramsci",
  },
  {
    emoji: "🕰️",
    quote:
      "O velho mundo morre, o novo mundo luta para nascer. Este é o tempo dos monstros.",
    autor: "Antonio Gramsci",
  },
  {
    emoji: "✊",
    quote: "Pessimismo da inteligência, otimismo da vontade.",
    autor: "Antonio Gramsci",
  },
  {
    emoji: "🪶",
    quote: "Quem não se movimenta, não sente as correntes que o prendem.",
    autor: "Rosa Luxemburgo",
  },
  {
    emoji: "🌹",
    quote:
      "Por um mundo onde sejamos socialmente iguais, humanamente diferentes e totalmente livres.",
    autor: "Rosa Luxemburgo",
  },
  {
    emoji: "⚔️",
    quote: "Liberdade é sempre a liberdade de quem pensa diferente.",
    autor: "Rosa Luxemburgo",
  },
  {
    emoji: "🩶",
    quote:
      "A revolução não é um banquete, é uma insurreição, um ato de violência pelo qual uma classe derruba outra.",
    autor: "Mao Tsé-Tung",
  },
  {
    emoji: "🪖",
    quote: "O poder nasce do cano de uma arma.",
    autor: "Mao Tsé-Tung",
  },
  {
    emoji: "💬",
    quote: "A teoria torna-se uma força material quando penetra nas massas.",
    autor: "Karl Marx",
  },
  {
    emoji: "🔥",
    quote: "A revolução é impossível até que se torne inevitável.",
    autor: "Leon Trotsky",
  },
  {
    emoji: "🌄",
    quote: "A revolução é permanente ou não é nada.",
    autor: "Leon Trotsky",
  },
  {
    emoji: "💡",
    quote:
      "A história é um processo de libertação humana das formas de alienação.",
    autor: "Karl Marx",
  },
  {
    emoji: "🧩",
    quote: "Sem teoria revolucionária, não há movimento revolucionário.",
    autor: "Vladimir Lenin",
  },
  {
    emoji: "⚙️",
    quote: "O imperialismo é o estágio supremo do capitalismo.",
    autor: "Vladimir Lenin",
  },
  {
    emoji: "🪧",
    quote: "O capitalismo destrói a si mesmo como o fogo consome o oxigênio.",
    autor: "Vladimir Lenin",
  },
  {
    emoji: "🌍",
    quote: "A luta contra o imperialismo é também a luta pela humanidade.",
    autor: "Che Guevara",
  },
  {
    emoji: "🩸",
    quote: "Se tremes diante da injustiça, então és meu camarada.",
    autor: "Che Guevara",
  },
  {
    emoji: "🔥",
    quote:
      "Se você é capaz de tremer de indignação a cada vez que se comete uma injustiça, então somos companheiros.",
    autor: "Che Guevara",
  },
  {
    emoji: "✊",
    quote: "Não há revolução sem educação do povo.",
    autor: "José Carlos Mariátegui",
  },
  {
    emoji: "📖",
    quote: "O socialismo não será cópia nem imitação, mas criação heroica.",
    autor: "José Carlos Mariátegui",
  },
  {
    emoji: "🌾",
    quote: "O trabalhador livre é uma contradição em termos.",
    autor: "Karl Marx",
  },
  {
    emoji: "🪞",
    quote:
      "A religião é o suspiro da criatura oprimida, o coração de um mundo sem coração.",
    autor: "Karl Marx",
  },
  {
    emoji: "🧠",
    quote: "A consciência é determinada pelo ser social.",
    autor: "Karl Marx",
  },
  {
    emoji: "📉",
    quote:
      "O capital tem horror à ausência de lucro, como a natureza tem horror ao vácuo.",
    autor: "Karl Marx",
  },
  {
    emoji: "⚒️",
    quote: "Trabalhadores e trabalhadoras do mundo, uni-vos!",
    autor: "Karl Marx e Friedrich Engels",
  },
  {
    emoji: "🪙",
    quote:
      "A produção capitalista só desenvolve a técnica ao mesmo tempo que mina as fontes originais de toda riqueza: a terra e o trabalhador.",
    autor: "Karl Marx",
  },
  {
    emoji: "🏭",
    quote: "O capital é trabalho morto que só vive sugando o trabalho vivo.",
    autor: "Karl Marx",
  },
  {
    emoji: "🧱",
    quote:
      "Cada sociedade é tão livre quanto suas classes trabalhadoras forem conscientes.",
    autor: "Friedrich Engels",
  },
  {
    emoji: "⚖️",
    quote:
      "A justiça burguesa é apenas a forma mais refinada da injustiça de classe.",
    autor: "Karl Marx",
  },
  {
    emoji: "📜",
    quote:
      "O Estado moderno não é mais do que um comitê para gerenciar os negócios comuns da burguesia.",
    autor: "Karl Marx e Friedrich Engels",
  },
  {
    emoji: "🪧",
    quote: "O socialismo é o futuro, o capitalismo é a ruína.",
    autor: "Vladimir Lenin",
  },
  {
    emoji: "🌹",
    quote: "A liberdade não é um presente, é uma conquista coletiva.",
    autor: "Rosa Luxemburgo",
  },
  {
    emoji: "🕊️",
    quote: "A paz só virá quando cessar a exploração do homem pelo homem.",
    autor: "Karl Marx",
  },
  {
    emoji: "⚙️",
    quote: "A dialética é a alma da revolução.",
    autor: "Vladimir Lenin",
  },
  {
    emoji: "💬",
    quote: "A alienação não é apenas econômica, é existencial.",
    autor: "Karl Marx",
  },
  {
    emoji: "📚",
    quote: "Educação é o instrumento mais poderoso da luta de classes.",
    autor: "Antonio Gramsci",
  },
  {
    emoji: "🩸",
    quote: "Toda libertação social é também uma libertação espiritual.",
    autor: "Rosa Luxemburgo",
  },
  {
    emoji: "✊",
    quote:
      "A revolução é feita não por quem obedece, mas por quem ousa pensar diferente.",
    autor: "Ernesto Che Guevara",
  },
  {
    emoji: "🔥",
    quote:
      "Sonhamos com o impossível porque o possível já foi conquistado pela burguesia.",
    autor: "José Carlos Mariátegui",
  },
  {
    emoji: "🌍",
    quote:
      "O comunismo não é um sonho, é a necessidade lógica de uma humanidade cansada da exploração.",
    autor: "Karl Marx (interpretação moderna)",
  },
];

export default quotesList;
