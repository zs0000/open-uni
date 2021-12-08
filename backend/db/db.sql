INSERT INTO users (user_username, user_email, user_password, user_role) VALUES ('BarbM', 'BarbM@email.com', 'barb', 'professor');

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_firstname VARCHAR(255) NOT NULL,
    user_lastname VARCHAR(255) NOT NULL,
    user_username VARCHAR(255) UNIQUE NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(255) NOT NULL
);



CREATE TABLE courses (
 course_id SERIAL PRIMARY KEY,
 professor VARCHAR(255)  NOT NULL,
 professor_username VARCHAR(255)  NOT NULL,
 course_title VARCHAR(255) NOT NULL,
 course_description TEXT NOT NULL,
 course_category VARCHAR(100),
 course_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 course_capacity INT NOT NULL,
 course_tag VARCHAR(100) NOT NULL
);

CREATE TABLE studentsjoined (
    course_id INT REFERENCES courses (course_id),
    user_username VARCHAR(255) UNIQUE NOT NULL,
    user_firstname VARCHAR(255),
    user_lastname VARCHAR(255),
    user_count VARCHAR(255),
);