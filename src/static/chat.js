import SampleUserImage from "../assets/images/SampleUserImage.svg";
import SampleUserImage1 from "../assets/images/SampleUserImage1.webp";
import SampleUserImage2 from "../assets/images/SampleUserImage2.webp";
import SampleUserImage3 from "../assets/images/SampleUserImage3.jpg";

export const USER_CHATS = [
    {
        id: 1,
        userImage: SampleUserImage1,
        userName: 'Masipag',
        text: "Hi! How are you? Are you ok?",
        time: "12:47",
        unread: 5
    },
    {
        id: 2,
        userImage: SampleUserImage2,
        userName: 'Magaling',
        text: "Hi! How are you? Are you ok? It's been a few months since we last talk to each other.",
        time: "4:00",
        unread: 12,
    },
    {
        id: 3,
        userImage: SampleUserImage3,
        userName: 'Madaldal',
        text: "Hi! How are you? Are you ok?",
        time: "Tue",
        unread: 3
    }
]

export const GROUP_CHATS = [
    {
        id: 1,
        userImage: SampleUserImage,
        userName: 'Team Strong',
        text: "Hi! How are you? Are you ok?",
        time: "12:47",
        unread: 5
    },
    {
        id: 2,
        userImage: SampleUserImage,
        userName: 'Team Padayon',
        text: "Hi! How are you? Are you ok?",
        time: "1:24",
        unread: 3,
    },
    {
        id: 3,
        userImage: SampleUserImage,
        userName: 'Team Masaya',
        text: "Hi! How are you? Are you ok?",
        time: "Tue",
        unread: null,
    }
]