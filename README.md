# 🗂️ StorePad

**StorePad** is a smart, self-cleaning note-taking application built to help users quickly jot down, organize, and manage their notes — without the burden of manual cleanup. Designed with simplicity, speed, and usability in mind, StorePad makes productivity effortless.

---

## 🧩 Problem It Solves

Traditional note apps often become cluttered with outdated or irrelevant notes over time, leading to information overload. Users may also unintentionally leave behind sensitive or important credentials in temporary notes, posing potential privacy or security risks.

**StorePad** addresses these issues by:

- 🔐 Reducing the chance of **sensitive information being stored indefinitely** by auto-cleaning notes that are no longer needed.
- 🕒 Allowing users to create **temporary notes** that are automatically deleted after a set duration.
- 🎯 Helping users **focus only on what matters now**, while the app silently removes the noise.
- ❤️ Enabling users to **favorite important notes** so they are kept safely and don't get deleted.

---

## ✨ Features

- 📝 Create, update, and delete notes
- 🔎 Search notes by title
- ❤️ Mark notes as favorite for quick access
- 🧹 Automatic note deletion using CRON (based on expiry timestamp)
- 🔐 User authentication & protected routes
- 🧭 Clean and responsive UI with sidebar navigation
- 🧠 Notes sorted by recent updates

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **React Router**
- **Axios**
- **Vite** (for blazing-fast builds)

### Backend (assumed)
- **Node.js / Express.js**
- **MongoDB**
- **Node Cron**

---

## 📁 Project Structure

```

StorePad/
├── components/
│   ├── NavBar.jsx
│   ├── SideBar.jsx
│   ├── NotesList.jsx
│   ├── NoteDetails.jsx
│   └── CreateNote_Card.jsx
├── context/
│   └── UserContext.jsx
├── pages/
│   ├── MainFrame.jsx
│   └── Login.jsx.jsx
│   └── SignIn.jsx.jsx
├── axios.js
├── App.jsx
├── main.jsx
└── ...

````

---

## 🧪 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/StorePad.git
cd StorePad
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

## 🧼 Auto-Deletion Logic

Each note includes a `deleteAt` timestamp field. A backend CRON job regularly checks for and deletes expired notes, keeping the user’s workspace clean and focused.

---

## 📌 Upcoming Features
* 🗂️ Tag or folder-based organization
* 🔔 Reminder notifications

---

## 🧑‍💻 Contributing

Contributions are welcome! Please open an issue or submit a pull request
