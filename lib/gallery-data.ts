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
            en: "Exclusive creation from the Magna Grecia collection.",
            it: "Creazione esclusiva dalla collezione Magna Grecia.",
            es: "Creación exclusiva de la colección Magna Grecia.",
            fr: "Création exclusive de la collection Magna Grecia.",
            pt: "Criação exclusiva da coleção Magna Grecia."
        },
        category: "Magna Grecia",
        imageUrl: "https://placehold.co/1200x1600.png?text=Aura",
        price: "2.800€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "2",
        title: "Lyra",
        descriptions: {
            en: "Exclusive creation from the Red Carpet collection.",
            it: "Creazione esclusiva dalla collezione Red Carpet.",
            es: "Creación exclusiva de la colección Red Carpet.",
            fr: "Création exclusive de la collection Red Carpet.",
            pt: "Criação exclusiva da coleção Red Carpet."
        },
        category: "Red Carpet",
        imageUrl: "https://placehold.co/1200x800.png?text=Lyra",
        price: "5.000€",
        isVertical: false,
        rowSpan: 1,
        colSpan: 1
    },
    {
        id: "3",
        title: "Iris",
        descriptions: {
            en: "Exclusive creation from the Mediterranea collection.",
            it: "Creazione esclusiva dalla collezione Mediterranea.",
            es: "Creación exclusiva de la colección Mediterranea.",
            fr: "Création exclusive de la collection Mediterranea.",
            pt: "Criação exclusiva da coleção Mediterranea."
        },
        category: "Mediterranea",
        imageUrl: "https://placehold.co/1200x1600.png?text=Iris",
        price: "3.700€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "4",
        title: "Musa",
        descriptions: {
            en: "Exclusive creation from the Magna Grecia collection.",
            it: "Creazione esclusiva dalla collezione Magna Grecia.",
            es: "Creación exclusiva de la colección Magna Grecia.",
            fr: "Création exclusive de la collection Magna Grecia.",
            pt: "Criação exclusiva da coleção Magna Grecia."
        },
        category: "Magna Grecia",
        imageUrl: "https://placehold.co/1200x1600.png?text=Musa",
        price: "2.700€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "5",
        title: "Alba",
        descriptions: {
            en: "Exclusive creation from the Red Carpet collection.",
            it: "Creazione esclusiva dalla collezione Red Carpet.",
            es: "Creación exclusiva de la colección Red Carpet.",
            fr: "Création exclusive de la collection Red Carpet.",
            pt: "Criação exclusiva da coleção Red Carpet."
        },
        category: "Red Carpet",
        imageUrl: "https://placehold.co/1200x1600.png?text=Alba",
        price: "2.700€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "6",
        title: "Lune",
        descriptions: {
            en: "Exclusive creation from the Red Carpet collection.",
            it: "Creazione esclusiva dalla collezione Red Carpet.",
            es: "Creación exclusiva de la colección Red Carpet.",
            fr: "Création exclusive de la collection Red Carpet.",
            pt: "Criação exclusiva da coleção Red Carpet."
        },
        category: "Red Carpet",
        imageUrl: "https://placehold.co/1200x800.png?text=Lune",
        price: "5.000€",
        isVertical: false,
        rowSpan: 1,
        colSpan: 2
    },
    {
        id: "7",
        title: "Soul",
        descriptions: {
            en: "Exclusive creation from the Magna Grecia collection.",
            it: "Creazione esclusiva dalla collezione Magna Grecia.",
            es: "Creación exclusiva de la colección Magna Grecia.",
            fr: "Création exclusive de la collection Magna Grecia.",
            pt: "Criação exclusiva da coleção Magna Grecia."
        },
        category: "Magna Grecia",
        imageUrl: "https://placehold.co/1200x1600.png?text=Soul",
        price: "4.200€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "8",
        title: "Aria",
        descriptions: {
            en: "Exclusive creation from the Mediterranea collection.",
            it: "Creazione esclusiva dalla collezione Mediterranea.",
            es: "Creación exclusiva de la colección Mediterranea.",
            fr: "Création exclusive de la collection Mediterranea.",
            pt: "Criação exclusiva da coleção Mediterranea."
        },
        category: "Mediterranea",
        imageUrl: "https://placehold.co/1200x800.png?text=Aria",
        price: "4.100€",
        isVertical: false,
        rowSpan: 1,
        colSpan: 1
    },
    {
        id: "9",
        title: "Diva",
        descriptions: {
            en: "Exclusive creation from the Red Carpet collection.",
            it: "Creazione esclusiva dalla collezione Red Carpet.",
            es: "Creación exclusiva de la colección Red Carpet.",
            fr: "Création exclusive de la collection Red Carpet.",
            pt: "Criação exclusiva da coleção Red Carpet."
        },
        category: "Red Carpet",
        imageUrl: "https://placehold.co/1200x1600.png?text=Diva",
        price: "7.500€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "10",
        title: "Icon",
        descriptions: {
            en: "Exclusive creation from the Red Carpet collection.",
            it: "Creazione esclusiva dalla collezione Red Carpet.",
            es: "Creación exclusiva de la colección Red Carpet.",
            fr: "Création exclusive de la collection Red Carpet.",
            pt: "Criação exclusiva da coleção Red Carpet."
        },
        category: "Red Carpet",
        imageUrl: "https://placehold.co/1200x1600.png?text=Icon",
        price: "5.500€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "11",
        title: "Ritual",
        descriptions: {
            en: "Exclusive creation from the Red Carpet collection.",
            it: "Creazione esclusiva dalla collezione Red Carpet.",
            es: "Creación exclusiva de la colección Red Carpet.",
            fr: "Création exclusive de la collection Red Carpet.",
            pt: "Criação exclusiva da coleção Red Carpet."
        },
        category: "Red Carpet",
        imageUrl: "https://placehold.co/1200x1600.png?text=Ritual",
        price: "4.500€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "12",
        title: "Noir",
        descriptions: {
            en: "Exclusive creation from the Red Carpet collection.",
            it: "Creazione esclusiva dalla collezione Red Carpet.",
            es: "Creación exclusiva de la colección Red Carpet.",
            fr: "Création exclusive de la collection Red Carpet.",
            pt: "Criação exclusiva da coleção Red Carpet."
        },
        category: "Red Carpet",
        imageUrl: "https://placehold.co/1200x800.png?text=Noir",
        price: "4.200€",
        isVertical: false,
        rowSpan: 1,
        colSpan: 1
    },
    {
        id: "13",
        title: "Essenza",
        descriptions: {
            en: "Exclusive creation from the Red Carpet collection.",
            it: "Creazione esclusiva dalla collezione Red Carpet.",
            es: "Creación exclusiva de la collezione Red Carpet.",
            fr: "Création exclusive de la collection Red Carpet.",
            pt: "Criação exclusiva da coleção Red Carpet."
        },
        category: "Red Carpet",
        imageUrl: "https://placehold.co/1200x1600.png?text=Essenza",
        price: "5.550€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "14",
        title: "Divina",
        descriptions: {
            en: "Exclusive creation from the Magna Grecia collection.",
            it: "Creazione esclusiva dalla collezione Magna Grecia.",
            es: "Creación exclusiva de la colección Magna Grecia.",
            fr: "Création exclusive de la collection Magna Grecia.",
            pt: "Criação exclusiva da coleção Magna Grecia."
        },
        category: "Magna Grecia",
        imageUrl: "https://placehold.co/1200x1600.png?text=Divina",
        price: "2.950€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "15",
        title: "Silente",
        descriptions: {
            en: "Exclusive creation from the Red Carpet collection.",
            it: "Creazione esclusiva dalla collezione Red Carpet.",
            es: "Creación exclusiva de la colección Red Carpet.",
            fr: "Création exclusive de la collection Red Carpet.",
            pt: "Criação exclusiva da coleção Red Carpet."
        },
        category: "Red Carpet",
        imageUrl: "https://placehold.co/1200x1600.png?text=Silente",
        price: "3.700€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "16",
        title: "Elios",
        descriptions: {
            en: "Exclusive creation from the Magna Grecia collection.",
            it: "Creazione esclusiva dalla collezione Magna Grecia.",
            es: "Creación exclusiva de la colección Magna Grecia.",
            fr: "Création exclusive de la collection Magna Grecia.",
            pt: "Criação exclusiva da coleção Magna Grecia."
        },
        category: "Magna Grecia",
        imageUrl: "https://placehold.co/1200x800.png?text=Elios",
        price: "2.700€",
        isVertical: false,
        rowSpan: 1,
        colSpan: 1
    },
    {
        id: "17",
        title: "Dorea",
        descriptions: {
            en: "Exclusive creation from the Red Carpet collection.",
            it: "Creazione esclusiva dalla collezione Red Carpet.",
            es: "Creación exclusiva de la colección Red Carpet.",
            fr: "Création exclusive de la collection Red Carpet.",
            pt: "Criação exclusiva da coleção Red Carpet."
        },
        category: "Red Carpet",
        imageUrl: "https://placehold.co/1200x1600.png?text=Dorea",
        price: "2.800€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    },
    {
        id: "18",
        title: "Incanto",
        descriptions: {
            en: "Exclusive creation from the Magna Grecia collection.",
            it: "Creazione esclusiva dalla collezione Magna Grecia.",
            es: "Creación exclusiva de la colección Magna Grecia.",
            fr: "Création exclusive de la collection Magna Grecia.",
            pt: "Criação exclusiva da coleção Magna Grecia."
        },
        category: "Magna Grecia",
        imageUrl: "https://placehold.co/1200x1600.png?text=Incanto",
        price: "2.950€",
        isVertical: true,
        rowSpan: 2,
        colSpan: 1
    }
];
