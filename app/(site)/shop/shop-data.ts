// Gemeinsamer Produktkatalog + Preis-Helfer.
// Wird sowohl vom Client (ShopClient) als auch von der Server-Action (actions.ts)
// importiert, damit Preise/Namen serverseitig autoritativ bleiben.

export type Tier = { sizes: string[]; price: string; label: string };
export type ColorSwatch = { name: string; hex: string };
export type Product = {
  id: string;
  name: string;
  images: string[];
  note: string;
  tiers: Tier[];
  colors?: ColorSwatch[];
};

export const products: Product[] = [
  {
    id: 'trainingsanzug',
    name: 'Trainingsanzug',
    images: ['/trainingsanzug.jpg'],
    note: 'Mit JKA-Berlin-Logo',
    tiers: [
      { sizes: ['140', '152', '164'], price: '55,00 €', label: '140 · 152 · 164' },
      { sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: '60,00 €', label: 'S · M · L · XL · XXL' },
    ],
  },
  {
    id: 'hoodie',
    name: 'Hoodie',
    images: ['/jka_hoodie.jpg'],
    note: 'Kapuzenpullover mit JKA-Berlin-Aufdruck',
    tiers: [
      { sizes: ['152', '164'], price: '37,00 €', label: '152 · 164' },
      { sizes: ['S', 'M', 'L', 'XL'], price: '42,00 €', label: 'S · M · L · XL' },
    ],
  },
  {
    id: 'tshirt-shobu',
    name: 'T-Shirt (Shobu)',
    images: ['/t_shirt_shobu.jpg'],
    note: 'Shobu-Motiv',
    tiers: [{ sizes: ['S', 'M', 'L', 'XL'], price: '14,00 €', label: 'S · M · L · XL' }],
  },
  {
    id: 'tshirt',
    name: 'T-Shirt',
    images: ['/t-shirt-rueckenprint.jpg', '/t-shirt-rueckenprint_2.jpg'],
    note: 'Mit Rückenprint',
    tiers: [{ sizes: ['S', 'M', 'L', 'XL'], price: '14,00 €', label: 'S · M · L · XL' }],
    colors: [
      { name: 'Schwarz', hex: '#18181b' },
      { name: 'Rot', hex: '#dc2626' },
      { name: 'Flaschengrün', hex: '#166534' },
      { name: 'Orange', hex: '#f97316' },
    ],
  },
  {
    id: 'sporttasche',
    name: 'Sporttasche',
    images: ['/sporttasche.jpg'],
    note: 'Mit Vereinslogo bestickt',
    tiers: [{ sizes: [], price: '43,00 €', label: 'Einheitsgröße' }],
  },
  {
    id: 'basecap',
    name: 'Base Cap',
    images: ['/basecap.jpg'],
    note: 'Universalgröße',
    tiers: [{ sizes: [], price: '10,00 €', label: 'Universal' }],
    colors: [
      { name: 'Rot', hex: '#dc2626' },
      { name: 'Dunkelblau', hex: '#1e3a5f' },
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getPriceForSize(product: Product, size: string): string | null {
  if (product.tiers[0].sizes.length === 0) return product.tiers[0].price;
  for (const tier of product.tiers) {
    if (tier.sizes.includes(size)) return tier.price;
  }
  return null;
}

export function parsePrice(str: string): number {
  return parseFloat(str.replace(',', '.').replace(/\s*€/, '').trim());
}

export function fmt(n: number): string {
  return n.toFixed(2).replace('.', ',') + ' €';
}
