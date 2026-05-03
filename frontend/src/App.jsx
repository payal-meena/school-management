import { useState } from 'react'
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';

function App() {
    const [activeTab, setActiveTab] = useState('list');
    const [editStudent, setEditStudent] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
      setRefresh(!refresh);
    }

    const handleEdit = (student) => {
      setEditStudent(student);
      setActiveTab("edit");
    };

  return (
    <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white px-6 py-4 shadow-md" >
          <h1 className="text-2xl font-bold text-center">🏫 School Management System</h1>
        </nav>

        <div className="flex justify-center gap-4 mt-6">
          <button 
          onClick={() => setActiveTab('list')}
          className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === "list" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"}`}
          >
            Student List
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`px-6 py-2 rounded-full font-semibold transiiton ${activeTab === "add" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-500"}`}
          >
            Add Student
          </button>
        </div>

        <div className="max-w-5xl mx-auto mt-6 px-4">
          {activeTab === "list" && (
            <StudentList onEdit={handleEdit} refresh={refresh} />
          )} 
          {activeTab === "add" && (
            <AddStudent onSuccess={() =>{
              handleRefresh();
              setActiveTab("list");
            }}
            />
          )}
          {activeTab === "edit" && (
            <EditStudent 
            student={editStudent}
            onSuccess={() => {
              handleRefresh();
              setActiveTab("list");
            }}
            />
          )}
        </div>
    </div>
  )
}

export default App;
