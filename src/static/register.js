export const STEPPER_LABELS = {
  EaseBuddy: ["Express", "Assistance", "Resilience", "Challenges", "Individual"],
  EaseCompanion: ["Expertise", "Experience", "Availability", "Approach", "Role"],
};

export const STEPPER_DATA = {
  1: {
    title: "Choose your Role",
    text: "How would you like to be a part of Easemind?",
  },
  EaseBuddy: {
    2: {
      title: "Tell us how you feel:",
      text: "How would you describe your self-esteem?",
    },
    3: {
      title: "Share Your Needs:",
      text: "What type of support are you seeking?",
    },
    4: {
      title: "Coping Mechanisms:",
      text: "How Do You Handle Difficult Emotions in life?",
    },
    5: {
      title: "Reflect on Your Emotions:",
      text: "Which emotions do you struggle with most?",
    },
    6: {
      title: "Self-Reflection:",
      text: "What triggers your feelings of stress or anxiety?",
    },
  },
  EaseCompanion: {
    2: {
      title: "Area of Expertise:",
      text: "What field do you specialize in?",
    },
    3: {
      title: "Level of Experience:",
      text: "How much experience do you have in the field?",
    },
    4: {
      title: "Availability:",
      text: "How often are you available to offer support?",
    },
    5: {
      title: "Support Approach:",
      text: "What type of support do you offer?",
    },
    6: {
      title: "Preferred Role in Support:",
      text: "How do you engage in mental health support?",
    },
  },
};

export const QUESTION_DATA = {
  // USER
  EaseBuddy: {
    2: [
      // Question 1
      {
        boldLabel: "High",
        label: "I feel confident and value myself.",
      },
      {
        boldLabel: "Moderate",
        label: "I feel okay about myself but have doubts.",
      },
      {
        boldLabel: "Low",
        label: "I struggle to feel good about myself.",
      },
      {
        boldLabel: "Very Low",
        label: "I frequently feel unworthy.",
      },
      {
        boldLabel: "Fluctuates",
        label: "My self-esteem varies with the situation.",
      },
    ],
    3: [
      //Question Two
      {
        boldLabel: "Emotional Support",
        label: "I need someone to talk to.",
      },
      {
        boldLabel: "Therapy Sessions",
        label: "I'm looking for professional help.",
      },
      {
        boldLabel: "Support Groups",
        label: "I want to connect with others.",
      },
      {
        boldLabel: "Self-Help Resources",
        label: "I need tools and information.",
      },
    ],
    4: [
      //Question 3
      {
        boldLabel: "Healthy coping",
        label: "I engage in exercise or hobbies.",
      },
      {
        boldLabel: "Support-seeking",
        label: "I reach out to friends or family.",
      },
      {
        boldLabel: "Mindfulness",
        label: "I practice meditation or deep breathing.",
      },
      {
        boldLabel: "Unhealthy coping",
        label: "I use bad habits to avoid problems.",
      },
      {
        boldLabel: "Varied methods",
        label: "I adapt based on the situation.",
      },
      {
        boldLabel: "Avoidance",
        label: "I tend to avoid my problems.",
      },
    ],
    5: [
      //Question 4
      {
        boldLabel: "Sadness",
        label: "I struggle to handle feelings of sadness.",
      },
      {
        boldLabel: "Anger",
        label: "I often find it hard to manage my anger.",
      },
      {
        boldLabel: "Anxiety",
        label: "I feel overwhelmed by anxiety frequently.",
      },
      {
        boldLabel: "Fear",
        label: "I have difficulty dealing with fear or apprehension.",
      },
      {
        boldLabel: "Loneliness",
        label: "I often feel lonely and find it hard to cope.",
      },
    ],
    6: [
      // Question 5
      {
        boldLabel: "Financial Worries",
        label: "Money concerns cause me anxiety.",
      },
      {
        boldLabel: "Work Pressure",
        label: "Deadlines overwhelm me.",
      },
      {
        boldLabel: "Personal Relationships",
        label: "Conflicts with loved ones.",
      },
      {
        boldLabel: "Health",
        label: "I stress about my health.",
      },
      {
        boldLabel: "Life changes",
        label: "I experience anxiety with major changes.",
      },
    ],
  },

  // VOLUNTEER
  EaseCompanion: {
    2: [
      // Question 1
      {
        boldLabel: "Counseling",
        label: "I specialize in providing counseling services.",
      },
      {
        boldLabel: "Psychology",
        label: "My background is in psychology.",
      },
      {
        boldLabel: "Social Work",
        label: "I specialize in mental health social work.",
      },
      {
        boldLabel: "Psychiatry",
        label: "I have a medical background in psychiatry.",
      },
      {
        boldLabel: "Peer Support",
        label: "I offer support based on shared experiences.",
      },
    ],
    3: [
      //Question Two
      {
        boldLabel: "Less than 1 year",
        label: "I am just starting my journey.",
      },
      {
        boldLabel: "1-3 years",
        label: "I have a few years of experience.",
      },
      {
        boldLabel: "3-5 years",
        label: "I want to connect with others.",
      },
      {
        boldLabel: "More than 5 years",
        label: "Extensive experience in mental health.",
      },
    ],
    4: [
      //Question 3
      {
        boldLabel: "Daily",
        label: "I am available every day.",
      },
      {
        boldLabel: "Weekly",
        label: "I can commit to weekly sessions.",
      },
      {
        boldLabel: "Weekends Only",
        label: "I am available on weekends.",
      },
      {
        boldLabel: "Flexible",
        label: "I have a flexible schedule.",
      },
    ],
    5: [
      //Question 4
      {
        boldLabel: "One-on-One Counseling",
        label: "I prefer personalized sessions.",
      },
      {
        boldLabel: "Group Therapy",
        label: "I specialize in group sessions.",
      },
      {
        boldLabel: "Mindfulness",
        label: "I teach and stress reduction techniques.",
      },
      {
        boldLabel: "Workshops and Training",
        label: "I conduct educational sessions.",
      },
    ],
    6: [
      // Question 5
      {
        boldLabel: "Active Listener",
        label: "I offer compassionate listening.",
      },
      {
        boldLabel: "Facilitator",
        label: "I guide group sessions.",
      },
      {
        boldLabel: "Educator",
        label: "I share resources and raise awareness.",
      },
      {
        boldLabel: "Advocate",
        label: "I promote mental health rights.",
      },
    ],
  },
};
