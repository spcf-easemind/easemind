import { defineDevConfig } from '@junobuild/config';

/** @type {import('@junobuild/config').JunoDevConfig} */
export default defineDevConfig(() => ({
  satellite: {
    collections: {
      datastore: [
        {
          collection: 'userSurveys',
          read: 'private',
          write: 'private',
          memory: 'stable',
          mutablePermissions: true,
        },
        {
          collection: 'userCredentials',
          read: 'private',
          write: 'private',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'anonymousCredentials',
          read: 'private',
          write: 'private',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'users',
          read: 'public',
          write: 'private',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'anonymousUser',
          read: 'public',
          write: 'private',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'userGroups',
          read: 'public',
          write: 'public',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'publicMaterials',
          read: 'public',
          write: 'private',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'userPublicMaterials',
          read: 'private',
          write: 'private',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'categories',
          read: 'public',
          write: 'managed',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'thoughtCategories',
          read: 'public',
          write: 'managed',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'emotionCategories',
          read: 'public',
          write: 'managed',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'memberCategories',
          read: 'public',
          write: 'managed',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'publicAnonymousNicknames',
          read: 'public',
          write: 'managed',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'groups',
          read: 'public',
          write: 'private',
          memory: 'heap',
          mutablePermissions: true,
        },
      ],
      storage: [
        {
          collection: 'userProfilePicture',
          read: 'private',
          write: 'private',
          memory: 'heap',
          mutablePermission: true,
        },
        {
          collection: 'anonymousProfilePicture',
          read: 'private',
          write: 'private',
          memory: 'heap',
          mutablePermission: true,
        },
        {
          collection: 'publicMaterialPictures',
          read: 'public',
          write: 'managed',
          memory: 'heap',
          mutablePermission: true,
        },
        {
          collection: 'publicAnonymousProfiles',
          read: 'public',
          write: 'managed',
          memory: 'heap',
          mutablePermission: true,
        },
        {
          collection: 'groupProfiles',
          read: 'public',
          write: 'private',
          memory: 'heap',
          mutablePermissions: true,
        },
        {
          collection: 'groupProfileCollections',
          read: 'public',
          write: 'managed',
          memory: 'heap',
          mutablePermissions: true,
        },
      ],
    },
    controllers: [
      {
        id: 'comzm-mod5y-zekdz-eebxq-g6bzi-l2yrr-kpqyh-7ofqe-s3vlq-ycnts-cae',
        scope: 'admin',
      },
    ],
  },
}));
