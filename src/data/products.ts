import { Product, FAQItem } from '../types';

export const CATEGORIES_DATA = [
  {
    id: 'tops',
    name: 'Crochet Tops',
    categoryKey: 'Tops',
    subtitle: 'Soft, stylish & handmade',
    description: 'Bespoke breathable tops, vests, and cardigans slow-crafted with 100% combed cotton yarn for lightweight elegance.',
    image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
    count: 6,
  },
  {
    id: 'bags',
    name: 'Crochet Bags',
    categoryKey: 'Bags',
    subtitle: 'Everyday pieces with personality',
    description: 'Tote bags, shoulder pouches, and crossbody treasures lined with natural linen and reinforced with artisanal handles.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=80',
    count: 7,
  },
  {
    id: 'toys',
    name: 'Crochet Toys',
    categoryKey: 'Toys',
    subtitle: 'Handmade little friends',
    description: 'Child-safe amigurumi companions stitched with ultra-soft milk cotton yarn and hypoallergenic polyfill stuffing.',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1600&q=80',
    count: 5,
  },
  {
    id: 'home-decor',
    name: 'Home & Decor',
    categoryKey: 'Home & Decor',
    subtitle: 'Small details for beautiful spaces',
    description: 'Floral coaster sets, artisanal plant hangers, and bohemian wall tapestries that bring warmth to your sanctuary.',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80',
    count: 5,
  },
  {
    id: 'gifts',
    name: 'Handmade Gifts',
    categoryKey: 'Gifts',
    subtitle: 'Thoughtful handmade gifting',
    description: 'Everlasting crochet floral bouquets, hair scrunchies, and keepsake tokens packaged in recycled botanical kraft boxes.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1600&q=80',
    count: 4,
  },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'cr-top-01',
    name: 'Cloud Petal Crochet Top',
    slug: 'cloud-petal-crochet-top',
    category: 'Tops',
    price: 1499,
    comparePrice: 1899,
    rating: 4.9,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Cream', hex: '#F4EBE1' },
      { name: 'Soft Pink', hex: '#D9A7A0' },
      { name: 'Sage Green', hex: '#AAB5A0' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'An ethereal halter top with scalloped petal borders and an adjustable corset-style lace tie back. Knitted with delicate floral open-work stitches that ensure breathability and a flattering silhouette.',
    material: '100% Organic Combed Cotton Yarn (4-ply)',
    details: [
      'Handcrafted stitch by stitch by master artisans',
      'Customizable lace-up back accommodates multiple body types',
      'Double-lined cups for comfort and opacity',
      'Featherlight texture (approx 180g)',
      'Handmade in Jaipur, India'
    ],
    sizeDimensions: {
      length: '38 cm (from shoulder to scalloped hem)',
      width: 'Adjustable bust width (32" - 38")',
      handle: 'Lace straps 65 cm each'
    },
    care: [
      'Hand wash gently in cold water with mild liquid soap',
      'Do not wring or twist the delicate yarn loops',
      'Gently press between two towels to remove excess water',
      'Lay flat on a clean dry towel away from direct sun'
    ],
    handmadeNote: 'Because each top is crocheted by hand, subtle variations in tension and stitch texture make your piece uniquely one-of-a-kind.',
    stock: 7,
    tags: ['Tops', 'Floral', 'Bestseller', 'Summer', 'Petal'],
    isBestSeller: true,
    isNewArrival: false,
    featured: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Priya Sharma',
        rating: 5,
        date: '14 Feb 2026',
        verified: true,
        comment: 'The craftsmanship is unbelievable! The adjustable tie-back fit my torso perfectly and the cream yarn feels so gentle on sensitive skin.',
        location: 'Bengaluru'
      },
      {
        id: 'rev-2',
        author: 'Riya Verma',
        rating: 5,
        date: '28 Jan 2026',
        verified: true,
        comment: 'Received compliments all evening at brunch. Worth every rupee for true handmade fashion.',
        location: 'Mumbai'
      }
    ]
  },
  {
    id: 'cr-bag-01',
    name: 'Daisy Bloom Crochet Bag',
    slug: 'daisy-bloom-crochet-bag',
    category: 'Bags',
    price: 899,
    comparePrice: 1199,
    rating: 4.9,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Cream / Yellow', hex: '#F7F3E9' },
      { name: 'Dusty Pink', hex: '#D9A7A0' },
      { name: 'Olive Sage', hex: '#AAB5A0' }
    ],
    sizes: ['One Size'],
    description: 'Our iconic retro-chic daisy bag, composed of 13 individually crocheted floral granny squares meticulously seamed together. Features reinforced sturdy cotton handles and a hidden magnetic snap clasp.',
    material: 'Mercerized Natural Cotton Yarn & 100% Linen Interior Lining',
    details: [
      'Hand-stitched daisy petals with raised 3D texture',
      'Internal organic cotton pocket for keys and lipstick',
      'Reinforced strap anchor stitches prevent stretching over time',
      'Holds daily essentials: phone, wallet, sunglasses, compact bottle',
      'Handmade in India'
    ],
    sizeDimensions: {
      width: '30 cm',
      height: '26 cm',
      handle: '24 cm shoulder drop (52 cm total length)',
      depth: '6 cm expandable base'
    },
    care: [
      'Spot clean with mild detergent and a damp cotton cloth',
      'For full wash: cold water gentle hand soak',
      'Reshape flat while damp',
      'Never tumble dry'
    ],
    handmadeNote: 'Each daisy square requires 45 minutes of mindful crochet work. No two bags have identical tension.',
    stock: 12,
    tags: ['Bags', 'Daisy', 'Granny Square', 'Retro', 'Bestseller'],
    isBestSeller: true,
    isNewArrival: false,
    featured: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Ananya Mehta',
        rating: 5,
        date: '02 Mar 2026',
        verified: true,
        comment: 'Absolutely beautiful! The bag feels even more special in person. The inner lining is so neat and the daisies are fluffy and well-defined.',
        location: 'Delhi'
      },
      {
        id: 'rev-4',
        author: 'Kavya S.',
        rating: 5,
        date: '19 Feb 2026',
        verified: true,
        comment: 'My go-to bag for farmers markets and weekend cafe hops. Gets endless compliments!',
        location: 'Pune'
      }
    ]
  },
  {
    id: 'cr-toy-01',
    name: 'Little Bunny Amigurumi',
    slug: 'little-bunny-amigurumi',
    category: 'Toys',
    price: 599,
    comparePrice: 799,
    rating: 5.0,
    reviewsCount: 44,
    images: [
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Oatmeal', hex: '#E7DED2' },
      { name: 'Blush Pink', hex: '#D9A7A0' },
      { name: 'Butter Cream', hex: '#F9F5EB' }
    ],
    sizes: ['Standard (22cm)'],
    description: 'A charming heirloom-quality crochet bunny with floppy ears, a miniature embroidered collar, and a fluffy pom-pom tail. Stuffed with hypoallergenic polyester fiber and safe safety eyes.',
    material: 'Super-soft Milk Cotton Yarn & Hypoallergenic Polyfill',
    details: [
      'Safe safety eyes with back-lock washers',
      'Ultra-plush velvety touch ideal for babies and nurseries',
      'Hand-embroidered nose and rosy blush cheeks',
      'Tested for safety and seam durability',
      'Handmade in India'
    ],
    sizeDimensions: {
      height: '22 cm (standing from ear tip to toe)',
      width: '10 cm torso span'
    },
    care: [
      'Gentle surface clean or hand wash in lukewarm water',
      'Do not machine wash or submerge for extended duration',
      'Air dry flat in a shaded ventilated spot'
    ],
    handmadeNote: 'Stitched with over 1,800 tiny single crochet stitches for a dense, snuggle-proof form.',
    stock: 9,
    tags: ['Toys', 'Amigurumi', 'Bunny', 'Nursery', 'Bestseller'],
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'cr-bag-02',
    name: 'Sage Garden Crochet Tote',
    slug: 'sage-garden-crochet-tote',
    category: 'Bags',
    price: 1199,
    comparePrice: 1599,
    rating: 4.8,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Sage Green', hex: '#AAB5A0' },
      { name: 'Warm Ecru', hex: '#E7DED2' },
      { name: 'Mocha Brown', hex: '#8C6F5A' }
    ],
    sizes: ['Large Tote'],
    description: 'A spacious woven market tote featuring intricate botanical leaf lattice crochet. Sturdy, expandable, and effortlessly chic for book lovers, market trips, and seaside afternoons.',
    material: '100% Recycled Cotton Cord',
    details: [
      'High-capacity flexible lattice weave',
      'Double thick round woven handles for shoulder comfort',
      'Reinforced solid crochet bottom base',
      'Holds 13" laptop, books, and daily planner',
      'Handmade in India'
    ],
    sizeDimensions: {
      width: '36 cm',
      height: '38 cm',
      handle: '28 cm drop length',
      depth: '10 cm base'
    },
    care: [
      'Cold water hand wash or gentle machine wash inside a laundry wash bag',
      'Reshape flat and dry naturally'
    ],
    handmadeNote: 'Durable enough to carry up to 6 kg without stretching beyond recovery.',
    stock: 8,
    tags: ['Bags', 'Tote', 'Sage', 'Botanical', 'Eco-friendly'],
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'cr-home-01',
    name: 'Floral Crochet Coaster Set (Set of 4)',
    slug: 'floral-crochet-coaster-set',
    category: 'Home & Decor',
    price: 299,
    comparePrice: 399,
    rating: 4.9,
    reviewsCount: 68,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Pastel Garden (Mix)', hex: '#D9A7A0' },
      { name: 'Monochrome Cream', hex: '#F4EBE1' },
      { name: 'Earthy Sage', hex: '#AAB5A0' }
    ],
    sizes: ['Set of 4', 'Set of 6'],
    description: 'Set of 4 handmade blossom coasters created with absorbent pure cotton yarn. Protects wooden surfaces from condensation while bringing artisanal elegance to your morning coffee ritual.',
    material: '100% Pure Absorbent Cotton Yarn',
    details: [
      'Set includes 4 coordinated floral coasters',
      'Highly absorbent natural fibers absorb iced drink drips',
      'Heat resistant for hot mugs and teapots',
      'Tied with rustic jute twine & botanical tag for gifting'
    ],
    sizeDimensions: {
      diameter: '12 cm diameter per coaster'
    },
    care: [
      'Rinse under cool tap water or hand wash with soap',
      'Press with warm steam iron on reverse side for crisp petal edges'
    ],
    handmadeNote: 'Stitched in rhythmic concentric rounds. 100% plastic-free and biodegradable.',
    stock: 24,
    tags: ['Home & Decor', 'Coaster', 'Floral', 'Bestseller', 'Gifting'],
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'cr-bag-03',
    name: 'Luna Crochet Shoulder Bag',
    slug: 'luna-crochet-shoulder-bag',
    category: 'Bags',
    price: 999,
    comparePrice: 1299,
    rating: 4.8,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Terracotta', hex: '#8C6F5A' },
      { name: 'Cream Butter', hex: '#F9F5EB' },
      { name: 'Olive Green', hex: '#AAB5A0' }
    ],
    sizes: ['Medium'],
    description: 'A minimalist crescent shoulder bag woven with dense puff stitches for architectural structure. Features a wide, comfortable shoulder strap and antique brass zipper closure.',
    material: 'Braided Cotton Cord with Brass Hardware',
    details: [
      'Structured crescent silhouette that holds its shape',
      'Smooth brass zipper with crochet tassel pull',
      'Fully lined with raw cotton canvas',
      'Inner zippered card pocket',
      'Handmade in India'
    ],
    sizeDimensions: {
      width: '28 cm',
      height: '18 cm',
      handle: '22 cm shoulder drop',
      depth: '7 cm'
    },
    care: ['Spot clean only', 'Keep away from sharp jewelry that might snag yarn'],
    handmadeNote: 'Crafted using a dense 3.5mm crochet hook to ensure non-sagging structure.',
    stock: 10,
    tags: ['Bags', 'Shoulder Bag', 'Crescent', 'Modern', 'Bestseller'],
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'cr-gift-01',
    name: 'Pink Daisy Hair Scrunchie Set',
    slug: 'pink-daisy-hair-scrunchie-set',
    category: 'Gifts',
    price: 249,
    comparePrice: 349,
    rating: 4.9,
    reviewsCount: 75,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Petal Trio (Pink, Cream, Sage)', hex: '#D9A7A0' },
      { name: 'Earthy Trio (Beige, Mocha, Terracotta)', hex: '#8C6F5A' }
    ],
    sizes: ['Pack of 2', 'Pack of 3'],
    description: 'Delightfully ruffled crochet scrunchies made with premium bamboo-cotton blend that prevents hair creasing and breakage. Decorated with delicate hand-crocheted daisy charms.',
    material: 'Bamboo-Cotton Yarn & Strong Elastic Core',
    details: [
      'Snag-free hair protection for curly, straight, or textured hair',
      'Double elastic loop for firm grip without headaches',
      'Includes miniature daisy charm accent',
      'Perfect stocking stuffer or bridesmaid favor'
    ],
    sizeDimensions: {
      diameter: '11 cm outer diameter'
    },
    care: ['Gentle hand wash in cold water with hair shampoo', 'Air dry on flat surface'],
    handmadeNote: 'Each ruffle requires over 120 double crochet stitches around an elastic ring.',
    stock: 35,
    tags: ['Gifts', 'Scrunchie', 'Hair Accessories', 'Daisy', 'Budget'],
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'cr-toy-02',
    name: 'Mini Crochet Teddy',
    slug: 'mini-crochet-teddy',
    category: 'Toys',
    price: 499,
    comparePrice: 699,
    rating: 5.0,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Honey Brown', hex: '#8C6F5A' },
      { name: 'Vanilla Cream', hex: '#E7DED2' },
      { name: 'Mocha Grey', hex: '#B8ABA0' }
    ],
    sizes: ['Mini (15cm)'],
    description: 'A pocket-sized amigurumi bear wearing a miniature knitted scarf. Crafted for little hands to hold or as a cozy desk ornament for vintage aesthetic enthusiasts.',
    material: 'Milk Cotton Yarn, Safety Eyes & Wooden Button Scarf',
    details: [
      'Compact travel-friendly 15cm height',
      'Removable tiny knitted winter scarf',
      'Embroidered muzzle and weighted bottom so it sits upright',
      'Handcrafted in India'
    ],
    sizeDimensions: {
      height: '15 cm',
      width: '8 cm'
    },
    care: ['Spot clean with warm damp washcloth', 'Do not submerge'],
    handmadeNote: 'Stuffed with care to maintain its round tummy and cuddly proportions.',
    stock: 14,
    tags: ['Toys', 'Teddy', 'Bear', 'Pocket Toy', 'Amigurumi'],
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  // NEW ARRIVALS & ADDITIONAL LUXURY PIECES
  {
    id: 'cr-top-02',
    name: 'Meadow Sleeveless Crochet Vest',
    slug: 'meadow-sleeveless-crochet-vest',
    category: 'Tops',
    price: 1699,
    comparePrice: 2199,
    rating: 4.9,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Sage & Cream', hex: '#AAB5A0' },
      { name: 'Dusty Rose & Beige', hex: '#D9A7A0' },
      { name: 'Autumn Mocha', hex: '#8C6F5A' }
    ],
    sizes: ['S', 'M', 'L'],
    description: 'An editorial statement vest adorned with intricate honeycomb and cable motifs. Perfect for layering over crisp white linen shirts or worn solo with high-waisted denim.',
    material: 'Organic Pima Cotton & Bamboo Yarn',
    details: [
      'Handcrafted ribbed neckline and armholes',
      'Natural wooden button placket front closure',
      'Breathable airy stitch texture',
      'Handmade in India'
    ],
    sizeDimensions: {
      length: '46 cm',
      width: 'Bust: S (34"), M (36"), L (38")'
    },
    care: ['Gentle hand wash cold', 'Lay flat to dry on mesh drying rack'],
    handmadeNote: 'Takes over 14 hours of continuous hand-stitching by our senior knitters.',
    stock: 5,
    tags: ['Tops', 'Vest', 'Layering', 'New Arrival', 'Artisanal'],
    isBestSeller: false,
    isNewArrival: true,
    featured: true
  },
  {
    id: 'cr-top-03',
    name: 'Daisy Square Halter Top',
    slug: 'daisy-square-halter-top',
    category: 'Tops',
    price: 1399,
    comparePrice: 1799,
    rating: 4.8,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Cream & Sunflower', hex: '#F4EBE1' },
      { name: 'Blush Pink', hex: '#D9A7A0' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Handcrafted halter featuring bold center daisy motifs bordered with delicate scalloped picots. Features tie neck and back closures for tailored fit.',
    material: '100% Combed Mercerized Cotton',
    details: ['Tie halter neckline', 'Adjustable back ties', 'Lined bodice for comfort', 'Handmade in India'],
    sizeDimensions: { length: '35 cm', width: 'Adjustable 32" to 38"' },
    care: ['Hand wash cold', 'Reshape damp', 'Dry in shade'],
    handmadeNote: 'Artisanal heirloom quality made with love.',
    stock: 6,
    tags: ['Tops', 'Daisy', 'Halter', 'Festival'],
    isBestSeller: false,
    isNewArrival: true,
    featured: false
  },
  {
    id: 'cr-bag-04',
    name: 'Pearl Shell Crossbody Bag',
    slug: 'pearl-shell-crossbody-bag',
    category: 'Bags',
    price: 1299,
    comparePrice: 1699,
    rating: 4.9,
    reviewsCount: 28,
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Ivory Pearl', hex: '#FDFBF7' },
      { name: 'Sage Tint', hex: '#AAB5A0' },
      { name: 'Blush Sand', hex: '#D9A7A0' }
    ],
    sizes: ['One Size'],
    description: 'An architectural seashell-shaped pouch woven with shell-stitch fans and accented with handcrafted faux-pearl bead strap embellishments.',
    material: 'Silk-touch Cotton Yarn with Wooden Beads',
    details: ['Scalloped fan stitch silhouette', 'Magnetic closure', 'Fully lined with satin fabric', 'Detachable shoulder strap'],
    sizeDimensions: { width: '24 cm', height: '20 cm', handle: '54 cm strap drop', depth: '5 cm' },
    care: ['Spot clean gently', 'Store in dust bag provided'],
    stock: 8,
    tags: ['Bags', 'Crossbody', 'Shell', 'Evening', 'New Arrival'],
    isBestSeller: false,
    isNewArrival: true,
    featured: true
  },
  {
    id: 'cr-home-02',
    name: 'Sunburst Wall Hanging Tapestry',
    slug: 'sunburst-wall-hanging-tapestry',
    category: 'Home & Decor',
    price: 1899,
    comparePrice: 2499,
    rating: 5.0,
    reviewsCount: 16,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Warm Terracotta & Ecru', hex: '#8C6F5A' },
      { name: 'Sage & Mustard', hex: '#AAB5A0' }
    ],
    sizes: ['Medium (40x70cm)', 'Large (60x90cm)'],
    description: 'A bohemian sunburst tapestry suspended from a handcrafted natural teak wood dowel. Incorporates macrame tassels and layered crochet arches.',
    material: 'Organic Natural Cotton Cord & Hand-turned Teak Wood',
    details: ['Mounted on 45cm polished teak wood branch', 'Intricate bohemian arch gradient', 'Long brushed bohemian fringe', 'Includes brass hanging loop'],
    sizeDimensions: { width: '40 cm', height: '70 cm (including fringe)' },
    care: ['Gently comb fringe with a wide-tooth comb', 'Dust lightly with a dry cloth'],
    stock: 4,
    tags: ['Home & Decor', 'Wall Art', 'Tapestry', 'Boho', 'New Arrival'],
    isBestSeller: false,
    isNewArrival: true,
    featured: true
  },
  {
    id: 'cr-toy-03',
    name: 'Matcha Froggy Keyring Toy',
    slug: 'matcha-froggy-keyring-toy',
    category: 'Toys',
    price: 349,
    comparePrice: 499,
    rating: 4.9,
    reviewsCount: 39,
    images: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Matcha Green', hex: '#8FA382' },
      { name: 'Pastel Mint', hex: '#AAB5A0' }
    ],
    sizes: ['Keychain (8cm)'],
    description: 'An adorably chubby little amigurumi frog with blushing cheeks wearing a tiny strawberry bucket hat. Mounted on a durable gold keyring clasp.',
    material: 'Milk Cotton Yarn with Gold Lobster Clasp',
    details: ['Includes detachable mini strawberry hat', 'Heavy duty swivel keyring clasp', 'Hand-stitched blush details', 'Great gift for backpacks or keys'],
    sizeDimensions: { height: '8 cm', width: '7 cm' },
    care: ['Spot clean with mild soap'],
    stock: 20,
    tags: ['Toys', 'Keychain', 'Frog', 'Amigurumi', 'Gifting'],
    isBestSeller: false,
    isNewArrival: true,
    featured: false
  },
  {
    id: 'cr-gift-02',
    name: 'Handcrafted Crochet Rose Bouquet',
    slug: 'handcrafted-crochet-rose-bouquet',
    category: 'Gifts',
    price: 1199,
    comparePrice: 1599,
    rating: 5.0,
    reviewsCount: 47,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Vintage Blush & Cream', hex: '#D9A7A0' },
      { name: 'Crimson & Sage', hex: '#8C6F5A' }
    ],
    sizes: ['3 Stem Bouquet', '6 Stem Deluxe Bouquet'],
    description: 'An eternal floral bouquet consisting of 5 handcrafted crochet roses, eucalyptus leaves, and baby breath sprigs wrapped in Korean waterproof kraft wrapping paper with satin ribbons.',
    material: 'Fine Mercerized Cotton Yarn & Flexible Wire Stems',
    details: ['Never withers or loses shape', 'Stems can be bent to fit any vase', 'Wrapped in luxury kraft paper with ribbon', 'Includes personalized handwritten card'],
    sizeDimensions: { height: '35 cm length', width: '22 cm bouquet spread' },
    care: ['Dust occasionally with a soft makeup brush or gentle hairdryer on cool setting'],
    stock: 11,
    tags: ['Gifts', 'Bouquet', 'Roses', 'Anniversary', 'Bestseller'],
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'cr-home-03',
    name: 'Daisy Granny Square Throw Pillow Cover',
    slug: 'daisy-granny-square-pillow-cover',
    category: 'Home & Decor',
    price: 1299,
    comparePrice: 1699,
    rating: 4.8,
    reviewsCount: 23,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Earthy Sage & Cream', hex: '#AAB5A0' },
      { name: 'Terracotta Harvest', hex: '#8C6F5A' }
    ],
    sizes: ['16" x 16" (40x40cm)', '18" x 18" (45x45cm)'],
    description: 'Vintage-inspired cushion cover composed of 9 raised 3D daisy squares backed with soft beige linen and an invisible zipper.',
    material: '100% Combed Cotton Front, 100% Washed Linen Back',
    details: ['Hidden zipper at bottom seam for easy cushion insert', 'Reinforced inner cotton backing prevents stretching', 'Cushion insert sold separately'],
    sizeDimensions: { width: '40 cm', height: '40 cm' },
    care: ['Gentle cold hand wash', 'Iron linen reverse side with medium steam'],
    stock: 9,
    tags: ['Home & Decor', 'Pillow', 'Cushion', 'Granny Square'],
    isBestSeller: false,
    isNewArrival: true,
    featured: false
  },
  {
    id: 'cr-gift-03',
    name: 'Crochet Blossom Bookmark Set',
    slug: 'crochet-blossom-bookmark-set',
    category: 'Gifts',
    price: 299,
    comparePrice: 399,
    rating: 4.9,
    reviewsCount: 34,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Sprout & Daisy', hex: '#AAB5A0' },
      { name: 'Tulip & Leaf', hex: '#D9A7A0' }
    ],
    sizes: ['Set of 2'],
    description: 'Set of two charming book lover bookmarks featuring a realistic sprouting leaf stem that rests along the spine and a floral blossom crowning the top of your book.',
    material: 'Micro-Crochet Mercerized Thread',
    details: ['Flat woven stem fits smoothly between pages without creasing book spines', 'Hand-stitched petals with delicate bud detailing', 'Packaged on an illustrated botanical card'],
    sizeDimensions: { length: '28 cm stem length' },
    care: ['Hand wipe clean if soiled'],
    stock: 25,
    tags: ['Gifts', 'Bookmark', 'Books', 'Flower', 'Budget'],
    isBestSeller: false,
    isNewArrival: false,
    featured: false
  },
  {
    id: 'cr-bag-05',
    name: 'Vintage Granny Square Market Bag',
    slug: 'vintage-granny-square-market-bag',
    category: 'Bags',
    price: 1399,
    comparePrice: 1799,
    rating: 4.9,
    reviewsCount: 37,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Vintage Bohemian Mix', hex: '#8C6F5A' },
      { name: 'Nordic Forest Greens', hex: '#AAB5A0' }
    ],
    sizes: ['Large'],
    description: 'A showstopping artisan bag made of 18 multicoloured vintage granny squares framed by a rich chocolate border and dual braided shoulder straps.',
    material: '100% Recycled Cotton Thread',
    details: ['Comfortable wide braided shoulder straps', 'Heavyweight cotton base that withstands weight', 'Interior pocket for valuables'],
    sizeDimensions: { width: '38 cm', height: '34 cm', handle: '30 cm shoulder drop' },
    care: ['Hand wash cold', 'Dry flat'],
    stock: 7,
    tags: ['Bags', 'Granny Square', 'Vintage', 'Market Bag'],
    isBestSeller: false,
    isNewArrival: false,
    featured: false
  },
  {
    id: 'cr-top-04',
    name: 'Aurora Open-Knit Cardigan',
    slug: 'aurora-open-knit-cardigan',
    category: 'Tops',
    price: 2499,
    comparePrice: 3199,
    rating: 5.0,
    reviewsCount: 15,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Oatmeal & Pearl', hex: '#E7DED2' },
      { name: 'Muted Sage', hex: '#AAB5A0' }
    ],
    sizes: ['S/M', 'L/XL'],
    description: 'A luxurious drape cardigan hand-crocheted in open honeycomb mesh with dramatic balloon sleeves and genuine coconut shell buttons.',
    material: '70% Organic Cotton, 30% Bamboo Linen',
    details: ['Scalloped edge cuffs and collar', 'Relaxed slouchy drape', 'Natural coconut shell buttons', 'Handmade in India'],
    sizeDimensions: { length: '60 cm', width: 'Oversized bust fit 34"-44"' },
    care: ['Hand wash in wool-safe cold wash', 'Lay flat to dry over clean bath towel'],
    stock: 4,
    tags: ['Tops', 'Cardigan', 'Luxury', 'Artisanal', 'New Arrival'],
    isBestSeller: false,
    isNewArrival: true,
    featured: true
  },
  {
    id: 'cr-home-04',
    name: 'Honeycomb Cotton Table Runner',
    slug: 'honeycomb-cotton-table-runner',
    category: 'Home & Decor',
    price: 1499,
    comparePrice: 1999,
    rating: 4.8,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Natural Ecru', hex: '#F8F4EE' },
      { name: 'Warm Terracotta', hex: '#8C6F5A' }
    ],
    sizes: ['5 ft (150cm)', '6 ft (180cm)'],
    description: 'A gorgeous dining centerpiece runner crafted with textured geometric honeycomb lace and finished with hand-knotted tassels on both ends.',
    material: '100% Unbleached Organic Cotton',
    details: ['150cm length accommodates 4 to 6 seater dining tables', 'Elegant hand-knotted fringe ends', 'Provides heat insulation for warm cookware'],
    sizeDimensions: { width: '32 cm', length: '150 cm' },
    care: ['Gentle machine wash inside a laundry mesh bag', 'Steam iron for crisp lace layout'],
    stock: 8,
    tags: ['Home & Decor', 'Dining', 'Table Runner', 'Lace'],
    isBestSeller: false,
    isNewArrival: false,
    featured: false
  },
  {
    id: 'cr-toy-04',
    name: 'Strawberry Cow Amigurumi',
    slug: 'strawberry-cow-amigurumi',
    category: 'Toys',
    price: 649,
    comparePrice: 849,
    rating: 5.0,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Strawberry Pink & Cream', hex: '#D9A7A0' }
    ],
    sizes: ['Medium (20cm)'],
    description: 'A whimsical plush cow crocheted in pastel strawberry pink and cream with a tiny crochet strawberry blossom nestled by its ear.',
    material: 'Velvet-soft Milk Cotton Yarn',
    details: ['Hypoallergenic polyfill', 'Embroidered muzzle and horns', 'Velvety plush feel that never sheds'],
    sizeDimensions: { height: '20 cm', width: '12 cm' },
    care: ['Surface clean with damp cloth'],
    stock: 10,
    tags: ['Toys', 'Plush', 'Amigurumi', 'Cow', 'Pastel'],
    isBestSeller: false,
    isNewArrival: true,
    featured: false
  },
  {
    id: 'cr-top-05',
    name: 'Boho Meadow Halter Crop Top',
    slug: 'boho-meadow-halter-crop-top',
    category: 'Tops',
    price: 1299,
    comparePrice: 1699,
    rating: 4.9,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Buttercup & Cream', hex: '#F4EBE1' },
      { name: 'Sage & Olive', hex: '#AAB5A0' }
    ],
    sizes: ['XS/S', 'M/L'],
    description: 'An eye-catching halter crop top featuring five joined daisy motif squares, scalloped bottom hem, and braided neck and back ties for a custom fit.',
    material: '100% Breathable Combed Cotton (4-ply)',
    details: ['Double tie closure for adjustable fit', 'Lightweight for summer and festivals', 'Opaque cups with dense stitch density'],
    sizeDimensions: { length: '32 cm', width: 'Bust 30"-38" adjustable' },
    care: ['Hand wash cold gently', 'Dry flat in shade'],
    stock: 9,
    tags: ['Tops', 'Boho', 'Daisy', 'Crop Top', 'Festival'],
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'cr-bag-06',
    name: 'Riviera Net Market Tote',
    slug: 'riviera-net-market-tote',
    category: 'Bags',
    price: 749,
    comparePrice: 999,
    rating: 4.8,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Unbleached Cream', hex: '#F8F4EE' },
      { name: 'Terracotta Rust', hex: '#8C6F5A' }
    ],
    sizes: ['Standard'],
    description: 'A Parisian-inspired market net tote with reinforced wide handles that expand gracefully to fit groceries, farmer’s market finds, or beach essentials.',
    material: '100% Heavy-Duty Cotton Cord',
    details: ['Expands up to 2.5x its size when filled', 'Braided handles that do not dig into shoulders', 'Zero waste biodegradable material'],
    sizeDimensions: { width: '38 cm (expands)', height: '42 cm', handle: '28 cm drop' },
    care: ['Machine washable on gentle cycle', 'Air dry flat'],
    stock: 14,
    tags: ['Bags', 'Market Bag', 'Net Tote', 'Eco Friendly'],
    isBestSeller: false,
    isNewArrival: true,
    featured: false
  },
  {
    id: 'cr-gift-04',
    name: 'Everlasting Crochet Lavender & Rose Bouquet',
    slug: 'everlasting-crochet-lavender-rose-bouquet',
    category: 'Gifts',
    price: 1099,
    comparePrice: 1499,
    rating: 5.0,
    reviewsCount: 44,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Dusty Rose & Lavender', hex: '#D9A7A0' },
      { name: 'Sunburst Yellow & Sage', hex: '#AAB5A0' }
    ],
    sizes: ['5-Stem Bouquet'],
    description: 'A charming 5-stem everlasting bouquet composed of 2 open roses, 2 lavender sprigs, and 1 eucalyptus leaf stem, hand-tied with jute twine and botanical craft paper.',
    material: '100% Milk Cotton Yarn with Flexible Floral Wire Stems',
    details: ['Never withers or loses shape', 'Stems can be gently bent to fit any vase', 'Arrives gift-wrapped with a handwritten note tag'],
    sizeDimensions: { height: '35 cm stem length', width: '18 cm bouquet crown' },
    care: ['Gently dust with a soft makeup brush or blowdryer on cool setting'],
    stock: 12,
    tags: ['Gifts', 'Flowers', 'Bouquet', 'Roses', 'Lavender', 'Keepsake'],
    isBestSeller: true,
    isNewArrival: true,
    featured: true
  },
  {
    id: 'cr-home-05',
    name: 'Sunflower Coaster Set (4-Pack)',
    slug: 'sunflower-coaster-set-4-pack',
    category: 'Home & Decor',
    price: 549,
    comparePrice: 749,
    rating: 4.9,
    reviewsCount: 36,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Golden Sun & Cocoa', hex: '#8C6F5A' }
    ],
    sizes: ['4 Coasters Set'],
    description: 'A cheerful set of four hand-crocheted sunflower coasters featuring dark cocoa center coils and layered textured golden yellow petals to protect table surfaces.',
    material: 'Thick Absorbent 100% Cotton Yarn',
    details: ['Absorbs condensation from iced coffees and teas', 'Heat resistant for warm ceramic mugs', 'Packaged with a cotton ribbon bow'],
    sizeDimensions: { diameter: '12 cm each' },
    care: ['Hand wash or spot clean with soapy water', 'Air dry flat'],
    stock: 20,
    tags: ['Home & Decor', 'Coasters', 'Sunflower', 'Dining', 'Coffee Table'],
    isBestSeller: false,
    isNewArrival: false,
    featured: false
  },
  {
    id: 'cr-toy-05',
    name: 'Oliver The Sleepy Octopus Amigurumi',
    slug: 'oliver-the-sleepy-octopus-amigurumi',
    category: 'Toys',
    price: 699,
    comparePrice: 899,
    rating: 5.0,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Seafoam Mint', hex: '#AAB5A0' },
      { name: 'Lilac Dusk', hex: '#D9A7A0' }
    ],
    sizes: ['One Size (18cm)'],
    description: 'A comforting plush octopus designed with springy curly tentacles that provide tactile sensory comfort. Stitched with sleepy embroidered eyelids and a tiny crochet sailor hat.',
    material: '100% Soft Baby Milk Cotton & Hypoallergenic Polyfill',
    details: ['100% baby-safe with no plastic safety eyes', 'Spiral tentacles mimic the tactile comfort of umbilical cord', 'Handmade in Jaipur'],
    sizeDimensions: { height: '18 cm with tentacles', width: '12 cm head' },
    care: ['Gentle hand wash with baby detergent', 'Air dry in shade'],
    stock: 8,
    tags: ['Toys', 'Amigurumi', 'Octopus', 'Baby Shower', 'Sensory Toy'],
    isBestSeller: false,
    isNewArrival: true,
    featured: true
  },
  {
    id: 'cr-gift-05',
    name: 'Daisy Hair Bandana & Scrunchie Duo',
    slug: 'daisy-hair-bandana-scrunchie-duo',
    category: 'Gifts',
    price: 499,
    comparePrice: 699,
    rating: 4.9,
    reviewsCount: 48,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85'
    ],
    colors: [
      { name: 'Ivory & Daisy Yellow', hex: '#F4EBE1' },
      { name: 'Sage Green Meadow', hex: '#AAB5A0' },
      { name: 'Dusty Rose Blossom', hex: '#D9A7A0' }
    ],
    sizes: ['One Size Set'],
    description: 'A cottagecore-inspired accessory duo featuring a triangular crochet hair kerchief with delicate daisy motifs and a matching ruffled crochet hair scrunchie that protects your hair from breakage.',
    material: '100% Silky Combed Cotton Yarn & Elastic Hair Band',
    details: ['Tie strings for comfortable fit on any hairstyle', 'Soft on hair curls without causing frizz', 'Perfect gift bundle in craft packaging'],
    sizeDimensions: { width: '45 cm bandana width', length: '25 cm triangle drop', handle: '30 cm ties' },
    care: ['Hand wash cold', 'Lay flat to dry'],
    stock: 16,
    tags: ['Gifts', 'Accessories', 'Hair Bandana', 'Scrunchie', 'Daisy'],
    isBestSeller: true,
    isNewArrival: false,
    featured: false
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Orders',
    question: 'Are all your products really 100% handmade?',
    answer: 'Yes, absolutely! Every single piece in our collection is hand-crocheted stitch by stitch by our skilled artisan collective. We never use knitting machines or automated looms. Each item carries the distinct, mindful touch of its maker.'
  },
  {
    id: 'faq-2',
    category: 'Orders',
    question: 'How long does an order take to reach me?',
    answer: 'Ready-to-ship pieces are dispatched within 24–48 hours from our Jaipur studio and typically arrive in 3–5 business days across India. Custom-made orders usually take 7–12 business days since they are crafted from scratch specifically for you.'
  },
  {
    id: 'faq-3',
    category: 'Custom Orders',
    question: 'Do you accept custom orders and color requests?',
    answer: 'Yes! Custom orders are our specialty. You can visit our "Custom Orders" page to select your preferred silhouette, color palette, dimensions, and budget. Our master artisan will review your design and share stitch milestones before shipping.'
  },
  {
    id: 'faq-4',
    category: 'Care',
    question: 'How should I care for and wash my crochet products?',
    answer: 'We recommend gentle hand washing in cool water using a mild, pH-neutral liquid detergent or wool wash. Avoid wringing or twisting the yarn. Gently roll the piece in a dry towel to absorb excess water, then reshape and lay flat in the shade to dry naturally.'
  },
  {
    id: 'faq-5',
    category: 'Shipping',
    question: 'What are your shipping charges across India?',
    answer: 'We offer FREE standard express shipping across India on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹79 is applied at checkout.'
  },
  {
    id: 'faq-6',
    category: 'Returns',
    question: 'What is your return and exchange policy?',
    answer: 'Because our pieces are slow-crafted in limited batches, we offer returns or size exchanges within 7 days of delivery for unworn, unwashed items in original botanical packaging with tags intact. Customized and bespoke pieces are made exclusively to your specifications and are final sale.'
  },
  {
    id: 'faq-7',
    category: 'Products',
    question: 'What kind of yarn and materials do you use?',
    answer: 'We prioritize natural, skin-friendly, and eco-conscious fibers including GOTS-certified organic combed cotton, bamboo yarn, milk cotton for hypoallergenic toys, and unbleached cotton cord for our sturdy bags.'
  }
];

