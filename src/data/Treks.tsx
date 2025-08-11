export interface Treks {
  id: number
  name: string
  description: string
  imageUrl: string
  location: string
  altitude: string
  maxAltitude: number
}

export const trekkinginfo: Treks[] = [
  {
    id: 1,
    name: "Annapurna Region",
    description: "A diverse trek with mountain views, Gurung villages, and the iconic Thorong La Pass.",
    imageUrl: "https://i.pinimg.com/1200x/1f/07/61/1f0761fe50b6f7065295facdabbc3888.jpg",
    location: "Annapurna Zone",
    altitude: "800m to 5,416m",
    maxAltitude: 5416,
  },
  {
    id: 2,
    name: "Everest Region",
    description: "Follow legendary trails to Everest, passing Sherpa villages and dramatic peaks.",
    imageUrl: "https://i.pinimg.com/736x/f6/07/c2/f607c258d0496fc99679b72ddc950f74.jpg",
    location: "Solukhumbu District",
    altitude: "2,800m to 5,545m",
    maxAltitude: 5545,
  },
  {
    id: 3,
    name: "Langtang Region",
    description: "A peaceful trek near Kathmandu with forests, glaciers, and Tamang culture.",
    imageUrl: "https://i.pinimg.com/1200x/48/8c/c9/488cc9fe4e540b5227ba7e11b64434e0.jpg",
    location: "Rasuwa District",
    altitude: "1,470m to 4,984m",
    maxAltitude: 4984,
  },
  {
    id: 4,
    name: "Manaslu Region",
    description: "A remote circuit with views of Manaslu and Tibetan-influenced villages.",
    imageUrl: "https://i.pinimg.com/1200x/ca/66/19/ca6619121c189c63b7e4fa1cee8b48eb.jpg",
    location: "Gorkha District",
    altitude: "700m to 5,160m",
    maxAltitude: 5160,
  },
  {
    id: 5,
    name: "Mustang Region",
    description: "Explore arid valleys, ancient caves, and the walled city of Lo Manthang.",
    imageUrl: "https://i.pinimg.com/736x/07/2b/e9/072be96a4e88c546dc538ae0b0fb4c93.jpg",
    location: "Upper Mustang",
    altitude: "2,800m to 4,200m",
    maxAltitude: 4200,
  },
  {
    id: 6,
    name: "Dolpo Region",
    description: "A mystical trail through rugged landscapes and remote Buddhist villages.",
    imageUrl: "https://i.pinimg.com/1200x/97/2b/b5/972bb5eb9b13d680aa743c59db1797f7.jpg",
    location: "Dolpa District",
    altitude: "2,500m to 5,190m",
    maxAltitude: 5190,
  },
]
