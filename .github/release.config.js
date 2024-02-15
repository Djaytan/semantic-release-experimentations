module.exports = {
  preset: 'conventionalcommits',

  branches: [
    'main',
    'next',
    'next-major',
    'release/v+([0-9])?(.{+([0-9]),x}).x',
    {name: 'beta', prerelease: true},
    {name: 'alpha', prerelease: true}
  ],

  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/release-notes-generator',
      {
        presetConfig: {
          types: [
            {type: 'feat', section: '🌟 Features'},
            {type: 'fix', section: '🐛 Bug Fixes'},
            {type: 'perf', section: '⚡ Performances Improvements'},
            {type: 'revert', section: '🔄 Revert'},
            {type: 'refactor', section: '🛠️ Refactoring'},
            {type: 'build', section: '🏗️ Build System'},
            {type: 'test', section: '✅ Tests'},
            {type: 'ci', section: '📦 Continuous Integration'},
            {type: 'docs', section: '📖 Documentation'}
          ]
        }
      }
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: process.env.CHANGELOG_FILE
      }
    ],
    [
      '@semantic-release/exec',
      {
        publishCmd: 'echo "Printing tag version name in temporary file..." && '
          + `touch '${process.env.TMP_TAG_VERSION_NAME_FILE}' && `
          + `echo '$\{nextRelease.gitTag}' > '${process.env.TMP_TAG_VERSION_NAME_FILE}'`
      }
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: '../dummy-artifact'
          }
        ]
      }
    ]
  ]
}
