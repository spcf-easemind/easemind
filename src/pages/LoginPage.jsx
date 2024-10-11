import { Flex, Title, Group, TextInput, Checkbox, Anchor } from '@mantine/core';

import classes from './LoginPage.module.css';

// Hooks
import { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useMatches } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDialogStore } from '../store/dialog.js';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

import SurveyModal from '../components/modals/SurveyModal.jsx';
import SignUpModal from '../components/modals/SignUpModal.jsx';
import AuthCard from '../components/cards/AuthCard.jsx';
import { LOGIN_INPUTS } from '../static/authentication.js';

import { parse, format } from 'date-fns';

import { useUsersStore } from '../store/users.js';

const title =
  "In a world filled with hardships, why don't we prioritize our happiness and mental well-being instead?";

export default function LoginPage() {
  const navigate = useNavigate();

  const { user, message, userSignUpFn, getUserInfoFn, userLoginFn } =
    useUsersStore(
      useShallow((state) => ({
        user: state.user,
        message: state.message,
        userSignUpFn: state.userSignUp,
        getUserInfoFn: state.getUserInfo,
        userLoginFn: state.loginUser,
      }))
    );

  const { dialog, toggleDialog } = useDialogStore(
    useShallow((state) => ({
      dialog: state.dialog,
      toggleDialog: state.toggleDialog,
    }))
  );

  const [opened, { open: handleOpen, close: handleClose }] =
    useDisclosure(dialog);
  const [signupOpened, { open: handleSignupOpen, close: handleSignupClose }] =
    useDisclosure(false);

  useEffect(() => {
    if (dialog) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [dialog, handleOpen, handleClose]);

  useEffect(() => {
    console.log(user);
    console.log(message);
  }, [user, message]);

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
  function handleSignIn(value) {
    console.log(value);
    // getUserInfoFn();
    // console.log(user);

    userLoginFn(value.email, value.password);

    console.log('Sign In Form submitted');
  }

  function handleSurveyForm(value) {
    signupForm.setValues({ ...value });
    handleSignupOpen();
  }

  // Sign Up Function
  function handleSignUpForm(value) {
    // console.log(value);

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
      userSignUpFn(formData);
      // console.log(formData);

      console.log('Sign Up Form submitted');
    } catch (error) {
      console.error('Error in Sign Up Form submission', error);
    }
  }

  function handleNavigation() {
    navigate('/login');
  }

  function handleDialogOpen() {
    handleOpen();
    toggleDialog();
  }

  function handleDialogClose() {
    handleClose();
    toggleDialog();
  }

  const titleFontSize = useMatches({
    base: 40,
    sm: 55,
    lg: 65,
  });

  const titleMarginTop = useMatches({
    base: 32,
    md: 0,
  });

  const textMarginBottom = useMatches({
    base: 12,
    md: 22,
  });

  const textInputSize = useMatches({
    base: 'sm',
    md: 'md',
  });

  const marginBottom = useMatches({
    base: 16,
    md: 32,
  });

  const inputInstances = LOGIN_INPUTS.map((item) => (
    <TextInput
      styles={{
        input: {
          borderColor: 'var(--mantine-color-gray-6)',
        },
      }}
      size={textInputSize}
      mb={textMarginBottom}
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
        <Title
          size={titleFontSize}
          className={classes.heading}
          ta={{ base: 'center', sm: 'start' }}
          maw={{ base: '100%', sm: '60%' }}
          mt={titleMarginTop}
        >
          {title}
        </Title>
        <AuthCard
          form={loginForm}
          onSubmit={(formData) => handleSignIn(formData)}
          onDialogOpen={handleDialogOpen}
          heading={{
            title: 'Login',
            description:
              'Experience welcome and transform into something new as you embark on a journey of self-discovery. ',
          }}
          buttonLabel="Login"
        >
          {inputInstances}

          <Group justify="space-between" mb={marginBottom}>
            <Checkbox label="Remember me" c="gray.6" />
            <Anchor size="sm" component="button" underline="never">
              Forgot Password?
            </Anchor>
          </Group>
        </AuthCard>
      </Flex>

      <SurveyModal
        opened={opened}
        onClose={handleDialogClose}
        onSubmit={handleSurveyForm}
      />
      <SignUpModal
        form={signupForm}
        opened={signupOpened}
        onClose={handleSignupClose}
        onSubmit={handleSignUpForm}
        onNavigate={handleNavigation}
      ></SignUpModal>
    </>
  );
}
