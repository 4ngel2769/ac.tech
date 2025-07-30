<!--<script setup lang="js">
    const items = [{
        label: 'More info',
        icon: 'i-heroicons-link-16-solid',
        defaultOpen: false,
        slot: 'moreinfo'
    }]
</script>-->

<!--<script lang="js">
export default {
    mounted() {
        var w = $(window).width();
        $('.more-info-mobile').css('width', w);
    }
}
</script>
-->

<script setup lang="ts">

const showVideoBg = ref(true) // Set to false for image background

// Optional: toggle function for demo/testing
function toggleBg() {
  showVideoBg.value = !showVideoBg.value
}

// Date formatter for blog posts
const formatBlogDate = (dateString: string) => {
  if (!dateString) return ""
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch (e) {
    console.error("Date formatting error:", e)
    return dateString
  }
}
</script>

<template>
  <!-- HERO SECTION -->
  <div class="hero">
    <!-- Video or Image background -->
    <video
      v-if="showVideoBg"
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
    >
      <!-- <source src="https://i.imgur.com/KeWZEUr.mp4" type="video/mp4" /> -->
      <source src="https://i.imgur.com/LefCJn4.mp4" type="video/mp4" />
    </video>
    <img
      v-else
      class="hero-image-bg"
      src="https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png"
      alt="Background"
      draggable="false"
    />

    <!-- Overlays (filters) -->
    <div class="hero-dark-overlay"></div>
    <div class="hero-vignette-overlay"></div>

    <!-- your existing container -->
    <div class="tContainer">
      <div class="ProfilePicture">
        <NuxtImg
          format="webp"
          src="/android-chrome-192x192.png"
          quality="90"
          alt="Profile Picture"
          width="120px"
        />
      </div>
      <div class="Name">
        <h1 class="NameText">Angel Capra</h1>
      </div>
      <div class="undertext">
        <div class="Location">
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          <p class="LocationText">Bucharest, Romania</p>
        </div>
        <div class="Website">
          <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
          <p class="WebsiteText">
            <a target="_blank" href="https://adev0.eu"
              >https://adev0.eu</a
            >
          </p>
          <UTooltip text="Under development as new website (Coming soon).">
            <UBadge color="green" variant="outline">Development</UBadge>
          </UTooltip>
        </div>
        <div class="Website">
          <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
          <p class="WebsiteText">
            <a target="_blank" href="https://angelscoolstuff.pages.dev"
              >Old</a
            >
          </p>
          <UTooltip text="Old personal website.">
            <UBadge color="pink" variant="outline">Old</UBadge>
          </UTooltip>
        </div>
      </div>
      <UDivider label="Socials" class="socialdivider" />
      <p class="linkstitle">Find me here!</p>
      <div class="linkscontainer">
        <UTooltip text="YouTube | @angeldev0">
          <NuxtLink
            class="link"
            to="https://youtube.com/@angeldev0"
            external
            target="_blank"
            ><font-awesome-icon icon="fas fa-brands fa-youtube"
          /></NuxtLink>
        </UTooltip>
        <UTooltip text="GitHub | 4ngel2769">
          <NuxtLink
            class="link"
            to="https://github.com/4ngel2769"
            external
            target="_blank"
            ><font-awesome-icon icon="fa-brands fa-github"
          /></NuxtLink>
        </UTooltip>
        <UTooltip text="Dev.to | @angeldev0">
          <NuxtLink
            class="link"
            to="https://dev.to/angeldev0"
            external
            target="_blank"
            ><font-awesome-icon icon="fa-brands fa-dev"
          /></NuxtLink>
        </UTooltip>
        <UTooltip text="Twitter | @angeldev0">
          <NuxtLink
            class="link"
            to="https://twitter.com/angeldev0"
            external
            target="_blank"
            ><font-awesome-icon icon="fa-brands fa-twitter"
          /></NuxtLink>
        </UTooltip>
        <UTooltip text="LinkedIn | @angelcapra">
          <NuxtLink
            class="link"
            to="http://linkedin.com/in/angelcapra"
            external
            target="_blank"
            ><font-awesome-icon icon="fa-brands fa-linkedin"
          /></NuxtLink>
        </UTooltip>
        <UTooltip text="Instagram | @angeldevz0">
          <NuxtLink
            class="link"
            to="https://instagram.com/angeldevz0"
            external
            target="_blank"
            ><font-awesome-icon icon="fa-brands fa-instagram"
          /></NuxtLink>
        </UTooltip>
        <UTooltip text="Email me | angeldevz0@proton.me">
          <NuxtLink class="link" to="mailto:angeldevz0@proton.me" external
            ><font-awesome-icon icon="fa-solid fa-at"
          /></NuxtLink>
        </UTooltip>
      </div>
      <UDivider label="About Me" class="descriptiondivider" />
      <div class="descriptiondiv">
        <div class="Description">
          <h2 class="DescriptionText leading-h4 font-semibold">
            Hi, I'm Angel, Cybersecurity Researcher & Embedded Systems Developer
          </h2>
        </div>
        <div class="mb-6">
          <p class="tracking-normal leading-6">
            I specialize in <span class="font-bold">cybersecurity</span>,
            <span class="font-bold">ethical hacking</span>, and
            <span class="font-bold">embedded systems development</span>, with
            extensive experience in Docker, virtual environments, networking, and
            server management.<br />
            My work involves uncovering vulnerabilities, creating secure devices,
            and developing innovative solutions using ESP32 microcontrollers.
          </p>
        </div>
      </div>
    </div>

    <!-- Example toggle button (remove in production) -->
    <!-- <button @click="toggleBg" style="position:absolute;top:10px;right:10px;z-index:10;">
      Toggle BG
    </button> -->
  </div>
  <!-- END HERO SECTION -->

  <!-- Projects Hero Section -->
  <section class="projects-hero-section">
    <div class="projects-hero-content">
      <div class="projects-hero-text">
        <span class="projects-hero-label">TAKE A PEEK</span>
        <h2 class="projects-hero-title">MY PROJECTS</h2>
        <p class="projects-hero-description">
          I enjoy building things. Wether that's radio tools, scripts, hacking devices, applications,
          or anything in between. Take a look at my arsenal of projects.
        </p>
        <NuxtLink to="/projects" class="explore-projects-btn projects-hero-btn">
        <p>PROJECTS</p>
        <!-- <font-awesome-icon :icon="['fas', 'rocket']" class="ml-2" /> -->
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Latest Blogs Section -->
  <section class="latest-blogs-section">
    <div class="latest-blogs-container">
      <div class="latest-blogs-header">
        <span class="latest-blogs-label">LATEST BLOGS</span>
      </div>
      
      <div class="latest-blogs-grid">
        <ContentQuery
          path="/projects"
          :only="['headline', 'date', '_path', 'socialImage']"
          :sort="{ date: -1 }"
          :limit="3"
        >
          <template v-slot="{ data }">
            <div
              v-for="blog in data"
              :key="blog._path"
              class="blog-card"
            >
              <NuxtLink :to="blog._path" class="blog-card-link">
                <div class="blog-card-image">
                  <img
                    v-if="blog.socialImage?.src"
                    :src="blog.socialImage.src"
                    :alt="blog.socialImage.alt || blog.headline"
                    class="blog-image"
                  />
                  <div v-else class="blog-image-placeholder">
                    <span class="text-gray-400">No image</span>
                  </div>
                </div>
                <div class="blog-card-content">
                  <h3 class="blog-card-title">{{ blog.headline }}</h3>
                  <p class="blog-card-date">{{ formatBlogDate(blog.date) }}</p>
                </div>
              </NuxtLink>
            </div>
          </template>
          <template #not-found>
            <div class="no-blogs-message">
              <p>No blog posts found.</p>
            </div>
          </template>
        </ContentQuery>
      </div>
    </div>
  </section>

  <div class="assets-credits" id="assets-credits">
    <p>
      Awesome backgrounds by Sébastien Noël's
      <a href="https://fffuel.co" target="_blank">fffuel.co</a> .
    </p>
  </div>
