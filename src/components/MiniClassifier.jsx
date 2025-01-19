import React, { useState } from 'react';

const ClassifierForm = () => {
  const [formData, setFormData] = useState({
    gender: '',
    gpa: '',
    priority: '',
    points: '',
    direction: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false); // Состояние для индикации загрузки

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRangeChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      points: value
    }));
  };

  const handleDirectionChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      direction: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Включаем индикатор загрузки

    const dataToSend = {
      ...formData,
      gpa: parseFloat(formData.gpa),
      priority: parseInt(formData.priority),
      points: parseInt(formData.points)
    };

    try {
      const response = await fetch('https://personal-account-fastapi.onrender.com/predict/free', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();
      setPrediction(result.prediction);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке данных.');
    } finally {
      setLoading(false); // Выключаем индикатор загрузки
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit} className="flex flex-col bg-white p-8 shadow-xl rounded-3xl w-full max-w-xl ml-30">
        <fieldset className="flex-grow space-y-4 mb-6">
          <label className="block text-sm font-semibold">Пол:
            <select
              value={formData.gender}
              name="gender"
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Выберите пол</option>
              <option value="М">Мужской</option>
              <option value="Ж">Женский</option>
            </select>
          </label>

          <label className="block text-sm font-semibold">Средний балл (GPA):
            <input
              type="number"
              step="0.01"
              value={formData.gpa}
              name="gpa"
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </label>

          <label className="block text-sm font-semibold">Общее количество баллов:
            <input
              type="range"
              min="0"
              max="310"
              step="1"
              value={formData.points}
              onChange={handleRangeChange}
              className="w-full mt-2"
            />
            <span className="text-sm">{formData.points} баллов</span>
          </label>

          <label className="block text-sm font-semibold">Приоритет:
            <input
              type="number"
              step="1"
              value={formData.priority}
              name="priority"
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </label>

          <label className="block text-sm font-semibold">Направление:
            <select
              value={formData.direction}
              onChange={handleDirectionChange}
              className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Выберите направление</option>
              <option value="08.03.01 Строительство">08.03.01 Строительство</option>
              <option value="21.03.01 Нефтегазовое дело">21.03.01 Нефтегазовое дело</option>
              <option value="15.03.04 Автоматизация технологических процессов и производств">15.03.04 Автоматизация технологических процессов и производств</option>
              <option value="20.03.01 Техносферная безопасность">20.03.01 Техносферная безопасность</option>
              <option value="13.03.02 Электроэнергетика и электротехника">13.03.02 Электроэнергетика и электротехника</option>
              <option value="21.05.00 Прикладная геология, горное дело, нефтегазовое дело и геодезия">21.05.00 Прикладная геология, горное дело, нефтегазовое дело и геодезия</option>
              <option value="09.03.00 Информатика и вычислительная техника">09.03.00 Информатика и вычислительная техника</option>
              <option value="21.03.02 Землеустройство и кадастры">21.03.02 Землеустройство и кадастры</option>
              <option value="09.03.02 Информационные системы и технологии">09.03.02 Информационные системы и технологии</option>
              <option value="15.03.01 Машиностроение">15.03.01 Машиностроение</option>
              <option value="13.03.01 Теплоэнергетика и теплотехника">13.03.01 Теплоэнергетика и теплотехника</option>
              <option value="05.03.01 Геология">05.03.01 Геология</option>
            </select>
          </label>
        </fieldset>

        <button
          type="submit"
          className="w-[175px] mx-auto p-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading} // Блокируем кнопку, пока идет загрузка
        >
          {loading ? 'Загрузка...' : 'Predict'}
        </button>
      </form>

      {/* Результат предсказания */}
      {prediction !== null && (
        <div className="mt-6 p-6 bg-gray-100 rounded-3xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Result predict</h2>
          <p className="text-lg">
            Шанс на поступление: {' '}
            <span
              className={
                prediction <= 0.25
                  ? 'text-red-700'
                  : prediction > 0.25 && prediction <= 0.4
                  ? 'text-red-400'
                  : prediction > 0.4 && prediction <= 0.6
                  ? 'text-blue-400'
                  : prediction > 0.6 && prediction <= 0.75
                  ? 'text-teal-500'
                  : 'text-green-500'
              }
            >
              {(() => {
                if (prediction <= 0.25) return 'Очень низкий';
                if (prediction > 0.25 && prediction <= 0.4) return 'Низкий';
                if (prediction > 0.4 && prediction <= 0.6) return 'Средний';
                if (prediction > 0.6 && prediction <= 0.75) return 'Повышенный';
                return 'Высокий';
              })()}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ClassifierForm;
