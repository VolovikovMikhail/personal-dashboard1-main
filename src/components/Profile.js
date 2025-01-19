import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Form from './Form';
import ClassifierForm from './MiniClassifier';
import Chat from './Chat';

const Profile = () => {
  const { user, logout, updateUser } = useUser();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isClassifierVisible, setIsClassifierVisible] = useState(false);
  const [isMyDataVisible, setIsMyDataVisible] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false); // Для отображения чата
  const [profileData, setProfileData] = useState(user || {});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('profileData'));
    if (storedData) {
      setProfileData(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
    setIsFormVisible(false);
    setIsClassifierVisible(false);
    setIsMyDataVisible(false);
  };

  const saveChanges = () => {
    updateUser(profileData);
    alert('Профиль успешно обновлён!');
  };

  return (
    <div className="flex flex-col font-sans">
      {/* Header */}
      <header
        className="w-full bg-blue-800 text-white shadow-md fixed top-0 z-50"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgb(25, 29, 255) 0%, rgba(0,99,255,1) 100%)',
        }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Личный кабинет</h1>
          <div className="flex space-x-4">
            <Link to="/help" className="hover:underline">
              Помощь
            </Link>
            <Link to="/contact" className="hover:underline">
              Контакты
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-grow mt-16">
        {/* Sidebar Navigation */}
        <div
          className="w-64 h-screen fixed left-0 top-0 text-white shadow-lg flex flex-col pt-16"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgb(25, 29, 255) 0%, rgba(0,99,255,1) 100%)',
          }}
        >
          <div className="flex items-center px-6 py-4 border-b border-blue-700">
            <FaUserCircle className="text-3xl text-white mr-3" />
            {user ? (
              <span className="text-xl font-semibold">{user.email}</span>
            ) : (
              <Link to="/login" className="text-white hover:underline">
                Войти
              </Link>
            )}
          </div>
          <ul className="mt-4 flex-grow">
            {user && (
              <li className="mb-2">
                <button
                  onClick={() => setIsMyDataVisible(true)}
                  className="w-full text-left px-6 py-3 focus:outline-none text-gray-200 hover:text-white transition-colors duration-200"
                >
                  Мои данные
                </button>
              </li>
            )}
            <li className="mb-2">
              <button
                onClick={() => setIsClassifierVisible(true)}
                className="w-full text-left px-6 py-3 focus:outline-none text-gray-200 hover:text-white transition-colors duration-200"
              >
                Free predict
              </button>
            </li>
          </ul>
          <div className="px-6 py-4 text-sm text-center border-t border-blue-600">
            <p>© 2025 TyuIU</p>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="flex-1 ml-64 p-8 flex flex-col items-center justify-center min-h-screen relative bg-cover bg-center"
          style={{ backgroundImage: 'url(https://www.neoflex.ru/upload/iblock/ffb/24.jpg)' }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

          <div className="w-full max-w-2xl relative z-10">
            {isMyDataVisible ? (
              <h2 className="text-3xl font-bold mb-6 text-center text-white">Мои данные</h2>
            ) : isClassifierVisible ? (
              <ClassifierForm />
            ) : (
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-6">Добро пожаловать!</h2>
                <p>Выберите пункт из меню слева.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4">
        {!isChatVisible ? (
          <button
            onClick={toggleChatVisibility}
            className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition duration-200"
          >
            Чат
          </button>
        ) : (
          <div className="bg-white shadow-lg rounded-lg w-280 h-196 p-4 relative">
            <button
              onClick={toggleChatVisibility}
              className="absolute top-0 right-1 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <Chat />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;