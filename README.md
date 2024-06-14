# PenCrafted

## Overview

PenCrafted is a creative writing website designed to inspire and support writers of all levels. Inspired by the functionality of EverNote, PenCrafted offers a user-friendly platform where you can craft and organize your writing projects. Whether you want to keep your work private or share it with the PenCrafted community for constructive criticism, PenCrafted provides the tools you need to enhance your writing journey.

## Project Journey

PenCrafted is my Capstone project for AppAcademy, developed within a challenging two-week timeframe. Throughout this project, I aimed to create a platform that nurtures creativity and community among writers. While time constraints prevented me from implementing all aspects of my vision, this project successfully offers an intuitive user experience with a clean and elegant design. I am committed to continuing the development of PenCrafted and enhancing its features in the future.

## Live Link

https://capstone-project-lm4v.onrender.com


## Implemented Technologies

![React-icon svg](https://github.com/llfbh33/Capstone-Project/assets/145170944/97103a00-5148-4209-924f-69f0e9899bcf)
![redux-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/68b638dc-0472-4ab7-bf1e-32716bd8981a)
![flask-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/e40f0301-24b8-4b27-ad2f-a9b4fd573e4b)
![python-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/b3276ac1-652d-455e-bea5-22a275fa7945)
![css-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/267e446d-8aad-4dc3-b858-7c25f34205f8)
![html-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/532c4d1c-758e-4217-babb-39b459dcc073)
![postgres-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/9a37dfbd-82ad-41a4-9925-f80d2ea07651)
![render-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/9141c5c5-9743-4210-a6bc-8c6f2a2492c7)


## Index

[Feature List](https://github.com/llfbh33/Capstone-Project/wiki/Features---MVP)
| [User Stories](https://github.com/llfbh33/Capstone-Project/wiki/Features---MVP)
| [Database Schema](https://github.com/llfbh33/Capstone-Project/wiki/Database-Schema)
| [Wireframes](https://github.com/llfbh33/Capstone-Project/wiki/WireFrames)

[Contact](doc:linking-to-pages#contact)

## Images and page titles go here


## Endpoint Documentation


### Authentication
* Request: GET api/auth
* Purpose: Checks the authentication of the user, runs at initial render and every rerender
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "name": "STRING",
        "username": "STRING",
        "profile_image": "STRING",
        "theme": "STRING"
    }
    ```
* Error Response:
    * Status Code: 401
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
      "message": "Unauthorized"
    }
    ```


### Login
* Request: POST api/auth/login
* Purpose: To log in a user
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "name": "STRING",
        "username": "STRING",
        "profile_image": "STRING",
        "theme": "STRING"
    }
    ```
* Error Response:
    * Status Code: 401
    * Headers:
        * Content-Type: application/json
    * Body, form.data posible responses:

    ```json
    {
        "password": [
            "No such user exists."
        ],
        "username": [
            "Username provided not found.",
            "Password was incorrect."
        ]
    }
    ```


### Unauthorized
* Request: POST api/auth/unauthorized
* Purpose: To alert that the user is unauthorized, endpoint is hit  in the event that a login attempt falid
* Response:
    * Status Code: 401
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "message": "Unauthorized"
    }
    ```

### Logout
* Request: POST api/auth/logout
* Purpose: To log out a user
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "message": "User logged out"
    }
    ```


### Sign Up
* Request: POST api/auth/signup
* Purpose: Sign up a user
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "name": "STRING",
        "username": "STRING",
        "profile_image": "STRING",
        "theme": "STRING"
    }
    ```
* Error Response:
    * Status Code: 401
    * Headers:
        * Content-Type: application/json
    * Body, form.data posible responses:

    ```json
    {
        "name": [
            "This field is required",
            "Field must be between 4 and 50 characters long."
        ],
        "password": [
            "This field is required",
            "Field must be at least 8 characters long."
        ],
        "username": [
            "This field is required",
            "Field must be between 8 and 50 characters long.",
            "Username is already in use."
        ]
    }
    ```

### Error Response for all remaining endpoints if not logged in:
* Error Response:
    * Status Code: 401
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
      "message": "Unauthorized"
    }
    ```

## Users

### Get All Users
* Request: GET api/users
* Purpose: Returns a list of all users
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "users" : [
            {
                "id": "INTEGER",
                "name": "STRING",
                "username": "STRING",
                "profile_image": "STRING",
                "theme": "STRING"
            },
            {
                "id": "INTEGER",
                "name": "STRING",
                "username": "STRING",
                "profile_image": "STRING",
                "theme": "STRING"
            },
        ]
    }
    ```

### Get User By id
* Request: GET api/users/:userId
* Purpose: Returns a dictionary of a specific user by their id
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        {
            "id": "INTEGER",
            "name": "STRING",
            "username": "STRING",
            "profile_image": "STRING",
            "theme": "STRING"
        },
    }
    ```

## Notebooks

### Get All Notebooks
* Request: GET api/notebooks
* Purpose: Returns a list of all notebooks created by the current user
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "notebooks" : [
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "name": "STRING",
                "about": "STRING",
                "created_at": "DATE"
            },
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "name": "STRING",
                "about": "STRING",
                "created_at": "DATE"
            },
        ]
    }
    ```

### Get Notebook By id
* Request: GET api/notebooks/:notebookId
* Purpose: Returns a dictionary of a specific notebook by its id
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "user_id": "INTEGER",
        "name": "STRING",
        "about": "STRING",
        "created_at": "DATE"
    }
    ```

### Create New Notebook
* Request: POST api/notebooks/new
* Purpose: Creates a new notebook within the database with the provided inputs and returns a dictionary of the new notebook.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "user_id": "INTEGER",
        "name": "STRING",
        "about": "STRING",
        "created_at": "DATE"
    }
    ```

