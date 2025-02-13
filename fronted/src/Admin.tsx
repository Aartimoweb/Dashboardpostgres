// import { useState, useEffect } from "react";
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import axios from "axios";
// import '../src/admin.css'
// import Profile from "./Image";

// const AdminPage: React.FC = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingUser, setEditingUser] = useState<any | null>(null);
//     const [users, setUsers] = useState<any[]>([]);
//     const [imageUrl, setImageUrl] = useState<string>(""); 

//     const validationSchema = Yup.object({
//         first_name: Yup.string().required("Username is required"),
//         last_name: Yup.string().required("Last name is required"),
//         password: Yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
//         email: Yup.string().email("Invalid email format").required("Email is required"),
//         contact: Yup.string()
//             .matches(/^[0-9]+$/, "Contact must be a number")
//             .min(10, "Contact must be at least 10 digits")
//             .required("Contact is required"),
//         gender: Yup.string().required("Gender is required"),
       
//     });

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const handleFormSubmit = async (values: any, { resetForm }: any) => {
//         console.log(values)
//         const formData = new FormData();
//         formData.append("first_name", values.first_name)
//         formData.append("last_name", values.last_name)
//         formData.append("password", values.password);
//         formData.append("email", values.email);
//         formData.append("contact", values.contact);
//         formData.append("gender", values.gender);
//         if (values.profile) {
//             formData.append("profile", values.profile);
//         }
//         try {
//             if (editingUser) {
//                 await axios.patch(`http://localhost:3000/users/${editingUser.id}`, formData, {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });
//             } else {
//                 await axios.post("http://localhost:3000/users", formData, {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });
//             }

//             setIsModalOpen(false);
//             resetForm();
//             fetchUsers();
//         } catch (error) {
//             console.error("Error during user submission:", error);
//         }
//     };


//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:3000/users");
//             setUsers(response.data);

//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };

//     const handleEditUser = (user: any) => {
//         setEditingUser(user);
//         setImageUrl(user.profile || ""); 
//         setIsModalOpen(true);
//     };

//     const handleDeleteUser = async (userId: string) => {
//         try {
//             await axios.delete(`http://localhost:3000/users/${userId}`);
//             fetchUsers();
//         } catch (error) {
//             console.error("Error deleting user:", error);
//         }
//     };

//     return (
//         <>
//             <div>Welcome to the Admin Page</div>
//             <button className="btn btn-primary" onClick={() => {
//                 setEditingUser(null);
//                 setImageUrl(""); 
//                 setIsModalOpen(true);
//             }}>
//                 Add User
//             </button>

//             {isModalOpen && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h2>{editingUser ? "Edit User" : "Add User"}</h2>

//                         <Formik
//                             initialValues={{
//                                 first_name: editingUser ? editingUser.first_name : "",
//                                 last_name: editingUser ? editingUser.last_name : "",
//                                 password: editingUser ? editingUser.password : "",
//                                 email: editingUser ? editingUser.email : "",
//                                 contact: editingUser ? editingUser.contact : "",
//                                 gender: editingUser ? editingUser.gender : "",
//                                 profile: editingUser ? editingUser.profile : "",

//                             }}
//                             validationSchema={validationSchema}
//                             onSubmit={handleFormSubmit}
//                         >
//                             {({ setFieldValue, isSubmitting, values }) => (
//                                 <Form>
//                                     <div className="form-group">
//                                         <label>First Name:</label>
//                                         <Field type="text" name="first_name" />
//                                         <ErrorMessage name="first_name" component="div" className="error" />
//                                     </div>

//                                     <div className="form-group">
//                                         <label>Last Name:</label>
//                                         <Field type="text" name="last_name" />
//                                         <ErrorMessage name="last_name" component="div" className="error" />
//                                     </div>

//                                     <div className="form-group">
//                                         <label>Password:</label>
//                                         <Field type="password" name="password" />
//                                         <ErrorMessage name="password" component="div" className="error" />
//                                     </div>

//                                     <div className="form-group">
//                                         <label>Email:</label>
//                                         <Field type="email" name="email" />
//                                         <ErrorMessage name="email" component="div" className="error" />
//                                     </div>

//                                     <div className="form-group">
//                                         <label>Contact:</label>
//                                         <Field type="text" name="contact" />
//                                         <ErrorMessage name="contact" component="div" className="error" />
//                                     </div>

//                                     <div className="form-group">
//                                         <label>Gender:</label>
//                                         <Field as="select" name="gender">
//                                             <option value="">Select</option>
//                                             <option value="male">Male</option>
//                                             <option value="female">Female</option>
//                                         </Field>
//                                         <ErrorMessage name="gender" component="div" className="error" />
//                                     </div>

//                                     <div className="form-group">
//                                         <label>Profile:</label>

//                                         <input
//                                             type="file"
//                                             name="profile"
//                                             accept="image/*"
//                                             onChange={(e) => {
//                                                 if (e.target.files && e.target.files.length > 0) {
//                                                     const file = e.target.files[0];
//                                                     setFieldValue("profile", file); 
//                                                     setFieldValue("imageUrl", URL.createObjectURL(file)); 
//                                                 }
//                                             }}
//                                         />
//                                         <ErrorMessage name="profile" component="div" className="error" />
//                                     </div>

//                                     <div className="modal-footer">
//                                         <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
//                                             Close
//                                         </button>
//                                         <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//                                             {editingUser ? "Update" : "Submit"}
//                                         </button>
//                                     </div>
//                                 </Form>
//                             )}
//                         </Formik>
//                     </div>
//                 </div>
//             )}

//             {/* User Table */}
//             <h3>Registered Users</h3>
//             {users.length === 0 ? (
//                 <p>No users added</p>
//             ) : (
//                 <table border="1">
//                     <thead>
//                         <tr>
//                             <th>Username</th>
//                             <th>Last Name</th>
//                             <th>Email</th>
//                             <th>Contact</th>
//                             <th>Gender</th>
//                             <th>Profile</th>
//                             <th>Edit/Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user.id}>
//                                 <td>{user.first_name}</td>
//                                 <td>{user.last_name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.contact}</td>
//                                 <td>{user.gender}</td>
//                                 <Profile
//                                         first_name={user.first_name}
//                                         last_name={user.last_name}
//                                         imageUrl={user.profile || ""}
//                                     />
//                                 <td><button onClick={() => handleEditUser(user)} className="btn btn-warning">Edit</button>
//                                     <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger">Delete</button>

//                                 </td>

//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </>
//     );
// };

// export default AdminPage;


import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import '../src/admin.css';
import Profile from "./Image";

const AdminPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [imageUrl, setImageUrl] = useState<string>("");

    const validationSchema = Yup.object({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        password: Yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        contact: Yup.string()
            .matches(/^[0-9]+$/, "Contact must be a number")
            .min(10, "Contact must be at least 10 digits")
            .required("Contact is required"),
        gender: Yup.string().required("Gender is required"),
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleFormSubmit = async (values: any, { resetForm }: any) => {
        const formData = new FormData();
        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        formData.append("password", values.password);
        formData.append("email", values.email);
        formData.append("contact", values.contact);
        formData.append("gender", values.gender);

        
        if (values.profile) {
            formData.append("profile", values.profile);
        }

        try {
            if (editingUser) {
               
                await axios.patch(`http://localhost:3000/users/${editingUser.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                
                await axios.post("http://localhost:3000/users", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            setIsModalOpen(false);
            resetForm();
            fetchUsers();
        } catch (error) {
            console.error("Error during user submission:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleEditUser = (user: any) => {
        setEditingUser(user);
        setImageUrl(user.profile || "");
        setIsModalOpen(true);
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await axios.delete(`http://localhost:3000/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <>
            <div>Welcome to the Admin Page</div>
            <button className="btn btn-primary" onClick={() => {
                setEditingUser(null);
                setImageUrl(""); 
                setIsModalOpen(true);
            }}>
                Add User
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingUser ? "Edit User" : "Add User"}</h2>

                        <Formik
                            initialValues={{
                                first_name: editingUser ? editingUser.first_name : "",
                                last_name: editingUser ? editingUser.last_name : "",
                                password: editingUser ? editingUser.password : "",
                                email: editingUser ? editingUser.email : "",
                                contact: editingUser ? editingUser.contact : "",
                                gender: editingUser ? editingUser.gender : "",
                                profile: editingUser ? editingUser.profile : "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleFormSubmit}
                        >
                            {({ setFieldValue, isSubmitting, values }) => (
                                <Form>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <Field type="text" name="first_name" />
                                        <ErrorMessage name="first_name" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <Field type="text" name="last_name" />
                                        <ErrorMessage name="last_name" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label>Password:</label>
                                        <Field type="password" name="password" />
                                        <ErrorMessage name="password" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label>Email:</label>
                                        <Field type="email" name="email" />
                                        <ErrorMessage name="email" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label>Contact:</label>
                                        <Field type="text" name="contact" />
                                        <ErrorMessage name="contact" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label>Gender:</label>
                                        <Field as="select" name="gender">
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </Field>
                                        <ErrorMessage name="gender" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label>Profile Image:</label>

                                        <input
                                            type="file"
                                            name="profile"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files.length > 0) {
                                                    const file = e.target.files[0];
                                                    setFieldValue("profile", file); 
                                                    setFieldValue("imageUrl", URL.createObjectURL(file)); 
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="profile" component="div" className="error" />
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            {editingUser ? "Update" : "Submit"}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}

            {/* User Table */}
            <h3>Registered Users</h3>
            {users.length === 0 ? (
                <p>No users added</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Gender</th>
                            <th>Profile</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.contact}</td>
                                <td>{user.gender}</td>
                                <td>
                                    <Profile
                                        first_name={user.first_name}
                                        last_name={user.last_name}
                                        imageUrl={user.profile || ""}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleEditUser(user)} className="btn btn-warning">Edit</button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default AdminPage;
