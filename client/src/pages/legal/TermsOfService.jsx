import React from 'react';
import LegalLayout from './LegalLayout';
import styles from './Legal.module.css';

const TermsOfService = () => {
  return (
    <LegalLayout eyebrow="Legal" title="Terms of Service" updated="June 21, 2026">
      <p className={styles.intro}>
        These terms govern your use of ReactDevMastery. By creating an account or using the
        platform, you agree to these terms. Please read them before signing up.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionNum}>01</div>
        <h2 className={styles.sectionTitle}>Using ReactDevMastery</h2>
        <p className={styles.text}>
          ReactDevMastery is an educational platform for learning senior frontend engineering
          concepts, including JavaScript, React, TypeScript, system design, and interview
          preparation material. You may use the platform to learn, practice, and track your
          progress through the available content.
        </p>
        <p className={styles.text}>
          You must be at least 13 years old to create an account. By registering, you confirm
          that the information you provide is accurate and that you'll keep it up to date.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>02</div>
        <h2 className={styles.sectionTitle}>Your account</h2>
        <ul className={styles.list}>
          <li>You're responsible for keeping your password secure and for all activity under your account.</li>
          <li>If you sign in with Google, you're responsible for the security of your Google account.</li>
          <li>Notify us promptly if you suspect unauthorized access to your account.</li>
          <li>You may delete your account at any time by contacting us.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>03</div>
        <h2 className={styles.sectionTitle}>Acceptable use</h2>
        <p className={styles.text}>When using ReactDevMastery, you agree not to:</p>
        <ul className={styles.list}>
          <li>Attempt to gain unauthorized access to other accounts or our systems</li>
          <li>Use automated tools to scrape, copy, or redistribute course content in bulk</li>
          <li>Interfere with or disrupt the platform's normal operation</li>
          <li>Use the platform for any unlawful purpose</li>
          <li>Impersonate another person or misrepresent your affiliation with anyone</li>
        </ul>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>04</div>
        <h2 className={styles.sectionTitle}>Content and intellectual property</h2>
        <p className={styles.text}>
          All lessons, visualizations, quizzes, flashcards, and other educational content on
          ReactDevMastery are owned by us or our licensors and protected by copyright. You're
          granted a personal, non-transferable license to access and use this content for your
          own learning. You may not copy, redistribute, sell, or publicly republish course
          content without our written permission.
        </p>
        <p className={styles.text}>
          Any progress data, quiz answers, or other content you generate while using the platform
          remains associated with your account and is handled as described in our{' '}
          <a href="/privacy" className={styles.link}>Privacy Policy</a>.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>05</div>
        <h2 className={styles.sectionTitle}>Service availability</h2>
        <p className={styles.text}>
          We aim to keep ReactDevMastery available and reliable, but we don't guarantee
          uninterrupted access. The platform may be unavailable occasionally for maintenance,
          updates, or due to circumstances outside our control. We may modify, suspend, or
          discontinue any part of the service at any time.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>06</div>
        <h2 className={styles.sectionTitle}>Educational content disclaimer</h2>
        <p className={styles.text}>
          ReactDevMastery is provided for educational purposes. While we work to keep technical
          content accurate and current, software engineering practices and tools evolve quickly,
          and we don't guarantee that every concept, code example, or interview question reflects
          the latest industry standards at all times. Use your judgment and verify critical
          technical decisions independently.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>07</div>
        <h2 className={styles.sectionTitle}>Termination</h2>
        <p className={styles.text}>
          You may stop using the platform and request account deletion at any time. We may
          suspend or terminate accounts that violate these terms, including the acceptable use
          rules above. Where reasonably possible, we'll provide notice before doing so.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>08</div>
        <h2 className={styles.sectionTitle}>Limitation of liability</h2>
        <p className={styles.text}>
          ReactDevMastery is provided "as is" without warranties of any kind. To the fullest
          extent permitted by law, we aren't liable for any indirect, incidental, or consequential
          damages arising from your use of, or inability to use, the platform.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>09</div>
        <h2 className={styles.sectionTitle}>Changes to these terms</h2>
        <p className={styles.text}>
          We may update these terms as the platform evolves. We'll update the "Last updated" date
          above when we do, and significant changes will be communicated where practical.
          Continuing to use ReactDevMastery after changes take effect means you accept the
          updated terms.
        </p>
      </div>

      <div className={styles.contactBox}>
        <h2 className={styles.sectionTitle}>Questions?</h2>
        <p className={styles.text}>
          If you have questions about these terms, reach out at{' '}
          <a href="mailto:support@reactdevmastery.com" className={styles.link}>support@reactdevmastery.com</a>.
        </p>
      </div>
    </LegalLayout>
  );
};

export default TermsOfService;