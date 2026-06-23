import React from 'react';
import LegalLayout from './LegalLayout';
import styles from './Legal.module.css';

const PrivacyPolicy = () => {
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy" updated="June 21, 2026">
      <p className={styles.intro}>
        This policy explains what information ReactDevMastery collects when you use the platform,
        why we collect it, and the choices you have. We built this product to teach senior frontend
        engineering concepts, not to build a data business — so we collect the minimum needed to run
        your account and track your learning progress.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionNum}>01</div>
        <h2 className={styles.sectionTitle}>Information we collect</h2>
        <p className={styles.text}>
          When you create an account, we collect your name and email address. If you sign up with
          Google, we receive your name, email, and profile picture from Google's authentication
          service — we never receive your Google password.
        </p>
        <table className={styles.table}>
          <thead>
            <tr><th>Data</th><th>Why we collect it</th></tr>
          </thead>
          <tbody>
            <tr><td>Name &amp; email</td><td>Account identification, login, password reset emails</td></tr>
            <tr><td>Password (hashed)</td><td>Authentication, if you sign up without Google. We never store your raw password.</td></tr>
            <tr><td>Google profile info</td><td>Sign-in via Google OAuth, if you choose that option</td></tr>
            <tr><td>Learning progress</td><td>Tracking completed topics, concepts, and quiz history so your progress is saved</td></tr>
            <tr><td>Quiz &amp; flashcard activity</td><td>Calculating your accuracy stats and review history</td></tr>
            <tr><td>Activity &amp; streak data</td><td>Powering the streak counter and activity heatmap on your dashboard</td></tr>
          </tbody>
        </table>
        <p className={styles.text}>
          We do not collect payment information, since the platform does not currently process
          payments. We do not use third-party advertising or analytics trackers.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>02</div>
        <h2 className={styles.sectionTitle}>How we use your information</h2>
        <ul className={styles.list}>
          <li>To create and maintain your account</li>
          <li>To save your learning progress across sessions and devices</li>
          <li>To authenticate you when you sign in, including via Google</li>
          <li>To send essential account emails, such as password reset links</li>
          <li>To display your stats on the leaderboard, if that feature is enabled</li>
        </ul>
        <p className={styles.text}>
          We do not sell your data, and we do not share it with advertisers.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>03</div>
        <h2 className={styles.sectionTitle}>Google Sign-In</h2>
        <p className={styles.text}>
          If you choose to sign in with Google, we use Google's OAuth service to verify your
          identity. We request only your basic profile information (name, email, profile picture)
          and never request access to your Gmail, Drive, or other Google services. Your use of
          Google Sign-In is also subject to Google's own Privacy Policy.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>04</div>
        <h2 className={styles.sectionTitle}>Cookies</h2>
        <p className={styles.text}>
          We use a small number of essential cookies required to keep you signed in, specifically
          an HTTP-only refresh token cookie used to maintain your authenticated session securely.
          We do not use third-party advertising or tracking cookies.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>05</div>
        <h2 className={styles.sectionTitle}>Data storage and security</h2>
        <p className={styles.text}>
          Your data is stored in a MongoDB database. Passwords are hashed using bcrypt before
          storage — we never store passwords in plain text and cannot recover your original
          password if you forget it. Authentication uses signed JSON Web Tokens with short-lived
          access tokens and rotating refresh tokens.
        </p>
        <p className={styles.text}>
          While we take reasonable steps to protect your information, no method of electronic
          storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>06</div>
        <h2 className={styles.sectionTitle}>Your rights and choices</h2>
        <ul className={styles.list}>
          <li><strong>Access:</strong> You can view your profile and progress data from your account settings at any time.</li>
          <li><strong>Correction:</strong> You can update your name and profile details from your Profile page.</li>
          <li><strong>Deletion:</strong> You can request deletion of your account and associated data by contacting us using the details below.</li>
          <li><strong>Sign out:</strong> Signing out clears your session cookie from your current device.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>07</div>
        <h2 className={styles.sectionTitle}>Children's privacy</h2>
        <p className={styles.text}>
          ReactDevMastery is not directed at children under 13, and we do not knowingly collect
          information from children under 13. If you believe a child has provided us with personal
          information, please contact us so we can remove it.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionNum}>08</div>
        <h2 className={styles.sectionTitle}>Changes to this policy</h2>
        <p className={styles.text}>
          We may update this policy from time to time as the platform evolves. We'll update the
          "Last updated" date above when we do. Continued use of ReactDevMastery after changes
          means you accept the updated policy.
        </p>
      </div>

      <div className={styles.contactBox}>
        <h2 className={styles.sectionTitle}>Questions?</h2>
        <p className={styles.text}>
          If you have questions about this policy or want to exercise any of the rights above,
          reach out at <a href="mailto:privacy@reactdevmastery.com" className={styles.link}>privacy@reactdevmastery.com</a>.
        </p>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;