</template>

<style scoped>
:root, p {
  word-spacing: 0.1rem;
  letter-spacing: 0.03em;
}
.menu {
  z-index: 0;
}
.transparent-icon {
  background-color: transparent;
  border: none;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding-top: 40px;
  padding-bottom: 40px;
}
.hero {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: 520px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 0;
  background: #000;        /* fallback color */
  overflow: hidden;
}
.hero-video,
.hero-image-bg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) scale(1.1); /* scale up to hide blur edges */
  width: 100vw;
  height: 100%;
  object-fit: cover;
  z-index: 0;

  /* add blur */
  filter: blur(0px);
}

/* Dark tint overlay */
.hero-dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
}

/* Vignette overlay */
.hero-vignette-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.5) 90%,
    rgba(0, 0, 0, 0.9) 98%
  );
}

.tContainer {
  position: relative;
  z-index: 3; /* Update to be above both overlays */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 80px 0px 0px 0px;
  left: 10px;
  max-width: 700px;
  /* background-color: #101417e2; */
  /* backdrop-filter: blur(5px); */
  /* padding: 15px; */
  /* border-radius: 5px; */
}
.Name,
.NameText {
  /* font-family: var(--font19); */
  font-family: var(--font2);
  font-size: 2em;
}
.Description,
.DescriptionText {
  /* font-family: var(--font22); */
  font-size: 18px;
  font-family: var(--font3);
}
.descriptiondiv {
  display: flex;
  flex-direction: column;
  font-family: var(--font-3);
}
.descriptiondiv p {
  line-height: 1.5;
  font-weight: 500;
  color: #ccc;
  font-family: var(--font3);
}
/* .more-info-mobile { */
/* display: none; */
/* visibility: hidden; */
/* width: ; */
/* } */
.linkstitle {
  margin: 15px 0px 0px 0px;
  /* font-family: var(--font29); */
  /* font-weight: normal; */
  /* font-style: round; */
}
.linkscontainer {
  margin: 10px 0px 10px 0px;
  display: flex;
}
.link {
  font-size: 20px;
  padding: 0px 10px 0px 10px;
}
.Location {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin: 0px 0px 0px 0px;
}
.Website {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin: 0px 0px 0px 0px;
}
.more-info-mobile {
  display: none;
  visibility: hidden;
}
.undertext {
  display: flex;
  flex-direction: row;
  gap: 25px;
  color: #aaaaaa;
  margin: 5px 0px 25px 0px;
  font-size: 0.9em;
}
.descriptiondivider {
  display: none;
  visibility: hidden;
}
.socialdivider {
  display: none;
  visibility: hidden;
}
.assets-credits {
  position: fixed;
  bottom: 20px;
  left: 20px;
  border-radius: 12px;
  padding: 10px;
  background-color: #3535352f;
  z-index: 5;
  border: 2px solid #a4a4a482;
  transition: left 1.3s;
  backdrop-filter: blur(5px);
}
.assets-credits a {
  color: var(--l-green);
}
.assets-credits p {
  color: var(--main-details);
}
.bottomImg {
  position: absolute;
  /* left: -10px; */
  right: 0px;
  bottom: 0px;
  z-index: -200;
  min-width: 110vh;
}
body {
  overflow-x: hidden;
}

