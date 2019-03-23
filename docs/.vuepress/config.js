// Title:
module.exports = {
  title: 'Vizu',
  description: 'A Javascript View library for building web and hybrid mobile applications',
}

// Theme
module.exports = {
  themeConfig: {
    // Navbar
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/jclo/vizu' },
    ],

    // Sidebar
    sidebar: {

      // Guide
      '/guide/': [
        '',
      ],

      // fallback
      '/': [
        '',        /* / */
      ]
    },

    lastUpdated: 'Last Updated', // string | boolean
  },
}
