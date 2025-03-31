{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import React, \{ useState, useEffect \} from 'react';\
import \{ Calendar, Plus, X, Info, Lock \} from 'lucide-react';\
\
const MealCalendar = () => \{\
  // Authentication state\
  const [isAuthenticated, setIsAuthenticated] = useState(false);\
  const [password, setPassword] = useState('');\
  const [correctPassword] = useState('mealplanner123'); // Change this to your desired password\
\
  // Days of the week\
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];\
  \
  // Meal types\
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];\
  \
  // State for storing meals\
  const [meals, setMeals] = useState(\{\});\
  \
  // State for meal being added\
  const [newMeal, setNewMeal] = useState(\{\
    day: 'Monday',\
    type: 'Breakfast',\
    name: '',\
    description: '',\
    ingredients: '',\
    prepTime: '',\
  \});\
  \
  // State for showing add meal form\
  const [showAddForm, setShowAddForm] = useState(false);\
  \
  // State for showing meal details\
  const [selectedMeal, setSelectedMeal] = useState(null);\
  \
  // Load saved meals and authentication state from localStorage on component mount\
  useEffect(() => \{\
    const savedMeals = localStorage.getItem('weeklyMeals');\
    if (savedMeals) \{\
      setMeals(JSON.parse(savedMeals));\
    \}\
    \
    // Check if user is already authenticated\
    const authState = localStorage.getItem('mealCalendarAuth');\
    if (authState === 'true') \{\
      setIsAuthenticated(true);\
    \}\
  \}, []);\
  \
  // Save meals to localStorage whenever they change\
  useEffect(() => \{\
    localStorage.setItem('weeklyMeals', JSON.stringify(meals));\
  \}, [meals]);\
  \
  // Handle adding a new meal\
  const handleAddMeal = () => \{\
    if (!newMeal.name) return;\
    \
    const mealKey = `$\{newMeal.day\}-$\{newMeal.type\}`;\
    setMeals(prevMeals => (\{\
      ...prevMeals,\
      [mealKey]: newMeal\
    \}));\
    \
    // Reset form\
    setNewMeal(\{\
      day: 'Monday',\
      type: 'Breakfast',\
      name: '',\
      description: '',\
      ingredients: '',\
      prepTime: '',\
    \});\
    \
    setShowAddForm(false);\
  \};\
  \
  // Handle removing a meal\
  const handleRemoveMeal = (day, type) => \{\
    const mealKey = `$\{day\}-$\{type\}`;\
    const newMeals = \{ ...meals \};\
    delete newMeals[mealKey];\
    setMeals(newMeals);\
  \};\
  \
  // Open meal details\
  const viewMealDetails = (day, type) => \{\
    const mealKey = `$\{day\}-$\{type\}`;\
    setSelectedMeal(meals[mealKey]);\
  \};\
  \
  // Close meal details\
  const closeMealDetails = () => \{\
    setSelectedMeal(null);\
  \};\
  \
  // Handle login\
  const handleLogin = () => \{\
    if (password === correctPassword) \{\
      setIsAuthenticated(true);\
      localStorage.setItem('mealCalendarAuth', 'true');\
    \} else \{\
      alert('Incorrect password. Please try again.');\
    \}\
  \};\
  \
  // Handle logout\
  const handleLogout = () => \{\
    setIsAuthenticated(false);\
    localStorage.removeItem('mealCalendarAuth');\
  \};\
  \
  return (\
    <div className="bg-yellow-50 min-h-screen p-4">\
      \{!isAuthenticated ? (\
        // Login Screen\
        <div className="flex items-center justify-center h-screen -mt-16">\
          <div className="bg-white rounded-2xl p-8 shadow-lg border-4 border-purple-200 w-full max-w-md">\
            <div className="flex justify-center mb-6">\
              <Lock size=\{50\} className="text-purple-500" />\
            </div>\
            <h1 className="text-2xl font-bold text-purple-700 text-center mb-6">Meal Calendar Login</h1>\
            <div className="mb-4">\
              <label className="block text-sm font-medium text-purple-700 mb-1">Password</label>\
              <input \
                type="password" \
                value=\{password\}\
                onChange=\{(e) => setPassword(e.target.value)\}\
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"\
                placeholder="Enter password"\
                onKeyPress=\{(e) => e.key === 'Enter' && handleLogin()\}\
              />\
            </div>\
            <button\
              onClick=\{handleLogin\}\
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full font-bold shadow-md hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all"\
            >\
              Login\
            </button>\
          </div>\
        </div>\
      ) : (\
        // Main Application\
        <>\
          <header className="flex justify-between items-center mb-6">\
            <h1 className="text-2xl font-bold text-purple-700 flex items-center">\
              <Calendar className="mr-2 text-purple-600" /> Weekly Meal Calendar\
            </h1>\
            <div className="flex space-x-2">\
              <button \
                onClick=\{() => setShowAddForm(true)\}\
                className="bg-pink-500 text-white px-4 py-2 rounded-full shadow-md flex items-center hover:bg-pink-600 transition-colors"\
              >\
                <Plus size=\{18\} className="mr-1" /> Add Meal\
              </button>\
              <button\
                onClick=\{handleLogout\}\
                className="bg-purple-200 text-purple-700 px-4 py-2 rounded-full shadow-md hover:bg-purple-300 transition-colors"\
              >\
                Logout\
              </button>\
            </div>\
          </header>\
\
          \{/* Calendar Grid */\}\
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-blue-200">\
            <div className="grid grid-cols-8 border-b">\
              <div className="p-3 font-semibold bg-blue-100 border-r"></div>\
              \{daysOfWeek.map(day => (\
                <div key=\{day\} className="p-3 font-semibold text-center bg-blue-100 border-r text-indigo-700">\
                  \{day\}\
                </div>\
              ))\}\
            </div>\
            \
            \{mealTypes.map(type => (\
              <div key=\{type\} className="grid grid-cols-8 border-b">\
                <div className="p-3 font-medium bg-green-100 border-r text-green-700">\{type\}</div>\
                \{daysOfWeek.map(day => \{\
                  const mealKey = `$\{day\}-$\{type\}`;\
                  const meal = meals[mealKey];\
                  \
                  return (\
                    <div key=\{`$\{day\}-$\{type\}`\} className="p-2 border-r min-h-24 relative">\
                      \{meal ? (\
                        <div className="bg-gradient-to-br from-orange-50 to-yellow-100 p-2 rounded-lg h-full flex flex-col shadow-sm border-2 border-yellow-200">\
                          <div className="flex justify-between items-start">\
                            <span className="font-medium text-orange-700">\{meal.name\}</span>\
                            <div className="flex">\
                              <button \
                                onClick=\{() => viewMealDetails(day, type)\}\
                                className="text-blue-500 p-1 rounded-full hover:bg-blue-100"\
                              >\
                                <Info size=\{14\} />\
                              </button>\
                              <button \
                                onClick=\{() => handleRemoveMeal(day, type)\}\
                                className="text-red-500 p-1 rounded-full hover:bg-red-100"\
                              >\
                                <X size=\{14\} />\
                              </button>\
                            </div>\
                          </div>\
                          <p className="text-xs mt-1 text-orange-800 line-clamp-2">\
                            \{meal.description\}\
                          </p>\
                        </div>\
                      ) : (\
                        <button\
                          onClick=\{() => \{\
                            setNewMeal(prev => (\{ ...prev, day, type \}));\
                            setShowAddForm(true);\
                          \}\}\
                          className="w-full h-full flex items-center justify-center text-purple-400 hover:bg-purple-50 rounded-lg border-2 border-dashed border-purple-200"\
                        >\
                          <Plus size=\{20\} />\
                        </button>\
                      )\}\
                    </div>\
                  );\
                \})\}\
              </div>\
            ))\}\
          </div>\
          \
          \{/* Add Meal Form Modal */\}\
          \{showAddForm && (\
            <div className="fixed inset-0 bg-purple-900 bg-opacity-50 flex items-center justify-center p-4">\
              <div className="bg-white rounded-2xl w-full max-w-md p-6 border-4 border-pink-200">\
                <div className="flex justify-between items-center mb-4">\
                  <h2 className="text-xl font-bold text-purple-700">Add New Meal</h2>\
                  <button \
                    onClick=\{() => setShowAddForm(false)\}\
                    className="text-pink-500 hover:bg-pink-100 p-1 rounded-full"\
                  >\
                    <X size=\{20\} />\
                  </button>\
                </div>\
                \
                <div className="space-y-4">\
                  <div className="grid grid-cols-2 gap-4">\
                    <div>\
                      <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>\
                      <select\
                        value=\{newMeal.day\}\
                        onChange=\{(e) => setNewMeal(\{...newMeal, day: e.target.value\})\}\
                        className="w-full p-2 border rounded-md"\
                      >\
                        \{daysOfWeek.map(day => (\
                          <option key=\{day\} value=\{day\}>\{day\}</option>\
                        ))\}\
                      </select>\
                    </div>\
                    <div>\
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>\
                      <select\
                        value=\{newMeal.type\}\
                        onChange=\{(e) => setNewMeal(\{...newMeal, type: e.target.value\})\}\
                        className="w-full p-2 border rounded-md"\
                      >\
                        \{mealTypes.map(type => (\
                          <option key=\{type\} value=\{type\}>\{type\}</option>\
                        ))\}\
                      </select>\
                    </div>\
                  </div>\
                  \
                  <div>\
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>\
                    <input\
                      type="text"\
                      value=\{newMeal.name\}\
                      onChange=\{(e) => setNewMeal(\{...newMeal, name: e.target.value\})\}\
                      className="w-full p-2 border rounded-md"\
                      placeholder="e.g., Spaghetti Bolognese"\
                    />\
                  </div>\
                  \
                  <div>\
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>\
                    <textarea\
                      value=\{newMeal.description\}\
                      onChange=\{(e) => setNewMeal(\{...newMeal, description: e.target.value\})\}\
                      className="w-full p-2 border rounded-md"\
                      rows="2"\
                      placeholder="Brief description of the meal"\
                    />\
                  </div>\
                  \
                  <div>\
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>\
                    <textarea\
                      value=\{newMeal.ingredients\}\
                      onChange=\{(e) => setNewMeal(\{...newMeal, ingredients: e.target.value\})\}\
                      className="w-full p-2 border rounded-md"\
                      rows="3"\
                      placeholder="List of ingredients"\
                    />\
                  </div>\
                  \
                  <div>\
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Time</label>\
                    <input\
                      type="text"\
                      value=\{newMeal.prepTime\}\
                      onChange=\{(e) => setNewMeal(\{...newMeal, prepTime: e.target.value\})\}\
                      className="w-full p-2 border rounded-md"\
                      placeholder="e.g., 30 minutes"\
                    />\
                  </div>\
                  \
                  <button\
                    onClick=\{handleAddMeal\}\
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full font-bold shadow-md hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all"\
                  >\
                    Add Meal\
                  </button>\
                </div>\
              </div>\
            </div>\
          )\}\
          \
          \{/* Meal Details Modal */\}\
          \{selectedMeal && (\
            <div className="fixed inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center p-4">\
              <div className="bg-white rounded-2xl w-full max-w-md p-6 border-4 border-green-200">\
                <div className="flex justify-between items-center mb-4">\
                  <h2 className="text-xl font-bold text-green-600">\{selectedMeal.name\}</h2>\
                  <button \
                    onClick=\{closeMealDetails\}\
                    className="text-teal-500 hover:bg-teal-100 p-1 rounded-full"\
                  >\
                    <X size=\{20\} />\
                  </button>\
                </div>\
                \
                <div className="space-y-4">\
                  <div className="p-3 bg-blue-50 rounded-lg mb-2">\
                    <h3 className="text-sm font-medium text-blue-700">Day & Time</h3>\
                    <p className="text-blue-600">\{selectedMeal.day\} - \{selectedMeal.type\}</p>\
                  </div>\
                  \
                  \{selectedMeal.description && (\
                    <div className="p-3 bg-purple-50 rounded-lg mb-2">\
                      <h3 className="text-sm font-medium text-purple-700">Description</h3>\
                      <p className="text-purple-600">\{selectedMeal.description\}</p>\
                    </div>\
                  )\}\
                  \
                  \{selectedMeal.prepTime && (\
                    <div className="p-3 bg-pink-50 rounded-lg mb-2">\
                      <h3 className="text-sm font-medium text-pink-700">Preparation Time</h3>\
                      <p className="text-pink-600">\{selectedMeal.prepTime\}</p>\
                    </div>\
                  )\}\
                  \
                  \{selectedMeal.ingredients && (\
                    <div className="p-3 bg-green-50 rounded-lg mb-2">\
                      <h3 className="text-sm font-medium text-green-700">Ingredients</h3>\
                      <p className="whitespace-pre-line text-green-600">\{selectedMeal.ingredients\}</p>\
                    </div>\
                  )\}\
                </div>\
              </div>\
            </div>\
          )\}\
        </>\
      )\}\
    </div>\
  );\
\};\
\
export default MealCalendar;}