/* Projects Hero Section */
.projects-hero-section {
  margin: 0rem 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 600px; /* Increased height to accommodate full image */
  border-radius: 0;
  position: relative;
  overflow: hidden; /* This ensures rotated SVG doesn't show outside the div */
  border: none;
}

/* Add a pseudo-element for the rotated background */
.projects-hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("bg_website_m.png");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: cover;
  transform: rotate(0deg);
  transform-origin: center center;
  z-index: 1;
  opacity: 1;
}
/* Add overlay for brightness control */
.projects-hero-section::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0b12118f; /* Adjust opacity to control brightness */
  z-index: 1;
  pointer-events: none; /* <-- Add this line */
}

.projects-hero-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding: 2rem;
  position: relative;
  z-index: 3; /* Changed from 2 to 3 to stay above the overlay */
  max-width: 1200px;
  margin: 0 auto;
}


/* Responsive adjustments */
@media (min-width: 1200px) {
  .projects-hero-section {
    height: 650px; /* Even taller on larger screens */
  }
  
  .projects-hero-section::before {
    background-size: cover;
    background-position: left center;
  }
}

/* Desktop - ensure proper scaling */
@media (min-width: 1024px) and (max-width: 1199px) {
  .projects-hero-section {
    height: 600px;
  }
  
  .projects-hero-section::before {
    background-size: cover;
    background-position: left center;
  }
}

/* Tablet */
@media (max-width: 1023px) and (min-width: 769px) {
  .projects-hero-section {
    height: 600px;
  }
  
  .projects-hero-section::before {
    background-size: cover;
    background-position: left center;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .projects-hero-section {
    height: 500px; /* Shorter on mobile */
  }
  
  .projects-hero-section::before {
    background-size: cover;
    background-position: left center;
  }
}

.projects-hero-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding: 2rem;
  position: relative;
  z-index: 3; /* Changed from 2 to 3 to stay above the overlay */
  max-width: 1200px;
  margin: 0 auto;
}

