<template>
    <footer class="footer-container">
        <!-- Top Section with Logo and Status -->
        <div class="footer-content">
            <div class="footer-top">
                <div class="footer-brand">
                    <div class="logo-section">
                        <!-- <div class="logo-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                        </div> -->
                        <span class="name">Angel Capra</span>
                    </div>
                </div>
                <div class="status-section">
                    <div class="status-indicator">
                        <div class="status-dot"></div>
                        <span class="status-text">All systems normal</span>
                    </div>
                </div>
            </div>

            <!-- Bottom Section with Links and Social -->
            <div class="footer-bottom">
                <div class="footer-links">
                    <NuxtLink to="/terms" class="footer-link">Terms</NuxtLink>
                    <span class="divider">|</span>
                    <NuxtLink to="/privacy" class="footer-link">Privacy</NuxtLink>
                </div>
                
                <div class="copyright-section">
                    <p class="copyright">© {{ new Date().getFullYear() }} | All rights reserved</p>
                </div>

                <div class="social-links">
                    <a href="mailto:contact@angelcapra.tech" class="social-link" title="Email">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                    </a>
                    <a href="https://github.com/4ngel2769" target="_blank" class="social-link" title="GitHub">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com/in/angelcapra" target="_blank" class="social-link" title="LinkedIn">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                    <a href="https://twitter.com/angelcapra" target="_blank" class="social-link" title="Twitter">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: var(--font3, 'Sen', sans-serif);
    padding: 0 0 1.5rem 0;
    background-color: var(--dark-bg, #0f0f0f);
    box-sizing: border-box;
}

.footer-content {
    max-width: var(--site-max-width, 1200px);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--site-padding, 2rem);
    padding-right: var(--site-padding, 2rem);
    box-sizing: border-box;
}

.footer-top {
    border-top: 1px solid var(--main-details, #404040);
    border-bottom: 1px solid var(--main-details, #404040);
    display: flex;
    justify-content: space-between;
    padding: 1rem 0 1rem 0;
    align-items: center;
    margin-bottom: 2rem;
    box-sizing: border-box;
}

.footer-brand {
    display: flex;
    align-items: center;
}

.logo-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.logo-icon {
    color: var(--htb-green, #7fff00);
    display: flex;
    align-items: center;
}

.name {
    color: var(--main-dark, #ffffff);
    font-size: 1.125rem;
    font-weight: 600;
}

.status-section {
    display: flex;
    align-items: center;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.status-dot {
    width: 8px;
    height: 8px;
    background-color: var(--htb-green, #7fff00);
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(127, 255, 0, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(127, 255, 0, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(127, 255, 0, 0);
    }
}

.status-text {
    color: var(--main-dsc, #b0b0b0);
    font-size: 0.9rem;
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    box-sizing: border-box;
}

.footer-links {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.footer-link {
    color: var(--main-dsc, #b0b0b0);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
}

.footer-link:hover {
    color: var(--htb-green, #7fff00);
}

.divider {
    color: var(--kde, #404040);
    font-size: 0.9rem;
}

.copyright-section {
    flex: 1;
    display: flex;
    justify-content: center;
}

.copyright {
    color: var(--main-details, #808080);
    font-size: 0.85rem;
    margin: 0;
}

.social-links {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.social-link {
    color: var(--main-details, #808080);
    transition: color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 6px;/*
    border: 1px solid var(--kde, #404040);*/
    background-color: transparent;
    box-sizing: border-box;
}

.social-link:hover {
    color: var(--htb-green, #7fff00);
    border-color: var(--htb-green, #7fff00);
    background-color: rgba(127, 255, 0, 0.05);
}

/* Mobile responsive */
@media (max-width: 1024px) {
    .footer-content {
        padding-left: var(--site-padding-tablet, 1.5rem);
        padding-right: var(--site-padding-tablet, 1.5rem);
    }
}

@media (max-width: 768px) {
    .footer-container {
        padding: 1.5rem 0 1rem 0;
    }
    
    .footer-content {
        padding-left: var(--site-padding-mobile, 1rem);
        padding-right: var(--site-padding-mobile, 1rem);
    }

    .footer-top {
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .footer-bottom {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }

    .footer-links {
        order: 1;
    }

    .copyright-section {
        order: 2;
        flex: none;
    }

    .social-links {
        order: 3;
    }

    .name {
        font-size: 1rem;
    }

    .status-text {
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .social-links {
        gap: 0.75rem;
    }

    .social-link {
        width: 32px;
        height: 32px;
    }

    .social-link svg {
        width: 16px;
        height: 16px;
    }
}
</style>