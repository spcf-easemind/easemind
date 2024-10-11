import { create } from 'zustand';
import { setDoc, uploadFile, listDocs } from '@junobuild/core';
import { nanoid } from 'nanoid';

export const useUsersStore = create((set) => ({
  user: null,
  message: null,

  userSignUp: async (formData) => {
    try {
      // const key = nanoid();
      const items = await listDocs({
        collection: 'userCredentials',
      });
      console.log(items);
      if (items.items[0]) {
        throw new Error('This identity already have an account!.');
      }

      const key = nanoid();
      await setDoc({
        collection: 'userCredentials',
        doc: {
          key,
          data: {
            dateOfBirth: formData.dateOfBirth,
            email: formData.email,
            fullName: formData.fullName,
            mobileNumber: formData.mobileNumber,
            password: formData.password,
            role: formData.role,
          },
        },
      });

      await setDoc({
        collection: 'userSurveys',
        doc: {
          key,
          data: formData.survey,
        },
      });
      // console.log(response);
      console.log('User signed up successfully:', formData);
      set({ user: formData, error: null });
    } catch (error) {
      console.error('Error during sign up:', error);
      set({ error: error.message, user: null });
    }
  },

  getUserInfo: async () => {
    try {
      const items = await listDocs({
        collection: 'userCredentials',
      });

      if (items.items && items.items.length > 0 && items.items[0].data) {
        console.log('User data fetched successfully!', items.items[0].data);
        set(() => ({
          user: items.items[0].data,
          message: null,
        }));
      } else {
        console.log('No user data found');
        set(() => ({
          user: null,
          message: 'No user data found',
        }));
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      set(() => ({
        user: null,
        message: error.message || 'An error occurred while fetching user data',
      }));
    }
  },

  loginUser: async (email, password) => {
    const items = await listDocs({
      collection: 'userCredentials',
    });

    if (items.items && items.items.length > 0 && items.items[0].data) {
      // console.log('asd', email);
      if (
        items.items[0].data.email === email &&
        items.items[0].data.password === password
      ) {
        set(() => ({
          user: {
            fullName: items.items[0].data.fullName,
            email: items.items[0].data.email,
          },
          message: 'Login Successfully!',
        }));
      } else {
        set(() => ({
          user: null,
          message: 'Incorrect email or password',
        }));
      }
    } else {
      set(() => ({
        user: null,
        message: 'No account found on this identity. Please sign up first',
      }));
    }
  },
}));
