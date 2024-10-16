import { Flex, Title, Group, TextInput, Checkbox, Anchor } from '@mantine/core';

import classes from './LoginPage.module.css';

// Hooks
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useDialogStore } from '../store/dialog.js';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import { useUsersStore } from '../store/users.js';
import { useCallback, useEffect } from 'react';

import SurveyModal from '../components/modals/SurveyModal.jsx';
import SignUpModal from '../components/modals/SignUpModal.jsx';
import AuthCard from '../components/cards/AuthCard.jsx';
import { LOGIN_INPUTS } from '../static/authentication.js';

import { parse, format } from 'date-fns';
import { useAuthenticationStore } from '../store/authentication.js';

const title =
  "In a world filled with hardships, why don't we prioritize our happiness and mental well-being instead?";

export default function LoginPage() {
  const navigate = useNavigate();

  const data = useUsersStore((state) => state.data);
  const userSignUpFn = useUsersStore((state) => state.userSignUp);
  const getAllUsersFn = useUsersStore((state) => state.getAllUsers);
  const getUserInfoFn = useUsersStore((state) => state.getUserInfo);
  const deleteUserInfoFn = useUsersStore((state) => state.deleteUserInfo);
  const { userLoginFn, loading } = useAuthenticationStore(
    useShallow((state) => ({
      loading: state.loading,
      userLoginFn: state.loginUser,
    }))
  );

  const { dialog, toggleDialog } = useDialogStore(
    useShallow((state) => ({
      dialog: state.dialog,
      toggleDialog: state.toggleDialog,
    }))
  );

  const [signupOpened, { open: handleSignupOpen, close: handleSignupClose }] =
    useDisclosure(false);

  useEffect(() => {
    // getUserInfoFn();
    // getAllUsersFn();
    // deleteUserInfoFn();
    // console.log(data);
  }, [data]);

  const loginForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 6
          ? 'Password should be at least 6 characters long'
          : null,
    },
  });

  const signupForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      fullName: '',
      date: {
        day: '',
        month: '',
        year: '',
      },
      mobileNumber: '',
      email: '',
      password: '',
      role: '',
      survey: {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
      },
    },
    validate: {
      fullName: (value) => (!value ? 'Full name is required' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      mobileNumber: (value) =>
        value.length === 10
          ? null
          : 'Mobile number should be exactly 10 characters long',
      password: (value) =>
        value.length < 6
          ? 'Password should be at least 6 characters long'
          : null,
      'date.day': (value) => (!value ? 'Day is required' : null),
      'date.month': (value) => (!value ? 'Month is required' : null),
      'date.year': (value) => (!value ? 'Year is required' : null),
    },
  });

  // Sign In Function
  async function handleSignIn(value) {
    try {
      await userLoginFn(value.email, value.password);
      navigate('/home');
    } catch (error) {
      console.error('Error logging in: ', error);
    } finally {
      handleSignupClose();
    }
  }

  // Sign Up Function
  async function handleSignUpForm() {
    try {
      const formData = { ...signupForm.getValues() };
      const date = format(
        parse(
          formData.date.year +
            '-' +
            formData.date.month +
            '-' +
            formData.date.day,
          'yyyy-MM-dd',
          new Date()
        ),
        'yyyy-MM-dd'
      );

      formData['dateOfBirth'] = date;
      delete formData.date;
      await userSignUpFn(formData);
      handleSignupClose();
    } catch (error) {
      console.error('Error in Sign Up Form submission', error);
    }
  }

  const handleActiveSignUpForm = useCallback(() => {
    toggleDialog();
    handleSignupOpen();
  }, []);

  const handleDialogSwitch = useCallback(() => {
    signupForm.reset();
    handleSignupClose();
  }, []);

  const inputInstances = LOGIN_INPUTS.map((item) => (
    <TextInput
      classNames={{
        input: classes.textInputBorder,
      }}
      className={classes.textInput}
      type={item.type}
      placeholder={item.placeholder}
      key={loginForm.key(item.name)}
      {...loginForm.getInputProps(item.name)}
    />
  ));

  return (
    <>
      <Flex
        w="100%"
        wrap="no-wrap"
        gap={48}
        justify="center"
        align="center"
        h="inherit"
        direction={{ base: 'column', sm: 'row' }}
      >
        <Title className={classes.heading}>{title}</Title>
        <AuthCard
          form={loginForm}
          onSubmit={(formData) => handleSignIn(formData)}
          onDialogOpen={toggleDialog}
          heading={{
            title: 'Login',
            description:
              'Experience welcome and transform into something new as you embark on a journey of self-discovery. ',
          }}
          button={{ btnLabel: 'Login', btnLoading: loading }}
          footer={{
            ftrMessage: "Don't have an account? ",
            ftrButton: 'Create Account',
          }}
        >
          {inputInstances}

          <Group justify="space-between" className={classes.marginBottom}>
            <Checkbox label="Remember me" c="gray.6" />
            <Anchor size="sm" component="button" underline="never">
              Forgot Password?
            </Anchor>
          </Group>
        </AuthCard>
      </Flex>

      <SurveyModal
        form={signupForm}
        opened={dialog}
        onClose={toggleDialog}
        onSubmit={handleActiveSignUpForm}
      />
      <SignUpModal
        form={signupForm}
        opened={signupOpened}
        onClose={handleSignupClose}
        onSubmit={handleSignUpForm}
        onDialog={handleDialogSwitch}
      ></SignUpModal>
    </>
  );
}
