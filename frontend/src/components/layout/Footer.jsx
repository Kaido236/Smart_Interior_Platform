function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16v12H4V6Z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M8 4h4l2 5-3 2c1.2 2.4 2.6 3.8 5 5l2-3 5 2v4c0 1-1 2-2 2C11.6 21 3 12.4 3 3c0-1 1-2 2-2h3v3Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15 8h3V4h-3c-3.3 0-5 2-5 5v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1.1-2.8-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1.8-.2 1.7-.3 2.6-.3s1.8.1 2.6.3c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.8 1.1 1.7 1.1 2.8 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2Z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <p>Smart Interior Platform</p>
          <span>Premium interior marketplace starter built with React.</span>
        </div>

        <div className="footer-contact">
          <p className="footer-title">Contact</p>
          <ul className="contact-list">
            <li>
              <span className="contact-icon">K</span>
              <span>Kaido</span>
            </li>
            <li>
              <span className="contact-icon">
                <MailIcon />
              </span>
              <a href="mailto:hunggialam2306@gmail.com">
                hunggialam2306@gmail.com
              </a>
            </li>
            <li>
              <span className="contact-icon">
                <PhoneIcon />
              </span>
              <span>038xxxxxxx</span>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <p className="footer-title">Social</p>
          <div className="social-links">
            <a
              href="https://www.facebook.com/nguyen.huu.hung.685749/"
              target="_blank"
              rel="noreferrer"
              aria-label="Kaido Facebook"
            >
              <FacebookIcon />
              <span>Facebook</span>
            </a>
            <a
              href="https://github.com/Kaido236"
              target="_blank"
              rel="noreferrer"
              aria-label="Kaido GitHub"
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
