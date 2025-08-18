<template>
  <Section id="blog" class="breadcrumbs">
    <div
      class="border-t-2 pt-8 border-zinc-500 flex flex-col md:flex-row items-center md:justify-between md:text-right mb-6 md:mb-8"
    >
      <ol
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
        class="blog-breadcrumb"
      >
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <a itemprop="item" href="/"> <span itemprop="name">Home</span></a>
          <meta itemprop="position" content="1" />
        </li>
        <span>/</span>
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span itemprop="name" class="text-slate-50">Blog</span>
          <meta itemprop="position" content="2" />
        </li>
      </ol>
    </div>
    <h1
      class="font-bold mb-4 md:mb-6 text-3xl md:text-4xl text-center md:text-left blog-title"
      style="font-family: var(--font3); color: var(--htb-green);"
    >
      Blog
    </h1>
    <p class="mb-3 md:w-8/12 text-lg text-center md:text-left blog-description max-w-2xl"
       style="font-family: var(--font3); color: var(--main-dsc);">
      Explore articles about cybersecurity, IoT development, and embedded systems.
    </p>
    <div
      class="border-t-2 mt-8 border-zinc-500 flex flex-col md:flex-row items-center md:justify-between md:text-right"
    ></div>
  </Section>
</template>

<style scoped>
.breadcrumb {
  font-family: var(--font3);
  font-size: 1.1rem;
  color: var(--breadcrumbs, #a7a7a7);
  margin: 0 0 1.2rem 0;
  padding: 0 0 0 0;
  display: flex;
  align-items: center;
  z-index: 10;
  position: relative;
}
.breadcrumb ol {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}
.breadcrumb-link {
  color: var(--breadcrumbs, #a7a7a7);
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb-link:hover {
  color: var(--breadcrumbs-main, #8bbbe2);
  text-decoration: underline;
}
.breadcrumb-separator {
  margin: 0 0.5em;
  color: var(--breadcrumbs, #a7a7a7);
}
.breadcrumb-current {
  color: var(--breadcrumbs-main, #8bbbe2);
  font-weight: 600;
}
</style>