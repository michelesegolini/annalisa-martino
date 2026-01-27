export interface HardcodedGalleryItem {
    id: string;
    title: string;
    descriptions: {
        en: string;
        it: string;
        es: string;
        fr: string;
        pt: string;
    };
    category: string;
    imageUrl: string;
    videoUrl?: string;
    isVertical: boolean;
    rowSpan: number;
    colSpan: number;
    price: string;
}

export const GALLERY_DATA: HardcodedGalleryItem[] = [
    {
        id: "1",
        title: "Aura",
        descriptions: {
            en: "An ethereal creation from the Magna Grecia collection, featuring fluid drapes that capture the golden light of dawn, evoking the presence of a goddess.",
            it: "Una creazione eterea della collezione Magna Grecia, caratterizzata da drappeggi fluidi che catturano la luce dorata dell'alba, evocando la presenza di una dea.",
            es: "Una creación etérea de la colección Magna Grecia, con drapeados fluidos que capturan la luz dorada del amanecer, evocando la presencia de una diosa.",
            fr: "Une création éthérée de la collection Magna Grecia, aux drapés fluides qui captent la lumière dorée de l'aube, évoquant la présence d'une déesse.",
            pt: "Uma criação etérea da coleção Magna Grecia, com drapeados fluidos que capturam a luz dourada do amanhecer, evocando a presença de uma deusa."
        },
        category: "Magna Grecia",
        imageUrl: "/images/fashion-item-1.png",
        price: "2.800€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "2",
        title: "Lyra",
        descriptions: {
            en: "A harmonious silhouette from the Red Carpet collection, inspired by celestial constellations. The fabric moves with a musical rhythm, perfect for a night of stardom.",
            it: "Una silhouette armoniosa della collezione Red Carpet, ispirata alle costellazioni celesti. Il tessuto si muove con un ritmo musicale, perfetto per una notte da star.",
            es: "Una silueta armoniosa de la colección Red Carpet, inspirada en constelaciones celestiales. La tela se mueve con un ritmo musical, perfecto para una noche estelar.",
            fr: "Une silhouette harmonieuse de la collection Red Carpet, inspirée des constellations célestes. Le tissu bouge avec un rythme musical, parfait pour une nuit de star.",
            pt: "Uma silhueta harmoniosa da coleção Red Carpet, inspirada nas constelações celestes. O tecido move-se com um ritmo musical, perfeito para uma noite de estrelas."
        },
        category: "Red Carpet",
        imageUrl: "/images/fashion-item-2.png",
        price: "5.000€",
        isVertical: false,
        rowSpan: 1,
        colSpan: 1
    },
    {
        id: "3",
        title: "Iris",
        descriptions: {
            en: "Vibrant and blooming, this piece from the Mediterranea collection celebrates color and life, embodied in luxurious, breathable fabrics reminiscent of a Mediterranean garden.",
            it: "Vivace e fiorente, questo capo della collezione Mediterranea celebra il colore e la vita, incarnati in tessuti lussuosi e traspiranti che ricordano un giardino mediterraneo.",
            es: "Vibrante y floreciente, esta pieza de la colección Mediterranea celebra el color y la vida, encarnada en telas lujosas y transpirables que recuerdan a un jardín mediterráneo.",
            fr: "Vibrante et florissante, cette pièce de la collection Mediterranea célèbre la couleur et la vie, incarnée dans des tissus luxueux et respirants rappelant un jardin méditerranéen.",
            pt: "Vibrante e florescente, esta peça da coleção Mediterranea celebra a cor e a vida, personificada em tecidos luxuosos e respiráveis que lembram um jardim mediterrâneo."
        },
        category: "Mediterranea",
        imageUrl: "/images/fashion-item-3.png",
        price: "3.700€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "4",
        title: "Musa",
        descriptions: {
            en: "A tribute to artistic inspiration, this Magna Grecia gown features innovative cuts and classical influences, designed for the woman who inspires art.",
            it: "Un tributo all'ispirazione artistica, questo abito Magna Grecia presenta tagli innovativi e influenze classiche, progettato per la donna che ispira l'arte.",
            es: "Un tributo a la inspiración artística, este vestido Magna Grecia presenta cortes innovadores e influencias clásicas, diseñado para la mujer que inspira arte.",
            fr: "Un hommage à l'inspiration artistique, cette robe Magna Grecia présente des coupes innovantes et des influences classiques, conçue pour la femme qui inspire l'art.",
            pt: "Um tributo à inspiração artística, este vestido Magna Grecia apresenta cortes inovadores e influências clássicas, desenhado para a mulher que inspira a arte."
        },
        category: "Magna Grecia",
        imageUrl: "/images/fashion-item-4.png",
        price: "2.700€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "5",
        title: "Alba",
        descriptions: {
            en: "Radiant as the first light of day, this Red Carpet gown combines soft hues and sparkling details to symbolize a new beginning of elegance.",
            it: "Radioso come la prima luce del giorno, questo abito Red Carpet combina tonalità morbide e dettagli scintillanti per simboleggiare un nuovo inizio di eleganza.",
            es: "Radiante como la primera luz del día, este vestido Red Carpet combina tonos suaves y detalles brillantes para simbolizar un nuevo comienzo de elegancia.",
            fr: "Radieuse comme la première lumière du jour, cette robe Red Carpet allie teintes douces et détails scintillants pour symboliser un nouveau départ d'élégance.",
            pt: "Radiante como a primeira luz do dia, este vestido Red Carpet combina tons suaves e detalhes cintilantes para simbolizar um novo começo de elegância."
        },
        category: "Red Carpet",
        imageUrl: "/images/fashion-item-5.png",
        price: "2.700€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "6",
        title: "Lune",
        descriptions: {
            en: "Mysterious and captivating, featuring silver tones and moonlit textures. A Red Carpet masterpiece that commands attention with its quiet power.",
            it: "Misterioso e affascinante, con toni argentei e texture al chiaro di luna. Un capolavoro Red Carpet che attira l'attenzione con il suo potere silenzioso.",
            es: "Misterioso y cautivador, con tonos plateados y texturas a la luz de la luna. Una obra maestra de Red Carpet que llama la atención con su poder silencioso.",
            fr: "Mystérieuse et captivante, aux tons argentés et textures au clair de lune. Un chef-d'œuvre Red Carpet qui attire l'attention par sa puissance silencieuse.",
            pt: "Misterioso e cativante, com tons prateados e texturas ao luar. Uma obra-prima Red Carpet que impõe atenção com o seu poder silencioso."
        },
        category: "Red Carpet",
        imageUrl: "/images/fashion-item-6.png",
        price: "5.000€",
        isVertical: false,
        rowSpan: 1,
        colSpan: 2
    },
    {
        id: "7",
        title: "Soul",
        descriptions: {
            en: "Deep and spiritual, the Soul gown from the Magna Grecia collection strips away the unnecessary to reveal pure, essential beauty through masterful tailoring.",
            it: "Profondo e spirituale, l'abito Soul della collezione Magna Grecia elimina il superfluo per rivelare una bellezza pura ed essenziale attraverso una sartoria magistrale.",
            es: "Profundo y espiritual, el vestido Soul de la colección Magna Grecia elimina lo innecesario para revelar una belleza pura y esencial a través de una sastrería magistral.",
            fr: "Profonde et spirituelle, la robe Soul de la collection Magna Grecia dépouille le superflu pour révéler une beauté pure et essentielle grâce à une couture magistrale.",
            pt: "Profundo e espiritual, o vestido Soul da coleção Magna Grecia elimina o desnecessário para revelar uma beleza pura e essencial através de uma alfaiataria magistral."
        },
        category: "Magna Grecia",
        imageUrl: "/images/fashion-item-1.png",
        price: "4.200€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "8",
        title: "Aria",
        descriptions: {
            en: "Light as a breeze, this Mediterranea piece features airy fabrics and effortless structure, perfect for the modern woman who values freedom and style.",
            it: "Leggero come una brezza, questo capo Mediterranea presenta tessuti ariosi e una struttura disinvolta, perfetto per la donna moderna che apprezza libertà e stile.",
            es: "Ligero como una brisa, esta pieza Mediterranea presenta telas aireadas y una estructura sin esfuerzo, perfecta para la mujer moderna que valora la libertad y el estilo.",
            fr: "Légère comme une brise, cette pièce Mediterranea présente des tissus aériens et une structure sans effort, parfaite pour la femme moderne qui chérit liberté et style.",
            pt: "Leve como uma brisa, esta peça Mediterranea apresenta tecidos arejados e estrutura descontraída, perfeita para a mulher moderna que valoriza liberdade e estilo."
        },
        category: "Mediterranea",
        imageUrl: "/images/fashion-item-2.png",
        price: "4.100€",
        isVertical: false,
        rowSpan: 1,
        colSpan: 1
    },
    {
        id: "9",
        title: "Diva",
        descriptions: {
            en: "Bold and dramatic, Diva is the ultimate Red Carpet statement. With commanding lines and luxurious detailing, it ensures all eyes are on you.",
            it: "Audace e drammatico, Diva è la dichiarazione definitiva da Red Carpet. Con linee imponenti e dettagli lussuosi, assicura che tutti gli occhi siano su di te.",
            es: "Audaz y dramático, Diva es la declaración definitiva de Red Carpet. Con líneas imponentes y detalles lujosos, asegura que todas las miradas estén puestas en ti.",
            fr: "Audacieuse et dramatique, Diva est l'ultime déclaration Red Carpet. Avec des lignes imposantes et des détails luxueux, elle assure que tous les regards soient sur vous.",
            pt: "Ousada e dramática, Diva é a afirmação definitiva do Red Carpet. Com linhas imponentes e detalhes luxuosos, garante que todos os olhos estejam em você."
        },
        category: "Red Carpet",
        imageUrl: "/images/fashion-item-3.png",
        price: "7.500€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "10",
        title: "Icon",
        descriptions: {
            en: "Timeless and memorable, this gown defines the Red Carpet collection. A statue-esque silhouette that blends modern trends with eternal elegance.",
            it: "Senza tempo e memorabile, questo abito definisce la collezione Red Carpet. Una silhouette statuaria che fonde le tendenze moderne con l'eleganza eterna.",
            es: "Atemporal y memorable, este vestido define la colección Red Carpet. Una silueta estatuaria que combina tendencias modernas con elegancia eterna.",
            fr: "Intemporelle et mémorable, cette robe définit la collection Red Carpet. Une silhouette sculpturale qui mêle tendances modernes et élégance éternelle.",
            pt: "Atemporal e memorável, este vestido define a coleção Red Carpet. Uma silhueta estatuária que mistura tendências modernas com elegância eterna."
        },
        category: "Red Carpet",
        imageUrl: "/images/fashion-item-4.png",
        price: "5.500€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "11",
        title: "Ritual",
        descriptions: {
            en: "Intricate and ceremonial, Ritual features complex embroidery and sacred geometry patterns, making it a masterpiece of the Red Carpet collection.",
            it: "Intricato e cerimoniale, Ritual presenta ricami complessi e motivi di geometria sacra, rendendolo un capolavoro della collezione Red Carpet.",
            es: "Intrincado y ceremonial, Ritual presenta bordados complejos y patrones de geometría sagrada, convirtiéndolo en una obra maestra de la colección Red Carpet.",
            fr: "Intricat et cérémoniel, Ritual présente des broderies complexes et des motifs de géométrie sacrée, en faisant un chef-d'œuvre de la collection Red Carpet.",
            pt: "Intrincado e cerimonial, Ritual apresenta bordados complexos e padrões de geometria sagrada, tornando-o uma obra-prima da coleção Red Carpet."
        },
        category: "Red Carpet",
        imageUrl: "/images/fashion-item-5.png",
        price: "4.500€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "12",
        title: "Noir",
        descriptions: {
            en: "The epitome of sophistication, this black Red Carpet gown explores the depth of darkness with textured fabrics and a mysterious allure.",
            it: "L'epitome della raffinatezza, questo abito nero Red Carpet esplora la profondità dell'oscurità con tessuti strutturati e un fascino misterioso.",
            es: "El epítome de la sofisticación, este vestido negro Red Carpet explora la profundidad de la oscuridad con telas texturizadas y un encanto misterioso.",
            fr: "L'incarnation de la sophistication, cette robe noire Red Carpet explore la profondeur de l'obscurité avec des tissus texturés et une allure mystérieuse.",
            pt: "O epítome da sofisticação, este vestido preto Red Carpet explora a profundidade da escuridão com tecidos texturizados e um encanto misterioso."
        },
        category: "Red Carpet",
        imageUrl: "/images/fashion-item-6.png",
        price: "4.200€",
        isVertical: false,
        rowSpan: 1,
        colSpan: 1
    },
    {
        id: "13",
        title: "Essenza",
        descriptions: {
            en: "Distilled beauty in its purest form. Essenza from the Red Carpet collection focuses on the perfect line and the absolute quality of the material.",
            it: "Bellezza distillata nella sua forma più pura. Essenza della collezione Red Carpet si concentra sulla linea perfetta e sulla qualità assoluta del materiale.",
            es: "Belleza destilada en su forma más pura. Essenza de la colección Red Carpet se centra en la línea perfecta y la calidad absoluta del material.",
            fr: "La beauté distillée dans sa forme la plus pure. Essenza de la collection Red Carpet se concentre sur la ligne parfaite et la qualité absolue du matériau.",
            pt: "Beleza destilada na sua forma mais pura. Essenza da coleção Red Carpet foca na linha perfeita e na qualidade absoluta do material."
        },
        category: "Red Carpet",
        imageUrl: "/images/fashion-item-1.png",
        price: "5.550€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "14",
        title: "Divina",
        descriptions: {
            en: "Fit for a goddess, Divina brings the divine to earth. Part of the Magna Grecia collection, it drapes the body in heavenly comfort and style.",
            it: "Degno di una dea, Divina porta il divino sulla terra. Parte della collezione Magna Grecia, avvolge il corpo in comfort e stile celestiali.",
            es: "Digno de una diosa, Divina trae lo divino a la tierra. Parte de la colección Magna Grecia, envuelve el cuerpo en confort y estilo celestiales.",
            fr: "Digne d'une déesse, Divina apporte le divin sur terre. Faisant partie de la collection Magna Grecia, elle enveloppe le corps d'un confort et d'un style célestes.",
            pt: "Digno de uma deusa, Divina traz o divino para a terra. Parte da coleção Magna Grecia, envolve o corpo em conforto e estilo celestiais."
        },
        category: "Magna Grecia",
        imageUrl: "/images/fashion-item-2.png",
        price: "2.950€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "15",
        title: "Silente",
        descriptions: {
            en: "Quiet luxury defined. Silente whispers elegance rather than shouting it, using subtle textures and impeccable Red Carpet tailoring.",
            it: "Il lusso tranquillo definito. Silente sussurra eleganza invece di gridarla, usando texture sottili e un'impeccabile sartoria Red Carpet.",
            es: "Lujo tranquilo definido. Silente susurra elegancia en lugar de gritarla, utilizando texturas sutiles y una sastrería Red Carpet impecable.",
            fr: "Le luxe discret défini. Silente murmure l'élégance au lieu de la crier, utilisant des textures subtiles et une couture Red Carpet impeccable.",
            pt: "Luxo tranquilo definido. Silente sussurra elegância em vez de gritá-la, usando texturas sutis e uma alfaiataria Red Carpet impecável."
        },
        category: "Red Carpet",
        imageUrl: "/images/fashion-item-3.png",
        price: "3.700€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "16",
        title: "Elios",
        descriptions: {
            en: "Inspired by the sun god, Elios radiates warmth and power. A Magna Grecia key piece that embodies energy and life through golden hues.",
            it: "Ispirato al dio sole, Elios irradia calore e potenza. Un pezzo chiave Magna Grecia che incarna energia e vita attraverso tonalità dorate.",
            es: "Inspirado en el dios sol, Elios irradia calor y poder. Una pieza clave de Magna Grecia que encarna energía y vida a través de tonos dorados.",
            fr: "Inspiré par le dieu soleil, Elios rayonne de chaleur et de puissance. Une pièce maîtresse de Magna Grecia qui incarne l'énergie et la vie à travers des teintes dorées.",
            pt: "Inspirado no deus sol, Elios irradia calor e poder. Uma peça chave da Magna Grecia que incorpora energia e vida através de tons dourados."
        },
        category: "Magna Grecia",
        imageUrl: "/images/fashion-item-4.png",
        price: "2.700€",
        isVertical: false,
        rowSpan: 1,
        colSpan: 1
    },
    {
        id: "17",
        title: "Dorea",
        descriptions: {
            en: "A golden gift to fashion. Dorea is an opulent Red Carpet gown that uses rich materials to create a sensation of precious luxury.",
            it: "Un dono d'oro alla moda. Dorea è un abito Red Carpet opulento che utilizza materiali ricchi per creare una sensazione di lusso prezioso.",
            es: "Un regalo dorado a la moda. Dorea es un vestido Red Carpet opulento que utiliza materiales ricos para crear una sensación de lujo precioso.",
            fr: "Un cadeau en or à la mode. Dorea est une robe Red Carpet opulente qui utilise des matériaux riches pour créer une sensation de luxe précieux.",
            pt: "Um presente de ouro para a moda. Dorea é um vestido Red Carpet opulento que usa materiais ricos para criar uma sensação de luxo precioso."
        },
        category: "Red Carpet",
        imageUrl: "/images/fashion-item-5.png",
        price: "2.800€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "18",
        title: "Incanto",
        descriptions: {
            en: "Pure enchantment. Incanto casts a spell with its Magna Grecia roots and magical flow, ensuring a mesmerizing presence at any event.",
            it: "Puro incanto. Incanto lancia un incantesimo con le sue radici Magna Grecia e il suo flusso magico, assicurando una presenza ipnotica a qualsiasi evento.",
            es: "Puro encanto. Incanto lanza un hechizo con sus raíces Magna Grecia y su flujo mágico, asegurando una presencia fascinante en cualquier evento.",
            fr: "Pur enchantement. Incanto jette un sort avec ses racines Magna Grecia et son flux magique, assurant une présence envoûtante à tout événement.",
            pt: "Puro encantamento. Incanto lança um feitiço com as suas raízes Magna Grecia e o seu fluxo mágico, garantindo uma presença hipnotizante em qualquer evento."
        },
        category: "Magna Grecia",
        imageUrl: "/images/fashion-item-6.png",
        price: "2.950€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    }
];
