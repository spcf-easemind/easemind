import { defineDevConfig } from '@junobuild/config';

/** @type {import('@junobuild/config').JunoDevConfig} */
export default defineDevConfig(() => ({
  satellite: {
    collections: {
      datastore: [
        {
          collection: 'userSurveys',
          read: 'managed',
          write: 'managed',
          memory: 'stable',
          mutablePermissions: true,
        },
        {
          collection: 'userCredentials',
          read: 'managed',
          write: 'managed',
          memory: 'heap',
          mutablePermissions: true,
        },
      ],
      storage: [
        {
          collection: 'images',
          read: 'managed',
          write: 'managed',
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
