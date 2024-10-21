<div style="text-align: center;">
  <img src="/assets/easemind-wallpaper-1.png" width="100%"/><br>
</div>

# <img src="/assets/easemind-logo.png" width="24" height="20" alt="Globe"/> Easemind:

**EaseMind** is a student-led initiative that serves as a platform for users to connect and freely express their feelings, providing comfort and understanding to one another. Dedicated to creating a digital safe and secure environment, EaseMind offers tools to promote mental health growth. By integrating blockchain technology (ICP), it ensures the security of users' data and interactions.

## 🌟 Introduction

Inspired by the increasing prevalence of mental health disorders in the Philippines and societal perceptions of mental health, EaseMind aims to encourage emotional expression through social interaction and offer a range of services to accommodate diverse needs.

## 🌈 Highlighted Features

- **User Consent:** Users always stay in control. We provide clear, detailed information about how the services work, the processes involved, and what data is shared. You get to decide who can access your information with full transparency.

- **Complete Privacy:** Your data is fully secured with Web3 technology, running on the Internet Computer and Juno as the database. This means not even the developers can modify, access, or manipulate your personal information. You are the sole owner of your data, and it's protected on a decentralized system, ensuring maximum privacy and security.

- **Secure Messaging:** Our messages are fully encrypted, ensuring that only you and the person you're chatting with can access your conversation. Your communication is safe and confidential.

- **Anonymous Mode:** Connect and interact without revealing your identity. Anonymous Mode allows you to engage with the community while keeping your personal details hidden, giving you full freedom to participate comfortably.

- **Endless Thoughts Diary:** A personal and secure space to write down your thoughts and feelings. Use the Endless Thoughts Diary to reflect, release emotions, or capture ideas—fully private unless you choose to share.

- **Build Your Own Buddies:** Create and manage your own community. Whether it's for support, study, or hobbies, you can build a group where you set the tone and connect with others in a safe space.

## 🎯 Goals

- **Provide impactful mental health support:** Through meaningful conversations, interactive tools, and resources, we aim to create an environment where users can seek and offer emotional support easily.

- **Empower users with complete privacy and control:** By using Web3 technology on the Internet Computer and Juno, we ensure that users have total control over their data. No third parties, not even developers, can access, modify, or manipulate personal information—it's fully decentralized and protected.

- **Foster a safe and inclusive environment:** We strive to create a space where everyone feels comfortable expressing themselves without fear of judgment, and where personal privacy is always respected.

- **Promote mental well-being:** Our personalized features are designed to adapt to individual needs, helping users manage their mental health journey in a way that feels right for them.

## 🛠️ How It Works

1. **Connect with Available Companions:** Discover and interact with like-minded individuals who share similar interests and mental health journeys. Our platform facilitates connections, allowing users to engage in meaningful conversations and build supportive relationships
2. **Endless Thoughts Diary:** Utilize your personal diary space to document your thoughts, feelings, and reflections. This feature encourages users to express themselves freely, promoting emotional well-being in a private setting.
3. **Group Creation:** Empower users to create and manage their own groups tailored to specific topics or interests. This fosters community support, allowing members to share experiences and insights in a safe and inclusive environment.
4. **Anonymous Profile:** Engage with the community without revealing your identity. The anonymous profile feature provides a layer of comfort, enabling users to participate freely while safeguarding their personal information.
5. **AI-Chat Companion: (Upcoming)** A virtual assistant designed to offer personalized support, engaging users in conversations that promote mental health awareness and provide guidance through challenging moments.
6. **Video Call on Groups: (Upcoming)** Facilitate real-time video communication within group settings, enhancing the sense of connection and support among users.
7. **Mood Tracking: (Upcoming)** A feature that enables users to log and reflect on their moods, offering insights into their emotional patterns and promoting self-awareness.
8. **Task-Based Rage Release: (Upcoming)** Interactive tasks designed to help users manage and release built-up emotions in a constructive manner, fostering resilience and emotional balance.
9. **Charity Donations & Event Participation: (Upcoming)** Opportunities for users to contribute to charitable causes, fostering community engagement and social responsibility.

## 🔧 Installation

### Prerequisites