.projects-hero-content {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
}

.projects-hero-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  max-width: 500px;
  margin-right: auto;
  margin-left: auto;
  text-align: left;
  z-index: 3;
  position: relative;
}

.projects-hero-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #999;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.projects-hero-title {
  font-size: 3.5rem;
  font-weight: 600;
  color: #d5d5d5;
  margin: 0 0 1rem 0;
  line-height: 1.1;
  font-family: var(--font3); /* Montserrat */
}

.projects-hero-description {
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #e1e1e1;
  margin-bottom: 2rem;
}

.projects-hero-btn {
  display: inline-block;
  padding: 1rem 2rem;
  background: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid #555;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.projects-hero-btn:hover {
  background: #444;
  border-color: #777;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.projects-hero-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.projects-hero-btn:hover::before {
  left: 100%;
}

.explore-projects-btn {
  position: relative;
  background-color: #262626; /* bg-neutral-800 */
  height: 3rem; /* h-16 */
  width: 10rem; /* w-64 */
  border: 1px solid #404040;
  text-align: left;
  padding: 0.75rem;
  color: #f9fafb; /* text-gray-50 */
  font-size: 2.3rem;
  font-weight: bold;
  font-family: var(--font6);
  border-radius: 0.5rem;
  overflow: hidden;
  text-underline-offset: 0.125rem;
  text-decoration-color: transparent;
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 0;
}
.explore-projects-btn * {
  z-index: 1000;
}
/* Before pseudo-element (violet glow) */
.explore-projects-btn::before {
  content: "";
  position: absolute;
  width: 3rem; /* w-12 */
  height: 3rem; /* h-12 */
  right: 0.25rem; /* right-1 */
  top: 0.25rem; /* top-1 */
  z-index: 0;
  background-color: #8b5cf6; /* bg-violet-500 */
  border-radius: 50%;
  filter: blur(16px);
  transition: all 0.5s ease;
}
/* After pseudo-element (rose glow) */
.explore-projects-btn::after {
  content: "";
  position: absolute;
  z-index: 0;
  width: 5rem; /* w-20 */
  height: 5rem; /* h-20 */
  background-color: #ff3f7c; /* bg-rose-300 */
  right: 2rem; /* right-8 */
  top: 0.75rem; /* top-3 */
  border-radius: 50%;
  filter: blur(16px);
  transition: all 0.5s ease;
}
/* Hover effects */
.explore-projects-btn:hover {
  border-color: #c1c1c1; /* hover:border-rose-300 */
  border-width: 1px;
  color: #fff4f5; /* hover:text-rose-300 */
  text-decoration-color: #fda4af;
  text-underline-offset: 0.25rem;
  text-decoration-thickness: 2px;
}
.explore-projects-btn:hover::before {
  box-shadow: 20px 20px 20px 30px #a21caf;
  right: 3rem; /* hover:before:right-12 */
  bottom: -2rem; /* hover:before:-bottom-8 */
  filter: blur(20px);
}
.explore-projects-btn:hover::after {
  box-shadow: 20px 20px 20px 30px #f472b6;
  right: 0; /* hover:after:right-0 */
  top: 0; /* hover:after:top-0 */
  filter: blur(20px);
}
.explore-projects-btn:hover::after {
  right: -2rem; /* hover:after:-right-8 */
}


/* Mobile responsive */
@media (max-width: 768px) {
  .projects-hero-section::before {
    background-size: auto 100%; /* Maintains aspect ratio */
    background-position: left center;
  }
}
/* Latest Blogs Section */
.latest-blogs-section {
  margin: 0.5rem 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding-top: 2rem;
  padding-bottom: 2rem;
  position: relative;
}

.latest-blogs-container {
  max-width: 1200px;
  margin: 0 auto;
}

.latest-blogs-header {
  text-align: center;
  margin-bottom: 3rem;
}

.latest-blogs-label {
  display: block;
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #d5d5d5;
  text-transform: uppercase;
  font-family: var(--font3);
}

.latest-blogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 350px)); /* Changed minmax values */
  gap: 2rem;
  justify-content: center; /* Changed from justify-items to justify-content */
}

.blog-card {
  transition: all 0.3s ease;
  width: 100%;
  max-width: 350px;
  min-width: 280px; /* Added minimum width */
  aspect-ratio: 350/300; /* Added aspect ratio to maintain proportions */
  display: flex;
  flex-direction: column;
}

