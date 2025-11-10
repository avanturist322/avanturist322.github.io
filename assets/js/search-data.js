// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications";
          },
        },{id: "nav-news",
          title: "news",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "news-attending-corl-2025",
          title: 'Attending CoRL-2025',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_20251001/";
            },},{id: "news-the-preprint-of-our-paper-elmur-external-layer-memory-with-update-rewrite-for-long-horizon-rl-is-now-available-on-arxiv",
          title: 'The preprint of our paper “ELMUR: External Layer Memory with Update/Rewrite for Long-Horizon...',
          description: "",
          section: "News",},{id: "news-the-preprint-of-our-paper-a-new-perspective-on-transformers-in-online-reinforcement-learning-for-continuous-control-is-now-available-on-arxiv",
          title: 'The preprint of our paper “A New Perspective on Transformers in Online Reinforcement...',
          description: "",
          section: "News",},{id: "news-attending-fall-into-ml-2025",
          title: 'Attending Fall into ML 2025',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_20251024/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/avanturist322", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/egor-cherepanov-95a70931a", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=Jh8ZdwUAAAAJ", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/hirasava_ui", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
