import {
  Flex,
  Title,
  Group,
  TextInput,
  Checkbox,
  Anchor,
  PasswordInput,
} from "@mantine/core";

import classes from "./LoginPage.module.css";

// Hooks
import { useDisclosure } from "@mantine/hooks";
import { useForm, isNotEmpty, hasLength, isEmail } from "@mantine/form";
import { useDialogStore } from "../store/dialog.js";
import { useShallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";
import { useUsersStore } from "../store/users.js";
import { useGroupStore } from "../store/group.js";
import { useCallback, useEffect } from "react";

import SurveyModal from "../components/modals/authentication/SurveyModal.jsx";
import SignUpModal from "../components/modals/authentication/SignUpModal.jsx";
import AuthCard from "../components/cards/AuthCard.jsx";
import { LOGIN_INPUTS } from "../static/authentication.js";

import { parse, format } from "date-fns";
import { useAuthenticationStore } from "../store/authentication.js";

const title =
  "In a world filled with hardships, why don't we prioritize our happiness and mental well-being instead?";

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    data,
    userSignUpFn,
    getAllUsersFn,
    getUserInfoFn,

    createSuperAdminFn,
    message,
    deleteAllUsers,
  } = useUsersStore(
    useShallow((state) => ({
      data: state.data,
      userSignUpFn: state.userSignUp,
      getAllUsersFn: state.getAllUsers,
      getUserInfoFn: state.getUserInfo,

      createSuperAdminFn: state.createSuperAdmin,
      message: state.message,
      deleteAllUsers: state.deleteAllUsers,
    }))
  );

  const deleteUserInfoFn = useAuthenticationStore(
    (state) => state.deleteUserInfo
  );

  const { groupData, getUserGroupFn } = useGroupStore(
    useShallow((state) => ({
      groupData: state.groupData,
      getUserGroupFn: state.getUserGroup,
    }))
  );

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
    // const formData = {
    //   userKey: "uOl9RnXouVl9vU1fbUXU1",
    // };
    // getUserGroupFn(formData);
    // getUserInfoFn();
    // getAllUsersFn();
    // deleteUserInfoFn();
    // createSuperAdminFn();
    // deleteAllUsers();
    // console.log(message);
    // console.log(data);
  }, []);

  const loginForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6
          ? "Password should be at least 6 characters long"
          : null,
    },
  });

  const signupForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullName: "",
      date: {
        day: "",
        month: "",
        year: "",
      },
      mobileNumber: "",
      email: "",
      password: "",
      role: "",
      survey: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
      },
      termsOfService: false,
    },
    validate: {
      fullName: isNotEmpty("Full name is required"),
      email: isEmail("A valid email is required"),
      mobileNumber: hasLength(
        { min: 10, max: 10 },
        "Mobile number should be exactly 10 characters long"
      ),
      password: hasLength(
        { min: 6 },
        "Password should be at least 6 characters long"
      ),
      "date.day": isNotEmpty("Day is required"),
      "date.month": isNotEmpty("Month is required"),
      "date.year": isNotEmpty("Year is required"),
      termsOfService: (value) =>
        !value ? "You must agree to the terms" : null,
    },
  });

  // Sign In Function
  async function handleSignIn(value) {
    try {
      await userLoginFn(value.email, value.password);
      navigate("/home");
    } catch (error) {
      console.error("Error logging in: ", error);
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
            "-" +
            formData.date.month +
            "-" +
            formData.date.day,
          "yyyy-MM-dd",
          new Date()
        ),
        "yyyy-MM-dd"
      );

      // Reassign and Delete Necessary Fields
      formData["dateOfBirth"] = date;
      delete formData.date;
      delete formData.termsOfService;

      await userSignUpFn(formData);
      signupForm.reset();
      handleSignupClose();
    } catch (error) {
      console.error("Error in Sign Up Form submission", error);
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

  const inputInstances = LOGIN_INPUTS.map((item) => {
    if (item.type === "password") {
      return (
        <PasswordInput
          size="md"
          classNames={{
            input: classes.textInputBorder,
          }}
          className={classes.textInput}
          placeholder={item.placeholder}
          key={loginForm.key(item.name)}
          {...loginForm.getInputProps(item.name)}
        />
      );
    }

    return (
      <TextInput
        size="md"
        classNames={{
          input: classes.textInputBorder,
        }}
        className={classes.textInput}
        type={item.type}
        placeholder={item.placeholder}
        key={loginForm.key(item.name)}
        {...loginForm.getInputProps(item.name)}
      />
    );
  });

  return (
    <>
      <Flex
        w="100%"
        wrap="no-wrap"
        gap={48}
        justify="center"
        align="center"
        h="inherit"
        direction={{ base: "column", sm: "row" }}
      >
        <Title className={classes.heading}>{title}</Title>
        <AuthCard
          form={loginForm}
          onSubmit={(formData) => handleSignIn(formData)}
          onDialogOpen={toggleDialog}
          heading={{
            title: "Login",
            description:
              "Experience welcome and transform into something new as you embark on a journey of self-discovery. ",
          }}
          button={{ btnLabel: "Login", btnLoading: loading }}
          footer={{
            ftrMessage: "Don't have an account? ",
            ftrButton: "Create Account",
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
