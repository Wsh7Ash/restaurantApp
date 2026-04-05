'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, Leaf, ChefHat } from 'lucide-react';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <div>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={`${styles.brand} gradient-text`}>
            TastyBites
          </div>
          <div className={styles.navLinks}>
            <Link href="/menu">Menu</Link>
            <Link href="/about">Story</Link>
            <Link href="/locations">Locations</Link>
          </div>
          <Link href="/menu">
            <button className={styles.orderBtn}>
              Order Now
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
              ✨ Experience Premium Dining
            </div>
            <h1 className={styles.title}>
              Taste the <span className="gradient-text">Extraordinary</span> in Every Bite.
            </h1>
            <p className={styles.subtitle}>
              Crafted with passion, delivered with care. Experience culinary perfection at your doorstep.
            </p>
            <div className={styles.actions}>
              <Link href="/menu">
                <button className={styles.primaryBtn}>
                  View Menu <ArrowRight size={20} />
                </button>
              </Link>
              <button className={styles.secondaryBtn}>
                Book a Table
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
                <div className={styles.emoji}>🍔</div>
                <h3 className={styles.cardTitle}>Gourmet Burgers</h3>
                <p className={styles.cardDesc}>Wagyu Beef</p>
              </div>
              <div className={styles.cardItem}>
                <div className={styles.emoji}>🥗</div>
                <h3 className={styles.cardTitle}>Fresh Salads</h3>
                <p className={styles.cardDesc}>Organic Greens</p>
              </div>
              <div className={`${styles.cardItem} ${styles.cardFull}`}>
                <div className={styles.starIcon}>
                  <Star size={32} color="white" fill="white" />
                </div>
                <div>
                  <div className={styles.title} style={{fontSize: '1.5rem', marginBottom: 0}}>4.9/5</div>
                  <div className={styles.cardDesc}>Based on 10k+ reviews</div>
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
            { icon: Leaf, title: "100% Fresh", desc: "Locally sourced organic ingredients." },
            { icon: Clock, title: "Fast Delivery", desc: "From kitchen to doorstep in 30 mins." },
            { icon: ChefHat, title: "Master Chefs", desc: "Award-winning culinary experts." }
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
