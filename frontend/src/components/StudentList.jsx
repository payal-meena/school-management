import { useState, useEffect } from "react";
import axios from "axios";

function StudentList({ onEdit, refresh }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (error) {
      setError("Failed to fetch students!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setDeleteMsg("Student deleted successfully!");
      fetchStudents();
      setTimeout(() => setDeleteMsg(""), 2000);
    } catch (error) {
      setError("Failed to delete student!");
    }
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.className.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toString().includes(search)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-blue-600 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Student List
      </h2>

      {deleteMsg && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-4 text-center">
          {deleteMsg}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, class or roll number..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">No students found!</p>
          <p className="text-sm mt-1">Add a student to get started.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-3">
            Total Students: <span className="font-semibold text-blue-600">{filtered.length}</span>
          </p>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-50 text-blue-700">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Name</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Roll No</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3 rounded-tr-lg text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student, index) => (
                  <tr
                    key={student._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="px-4 py-3 font-medium">{student.name}</td>
                    <td className="px-4 py-3">{student.age}</td>
                    <td className="px-4 py-3">{student.className}</td>
                    <td className="px-4 py-3">{student.rollNo}</td>
                    <td className="px-4 py-3">{student.email}</td>
                    <td className="px-4 py-3">{student.phone}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => onEdit(student)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-yellow-500 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {filtered.map((student) => (
              <div
                key={student._id}
                className="border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <h3 className="font-bold text-blue-600 text-lg">{student.name}</h3>
                <p className="text-sm text-gray-600">Age: {student.age}</p>
                <p className="text-sm text-gray-600">Class: {student.className}</p>
                <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                <p className="text-sm text-gray-600">Email: {student.email}</p>
                <p className="text-sm text-gray-600">Phone: {student.phone}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onEdit(student)}
                    className="bg-yellow-400 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StudentList;