* Error Response:
    * Status Code: 400, 500
    * Headers:
        * Content-Type: application/json
    * Body, form.data posible error responses:

    ```json
    {
        "name": [
            "This field is required",
            "Field must be between 4 and 50 characters long."
        ],
        "password": [
            "This field is required",
            "Field must be at least 8 characters long."
        ],
        "username": [
            "This field is required",
            "Field must be between 8 and 50 characters long.",
            "Username is already in use."
        ]
    }
    ```

### Edit Notebook By id
* Request: POST api/notebooks/:notebookId/edit
* Purpose: Edits a specific notebook by its id and returns the updated version as a dictionary. Updates the notebook in the database.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "user_id": "INTEGER",
        "name": "STRING",
        "about": "STRING",
        "created_at": "DATE"
    }
    ```

* Error Response:
    * Status Code: 400, 500
    * Headers:
        * Content-Type: application/json
    * Body, form.data posible error responses:

    ```json
    {
        "name": [
            "This field is required",
            "Field must be between 4 and 50 characters long."
        ],
        "password": [
            "This field is required",
            "Field must be at least 8 characters long."
        ],
        "username": [
            "This field is required",
            "Field must be between 8 and 50 characters long.",
            "Username is already in use."
        ]
    }
    ```

### Delete Notebook By Id
* Request: GEt api/notebooks/:notebookId/delete
* Purpose: Deletes a specific notebook by its id and returns a success message.  Removes the notebook from the database, as a result also deletes any entries within the notebook, any comments on those entries, and any posts associated with those entries.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "message": "Notebook has been successfully deleted"
    }
    ```

## Entries

### Get All Entries
* Request: GET api/entries
* Purpose: Returns a list of all entries and returns them as a list along with its post if applicable and a list of comments if applicable.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        [
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "name": "STRING",
                "content": "TEXT",
                "is_public": "BOOLEAN - default(false)",
                "created_at": "DATE",
                "updated_at": "DATE",
                "comments": [
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    },
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    }
                ],
            },
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "name": "STRING",
                "content": "TEXT",
                "is_public": "BOOLEAN - default(false)",
                "created_at": "DATE",
                "updated_at": "DATE",
                "comments": [
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    },
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    }
                ],
                "post": {
                    "id": "INTEGER",
                    "entry_id": "INTEGER",
                    "message": "STRING",
                    "created_at": "DATE",
                }
            },
        ]
    }
    ```

### Get Entry By id
* Request: GET api/entries/:entryId
* Purpose: Returns a dictionary of a specific entry by its id along with its post if applicable and a list of comments if applicable.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "user_id": "INTEGER",
        "name": "STRING",
        "content": "TEXT",
        "is_public": "BOOLEAN - default(false)",
        "created_at": "DATE",
        "updated_at": "DATE",
        "comments": [
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "entry_id": "INTEGER",
                "comment": "STRING",
                "created_at": "DATE",
            },
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "entry_id": "INTEGER",
                "comment": "STRING",
                "created_at": "DATE",
            }
        ],
        "post": {
            "id": "INTEGER",
            "entry_id": "INTEGER",
            "message": "STRING",
            "created_at": "DATE",
        }
    },
    ```

