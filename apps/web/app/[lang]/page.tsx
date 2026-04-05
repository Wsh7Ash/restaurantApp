'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, Leaf, ChefHat } from 'lucide-react';
import styles from './page.module.css';
import { use, useEffect, useState } from 'react';
import { getDictionary } from '../dictionaries';

export default function LandingPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'ar' }>;
}) {
  const resolvedParams = use(params);
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    getDictionary(resolvedParams.lang).then(setDict);
  }, [resolvedParams.lang]);

  if (!dict) return null; // Avoid hydration mismatch or flash
  const isAr = resolvedParams.lang === 'ar';

  return (
    <div dir={isAr ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={`${styles.brand} gradient-text`}>
            TastyBites
          </div>
          <div className={styles.navLinks}>
            <Link href={`/${resolvedParams.lang}/menu`}>{dict.navigation.menu}</Link>
            <Link href={`/${resolvedParams.lang}/about`}>{dict.navigation.story}</Link>
            <Link href={`/${resolvedParams.lang}/locations`}>{dict.navigation.locations}</Link>
          </div>
          <Link href={`/${resolvedParams.lang}/menu`}>
            <button className={styles.orderBtn}>
              {dict.navigation.orderNow}
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.badge}>
              {dict.hero.badge}
            </div>
            <h1 className={styles.title}>
              {dict.hero.tasteThe} <span className="gradient-text">{dict.hero.extraordinary}</span> {dict.hero.inEveryBite}
            </h1>
            <p className={styles.subtitle}>
              {dict.hero.subtitle}
            </p>
            <div className={styles.actions}>
              <Link href={`/${resolvedParams.lang}/menu`}>
                <button className={styles.primaryBtn} style={{ flexDirection: isAr ? 'row-reverse' : 'row' }}>
                  {dict.hero.viewMenu} <ArrowRight size={20} className={isAr ? 'rotate-180' : ''} />
                </button>
              </Link>
              <button className={styles.secondaryBtn}>
                {dict.hero.bookTable}
              </button>
            </div>
          </motion.div>

          {/* Floating Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={styles.visuals}
          >
            <div className={styles.glow} />
            <div className={styles.cardsGrid}>
              <div className={styles.cardItem} data-offset>
                <div className={styles.emoji}>🍲</div>
                <h3 className={styles.cardTitle}>{dict.cards.mansaf.title}</h3>
                <p className={styles.cardDesc}>{dict.cards.mansaf.desc}</p>
              </div>
              <div className={styles.cardItem}>
                <div className={styles.emoji}>🍛</div>
                <h3 className={styles.cardTitle}>{dict.cards.kabsa.title}</h3>
                <p className={styles.cardDesc}>{dict.cards.kabsa.desc}</p>
              </div>
              <div className={`${styles.cardItem} ${styles.cardFull}`}>
                <div className={styles.starIcon}>
                  <Star size={32} color="white" fill="white" />
                </div>
                <div>
                  <div className={styles.title} style={{fontSize: '1.5rem', marginBottom: 0}}>4.9/5</div>
                  <div className={styles.cardDesc}>{dict.cards.reviews}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          {[
            { icon: Leaf, title: dict.features.fresh.title, desc: dict.features.fresh.desc },
            { icon: Clock, title: dict.features.delivery.title, desc: dict.features.delivery.desc },
            { icon: ChefHat, title: dict.features.chefs.title, desc: dict.features.chefs.desc }
          ].map((feature, i) => (
            <div key={i} className={styles.featureCard}>
              <feature.icon size={48} color="var(--primary)" />
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