.blog-card-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  height: 100%;
  width: 100%;
}

.blog-card-image {
  position: relative;
  width: 100%;
  height: 200px;
  flex-shrink: 0; /* Prevent image from shrinking */
  overflow: hidden;
}

.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
  border-radius: 10px;
  filter: brightness(0.6);
}

.blog-card:hover .blog-image {
  filter: brightness(1);
}

.blog-card-content {
  padding: 1rem 0.5rem 0.4rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1; /* Take remaining space */
  justify-content: space-between;
  min-height: 100px; /* Ensure minimum height for content */
}

.blog-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #f3f4f6;
  line-height: 1.4;
  font-family: var(--font3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  flex-shrink: 0; /* Prevent title from shrinking */
}

.blog-card-date {
  font-size: 0.875rem;
  color: #9ca3af;
  font-family: var(--font3);
  margin: 0;
  margin-top: auto;
  flex-shrink: 0; /* Prevent date from shrinking */
}

.no-blogs-message {
  text-align: center;
  color: #9ca3af;
  font-size: 1.125rem;
  grid-column: 1 / -1;
  padding: 2rem;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .latest-blogs-section {
    padding: 3rem 1rem;
    margin: 2rem 0;
  }
  .projects-hero-bg {
    width: 100%;
    height: 40%;
    background-position: center top;
    opacity: 0.4;
  }
  .projects-hero-text {
    align-items: center;
    text-align: center;
  }

  .latest-blogs-label {
    font-size: 2rem;
  }

  .latest-blogs-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 320px)); /* Smaller but still maintaining ratio */
    gap: 1.5rem;
    justify-content: center;
  }

  .blog-card {
    max-width: 320px;
    min-width: 260px;
    aspect-ratio: 320/280; /* Adjusted aspect ratio for mobile */
  }

  .blog-card-image {
    height: 160px; /* Smaller image height on mobile */
  }

  .blog-card-content {
    padding: 1rem 0.75rem 0.5rem 0.75rem;
    min-height: 80px;
  }

  .latest-blogs-label {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .latest-blogs-section {
    padding: 2rem 0.5rem;
  }

  .latest-blogs-grid {
    grid-template-columns: 1fr; /* Single column on very small screens */
    gap: 1rem;
    justify-content: center;
    max-width: 300px;
    margin: 0 auto;
  }

  .blog-card {
    max-width: 300px;
    min-width: 280px;
    aspect-ratio: 300/260; /* Compact aspect ratio for small phones */
    margin: 0 auto;
  }

  .blog-card-image {
    height: 140px;
  }

  .blog-card-content {
    padding: 0.75rem 0.5rem;
    min-height: 70px;
  }

  .blog-card-title {
    font-size: 1rem;
    line-height: 1.3;
    -webkit-line-clamp: 2; /* Ensure title stays visible */
  }

  .blog-card-date {
    font-size: 0.8rem;
  }

  .latest-blogs-label {
    font-size: 1.75rem;
  }
}

/* Light mode support */
.light .blog-card-title {
  color: #111827;
}

.light .blog-card-date {
  color: #6b7280;
}

.light .latest-blogs-label {
  color: #111827;
}
</style>

<script lang="ts">
export default {
  mounted() {
    // Set video playback speed
    const video = document.querySelector('.hero-video') as HTMLVideoElement;
    if (video) {
      video.playbackRate = 0.75; // Change this value: 0.5 = half speed, 2.0 = double speed, etc.
    }

    // ...existing code...
    useSeoMeta({
      title: "Angel Capra | Portfolio 🚀",
      ogTitle: "Angel Capra | Portfolio 🚀",
      description:
        "Explore Angel Capra's projects in cybersecurity, IoT development, and embedded systems. As a cybersecurity student, I showcase a diverse portfolio from hacking devices with ESP32 and Arduino to creating innovative tech solutions. Discover the intersection of cybersecurity and IoT technology, and find fascinating projects that push the boundaries of tech innovation.",
      ogDescription:
        "Explore Angel Capra's projects in cybersecurity, IoT development, and embedded systems. As a cybersecurity student, I showcase a diverse portfolio from hacking devices with ESP32 and Arduino to creating innovative tech solutions. Discover the intersection of cybersecurity and IoT technology, and find fascinating projects that push the boundaries of tech innovation.",
      ogImage: "",
      twitterCard: "summary_large_image",
    });
    const isOpen = ref(false);
  },
};
// export default {
//     mounted () {

//     }
// }
</script>
