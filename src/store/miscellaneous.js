import { create } from 'zustand';
import {
  setDoc,
  getDoc,
  listDocs,
  deleteDoc,
  uploadFile,
  listAssets,
  deleteAsset,
} from '@junobuild/core';
import { nanoid } from 'nanoid';
import { NavLink } from 'react-router-dom';

export const usePublicMaterials = create((set) => ({
  miscData: null,
  miscMessage: null,
  miscLoading: false,

  // This is all for Categories related purposes
  createCategories: async () => {
    set(() => ({
      miscData: null,
      miscMessage: 'Loading...',
      loading: true,
    }));

    try {
      const thoughtCategories = [
        'Negative Self-Talk',
        'Catastrophizing',
        'Desire for Change',
        'Seeking Validation',
        'Fear of Judgement',
        'Feeling Trapped',
        'Questioning Reality',
        'Fear of Failure',
        'Feeling Unworthy',
        'Questioning Reality',
        'Self-Sabotage',
        'Lack of Purpose',
        'Victim Mentality',
        'Fear of Intimacy',
        'Inability to Move On',
        'Fear of Rejection',
        'Decision Avoidance',
        'Comparisons',
        'Ruminating',
        'Existential Questions',
        'Distrust of Others',
      ];

      const emotionCategories = [
        'Sadness',
        'Anxiety',
        'Depression',
        'Loneliness',
        'Confusion',
        'Frustration',
        'Anger',
        'Overthinking',
        'Fear',
        'Guilt',
        'Shame',
        'Hopelessness',
        'Fatigue',
        'Numbness',
        'Despair',
        'Regret',
        'Desperation',
        'Insecurity',
        'Self-Doubt',
        'Disappointment',
        'Panic',
        'Boredom',
        'Vulnerability',
        'Future Anxiety',
        'Jealousy',
        'Disgust',
        'Embarrassment',
        'Longing',
      ];

      const memberCategories = ['Ease Companion', 'Ease Buddy'];

      for (const category of thoughtCategories) {
        const key = nanoid();
        await setDoc({
          collection: 'thoughtCategories',
          doc: {
            key,
            data: {
              name: category,
            },
          },
        });

        await setDoc({
          collection: 'categories',
          doc: {
            key,
            data: {
              key,
              category: 'thoughts',
              name: category,
            },
          },
        });
        console.log(
          `Category ${category} on thought category seeded successfully!`
        );
      }

      for (const category of emotionCategories) {
        const key = nanoid();

        await setDoc({
          collection: 'emotionCategories',
          doc: {
            key,
            data: {
              name: category,
            },
          },
        });

        await setDoc({
          collection: 'categories',
          doc: {
            key,
            data: {
              key,
              category: 'emotions',
              name: category,
            },
          },
        });
        console.log(
          `Category ${category} on emotion category seeded successfully!`
        );
      }

      for (const category of memberCategories) {
        const key = nanoid();
        await setDoc({
          collection: 'memberCategories',
          doc: {
            key,
            data: {
              name: category,
            },
          },
        });

        await setDoc({
          collection: 'categories',
          doc: {
            key,
            data: {
              key,
              category: 'members',
              name: category,
            },
          },
        });

        console.log(
          `Category ${category} on members category seeded successfully!`
        );
      }
      set(() => ({
        miscData: null,
        miscMessage: 'Categories created successfully!',
        miscLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ miscMessage: error.message, miscData: null, miscLoading: false });
      // Loading is False
      return false;
    }
  },
  getAllCategories: async () => {
    set(() => ({
      miscData: null,
      miscMessage: 'Loading...',
      miscLoading: true,
    }));
    try {
      const categories = await listDocs({
        collection: 'categories',
      });

      const thoughtCategories = await listDocs({
        collection: 'thoughtCategories',
      });

      const emotionCategories = await listDocs({
        collection: 'emotionCategories',
      });

      const memberCategories = await listDocs({
        collection: 'memberCategories',
      });

      const categoriesArray = [];
      const thoughtCategoriesArray = [];
      const emotionCategoriesArray = [];
      const memberCategoriesArray = [];

      for (const category of categories.items) {
        categoriesArray.push(category);
      }
      for (const thoughtCategory of thoughtCategories.items) {
        thoughtCategoriesArray.push(thoughtCategory);
      }
      for (const emotionCategory of emotionCategories.items) {
        emotionCategoriesArray.push(emotionCategory);
      }
      for (const memberCategory of memberCategories.items) {
        memberCategoriesArray.push(memberCategory);
      }

      const allCategoryInfo = {
        categories: categoriesArray,
        thoughtCategory: thoughtCategoriesArray,
        emotionCategory: emotionCategoriesArray,
        memberCategory: memberCategoriesArray,
      };

      set(() => ({
        miscData: allCategoryInfo,
        miscMessage: 'All users fetched successfully!',
        miscLoading: false,
      }));

      return true;
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ miscMessage: error.message, miscData: null, miscLoading: false });
      // Loading is False
      return false;
    }
  },
  deleteCategories: async () => {
    set(() => ({
      miscData: null,
      miscMessage: 'Loading...',
      miscLoading: true,
    }));

    try {
      //Deleting Categories Related
      const categories = await listDocs({
        collection: 'categories',
      });

      const thoughtCategories = await listDocs({
        collection: 'thoughtCategories',
      });

      const emotionCategories = await listDocs({
        collection: 'emotionCategories',
      });

      const memberCategories = await listDocs({
        collection: 'memberCategories',
      });

      if (categories) {
        for (const category of categories.items) {

          await deleteDoc({
            collection: 'categories',
            doc: category,
          });
          
          console.log(
            `Category ${category.name} on categories deleted successfully!`
          );
        }
      }

      if (thoughtCategories) {
        console.log("asd");
        for (const thoughtCategory of thoughtCategories.items) {
          await deleteDoc({
            collection: 'thoughtCategories',
            doc: thoughtCategory,
          });

          console.log(
            `Category ${thoughtCategory.name} on thoughtCategories deleted successfully!`
          );
        }
      }

      if (emotionCategories) {
        for (const emotionCategory of emotionCategories.items) {
          await deleteDoc({
            collection: 'emotionCategories',
            doc: emotionCategory,
          });

          console.log(
            `Category ${emotionCategory.name} on thoughtCategories deleted successfully!`
          );
        }
      }

      if (emotionCategories) {
        for (const memberCategory of memberCategories.items) {
          await deleteDoc({
            collection: 'memberCategories',
            doc: memberCategory,
          });

          console.log(
            `Category ${memberCategory.name} on thoughtCategories deleted successfully!`
          );
        }
      }
      set(() => ({
        miscData: null,
        miscMessage: 'All Categories Deleted Successfully!',
        miscLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ miscMessage: error.message, miscData: null, miscLoading: false });
      // Loading is False
      return false;
    }
  },

  // This is all for Anonymous Profile purposes
  createAnonymousNickames: async () => {
    set(() => ({
      miscData: null,
      miscMessage: 'Loading...',
      miscLoading: true,
    }));
    try {
      const publicAnonymousNicknames = ['', '', '', '', '', '', '', '', '', ''];

      for (const publicAnonymousNickname of publicAnonymousNicknames.items) {
        const key = nanoid();
        await setDoc({
          collection: 'publicAnonymousNicknames',
          doc: {
            key,
            doc: {
              nickname: publicAnonymousNickname,
            },
          },
        });
      }
      set(() => ({
        miscData: null,
        miscMessage: 'Anonymous Nickname created successfully!',
        miscLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ miscMessage: error.message, miscData: null, miscLoading: false });
      // Loading is False
      return false;
    }
  },

  createAnonymousProfile: async (file) => {
    set(() => ({
      miscData: null,
      miscMessage: 'Loading...',
      miscLoading: true,
    }));

    try {
      let profileImageUrl = null;
      if (file) {
        const key = nanoid();
        const filename = `${key}-profile`;
        const { downloadUrl } = await uploadFile({
          collection: 'publicAnonymousProfiles',
          data: file,
          filename,
        });

        profileImageUrl = downloadUrl;

        await setDoc({
          collection: 'publicAnonymousProfiles',
          doc: {
            key,
            data: {
              name: filename,
              anonymousImagePath: profileImageUrl,
            },
          },
        });
      }

      set(() => ({
        miscData: null,
        miscMessage: 'Anonymous Profile uploaded successfully!',
        miscLoading: false,
      }));

      return true;
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ miscMessage: error.message, miscData: null, miscLoading: false });
      return false;
    }
  },

  deleteAnonymous: async () => {
    set(() => ({
      miscData: null,
      miscMessage: 'Loading...',
      miscLoading: true,
    }));
    try {
      const publicAnonymousProfilesData = await listDocs({
        collection: 'publicAnonymousProfiles',
      });

      const publicAnonymousProfiles = await listAssets({
        collection: 'publicAnonymousProfiles',
      });

      if (publicAnonymousProfilesData) {
        for (const publicAnonymousProfileData of publicAnonymousProfilesData.items) {
          await deleteDoc({
            collection: 'publicAnonymousProfiles',
            doc: publicAnonymousProfileData,
          });
          console.log(
            `Anonymous ${publicAnonymousProfileData.data.name} on anonymousNicnames deleted successfully!`
          );
        }
      }

      if (publicAnonymousProfiles) {
        for (const publicAnonymousProfile of publicAnonymousProfiles.items) {
          await deleteAsset({
            collection: 'publicAnonymousProfiles',
            fullPath: publicAnonymousProfile.fullPath,
          });
          console.log(
            `Anonymous ${publicAnonymousProfile.name} on anonymousNicnames deleted successfully!`
          );
        }
      }
      set(() => ({
        miscData: null,
        miscMessage: 'Anonymous Profile deleted successfully!',
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ miscMessage: error.message, miscData: null, miscLoading: false });
      // Loading is False
      return false;
    }
  },
  getAllAnonymousProfiles: async () => {
    set(() => ({
      miscData: null,
      miscMessage: 'Loading...',
      miscLoading: false,
    }));
    try {
      const allAnonymousProfiles = await listDocs({
        collection: 'publicAnonymousProfiles',
      });

      const allAnonymousProfileArray = [];
      for (const anonymousProfile of allAnonymousProfiles.items)
        allAnonymousProfileArray.push(anonymousProfile.data);
      set(() => ({
        miscData: allAnonymousProfileArray,
        miscMessage: 'All available anonymous profiles',
        miscLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ miscMessage: error.message, miscData: null, miscLoading: false });
      // Loading is False
      return false;
    }
  },
}));
