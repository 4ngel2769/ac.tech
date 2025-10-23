<!-- <script setup lang="ts">
const items = [{
  label: 'Getting Started',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
  slot: 'getting-started'
}, {
  label: 'Installation',
  icon: 'i-heroicons-arrow-down-tray',
  defaultOpen: true,
  slot: 'installation'
}, {
  label: 'Theming',
  icon: 'i-heroicons-eye-dropper',
  defaultOpen: true,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
  label: 'Layouts',
  icon: 'i-heroicons-rectangle-group',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
  label: 'Components',
  icon: 'i-heroicons-square-3-stack-3d',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
  label: 'Utilities',
  icon: 'i-heroicons-wrench-screwdriver',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}]
</script>
-->

<template>
  <section class="contact-hero">
    <div class="contact-hero-bg"></div>
    <div class="contact-hero-overlay"></div>
    <div class="contact-container">
      <NuxtLink to="/" class="back-link">
        <svg class="back-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </NuxtLink>
      <h1 class="contact-title">Contact Angel Capra</h1>
      <p class="contact-subtitle">
        Want to get in touch? Reach out for collaborations, questions, or just to say hi!
      </p>
      <div class="contact-cards">
        <div class="contact-card">
          <div class="contact-card-icon">
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </div>
          <div>
            <h2>Email</h2>
            <a href="mailto:angeldevz0@proton.me" class="contact-link">angeldevz0@proton.me</a>
          </div>
        </div>
        <div class="contact-card">
          <div class="contact-card-icon">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </div>
          <div>
            <h2>Instagram</h2>
            <a href="https://instagram.com/angeldevz0" target="_blank" class="contact-link">@angeldevz0</a>
          </div>
        </div>
        <div class="contact-card">
          <div class="contact-card-icon">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </div>
          <div>
            <h2>LinkedIn</h2>
            <a href="https://linkedin.com/in/angelcapra" target="_blank" class="contact-link">/in/angelcapra</a>
          </div>
        </div>
        <div class="contact-card">
          <div class="contact-card-icon">
            <font-awesome-icon :icon="['fab', 'github']" />
          </div>
          <div>
            <h2>GitHub</h2>
            <a href="https://github.com/4ngel2769" target="_blank" class="contact-link">4ngel2769</a>
          </div>
        </div>
      </div>
      <div class="contact-divider"></div>
      <div class="contact-message-box">
        <h2>Send a Message</h2>
        <form
          :action="mailtoAction"
          method="GET"
          class="contact-form"
        >
          <div class="form-row">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              class="contact-input"
              autocomplete="off"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              class="contact-input"
              autocomplete="email"
            />
          </div>
          <textarea
            name="body"
            placeholder="Your Message"
            required
            class="contact-textarea"
            rows="5"
          ></textarea>
          <button type="submit" class="contact-submit-btn">
            Send via Email
          </button>
        </form>
        <p class="contact-note">
          Or DM me on <a href="https://instagram.com/angeldevz0" target="_blank" class="contact-link">Instagram</a> for a quick reply!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const mailtoAction = "mailto:angeldevz0@proton.me";
</script>

<style scoped>
.contact-hero {
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
.contact-hero-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url('/bg_website_fade.png');
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
  z-index: 1;
  opacity: 0.7;
  pointer-events: none;
}
.contact-hero-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(180deg, rgba(17,17,18,0.7) 0%, #0b1211 100%);
  z-index: 2;
  pointer-events: none;
}
.contact-container {
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

.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--htb-green, #7fff00);
  font-family: var(--font3);
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-decoration: none;
  transition: color 0.2s;
}
.back-link:hover {
  color: #fff;
}
.back-arrow {
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
  stroke-width: 2.5;
}

.contact-title {
  font-family: var(--font3);
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  text-align: center;
  letter-spacing: 0.01em;
}
.contact-subtitle {
  font-family: var(--font3);
  color: #b3b3b3;
  font-size: 1.1rem;
  margin-bottom: 2.2rem;
  text-align: center;
  font-weight: 400;
}

.contact-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  width: 100%;
}
.contact-card {
  background: rgba(30, 30, 30, 0.92);
  border: 1px solid rgba(127,255,0,0.08);
  border-radius: 0.75rem;
  padding: 1.2rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.contact-card:hover {
  border-color: var(--htb-green, #7fff00);
  box-shadow: 0 4px 16px 0 rgba(127,255,0,0.08);
}
.contact-card-icon {
  font-size: 2rem;
  color: var(--htb-green, #7fff00);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
}
.contact-card h2 {
  font-family: var(--font3);
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.2rem 0;
}
.contact-link {
  color: var(--htb-green, #7fff00);
  font-family: var(--font3);
  font-size: 1rem;
  text-decoration: underline;
  transition: color 0.2s;
  word-break: break-all;
}
.contact-link:hover {
  color: #fff;
}

.contact-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #444 40%, #444 60%, transparent);
  margin: 2.5rem 0 2rem 0;
  opacity: 0.5;
}

.contact-message-box {
  width: 100%;
  background: rgba(24, 24, 24, 0.96);
  border-radius: 0.75rem;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  border: 1px solid rgba(127,255,0,0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contact-message-box h2 {
  font-family: var(--font3);
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1.2rem;
  text-align: center;
}
.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.form-row {
  display: flex;
  gap: 1rem;
  width: 100%;
}
.contact-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
  background: rgba(30, 30, 30, 0.98);
  color: #fff;
  font-family: var(--font3);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.contact-input:focus {
  border-color: var(--htb-green, #7fff00);
}
.contact-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
  background: rgba(30, 30, 30, 0.98);
  color: #fff;
  font-family: var(--font3);
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s;
}
.contact-textarea:focus {
  border-color: var(--htb-green, #7fff00);
}
.contact-submit-btn {
  background: var(--htb-green, #7fff00);
  color: #111212;
  font-family: var(--font3);
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 2.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 2px 8px 0 rgba(127,255,0,0.08);
}
.contact-submit-btn:hover {
  background: #fff;
  color: var(--htb-green, #7fff00);
}
.contact-note {
  margin-top: 1.5rem;
  color: #b3b3b3;
  font-size: 0.95rem;
  text-align: center;
  font-family: var(--font3);
}
.contact-note .contact-link {
  color: var(--htb-green, #7fff00);
  text-decoration: underline;
}

/* Responsive styles */
@media (max-width: 700px) {
  .contact-container {
    padding: 1.5rem 0.5rem;
    max-width: 98vw;
  }
  .contact-title {
    font-size: 2rem;
  }
  .contact-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .contact-message-box {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
  }
  .form-row {
    flex-direction: column;
    gap: 0.7rem;
  }
}
</style>