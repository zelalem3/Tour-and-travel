import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'wzojjue2', // Your project ID
    dataset: 'production'
  },
  // Add this new section here:
  deployment: {
    appId: 'ys0dm8a6u5f4623i8or6w9je',
  }
})