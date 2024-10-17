import { create } from 'zustand';
import {
  setDoc,
  getDoc,
  listDocs,
  deleteDoc,
  uploadFile,
  listAssets,
  deleteAsset,
  getManyDocs,
} from '@junobuild/core';
import { nanoid } from 'nanoid';
import { IconUser } from '@tabler/icons-react';

export const usePostStore = create((set) => ({
  postData: null,
  postMessage: null,
  postLoading: false,

  createTopics: async () => {
    set(() => ({
      postData: null,
      postMessage: 'Loading...',
      postLoading: true,
    }));

    try {
      const topics = [
        'Anxiety',
        'Depression',
        'Loneliness',
        'Self Care',
        'Mindfulness',
        'Anxiety Relief',
        'Depression Support',
        'Healing Journey',
        'Therapy Is Cool',
      ];

      for (const topic of topics) {
        const key = nanoid();
        await setDoc({
          collection: 'topics',
          doc: {
            key,
            data: {
              key,
              name: topic,
            },
          },
        });

        console.log(`Topic "${topic}" seeded successfully!`);
      }

      set(() => ({
        postData: null,
        postMessage: 'Topic Seeded Successfully!',
        postLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error seeding topics:', error);
      set(() => ({
        postData: null,
        postMessage: error.message || 'An error occurred while seeding topics',
        postMessage: false,
      }));
      return false;
    }
  },

  getAllTopics: async () => {
    set(() => ({
      postData: null,
      postMessage: 'Loading...',
      postLoading: true,
    }));

    try {
      const topics = await listDocs({
        collection: 'topics',
      });

      const topicArray = [];
      for (const topic of topics.items) {
        topicArray.push(topic.data);
      }

      set(() => ({
        postData: topicArray,
        postMessage: 'Available topics fetched successfully!',
        postLoading: false,
      }));

      return true;
    } catch (error) {
      console.error('Error fetching all topics:', error);
      set(() => ({
        postData: null,
        postMessage:
          error.message || 'An error occurred while fetching all topics',
        postLoading: false,
      }));
      return false;
    }
  },

  createHealthCareSuggestions: async () => {
    set(() => ({
      postData: null,
      postMessage: 'Loading...',
      postLoading: true,
    }));

    try {
      const healthCareSuggestions = [
        'Health Tips',
        'Healthy Living',
        'Wellness Journey',
        'Preventive Care',
        'Nutrition Advice',
        'Healthy Habits',
        'SelfC Care Routine',
        'Fitness Goals',
        'Holistic Health',
      ];

      for (const healthCareSuggestion of healthCareSuggestions) {
        const key = nanoid();
        await setDoc({
          collection: 'healthCareSuggestions',
          doc: {
            key,
            data: {
              key,
              name: healthCareSuggestion,
            },
          },
        });

        console.log(
          `Health Care Suggestion "${healthCareSuggestion}" seeded successfully!`
        );
      }

      set(() => ({
        postData: null,
        postMessage: 'Health Care Suggestions Seeded Successfully!',
        postLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error seeding health care suggestions:', error);
      set(() => ({
        postData: null,
        postMessage:
          error.message ||
          'An error occurred while seeding health care suggestions',
        postMessage: false,
      }));
      return false;
    }
  },

  getAllHealthCareSuggestions: async () => {
    set(() => ({
      postData: null,
      postMessage: 'Loading...',
      postLoading: true,
    }));

    try {
      const healthCareSuggestions = await listDocs({
        collection: 'healthCareSuggestions',
      });

      const healthCareSuggestionArray = [];
      for (const healthCareSuggestion of healthCareSuggestions.items) {
        healthCareSuggestionArray.push(healthCareSuggestion.data);
      }

      set(() => ({
        postData: healthCareSuggestionArray,
        postMessage: 'Available health care suggestions fetched successfully!',
        postLoading: false,
      }));

      return true;
    } catch (error) {
      console.error('Error fetching all health care suggestions:', error);
      set(() => ({
        postData: null,
        postMessage:
          error.message ||
          'An error occurred while fetching all health care suggestions',
        postLoading: false,
      }));
      return false;
    }
  },

  createPost: async (formData, file) => {
    set(() => ({
      postData: null,
      postMessage: 'Loading...',
      postLoading: true,
    }));

    try {
      let postImageUrl = null;

      if (file) {
        const key = nanoid();
        const filename = `${key}-profile`;
        const { downloadUrl } = await uploadFile({
          collection: 'postProfileCollections',
          data: file,
          filename,
        });

        postImageUrl = downloadUrl;

        const createPostData = {
          owner: formData.user.key,
          user: formData.user,
          postImageUrl: postImageUrl,
          postTitle: formData.title,
          postDescription: formData.description,
          topics: formData.topics,
        };

        await setDoc({
          collection: 'posts',
          doc: {
            key,
            data: createPostData,
          },
        });
        set(() => ({
          postData: null,
          postMessage: 'Post Created Successfully!',
          postLoading: false,
        }));
        return true;
      } else {
        set(() => ({
          postData: null,
          postMessage: 'Post image is required!',
          postLoading: false,
        }));
        return false;
      }
    } catch (error) {
      console.error('Error creating post:', error);
      set(() => ({
        postData: null,
        postMessage: error.message || 'An error occurred while creating post',
        postLoading: false,
      }));
      return false;
    }
  },

  getAllUserPosts: async () => {
    set(() => ({
      postData: null,
      postMessage: 'Loading...',
      postLoading: true,
    }));

    try {
      const posts = await listDocs({
        collection: 'posts',
      });

      const postArray = [];
      for (const post of posts.items) {
        postArray.push(post.data);
      }

      set(() => ({
        postData: postArray,
        postMessage: 'All user posts fetched successfully!',
        postLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error fetching all user posts:', error);
      set(() => ({
        postData: null,
        postMessage:
          error.message || 'An error occurred while fetching all user posts',
        postLoading: false,
      }));
      return false;
    }
  },
  deleteAllUserPosts: async () => {
    set(() => ({
      postData: null,
      postMessage: 'Loading...',
      postLoading: true,
    }));
    try {
      const allUserPosts = await listDocs({
        collection: 'posts',
      });

      for (const userPost of allUserPosts.items) {
        await deleteDoc({
          collection: 'posts',
          doc: userPost,
        });

        console.log(`User Post ${userPost.data.title} deleted successfully!`);
      }
      set(() => ({
        postData: null,
        postMessage: 'All user post deleted successfully!',
        postLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error deleting all user posts:', error);
      set(() => ({
        postData: null,
        postMessage:
          error.message || 'An error occurred while deleting all user posts',
        postLoading: false,
      }));
      return false;
    }
  },
}));
