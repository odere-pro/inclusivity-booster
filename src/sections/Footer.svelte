<footer class="footer">
  <a
    href="https://medium.com/@alex-derechei"
    target="_blank"
    rel="noopener noreferrer"
    class="footer__link"
  >
    Read the full article on Medium
  </a>
  <span class="footer__sep" aria-hidden="true">&middot;</span>
  <a
    href="https://github.com/odere-pro/inclusivity-booster"
    target="_blank"
    rel="noopener noreferrer"
    class="footer__link"
  >
    GitHub
  </a>
  <span class="footer__sep" aria-hidden="true">&middot;</span>
  <span class="footer__copy">&copy; 2026</span>
</footer>

<style>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 14px 20px;
    border-top: 1px solid var(--border);
    font-size: 12px;
    color: var(--text-ui-dim);
    background: var(--surface);
    flex-shrink: 0;
  }

  .footer__link {
    color: var(--text-ui);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer__link:hover {
    color: var(--blue-text);
  }

  .footer__sep {
    opacity: 0.4;
  }

  .footer__copy {
    opacity: 0.6;
  }
</style>
