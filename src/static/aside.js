import SampleBackgroundImage from "../assets/images/background_images/DQ_bg-image1.jpg";
import SampleUserImage1 from "../assets/images/SampleUserImage1.webp";

export const SAMPLE_DAILY_QUOTES = {
  quote:
    "You're braver than you believe, and stronger than you seem, and smarter than you think.",
  source: "A.A. Mine",
  bgImage: SampleBackgroundImage,
};

export const PILL_ATTRIBUTES = [
  {
    value: "trendingTopics",
    label: "Trending Topics",
    choices: [
      "Anxiety",
      "Depression",
      "Loneliness",
      "SelfCare",
      "Mindfulness",
      "AnxietyRelief",
      "DepressionSupport",
      "HealingJourney",
      "TherapyIsCool",
    ],
  },
  {
    value: "healthCareSuggestions",
    label: "HealthCare Suggestions",
    choices: [
      "HealthTips",
      "HealthyLiving",
      "WellnessJourney",
      "PreventiveCare",
      "NutritionAdvice",
      "HealthyHabits",
      "SelfCareRoutine",
      "FitnessGoals",
      "HolisticHealth",
    ],
  },
];

export const SUGGESTED_SECTION_ATTRIBUTES = [
  {
    value: "suggestedGroup",
    label: "Suggested Group",
    choices: [
      {
        id: 1,
        userImage: "https://robohash.org/profile",
        userName: "Anxiety Room",
        text: "100 members",
      },
      {
        id: 2,
        userImage: "https://robohash.org/profile",
        userName: "Sad People",
        text: "57 members",
      },
      {
        id: 3,
        userImage: "https://robohash.org/profile",
        userName: "Happy People",
        text: "68 members",
      },
      {
        id: 4,
        userImage: "https://robohash.org/profile",
        userName: "Stress Room",
        text: "89 members",
      },
    ],
    link: 'community-groups'
  },
  {
    value: "suggestedEaseCompanion",
    label: "Suggested Ease Companion",
    choices: [
      {
        id: 1,
        userImage: "https://robohash.org/profile",
        userName: "Stress Room",
        text: "89 members",
      },
      {
        id: 2,
        userImage: "https://robohash.org/profile",
        userName: "Stress Room",
        text: "89 members",
      },
      {
        id: 3,
        userImage: "https://robohash.org/profile",
        userName: "Stress Room",
        text: "89 members",
      },
      {
        id: 4,
        userImage: "https://robohash.org/profile",
        userName: "Stress Room",
        text: "89 members",
      },
    ],
    link: '/ease-companions'
  },
];
