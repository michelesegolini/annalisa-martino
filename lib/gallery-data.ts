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
}

export const GALLERY_DATA: HardcodedGalleryItem[] = [
    {
        id: "1",
        title: "Eleganza di Seta",
        descriptions: {
            en: "Handcrafted silk evening gown with intricate embroidery, featuring fluid fabric that captures movement and light.",
            it: "Abito da sera in seta lavorato a mano con ricamo intricato, caratterizzato da tessuto fluido che cattura movimento e luce.",
            es: "Vestido de noche de seda hecho a mano con bordados intrincados, con una tela fluida che captura el movimiento y la luz.",
            fr: "Robe du soir en soie faite à la main avec des broderies complexes, dotée d'un tissu fluide qui capte le mouvement et la lumière.",
            pt: "Vestido de noite em seda feito à mão com bordados intrínsecos, com tecido fluido que capta o movimento e a luz."
        },
        category: "Evening Wear",
        imageUrl: "https://placehold.co/1200x1600.png?text=Silk+Elegance",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "2",
        title: "Sogni di Velluto",
        descriptions: {
            en: "Luxurious velvet gown with a contemporary silhouette, showcasing the rich texture and depth of Italian craftsmanship.",
            it: "Lussuoso abito in velluto con silhouette contemporanea, che mette in mostra la ricca texture e la profondità dell'artigianato italiano.",
            es: "Lujoso vestido de terciopelo con una silueta contemporánea, que muestra la rica textura y profundidad de la artesanía italiana.",
            fr: "Robe luxueuse en velours à la silhouette contemporaine, mettant en valeur la texture riche et la profondeur de l'artisanat italien.",
            pt: "Luxuoso vestido de veludo com silhueta contemporânea, exibindo a rica textura e profundidade do artesanato italiano."
        },
        category: "Cocktail",
        imageUrl: "https://placehold.co/1200x800.png?text=Velvet+Dreams",
        isVertical: false,
        rowSpan: 1,
        colSpan: 1
    },
    {
        id: "3",
        title: "Raffinatezza di Pizzo",
        descriptions: {
            en: "Delicate lace creation with modern lines, combining traditional techniques with avant-garde design.",
            it: "Delicata creazione in pizzo con linee moderne, che combina tecniche tradizionali con design all'avanguardia.",
            es: "Delicada creación de encaje con líneas modernas, que combina técnicas tradicionales con un diseño vanguardista.",
            fr: "Délicate création en dentelle aux lignes modernes, alliant techniques traditionnelles et design d'avant-garde.",
            pt: "Delicada criação de renda com linhas modernas, combinando técnicas tradicionais com design de vanguarda."
        },
        category: "Bridal",
        imageUrl: "https://placehold.co/1200x1600.png?text=Lace+Sophistication",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "4",
        title: "Grazia di Chiffon",
        descriptions: {
            en: "Ethereal chiffon ensemble that moves like a whisper, embodying the essence of Italian demi-couture.",
            it: "Ensemble etereo in chiffon che si muove come un sussurro, incarnando l'essenza della demi-couture italiana.",
            es: "Conjunto de gasa etérea que se mueve como un susurro, encarnando la esencia de la demi-couture italiana.",
            fr: "Ensemble en mousseline éthéré qui bouge comme un murmure, incarnant l'essence de la demi-couture italienne.",
            pt: "Conjunto etéreo de chiffon que se move como um sussurro, incorporando a essência da demi-couture italiana."
        },
        category: "Ceremony",
        imageUrl: "https://placehold.co/1200x800.png?text=Chiffon+Grace",
        isVertical: false,
        rowSpan: 1,
        colSpan: 2
    }
];
