# Wazobia Tax Ledger: Expense Management PWA

## Overview

The Wazobia Tax Ledger is a progressive web application (PWA) designed to simplify expense tracking for users, particularly focusing on accessibility and ease of use for diverse demographics, including low-literacy users in regions like rural Nigeria. Built with a modern React and TypeScript stack, the application provides intuitive methods for logging expenses: manual entry, optical character recognition (OCR) via receipt scanning, and voice commands. All expense data is persisted locally for offline access and is designed with a mobile-first, responsive user interface.

## Key Features

### 1. Robust Expense Entry
Users can add expenses through three distinct methods:
-   **Manual Entry**: A traditional form for inputting amount, date, category, and vendor details.
-   **OCR Receipt Scanning**: Leverages `tesseract.js` for client-side OCR. Users can upload a receipt image or take a photo, and the system intelligently extracts the amount, date, and vendor, auto-categorizing the expense.
-   **Voice Command**: Utilizes the Web Speech API to parse spoken commands (e.g., "Add expense five thousand naira for food"). The application transcribes speech and extracts relevant expense details to populate the form fields automatically.

### 2. Intuitive Ledger Management
All recorded expenses are displayed in a scrollable ledger list, providing a clear overview of financial transactions. Each entry shows the amount, vendor, date, category, and the method of entry (manual, OCR, or voice). A "Clear All" function allows users to reset their ledger.

### 3. Offline-First Capability (PWA)
The application is built as a Progressive Web App, offering a reliable offline experience.
-   **Service Worker**: A service worker is implemented to cache core assets, enabling the application to load even without an internet connection after the first visit.
-   **Local Data Persistence**: Expense entries are securely stored locally using IndexedDB via the `idb-keyval` library, ensuring data availability and integrity even when offline.
-   **Sync Simulation**: Upon regaining internet connectivity, the application simulates a data synchronization process by logging entries, demonstrating readiness for backend integration.

### 4. Multilingual Support
To cater to a diverse user base, the application supports multiple languages:
-   **`react-i18next`**: Integrated for seamless internationalization.
-   **Language Toggle**: A prominent toggle in the header allows users to switch between English (EN) and Nigerian Pidgin (PG) to enhance usability for local communities.

### 5. Enhanced Accessibility (WCAG 2.1 AA Compliant)
Designed with a strong focus on accessibility:
-   **ARIA Labels**: Comprehensive ARIA labels have been added to all interactive UI elements (inputs, buttons, lists) to ensure screen reader compatibility.
-   **Keyboard Navigation**: Standard semantic HTML and thoughtful component design support intuitive keyboard navigation.
-   **High Contrast**: Adherence to WCAG 2.1 AA standards ensures a high-contrast interface.
-   **Voice Mode as Fallback**: The voice entry feature provides a crucial alternative input method for users with low literacy or those who prefer spoken interaction.

### 6. Professional & Responsive UI
The user interface has been significantly enhanced to provide a modern and professional aesthetic:
-   **Tailwind CSS**: Utilized for a utility-first approach to styling, ensuring a consistent and responsive design across various screen sizes (mobile-first, responsive for 320px+ screens).
-   **Framer Motion**: Integrated for subtle, engaging animations, particularly for expense entry additions, providing a smooth user experience.
-   **Modern Components**: All major components (Header, Expense Form, Ledger List, Modals, Toast) have been restyled with a clean layout, clear typography (Inter font family), and a professional color palette featuring a prominent primary blue.
-   **Loading Indicators & Toasts**: Custom loading spinners are displayed during OCR processing, and toast notifications provide clear feedback for successful actions and errors.

## Design Decisions

- **Regex for Parsing OCR/Voice Input**: Used regex to extract amounts, dates, and vendors from OCR text and voice transcriptions because it allows flexible matching of various formats.
- **IndexedDB via idb-keyval**: Chosen over localStorage to persist structured data offline and support larger entries efficiently.
- **Tailwind CSS & Framer Motion**: Enables rapid styling with a responsive, mobile-first approach and smooth animations for better UX.
- **PWA Offline Support**: Implemented service worker caching to allow offline usage, critical for low-connectivity regions.
- **Accessibility (WCAG 2.1 AA)**: Used ARIA labels, keyboard navigation, and voice input support to make the app inclusive for low-literacy users.

## Reflections
One of the key challenges during development was ensuring accurate extraction of expense data via OCR and voice commands. Receipts can vary in layout, font, and clarity, while spoken input often includes colloquial expressions or numbers in words, making automatic parsing prone to errors. To address this, I implemented a combination of regex-based parsing and validation logic:

-   **For OCR**: text extracted from receipts is processed to reliably detect numeric amounts, dates, and vendor names even in slightly inconsistent formats.
-   **For Voice Input**: the speech transcript is normalized (e.g., converting "five thousand naira" to 5000) and matched against predefined patterns for categories and amounts.
-   **Errors**: are gracefully handled with prompts, allowing users to manually confirm or correct extracted data before submission.

This solution directly supports low-literacy users, who may struggle with manual entry, by providing automated, intuitive input methods. Users can simply speak or photograph their expenses, reducing reliance on reading or typing skills.

From a compliance perspective, this approach aligns with NTAA Section 28: Books of Account, as it facilitates accurate recording of transactions in a clear, verifiable ledger format. Even if the user cannot read or write fluently, the system ensures that all expense entries are consistently logged and retrievable, supporting proper bookkeeping practices.

## Technical Stack

-   **Frontend**: React 18+
-   **Language**: TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **State Management**: React Context API, `idb-keyval` (IndexedDB)
-   **Animations**: Framer Motion
-   **OCR**: Tesseract.js (lazy-loaded for performance)
-   **Voice Recognition**: Web Speech API
-   **Internationalization**: `react-i18next`

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-link]
    cd Wazobia-Tax-Ledger
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

    ## Live Demo

Check out the live version deployed on [Vercel](https://wazobia-tax-ledger.vercel.app).

## Screenshots

**1. Expense Entry Form (Manual, OCR, Voice)**  
![Expense Entry Form](/public/Screenshot%201.png)

**2. Ledger Overview**  
![Ledger Overview](/public/Screenshot%202.png)

**3. Voice Entry**  
![Offline Mode](/public/Screenshot%205.png)

**4. Recipt Scanner**  
![Offline Mode](/public/Screenshot%204.png)

## Project Structure

```
Wazobia-Tax-Ledger/
├── public/
├── src/
│   ├── assets/
│   ├── components/       # Reusable UI components (Header, ExpenseForm, LedgerList, OCRModal, VoiceModal, Toast)
│   ├── context/          # React Context for global state management (LedgerContext)
│   ├── hooks/            # Custom React hooks (useOCR, useVoice)
│   ├── i18n/             # Internationalization files (en.json, pg.json, index.ts)
│   ├── pages/            # Main application pages (ExpenseEntry)
│   ├── utils/            # Utility functions (parsing, storage)
│   ├── App.css           # Global application styles
│   ├── App.tsx           # Main application component
│   ├── index.css         # Tailwind CSS directives and global styles
│   ├── main.tsx          # Application entry point
│   └── service-worker.ts # PWA service worker for offline caching
├── .gitignore
├── eslint.config.js
├── index.html            # Main HTML file
├── package.json          # Project metadata and dependencies
├── postcss.config.js     # PostCSS configuration for Tailwind CSS and Autoprefixer
├── README.md             # Project documentation
├── tailwind.config.cjs   # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── ...