### Create New Entry
* Request: POST api/entries/new
* Purpose: Creates a new entry within the database with the provided inputs and returns a dictionary of the new entry, along with an empty comments array.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "user_id": "INTEGER",
        "name": "STRING",
        "content": "TEXT",
        "is_public": "BOOLEAN - default(false)",
        "created_at": "DATE",
        "updated_at": "DATE",
        "comments": [
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "entry_id": "INTEGER",
                "comment": "STRING",
                "created_at": "DATE",
            },
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "entry_id": "INTEGER",
                "comment": "STRING",
                "created_at": "DATE",
            }
        ],
    },
    ```

* Error Response:
    * Status Code: 400, 500
    * Headers:
        * Content-Type: application/json
    * Body, form.data posible error responses:

    ```json
    {
        "name": [
            "This field is required",
            "Field must be between 4 and 50 characters long."
        ],
        "password": [
            "This field is required",
            "Field must be at least 8 characters long."
        ],
        "username": [
            "This field is required",
            "Field must be between 8 and 50 characters long.",
            "Username is already in use."
        ]
    }
    ```

### Edit Entry By id
* Request: POST api/entries/:entryId/edit
* Purpose: Edits a specific entry by its id and returns the updated version as a dictionary. Updates the entry in the database.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "user_id": "INTEGER",
        "name": "STRING",
        "content": "TEXT",
        "is_public": "BOOLEAN - default(false)",
        "created_at": "DATE",
        "updated_at": "DATE",
        "comments": [
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "entry_id": "INTEGER",
                "comment": "STRING",
                "created_at": "DATE",
            },
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "entry_id": "INTEGER",
                "comment": "STRING",
                "created_at": "DATE",
            }
        ],
        "post": {
            "id": "INTEGER",
            "entry_id": "INTEGER",
            "message": "STRING",
            "created_at": "DATE",
        }
    },
    ```

* Error Response:
    * Status Code: 400, 500
    * Headers:
        * Content-Type: application/json
    * Body, form.data posible error responses:

    ```json
    {
        "name": [
            "This field is required",
            "Field must be between 4 and 50 characters long."
        ],
        "password": [
            "This field is required",
            "Field must be at least 8 characters long."
        ],
        "username": [
            "This field is required",
            "Field must be between 8 and 50 characters long.",
            "Username is already in use."
        ]
    }
    ```

### Delete Entry By Id
* Request: GEt api/entries/:entryId/delete
* Purpose: Deletes a specific entry by its id and returns a success message.  Removes the entry from the database, as a result also deletes any coresponding comments or post.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "message": "Entry has been successfully deleted"
    }
    ```


## Posts

### Get All Posts
* Request: GET api/posts
* Purpose: Returns a list of all entries which have been posted, posted information, and any comments attached to those posts.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        [
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "name": "STRING",
                "content": "TEXT",
                "is_public": "BOOLEAN - default(false)",
                "created_at": "DATE",
                "updated_at": "DATE",
                "comments": [
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    },
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    }
                ],
                "post": {
                    "id": "INTEGER",
                    "entry_id": "INTEGER",
                    "message": "STRING",
                    "created_at": "DATE",
                }
            },
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "name": "STRING",
                "content": "TEXT",
                "is_public": "BOOLEAN - default(false)",
                "created_at": "DATE",
                "updated_at": "DATE",
                "comments": [
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    },
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    }
                ],
                "post": {
                    "id": "INTEGER",
                    "entry_id": "INTEGER",
                    "message": "STRING",
                    "created_at": "DATE",
                }
            },
        ]
    }
    ```

### Get All Post By Current User
* Request: GET api/posts/user
* Purpose: Returns a list of all entries which have been posted by the current user, posted information, and any comments attached to those posts.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        [
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "name": "STRING",
                "content": "TEXT",
                "is_public": "BOOLEAN - default(false)",
                "created_at": "DATE",
                "updated_at": "DATE",
                "comments": [
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    },
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    }
                ],
                "post": {
                    "id": "INTEGER",
                    "entry_id": "INTEGER",
                    "message": "STRING",
                    "created_at": "DATE",
                }
            },
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "name": "STRING",
                "content": "TEXT",
                "is_public": "BOOLEAN - default(false)",
                "created_at": "DATE",
                "updated_at": "DATE",
                "comments": [
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    },
                    {
                        "id": "INTEGER",
                        "user_id": "INTEGER",
                        "entry_id": "INTEGER",
                        "comment": "STRING",
                        "created_at": "DATE",
                    }
                ],
                "post": {
                    "id": "INTEGER",
                    "entry_id": "INTEGER",
                    "message": "STRING",
                    "created_at": "DATE",
                }
            },
        ]
    }
    ```

### Get Post By id
* Request: GET api/posts/:postId
* Purpose: Returns a posted entry with post information, and any comments associated with that entry.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "user_id": "INTEGER",
        "name": "STRING",
        "content": "TEXT",
        "is_public": "BOOLEAN - default(false)",
        "created_at": "DATE",
        "updated_at": "DATE",
        "comments": [
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "entry_id": "INTEGER",
                "comment": "STRING",
                "created_at": "DATE",
            },
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "entry_id": "INTEGER",
                "comment": "STRING",
                "created_at": "DATE",
            }
        ],
        "post": {
            "id": "INTEGER",
            "entry_id": "INTEGER",
            "message": "STRING",
            "created_at": "DATE",
        }
    }
    ```

