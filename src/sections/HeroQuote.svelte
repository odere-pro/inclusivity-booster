<section class="hero" aria-label="Opening quote">
  <blockquote class="hero__quote">
    <p>"You cannot participate in the democracy of a city you cannot read."</p>
  </blockquote>
</section>

<style>
  .hero {
    padding: 16px 20px 10px;
    text-align: center;
  }

  .hero__quote {
    margin: 0;
    max-width: 640px;
    margin-inline: auto;
  }

  .hero__quote p {
    margin: 0;
    font-size: clamp(16px, 3vw, 24px);
    font-weight: 300;
    font-style: italic;
    color: var(--text-bright);
    line-height: 1.5;
    letter-spacing: -0.01em;
  }

  @media (max-width: 480px) {
    .hero {
      padding: 10px 12px 6px;
    }
  }
</style>
