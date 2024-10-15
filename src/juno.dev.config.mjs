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
          mutablePErmissions: true,
        },
        {
          collection: 'anonymousUser',
          read: 'public',
          write: 'private',
          memory: 'heap',
          mutablePErmissions: true,
        },
        {
          collection: 'publicMaterials',
          read: 'public',
          write: 'private',
          memory: 'heap',
          mutablePErmissions: true,
        },
        {
          collection: 'userPublicMaterials',
          read: 'private',
          write: 'private',
          memory: 'heap',
          mutablePErmissions: true,
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
          write: 'private',
          memory: 'heap',
          mutablePermission: true,
        },
        {
          collection: 'testImages',
          read: 'private',
          write: 'private',
          memory: 'heap',
          mutablePermission: true,
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