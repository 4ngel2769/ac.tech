<template>
  <section class="about-hero">
    <div class="about-hero-bg"></div>
    <div class="about-hero-overlay"></div>
    <div class="about-container">
      <h1 class="about-title">My Journey in Tech</h1>
      <p class="about-subtitle">
        A timeline of key moments, milestones, and lessons learned.
      </p>
      <ol class="about-timeline">
        <li>
          <div class="timeline-dot"></div>
          <div>
            <h2>2018 &mdash; First Lines of Code</h2>
            <p>words</p>
          </div>
        </li>
        <li>
          <div class="timeline-dot"></div>
          <div>
            <h2>2019 &mdash; Diving into Cybersecurity</h2>
            <p>words</p>
          </div>
        </li>
        <li>
          <div class="timeline-dot"></div>
          <div>
            <h2>2020 &mdash; Embedded Systems</h2>
            <p>words</p>
          </div>
        </li>
        <li>
          <div class="timeline-dot"></div>
          <div>
            <h2>2021 &mdash; Open Source & Community</h2>
            <p>words</p>
          </div>
        </li>
        <li>
          <div class="timeline-dot"></div>
          <div>
            <h2>Today</h2>
            <p>words</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
// No script logic needed
</script>

<style scoped>
.about-hero {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 60px;
  background: transparent;
  overflow: hidden;
}
.about-hero-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url('/bg_website.png');
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
  z-index: 1;
  opacity: 0.7;
  pointer-events: none;
}
.about-hero-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(180deg, rgba(17,17,18,0.7) 0%, #0b1211 100%);
  z-index: 2;
  pointer-events: none;
}
.about-container {
  position: relative;
  z-index: 3;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  background: rgba(20, 20, 20, 0.85);
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.25);
  padding: 2.5rem 2rem 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(8px) saturate(140%);
  border: 1.5px solid rgba(127,255,0,0.08);
}
.about-title {
  font-family: var(--font3);
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  text-align: center;
  letter-spacing: 0.01em;
}
.about-subtitle {
  font-family: var(--font3);
  color: #b3b3b3;
  font-size: 1.1rem;
  margin-bottom: 2.2rem;
  text-align: center;
  font-weight: 400;
}
.about-timeline {
  margin: 2.5rem 0 0 0;
  padding: 0;
  list-style: none;
  border-left: 2px solid var(--htb-green, #7fff00);
}
.about-timeline li {
  position: relative;
  margin-bottom: 2.5rem;
  padding-left: 2.2rem;
}
.timeline-dot {
  position: absolute;
  left: -11px;
  top: 0.3em;
  width: 1.1em;
  height: 1.1em;
  background: var(--htb-green, #7fff00);
  border-radius: 50%;
  border: 2px solid #181818;
  box-shadow: 0 0 0 2px rgba(127,255,0,0.15);
}
.about-timeline h2 {
  font-size: 1.15rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.2em;
  font-family: var(--font3);
}
.about-timeline p {
  color: #b3b3b3;
  font-size: 1rem;
  font-family: var(--font3);
}
@media (max-width: 700px) {
  .about-container {
    padding: 1.5rem 0.5rem;
    max-width: 98vw;
  }
  .about-title {
    font-size: 2rem;
  }
  .about-timeline li {
    padding-left: 1.5rem;
  }
}
</style>