### Create New Post
* Request: POST api/posts/new
* Purpose: Creates a new post within the database with the provided inputs and returns an updated dictionary of the posted entry (sets boolean is_posted to true) with the new post attached.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "user_id": "INTEGER",
        "name": "STRING",
        "content": "TEXT",
        "is_public": "BOOLEAN - default(false)",
        "created_at": "DATE",
        "updated_at": "DATE",
        "comments": [
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "entry_id": "INTEGER",
                "comment": "STRING",
                "created_at": "DATE",
            },
            {
                "id": "INTEGER",
                "user_id": "INTEGER",
                "entry_id": "INTEGER",
                "comment": "STRING",
                "created_at": "DATE",
            }
        ],
    },
    ```

* Error Response:
    * Status Code: 400, 500
    * Headers:
        * Content-Type: application/json
    * Body, form.data posible error responses:

    ```json
    {
        "name": [
            "This field is required",
            "Field must be between 4 and 50 characters long."
        ],
        "password": [
            "This field is required",
            "Field must be at least 8 characters long."
        ],
        "username": [
            "This field is required",
            "Field must be between 8 and 50 characters long.",
            "Username is already in use."
        ]
    }
    ```

### Edit Post By id
* Request: POST api/posts/:postId/edit
* Purpose: Edits a specific posts internal information, just message, and returns the updated post.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "post": {
            "id": "INTEGER",
            "entry_id": "INTEGER",
            "message": "STRING",
            "created_at": "DATE",
        }
    },
    ```

* Error Response:
    * Status Code: 400, 500
    * Headers:
        * Content-Type: application/json
    * Body, form.data posible error responses:

    ```json
    {
        "message": [
            "Message can not be longer that 400 characters"
        ],
    }
    ```

### Delete Post By Id
* Request: GET api/posts/:postId/delete
* Purpose: Deletes a specific post by its id, set the 'is_public' boolean for the corresponding entry to false, and returns a success message.  Removes the post from the database.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "message": "Entry has been successfully deleted"
    }
    ```

## Comments

### Create New Comment
* Request: POST api/comments/new
* Purpose: Creates a new comment within the database with the provided inputs and returns the new comment as a dictionary.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "user_id": "INTEGER",
        "entry_id": "INTEGER",
        "comment": "STRING",
        "created_at": "DATE",
    }
    ```

* Error Response:
    * Status Code: 400, 500
    * Headers:
        * Content-Type: application/json
    * Body, form.data posible error responses:

    ```json
    {
        "comment": [
            "This field is required",
            "Field must be between 4 and 50 characters long."
        ],
    }
    ```

### Edit Comment By id
* Request: POST api/comments/:commentId/edit
* Purpose: Edits a comment by id with the provided information and returns the updated comment as a dictionary.
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": "INTEGER",
        "user_id": "INTEGER",
        "entry_id": "INTEGER",
        "comment": "STRING",
        "created_at": "DATE",
    }
    ```

* Error Response:
    * Status Code: 400, 500
    * Headers:
        * Content-Type: application/json
    * Body, form.data posible error responses:

    ```json
    {
        "message": [
            "Comment can not be longer that 600 characters"
        ],
    }
    ```

### Delete Comment By Id
* Request: GET api/comments/:commentId/delete
* Purpose: Deletes a comment by its id only if the current user is the creator of the comment or the creator of the post which the comment is attached to, removes the comment from the database and returns a success response
* Successful Response:
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "message": "Comment has been successfully deleted"
    }
    ```

* Error Response:
    * Status Code: 401
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "message": [
            "You are not the owner of this comment, nor are you the creator of the post it is posted to"
        ],
    }
    ```

## Features

- <strong>Private Writing Space</strong>: Keep your writing projects secure and accessible only to you. Organize your notes, drafts, and completed works in a personal space.
- <strong>Organized Notes</strong>: Use notebooks to organize your writing projects for easy navigation and management.
- <strong>Community Sharing</strong>: Share your work with the PenCrafted community to receive constructive feedback and engage with fellow writers.
- <strong>Rich Text Editor</strong>: Write and format your work with a powerful text editor that supports various writing styles and needs.

## Future Implimentation Goals

- <strong>Tags</strong>: Allow users to categorize and search for writing pieces using tags.
- <strong>Likes on Posts</strong>: Enable users to like posts, helping to highlight popular content.
- <strong>Followers</strong>: Introduce a follow system so users can keep up with their favorite writers.
- <strong>Share on Facebook</strong>: Provide an option for users to share their writing on Facebook to reach a broader audience.

# Contact <a name="acontact"></a>

- LinkedIn
