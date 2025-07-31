Rebel Radiance - E-Commerce Frontend

📝 Overview
Rebel Radiance is a modern e-commerce platform built with React, Vite, and Tailwind CSS, featuring an electric purple theme. This frontend application provides a seamless shopping experience with product browsing, cart management, and responsive design.

✨ Features
Product Catalog

Browse featured products with images

Detailed product information

Responsive grid layout

Shopping Cart

Add/remove products

Adjust quantities

Real-time price calculations

Cart persistence

UI/UX

Electric purple theme

Responsive design

Smooth animations

Accessible components

Performance

Fast Vite-based build system

Code splitting

Optimized assets

🛠️ Tech Stack
Frontend Framework: React 19

Build Tool: Vite 7

Styling: Tailwind CSS 3

State Management: React Context API

Routing: React Router (if implemented)

Form Handling: React Hook Form (if implemented)

🚀 Getting Started
Prerequisites
Node.js v18+

npm v9+

Git (optional)

Installation
Clone the repository:

bash
git clone https://github.com/your-username/rebel-radiance-frontend.git
cd rebel-radiance-frontend
Install dependencies:

bash
npm install
Set up environment variables:

bash
cp .env.example .env
Edit the .env file with your API endpoints if needed.

Development
Start the development server:

bash
npm run dev
Open http://localhost:5173 in your browser.

Building for Production
bash
npm run build
The production-ready files will be in the dist directory.

🎨 Theming
The application uses a custom electric purple theme defined in:

src/index.css: CSS variables

tailwind.config.js: Tailwind color extensions

Theme Colors
Name	Hex	Usage
Electric Purple	#8a2be2	Primary buttons, accents
Electric Purple Light	#b57edc	Hover states
Electric Purple Dark	#5a1e9e	Active states
📂 Project Structure
text
src/
├── assets/            # Static assets
├── components/        # Reusable components
│   ├── Cart/          # Cart components
│   ├── Product/       # Product components
│   └── UI/            # Generic UI components
├── context/           # React context providers
├── hooks/             # Custom hooks
├── pages/             # Page components
├── services/          # API services
├── styles/            # Global styles
├── App.jsx            # Main app component
└── main.jsx           # Application entry point
🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📜 License
Distributed under the MIT License. See LICENSE for more information.

Project Link: https://github.com/your-username/rebel-radiance-frontend