- [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) (For Windows)
- [Vite](https://www.geeksforgeeks.org/how-to-set-up-a-vite-project/)
- [NodeJs](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)
- [Juno](https://juno.build/docs/category/add-juno-to-an-app)
- [Firebase Realtime Database](https://firebase.google.com/docs/database/web/start)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Docker](https://docs.docker.com/engine/install/ubuntu/)
- [Mantine](https://mantine.dev/getting-started/)

### Install

> Run these commands to setup local development server of Vite and Juno Database

```typescript
//For installing packages from package.json
- npm ci

// Tools for managing and deploying juno satellite.
- sudo npm i -g @junobuild/cli

```

## 🛠️ Usage

```typescript
// Compile the latest state of project for deployment on juno
- npm run build

// Configure current directory as a satellite
- sudo juno init

// Start the local development database
- sudo juno dev start

// Start local hosting in the browser
- npm run dev

// Stop local development database
- sudo juno dev stop

// Get the ID of the terminal
- sudo juno whoami
```

## 💻 Tech Stack

- **React:** Powers the dynamic user interface, ensuring smooth and responsive experiences on the platform. ⚛️

- **Node.js:** Handles backend operations and provides a solid foundation for the web server. 🚀

- **Docker:** Enables containerization for consistent development and deployment environments. 🐳

- **Zustand:** Simplifies state management for React, making global state handling efficient and easy to use. 🧠

- **Juno:** A decentralized database solution for Web3 applications, integrated for secure and scalable data storage. 🔗

- **Mantine:** Provides a comprehensive set of UI components and hooks to build modern, accessible designs. 🎨

- **date-fns:** Facilitates easy manipulation of JavaScript dates, helping manage time-sensitive features effortlessly. 🗓️

- **Firebase:** Offers real-time database functionalities for efficient data synchronization and storage. 🔥

- **nanoid:** Generates unique IDs to ensure reliable identification of records throughout the application. 🔑

- **@emoji-mart:** A library for integrating emojis seamlessly into the user experience. 😄

- **chroma-js:** Provides color manipulation and conversion functionalities for dynamic UI styling. 🎨

- **dayjs:** A lightweight library for handling dates and times, making it simple to work with various date formats. ⏳

- **lightgallery:** A powerful library for creating interactive galleries and lightbox features. 📸

- **lodash:** A utility library that helps simplify common programming tasks with its collection of functions. ⚙️

- **@tabler/icons-react:** A library of icons to enhance the visual appeal of the application. 🖼️

## 🛣️ Roadmap

- [x] Internet Identity Login
- [ ] AI-Chat Companion
- [ ] Video Call on Groups
- [ ] Sending Voice Record on Chats
- [ ] Subscriptions
- [ ] Search for Posts
- [ ] Endless Thoughts Diary
- [ ] Mood Tracking
- [ ] Posts
- [ ] Task-Based Rage Release
- [ ] Push Notification
- [x] Anonymous Profile
- [x] One-On-One Chat
- [x] Group Chat
- [x] Manage Profile
- [x] Chat and Group Image Sharing
- [ ] Crypto Wallets Integration
- [ ] Achievements
- [ ] Titles
- [x] Medical Professional Volunteers
- [ ] Charity Donations
- [ ] Charity Event Participations
- [ ] Filtering of Contents According to User Preference
- [ ] Mobile App Integration (Android & iOS)
- [ ] Free Resources (Articles, Blogs, Stories, and Documents)

## 🚀 Deployed Canister (Mainnet)

- [Easemind](https://llvrf-giaaa-aaaal-amqwa-cai.icp0.io/)

## 👩‍💻 Developers

- [Alexander John M. Camaddo](https://github.com/Sypth) (Backend Developer)

- [Gabriel Alfonso M. Gatbonton](https://github.com/gabrielgatbonton) (Frontend Developer)

- [Rhymeses Cortez](https://github.com/Ribitises) (Frontend Developer)

- [Tracy Chiel Brandy H. Tolentino](https://github.com/Tracy-Tolentino) (UX Designer)

## 👨‍🏫 Coach

- [Prince Charles M. Clemente](https://github.com/PrinceCharles47) (QA & Coach)
