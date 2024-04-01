import React, { useState } from 'react';
import todo from '../assets/todo.png';
import onprogress from '../assets/onprogress.png';
import done from '../assets/done.png';
import vector1 from '../assets/Vector1.png';
import vector2 from '../assets/Vector2.png';
import vector3 from '../assets/Vector3.png';

const LandingPage = () => {
    const [todoTasks, setTodoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDetail, setNewDetail] = useState('');
    const [newLevel, setNewLevel] = useState('Low');
    const [showInput, setShowInput] = useState(false);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);

    const handleAddTask = () => {
        if (newTitle.trim() !== '' && newDetail.trim() !== '') {
            const newTask = { title: newTitle, detail: newDetail, level: newLevel };
            setTodoTasks([...todoTasks, newTask]);
            setNewTitle('');
            setNewDetail('');
            setNewLevel('Low');
            setShowInput(false); 
        }
    };

    const handleMoveToColumn = (column) => {
        if (selectedTaskIndex !== null) {
            const taskToMove = selectedColumn === 'todo'
                ? todoTasks[selectedTaskIndex]
                : selectedColumn === 'inProgress'
                    ? inProgressTasks[selectedTaskIndex]
                    : doneTasks[selectedTaskIndex];

            if (selectedColumn === 'todo') {
                setTodoTasks(todoTasks.filter((task, index) => index !== selectedTaskIndex));
            } else if (selectedColumn === 'inProgress') {
                setInProgressTasks(inProgressTasks.filter((task, index) => index !== selectedTaskIndex));
            } else if (selectedColumn === 'done') {
                setDoneTasks(doneTasks.filter((task, index) => index !== selectedTaskIndex));
            }

            if (column === 'todo') {
                setTodoTasks([...todoTasks, taskToMove]);
            } else if (column === 'inProgress') {
                setInProgressTasks([...inProgressTasks, taskToMove]);
            } else if (column === 'done') {
                setDoneTasks([...doneTasks, taskToMove]);
            }
            setSelectedTaskIndex(null);
            setSelectedColumn(null);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Kanban Board</h1>
            <div className="flex justify-between">
                <div className="relative w-1/3 bg-gray-100 p-4 mx-4 rounded">
                    <h2 className="text-lg font-bold mb-4 flex items-center">
                        <img src={todo} alt="todo" />
                        
                    </h2>
                    <button
                        className="absolute top-3 right-3 bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowInput(true)} // Show input field on button click
                    >
                        Add Task
                    </button>
                    <img src={vector1} alt="vector1" />
                    {showInput && (
                        <>
                            <input
                                type="text"
                                className="w-full border-none bg-gray-200 rounded px-3 py-2 mt-2"
                                placeholder="Enter title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                            <input
                                type="text"
                                className="w-full border-none bg-gray-200 rounded px-3 py-2 mt-2"
                                placeholder="Enter detail"
                                value={newDetail}
                                onChange={(e) => setNewDetail(e.target.value)}
                            />
                            <select
                                className="w-full border-none bg-gray-200 rounded px-3 py-2 mt-2"
                                value={newLevel}
                                onChange={(e) => setNewLevel(e.target.value)}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                onClick={handleAddTask}
                            >
                                Add
                            </button>
                        </>
                    )}
                    {todoTasks.map((task, index) => (
                        <div key={index} className="bg-white p-4 mt-6 shadow rounded relative">
                            <h3 className="font-bold text-2xl">{task.title}</h3>
                            <p>{task.detail}</p>
                            <div
                                className={`w-4 h-4 rounded-full bg-${task.level.toLowerCase()} text-${task.level.toLowerCase()} absolute top-0 right-0 m-2`}
                            ></div>
                            
                                <button
                                    className="bg-gray-300 px-2 py-1 rounded absolute top-0 right-0"
                                    onClick={() => {
                                        setSelectedTaskIndex(index);
                                        setSelectedColumn('todo');
                                    }}
                                >
                                    &#8942;
                                </button>
                                {selectedTaskIndex === index && selectedColumn === 'todo' && (
                                    <div className="absolute bg-white border rounded p-1 mt-1 top-0 right-0 z-10">
                                        <button
                                            className="block w-full text-left p-1 hover:bg-gray-200"
                                            onClick={() => handleMoveToColumn('inProgress')}
                                        >
                                            Move to In Progress
                                        </button>
                                        <button
                                            className="block w-full text-left p-1 hover:bg-gray-200"
                                            onClick={() => handleMoveToColumn('done')}
                                        >
                                            Move to Done
                                        </button>
                                        <button
                                            className="block w-full text-left p-1 hover:bg-gray-200"
                                            onClick={() => {
                                                setSelectedTaskIndex(null);
                                                setSelectedColumn(null);
                                            }}
                                        >
                                            Keep in This
                                        </button>
                                    </div>
                                )}
                            
                        </div>
                    ))}


                </div>
                <div className="w-1/3 bg-gray-100 p-4 mx-4 rounded">
                    <h2 className="text-lg font-bold mb-4 flex items-center">
                        <img src={onprogress} alt="onprogress" />
                        
                    </h2>
                    <img src={vector2} alt="vector2" />
                    {inProgressTasks.map((task, index) => (
                      <div key={index} className="bg-white p-4 mt-4 shadow rounded relative">
                          <h3 className="font-bold text-2xl">{task.title}</h3>
                          <p>{task.detail}</p>
                          <div
                              className={`w-4 h-4 rounded-full bg-${task.level.toLowerCase()} text-${task.level.toLowerCase()} absolute top-0 right-0 m-2`}
                          ></div>
                          
                              <button
                                  className="bg-gray-300 px-2 py-1 rounded absolute top-0 right-0"
                                  onClick={() => {
                                      setSelectedTaskIndex(index);
                                      setSelectedColumn('inProgress');
                                  }}
                              >
                                  &#8942;
                              </button>
                              {selectedTaskIndex === index && selectedColumn === 'inProgress' && (
                                  <div className="absolute bg-white border rounded p-1 mt-1 top-0 right-0 z-10">
                                      <button
                                          className="block w-full text-left p-1 hover:bg-gray-200"
                                          onClick={() => handleMoveToColumn('todo')}
                                      >
                                          Move to To Do
                                      </button>
                                      <button
                                          className="block w-full text-left p-1 hover:bg-gray-200"
                                          onClick={() => handleMoveToColumn('done')}
                                      >
                                          Move to Done
                                      </button>
                                      <button
                                          className="block w-full text-left p-1 hover:bg-gray-200"
                                          onClick={() => {
                                              setSelectedTaskIndex(null);
                                              setSelectedColumn(null);
                                          }}
                                      >
                                          Keep in This
                                      </button>
                                  </div>
                              )}
                          
                      </div>
                  ))}

                </div>
                <div className="w-1/3 bg-gray-100 p-4 mx-4 rounded">
                    <h2 className="text-lg font-bold mb-4 flex items-center">
                        <img src={done} alt="done" />
                      
                    </h2>
                    <img src={vector3} alt="vector3" />
                    {doneTasks.map((task, index) => (
                        <div key={index} className="bg-white p-4 mt-4 shadow rounded relative">
                            <h3 className="font-bold text-2xl">{task.title}</h3>
                            <p>{task.detail}</p>
                            <div
                                className={`w-4 h-4 rounded-full bg-${task.level.toLowerCase()} text-${task.level.toLowerCase()} absolute top-0 right-0 m-2`}
                            ></div>
                            
                                <button
                                    className="bg-gray-300 px-2 py-1 rounded absolute top-0 right-0"
                                    onClick={() => {
                                        setSelectedTaskIndex(index);
                                        setSelectedColumn('done');
                                    }}
                                >
                                    &#8942;
                                </button>
                                {selectedTaskIndex === index && selectedColumn === 'done' && (
                                    <div className="absolute bg-white border rounded p-1 mt-1 top-0 right-0 z-10">
                                        <button
                                            className="block w-full text-left p-1 hover:bg-gray-200"
                                            onClick={() => handleMoveToColumn('todo')}
                                        >
                                            Move to To Do
                                        </button>
                                        <button
                                            className="block w-full text-left p-1 hover:bg-gray-200"
                                            onClick={() => handleMoveToColumn('inProgress')}
                                        >
                                            Move to In Progress
                                        </button>
                                        <button
                                            className="block w-full text-left p-1 hover:bg-gray-200"
                                            onClick={() => {
                                                setSelectedTaskIndex(null);
                                                setSelectedColumn(null);
                                            }}
                                        >
                                            Keep in This
                                        </button>
                                    </div>
                                )}
                          
                        </div>
                    ))}


                </div>
            </div>
        </div>
    );
};

export default LandingPage;
