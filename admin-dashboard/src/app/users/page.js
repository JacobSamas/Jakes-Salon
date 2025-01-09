"use client";

import React, { useState, useEffect } from "react";
import UserTable from "../../components/UserTable";
import UserModal from "../../components/UserModal";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/users", {
          headers: {
            Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => {
            setSelectedUser(null);
            setShowModal(true);
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
        >
          Add User
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserTable
          users={users}
          onEdit={(user) => {
            setSelectedUser(user);
            setShowModal(true);
          }}
          onDelete={(userId) => {
            setUsers((prev) => prev.filter((user) => user.id !== userId));
          }}
        />
      )}

      {showModal && (
        <UserModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
          onSave={(newUser) => {
            if (selectedUser) {
              setUsers((prev) =>
                prev.map((user) =>
                  user.id === newUser.id ? newUser : user
                )
              );
            } else {
              setUsers((prev) => [...prev, newUser]);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default UsersPage;
