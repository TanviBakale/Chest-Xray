@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  @apply bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dark body {
  @apply bg-gray-950 text-gray-100;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

.glass {
  @apply bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg;
}

.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-medical-500;
}

.gradient-bg {
  @apply bg-gradient-to-br from-primary-500 via-primary-600 to-medical-600;
}

.card-hover {
  @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

.slide-up {
  animation: slideUp 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
