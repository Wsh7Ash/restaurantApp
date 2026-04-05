import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = [
        { nameEn: 'Traditional Mains', nameAr: 'أطباق رئيسية تقليدية' },
        { nameEn: 'Street Food', nameAr: 'مأكولات شعبية' },
        { nameEn: 'Drinks', nameAr: 'مشروبات' },
        { nameEn: 'Desserts', nameAr: 'حلويات' },
        { nameEn: 'Appetizers', nameAr: 'مقبلات' },
    ];

    for (const category of categories) {
        await prisma.category.upsert({
            where: { nameEn: category.nameEn },
            update: {},
            create: category,
        });
    }

    const savedCategories = await prisma.category.findMany();
    const getCatId = (nameEn: string) => savedCategories.find(c => c.nameEn === nameEn)?.id || 1;

    // Seed realistic items
    const items = [
        {
            nameEn: 'Authentic Jordanian Mansaf',
            nameAr: 'منسف أردني أصيل',
            descriptionEn: 'The traditional Jordanian dish of lamb cooked in a sauce of fermented dried yogurt (jameed), served with rice.',
            descriptionAr: 'الطبق الأردني التقليدي، لحم ضأن مميز مطبوخ بصلصة الجميد، يقدم مع الأرز واللوز.',
            price: 25.50,
            categoryId: getCatId('Traditional Mains'),
            imageUrl: '🍲'
        },
        {
            nameEn: 'Saudi Chicken Kabsa',
            nameAr: 'كبسة دجاج سعودية',
            descriptionEn: 'A mixed rice dish originating from Saudi Arabia, made with fragrant basmati rice, meat, and vegetables.',
            descriptionAr: 'طبق أرز لذيذ من المملكة العربية السعودية يتميز بتوابل قوية مع الدجاج والخضار.',
            price: 18.00,
            categoryId: getCatId('Traditional Mains'),
            imageUrl: '🍛'
        },
        {
            nameEn: 'Egyptian Koshari',
            nameAr: 'كشري مصري',
            descriptionEn: 'Egypt\'s national dish: a mix of pasta, rice, lentils, and chickpeas topped with a spicy tomato sauce and crispy onions.',
            descriptionAr: 'ملك الأكلات الشعبية المصرية: أرز وعدس ومكرونة يعلوها صلصة طماطم حارة وبصل مقرمش.',
            price: 8.50,
            categoryId: getCatId('Street Food'),
            imageUrl: '🥣'
        },
        {
            nameEn: 'Premium Beef Shawarma',
            nameAr: 'شاورما لحم فاخرة',
            descriptionEn: 'Juicy slices of seasoned beef slow-roasted, wrapped in fresh flatbread with tahini sauce.',
            descriptionAr: 'شرائح لحم بقري متبلة ومحمصة ببطء، ملفوفة بخبز طازج مع صلصة الطحينة والبقدونس.',
            price: 6.00,
            categoryId: getCatId('Street Food'),
            imageUrl: '🌯'
        },
        {
            nameEn: 'Karak Tea',
            nameAr: 'شاي كرك',
            descriptionEn: 'A staple in the UAE and Qatar: strong black tea brewed with evaporated milk, sugar, and cardamom.',
            descriptionAr: 'شاي كرك قوي محضر بالحليب المبخر والهيل والزعفران، المشروب المفضل في الإمارات وقطر.',
            price: 2.50,
            categoryId: getCatId('Drinks'),
            imageUrl: '☕'
        },
        {
            nameEn: 'Nabulsi Kunafa',
            nameAr: 'كنافة نابلسية',
            descriptionEn: 'A warm melted cheese pastry soaked in sweet sugar syrup and topped with pistachios.',
            descriptionAr: 'حلوى الجبن الدافئة تعلوها عجينة الكنافة ومغرقة بالقطر ومزينة بالفستق الحلبي.',
            price: 9.00,
            categoryId: getCatId('Desserts'),
            imageUrl: '🍰'
        }
    ];

    for (const item of items) {
        await prisma.menuItem.create({ data: item });
    }

    console.log('Database seeded successfully completely with MENA cuisines');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