export const INSTAGRAM_GALLERY = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=700&q=85',
    caption: 'Sunlight filtering through the delicate stitches of our Cloud Petal Halter ✨ Slow mornings in Jaipur.',
    likes: '1,420',
    tag: '#MaisonCrochetLife'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=85',
    caption: '13 daisy squares, 1 afternoon of quiet tea, and a bag ready for the weekend market 🌼',
    likes: '2,180',
    tag: '#HandmadeTote'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=700&q=85',
    caption: 'Meet our newest little bunny companion on her way to a baby nursery in Mumbai 🐰🤍',
    likes: '3,050',
    tag: '#AmigurumiLove'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=85',
    caption: 'Coffee tastes sweeter when resting on handmade floral coasters. ☕🌿',
    likes: '1,890',
    tag: '#HomeAesthetic'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85',
    caption: 'Behind the scenes: testing tension on natural combed cotton yarn for our upcoming autumn cardigan drop.',
    likes: '2,640',
    tag: '#ArtisanWorkshop'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=85',
    caption: 'Handcrafted floral blooms that never fade. Made to cherish forever 🌸💐',
    likes: '4,120',
    tag: '#EverlastingBouquet'
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 'test-1',
    author: 'Priya Narayanan',
    location: 'Bengaluru, India',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: 'Absolutely beautiful! The Daisy Bloom bag feels even more special in person. You can truly feel the weight and time poured into every stitch.',
    productBought: 'Daisy Bloom Crochet Bag'
  },
  {
    id: 'test-2',
    author: 'Ananya Deshmukh',
    location: 'Mumbai, India',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    quote: 'Such a cute handmade gift! Ordered the bunny amigurumi for my niece and the finishing is top-notch. Soft, clean, and beautifully packaged in eco-paper.',
    productBought: 'Little Bunny Amigurumi'
  },
  {
    id: 'test-3',
    author: 'Riya Sengupta',
    location: 'Kolkata, India',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    quote: 'I loved being able to choose the exact pastel yarn colors for my custom halter top. The team communicated updates during making and it fits like a glove!',
    productBought: 'Custom Made Halter Top'
  }
];
