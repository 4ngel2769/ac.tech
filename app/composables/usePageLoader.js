export const usePageLoader = () => {
  const LOADER_ENABLED = false;

  const isLoading = ref(false);
  const loadingText = ref("Loading...");
  const isClosing = ref(false);
  const isOpening = ref(false);

  const showLoader = (text = "Loading...", minDisplayTime = 1000) => {
    if (!LOADER_ENABLED) return;
    loadingText.value = text;
    isLoading.value = true;
    isClosing.value = true;
    isOpening.value = false;
    if (import.meta.client) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {}, minDisplayTime);
    }
  };

  const hideLoader = (delay = 300) => {
    if (!LOADER_ENABLED) return;
    if (import.meta.client) {
      setTimeout(() => {
        isClosing.value = false;
        isOpening.value = true;
        setTimeout(() => {
          isLoading.value = false;
          isOpening.value = false;
          document.body.style.overflow = "unset";
        }, 800); // matches animation duration
      }, delay);
    }
  };

  const router = useRouter();
  if (import.meta.client && LOADER_ENABLED) {
    let loadingTimeout = null;
    router.beforeEach((to, from) => {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      if (to.path.startsWith("/blog") || to.path.startsWith("/projects")) {
        const pageType = to.path.startsWith("/blog") ? "article" : "project";
        showLoader(`Loading ${pageType}...`);
      }
    });
    router.afterEach(() => {
      loadingTimeout = setTimeout(() => {
        hideLoader();
      }, 800);
    });
  }

  return {
    isLoading: readonly(isLoading),
    loadingText: readonly(loadingText),
    isClosing: readonly(isClosing),
    isOpening: readonly(isOpening),
    showLoader,
    hideLoader,
  };
};
